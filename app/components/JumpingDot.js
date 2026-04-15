'use client';

import { useEffect, useRef } from 'react';

// Idle doodle paths — drawn relative to home position
// Each is an array of {x, y} offsets the dot traces out
function heartPath(size) {
  const pts = [];
  for (let t = 0; t <= Math.PI * 2; t += 0.1) {
    pts.push({
      x: size * 16 * Math.pow(Math.sin(t), 3) / 16,
      y: -size * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) / 16,
    });
  }
  return pts;
}

function starPath(size) {
  const pts = [];
  for (let i = 0; i <= 10; i++) {
    const angle = (i * Math.PI / 5) - Math.PI / 2;
    const r = i % 2 === 0 ? size : size * 0.4;
    pts.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
  }
  return pts;
}

function circlePath(size) {
  const pts = [];
  for (let t = 0; t <= Math.PI * 2; t += 0.15) {
    pts.push({ x: Math.cos(t) * size, y: Math.sin(t) * size });
  }
  return pts;
}

function figurePath(size) {
  const pts = [];
  for (let t = 0; t <= Math.PI * 2; t += 0.12) {
    pts.push({ x: Math.sin(t) * size, y: Math.sin(t * 2) * size * 0.5 });
  }
  return pts;
}

function zigzagPath(size) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    pts.push({ x: (i - 2.5) * size * 0.4, y: (i % 2 === 0 ? -1 : 1) * size * 0.6 });
  }
  return pts;
}

const doodleGenerators = [
  () => heartPath(30),
  () => starPath(25),
  () => circlePath(20),
  () => figurePath(25),
  () => zigzagPath(25),
];

export default function JumpingDot() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf;
    let particles = [];
    let dotX = 0;
    let dotY = 0;
    let targetX = 0;
    let targetY = 0;
    let velX = 0;
    let velY = 0;
    let initialized = false;
    let DOT_RADIUS = 10;
    const SPRING = 0.06;
    const DAMPING = 0.82;

    // Idle / boredom state
    let idleTimer = null;
    let hideSeekTimer = null;
    let idleMode = false;
    let idlePath = [];
    let idleIndex = 0;
    let idleHomeX = 0;
    let idleHomeY = 0;
    let idleReturning = false;
    let hideSeekMode = false;
    let hideSeekPhase = 'going'; // 'going', 'hiding', 'peek1', 'duck1', 'peek2', 'duck2', 'returning'
    let hideTargetX = 0;
    let hideTargetY = 0;
    let hideBtnW = 0;
    let hideBtnH = 0;
    let hideStartTime = 0;
    let returnSpring = 0.015; // slow bouncy spring for the return
    const IDLE_DELAY = 3000;
    const HIDESEEK_DELAY = 12000;

    function startIdle() {
      if (idleMode || hideSeekMode) return;
      if (currentTargetId !== 'hero-dot') return;
      idleMode = true;
      idleReturning = false;
      idleHomeX = targetX;
      idleHomeY = targetY;
      const gen = doodleGenerators[Math.floor(Math.random() * doodleGenerators.length)];
      idlePath = gen();
      idleIndex = 0;
    }

    function startHideSeek() {
      if (hideSeekMode) return;
      if (currentTargetId !== 'hero-dot') return;
      // Interrupt any active doodle
      if (idleMode) stopIdle();
      // Find the "See How It Works" button
      const btn = document.querySelector('a[href="#how-it-works"].btn');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      hideSeekMode = true;
      hideSeekPhase = 'going';
      idleHomeX = targetX;
      idleHomeY = targetY;
      // Store button geometry for peek positions
      hideTargetX = rect.left + rect.width / 2;
      hideTargetY = rect.top + rect.height / 2;
      hideBtnW = rect.width / 2;
      hideBtnH = rect.height / 2;
      hideStartTime = 0;
    }

    function stopIdle() {
      idleMode = false;
      idleReturning = false;
      idlePath = [];
      idleIndex = 0;
    }

    function stopHideSeek() {
      hideSeekMode = false;
      hideSeekPhase = 'going';
    }

    // Called on user scroll — resets everything
    function resetIdleTimer() {
      if (idleTimer) clearTimeout(idleTimer);
      if (hideSeekTimer) clearTimeout(hideSeekTimer);
      if (idleMode) stopIdle();
      if (hideSeekMode) stopHideSeek();
      idleTimer = setTimeout(startIdle, IDLE_DELAY);
      hideSeekTimer = setTimeout(startHideSeek, HIDESEEK_DELAY);
    }

    // Called when a doodle finishes — only restarts doodle, leaves hideSeek timer alone
    function restartDoodleOnly() {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(startIdle, IDLE_DELAY);
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Recompute dot target when page resizes or goes mobile
      if (initialized) updateTarget();
    }
    resize();
    window.addEventListener('resize', resize);

    function getDotPosition(el) {
      const rect = el.getBoundingClientRect();
      // Scale dot radius to ~15% of the text line height
      DOT_RADIUS = Math.min(11, Math.max(4, rect.height * 0.085));
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height * 0.72,
      };
    }

    let currentTargetId = 'hero-dot';

    // Last known position of the final anchor (cmd-dip)
    let lastAnchorPos = null;

    function updateTarget() {
      resetIdleTimer();

      const ids = ['hero-dot', 'cmd-yo', 'cmd-sup', 'cmd-dip'];
      let best = null;
      let bestId = null;
      let bestDist = Infinity;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const pos = getDotPosition(el);

        // Track the last anchor's position while it's in the viewport
        if (id === 'cmd-dip' && rect.bottom > 0 && rect.top < window.innerHeight) {
          lastAnchorPos = { x: pos.x, y: pos.y };
        }

        // Pick the element closest to being visible in the viewport
        const elCenter = rect.top + rect.height / 2;
        const viewCenter = window.innerHeight / 2;
        const dist = Math.abs(elCenter - viewCenter);
        // Only consider elements at least partially in viewport
        if (rect.bottom > 0 && rect.top < window.innerHeight && dist < bestDist) {
          bestDist = dist;
          best = pos;
          bestId = id;
        }
      }

      // If no anchor is in viewport, clamp to the last anchor's saved position
      if (!best && lastAnchorPos) {
        targetX = lastAnchorPos.x;
        targetY = lastAnchorPos.y;
        // Don't update currentTargetId — keep it as whatever it was
        return;
      }

      if (!best) return;

      targetX = best.x;
      targetY = best.y;
      currentTargetId = bestId;

      if (!initialized) {
        dotX = targetX;
        dotY = targetY;
        initialized = true;
      }
    }

    function spawnParticles(x, y, count) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 1.2;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.02 + Math.random() * 0.025,
          size: 1.5 + Math.random() * 2.5,
        });
      }
    }

    window.addEventListener('scroll', updateTarget, { passive: true });
    setTimeout(updateTarget, 150);
    resetIdleTimer();

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!initialized) {
        updateTarget();
        raf = requestAnimationFrame(draw);
        return;
      }

      let moveTargetX = targetX;
      let moveTargetY = targetY;

      if (hideSeekMode) {
        if (hideSeekPhase === 'going') {
          // Fly toward the button center
          moveTargetX = hideTargetX;
          moveTargetY = hideTargetY;
          const dist = Math.hypot(dotX - hideTargetX, dotY - hideTargetY);
          spawnParticles(dotX, dotY, 1);
          if (dist < 5) {
            hideSeekPhase = 'hiding';
            hideStartTime = Date.now();
          }
        } else if (hideSeekPhase === 'hiding') {
          // Hidden behind button briefly
          moveTargetX = hideTargetX;
          moveTargetY = hideTargetY;
          if (Date.now() - hideStartTime > 1000) {
            hideSeekPhase = 'peek-up';
            hideStartTime = Date.now();
          }
        } else if (hideSeekPhase === 'peek-up') {
          // Peek up above the button — just barely
          moveTargetX = hideTargetX;
          moveTargetY = hideTargetY - hideBtnH + 10;
          const dist = Math.hypot(dotX - moveTargetX, dotY - moveTargetY);
          if (dist < 4 && Date.now() - hideStartTime > 600) {
            hideSeekPhase = 'duck-up';
            hideStartTime = Date.now();
          }
        } else if (hideSeekPhase === 'duck-up') {
          // Duck back behind
          moveTargetX = hideTargetX;
          moveTargetY = hideTargetY;
          const dist = Math.hypot(dotX - hideTargetX, dotY - hideTargetY);
          if (dist < 5 && Date.now() - hideStartTime > 700) {
            hideSeekPhase = 'peek-left';
            hideStartTime = Date.now();
          }
        } else if (hideSeekPhase === 'peek-left') {
          // Peek out to the right of the button
          moveTargetX = hideTargetX + hideBtnW + 10;
          moveTargetY = hideTargetY;
          const dist = Math.hypot(dotX - moveTargetX, dotY - moveTargetY);
          if (dist < 4 && Date.now() - hideStartTime > 600) {
            hideSeekPhase = 'duck-left';
            hideStartTime = Date.now();
          }
        } else if (hideSeekPhase === 'duck-left') {
          // Duck back behind
          moveTargetX = hideTargetX;
          moveTargetY = hideTargetY;
          const dist = Math.hypot(dotX - hideTargetX, dotY - hideTargetY);
          if (dist < 5 && Date.now() - hideStartTime > 800) {
            hideSeekPhase = 'slow-up';
            hideStartTime = Date.now();
          }
        } else if (hideSeekPhase === 'slow-up') {
          // Super slow creep up above the button
          moveTargetX = hideTargetX;
          moveTargetY = hideTargetY - hideBtnH - 12;
          // Don't transition immediately — let it creep
          if (Date.now() - hideStartTime > 1200) {
            hideSeekPhase = 'duck-slow';
            hideStartTime = Date.now();
          }
        } else if (hideSeekPhase === 'duck-slow') {
          // Duck back behind — caught!
          moveTargetX = hideTargetX;
          moveTargetY = hideTargetY;
          const dist = Math.hypot(dotX - hideTargetX, dotY - hideTargetY);
          if (dist < 5 && Date.now() - hideStartTime > 400) {
            hideSeekPhase = 'laugh';
            hideStartTime = Date.now();
          }
        } else if (hideSeekPhase === 'laugh') {
          // Shoot out to the right of the button, laughing (bouncing up and down)
          const t = Date.now() - hideStartTime;
          moveTargetX = hideTargetX + hideBtnW + 30;
          moveTargetY = hideTargetY + Math.sin(t * 0.015) * 8; // little bounce
          spawnParticles(dotX, dotY, 1);
          if (t > 1500) {
            hideSeekPhase = 'returning';
          }
        } else {
          // Slowly bounce back home
          moveTargetX = idleHomeX;
          moveTargetY = idleHomeY;
          const dist = Math.hypot(dotX - idleHomeX, dotY - idleHomeY);
          spawnParticles(dotX, dotY, 1);
          if (dist < 3) {
            stopHideSeek();
            resetIdleTimer();
          }
        }
      } else if (idleMode && idlePath.length > 0) {
        if (!idleReturning) {
          // Follow the doodle path
          const pt = idlePath[idleIndex];
          moveTargetX = idleHomeX + pt.x;
          moveTargetY = idleHomeY + pt.y;

          // Check if close enough to advance
          const distToWaypoint = Math.hypot(dotX - moveTargetX, dotY - moveTargetY);
          if (distToWaypoint < 4) {
            idleIndex++;
            if (idleIndex >= idlePath.length) {
              idleReturning = true;
            }
          }

          // Leave a trail while doodling
          spawnParticles(dotX, dotY, 1);
        } else {
          // Returning home
          moveTargetX = idleHomeX;
          moveTargetY = idleHomeY;
          const distHome = Math.hypot(dotX - idleHomeX, dotY - idleHomeY);
          if (distHome < 3) {
            stopIdle();
            restartDoodleOnly();
          }
        }
      }

      // Spring physics — slow for creep and return phases
      const isSlowPhase = hideSeekMode && (hideSeekPhase === 'returning' || hideSeekPhase === 'slow-up');
      const spring = isSlowPhase ? 0.012 : SPRING;
      const damping = isSlowPhase ? 0.93 : DAMPING;
      const dx = moveTargetX - dotX;
      const dy = moveTargetY - dotY;
      velX += dx * spring;
      velY += dy * spring;
      velX *= damping;
      velY *= damping;
      dotX += velX;
      dotY += velY;

      // Spawn trail particles when moving fast
      const speed = Math.hypot(velX, velY);
      if (speed > 2 && !idleMode) {
        spawnParticles(dotX, dotY, Math.min(Math.floor(speed * 0.4), 3));
      }

      // Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 199, 94, ${p.life * 0.5})`;
        ctx.fill();
      }

      // Hide dot whenever it overlaps the button area
      let dotHidden = false;
      if (hideSeekMode && hideSeekPhase !== 'going' && hideSeekPhase !== 'laugh' && hideSeekPhase !== 'returning') {
        const insideX = Math.abs(dotX - hideTargetX) < hideBtnW + DOT_RADIUS;
        const insideY = Math.abs(dotY - hideTargetY) < hideBtnH + DOT_RADIUS;
        dotHidden = insideX && insideY;
      }

      if (!dotHidden) {
        // Dot glow
        const glowGrad = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, DOT_RADIUS * 3.5);
        glowGrad.addColorStop(0, 'rgba(37, 199, 94, 0.18)');
        glowGrad.addColorStop(1, 'rgba(37, 199, 94, 0)');
        ctx.beginPath();
        ctx.arc(dotX, dotY, DOT_RADIUS * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Main dot
        ctx.beginPath();
        ctx.arc(dotX, dotY, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = '#25C75E';
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      if (idleTimer) clearTimeout(idleTimer);
      if (hideSeekTimer) clearTimeout(hideSeekTimer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateTarget);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="jumping-dot"
      aria-hidden="true"
    />
  );
}
