'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroFlow — the home hero backdrop. Flowing data streams: lines bundled at the
 * left fan out to the right and dissolve into scattered particles (a
 * generative-AI look). The strokes are animated dashes so the streams flow;
 * bright pulses ride a few of them; end clusters twinkle. Purple palette, additive
 * glow. Pure 2D canvas, no deps, aria-hidden. Corner rays sit on top.
 */

const COLORS = ['179, 107, 251', '140, 59, 242', '236, 72, 153']; // light-purple / purple / pink
const WHITE = '255, 255, 255';
const N = 28; // number of streams

function mulberry(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function HeroFlow() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // stream params, width-independent (fractions), built once
    const rand = mulberry(1337);
    const streams = Array.from({ length: N }, () => {
      const y0 = 0.5 + (rand() - 0.5) * 0.14;         // bundled near center-left
      const endX = 0.42 + rand() * 0.56;
      const y1 = 0.5 + (rand() - 0.5) * 0.95;          // fanned out on the right
      return {
        y0, endX, y1,
        alpha: 0.12 + rand() * 0.24,
        tint: rand() < 0.72 ? 0 : rand() < 0.6 ? 1 : 2,
        dashSpeed: 0.02 + rand() * 0.05,
        dashPhase: rand() * 40,
        pulse: rand() < 0.5,
        pSpeed: 0.00010 + rand() * 0.00014,
        pPhase: rand(),
        scatter: Array.from({ length: 4 + Math.floor(rand() * 7) }, () => ({
          dx: rand() * 46, dy: (rand() - 0.5) * 26,
          s: 1 + rand() * 2, a: 0.3 + rand() * 0.6,
          tw: rand() * Math.PI * 2, tr: 0.5 + rand() * 1.5,
          tint: rand() < 0.5 ? 0 : rand() < 0.5 ? 2 : 3,
        })),
      };
    });

    let w = 0, h = 0, dpr = 1;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    // cubic bezier point for a stream at parameter t (0..1)
    function pointAt(S, t) {
      const ex = S.endX * w;
      const p0x = 0, p0y = S.y0 * h;
      const p1x = ex * 0.42, p1y = S.y0 * h;
      const p2x = ex * 0.72, p2y = S.y1 * h;
      const p3x = ex, p3y = S.y1 * h;
      const u = 1 - t;
      const x = u * u * u * p0x + 3 * u * u * t * p1x + 3 * u * t * t * p2x + t * t * t * p3x;
      const y = u * u * u * p0y + 3 * u * u * t * p1y + 3 * u * t * t * p2y + t * t * t * p3y;
      return [x, y];
    }

    let raf = 0, running = true;

    function frame(now) {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, w, h);

      // ── streams (animated dashes) ───────────────────────────────────
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      for (let i = 0; i < streams.length; i++) {
        const S = streams[i];
        const ex = S.endX * w;
        ctx.setLineDash([2, 5]);
        ctx.lineDashOffset = reduced ? 0 : -(now * S.dashSpeed) - S.dashPhase;
        ctx.strokeStyle = `rgba(${COLORS[S.tint]}, ${S.alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, S.y0 * h);
        ctx.bezierCurveTo(ex * 0.42, S.y0 * h, ex * 0.72, S.y1 * h, ex, S.y1 * h);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // ── end scatter clusters + pulses (additive glow) ───────────────
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < streams.length; i++) {
        const S = streams[i];
        const ex = S.endX * w, ey = S.y1 * h;

        for (const d of S.scatter) {
          const tw = reduced ? 0.8 : 0.45 + 0.55 * Math.sin(now * 0.0018 * d.tr + d.tw);
          const col = d.tint === 3 ? WHITE : COLORS[d.tint];
          ctx.fillStyle = `rgba(${col}, ${d.a * tw})`;
          ctx.beginPath();
          ctx.arc(ex + d.dx, ey + d.dy, d.s / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        if (S.pulse && !reduced) {
          const t = (now * S.pSpeed + S.pPhase) % 1;
          const [x, y] = pointAt(S, t);
          const g = Math.sin(t * Math.PI); // fade in/out along the run
          ctx.fillStyle = `rgba(255, 236, 180, ${0.9 * g})`;
          ctx.shadowColor = `rgba(${COLORS[S.tint]}, 0.9)`;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(x, y, 1.7, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      ctx.globalCompositeOperation = 'source-over';

      // ── center vignette so the copy stays legible ───────────────────
      const vg = ctx.createRadialGradient(w / 2, h * 0.46, 0, w / 2, h * 0.46, h * 0.62);
      vg.addColorStop(0, 'rgba(8, 6, 12, 0.6)');
      vg.addColorStop(0.55, 'rgba(8, 6, 12, 0.12)');
      vg.addColorStop(1, 'rgba(8, 6, 12, 0)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      if (reduced) running = false;
    }

    raf = requestAnimationFrame(frame);

    const onVis = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (!reduced) { running = true; raf = requestAnimationFrame(frame); }
    };
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div className="hero-flow" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-flow-canvas" />
    </div>
  );
}
