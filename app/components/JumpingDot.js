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
    const DOT_RADIUS = 10;
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
    let hideSeekPhase = 'going'; // 'going', 'hiding', 'returning'
    let hideTargetX = 0;
    let hideTargetY = 0;
    let hideStartTime = 0;
    const IDLE_DELAY = 3000;
    const HIDESEEK_DELAY = 12000;

    function startIdle() {
      if (idleMode || hideSeekMode) return;
      idleMode = true;
      idleReturning = false;
      idleHomeX = targetX;
      idleHomeY = targetY;
      const gen = doodleGenerators[Math.floor(Math.random() * doodleGenerators.length)];
      idlePath = gen();
      idleIndex = 0;
    }

    function startHideSeek() {
      if (hideSeekMode || idleMode) return;
      // Find the "See How It Works" button
      const btn = document.querySelector('a[href="#how-it-works"].btn');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      hideSeekMode = true;
      hideSeekPhase = 'going';
      idleHomeX = targetX;
      idleHomeY = targetY;
      // Target: behind the button center
      hideTargetX = rect.left + rect.width / 2;
      hideTargetY = rect.top + rect.height / 2;
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

    function resetIdleTimer() {
      if (idleTimer) clearTimeout(idleTimer);
      if (hideSeekTimer) clearTimeout(hideSeekTimer);
      if (idleMode) stopIdle();
      if (hideSeekMode) stopHideSeek();
      idleTimer = setTimeout(startIdle, IDLE_DELAY);
      hideSeekTimer = setTimeout(startHideSeek, HIDESEEK_DELAY);
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function getDotPosition(el) {
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 + 5,
        y: rect.top + rect.height / 2 + 30,
      };
    }

    function updateTarget() {
      resetIdleTimer();
      const viewCenter = window.innerHeight * 0.4;

      const ids = ['hero-dot', 'cmd-yo', 'cmd-sup', 'cmd-dip'];
      let closest = null;
      let minDist = Infinity;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const pos = getDotPosition(el);
        const dist = Math.abs(pos.y - viewCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = pos;
        }
      }

      if (!closest) return;

      targetX = closest.x;
      targetY = closest.y;

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
          // Fly toward the button
          moveTargetX = hideTargetX;
          moveTargetY = hideTargetY;
          const dist = Math.hypot(dotX - hideTargetX, dotY - hideTargetY);
          spawnParticles(dotX, dotY, 1);
          if (dist < 5) {
            hideSeekPhase = 'hiding';
            hideStartTime = Date.now();
          }
        } else if (hideSeekPhase === 'hiding') {
          // Stay hidden behind the button for 1.5s
          moveTargetX = hideTargetX;
          moveTargetY = hideTargetY;
          if (Date.now() - hideStartTime > 1500) {
            hideSeekPhase = 'returning';
          }
        } else {
          // Fly back home
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
            resetIdleTimer();
          }
        }
      }

      // Spring physics toward current target
      const dx = moveTargetX - dotX;
      const dy = moveTargetY - dotY;
      velX += dx * SPRING;
      velY += dy * SPRING;
      velX *= DAMPING;
      velY *= DAMPING;
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

      // Inner highlight
      ctx.beginPath();
      ctx.arc(dotX, dotY, DOT_RADIUS * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fill();

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
