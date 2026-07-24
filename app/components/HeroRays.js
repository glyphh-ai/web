'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroRays — corner particle rays for the home hero. Dotted halftone sprays fan
 * from the top corners with a soft ember bokeh and scattered white sparks. This
 * layer keeps its motion (slow outward flow + twinkle + pointer parallax); the
 * grid behind it stays still. Pure 2D canvas, no deps, aria-hidden.
 */

const COLORS = ['251, 191, 36', '251, 146, 60', '251, 113, 133']; // amber / orange / rose
const WHITE = '255, 255, 255';

const CORNERS = [
  { x: 0, y: 0, a0: 0.12, a1: 1.45, tint: 0 }, // top-left  → down-right
  { x: 1, y: 0, a0: 1.69, a1: 3.02, tint: 2 }, // top-right → down-left
];

const RAYS = 18;
const DOTS = 34;
const CURL = 0.22;

export default function HeroRays() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0, dpr = 1, reach = 0;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width; h = rect.height;
      reach = Math.hypot(w, h) * 0.6;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    let px = 0, py = 0, cx = 0, cy = 0;
    function onPointer(e) { px = e.clientX / window.innerWidth - 0.5; py = e.clientY / window.innerHeight - 0.5; }

    let raf = 0, running = true;

    function frame(now) {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      cx += (px - cx) * 0.05;
      cy += (py - cy) * 0.05;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      const flow = reduced ? 0 : now * 0.000018;

      for (let ci = 0; ci < CORNERS.length; ci++) {
        const C = CORNERS[ci];
        const ox = C.x * w, oy = C.y * h;
        const color = COLORS[C.tint];
        const par = 26;

        const pulse = 0.75 + 0.25 * Math.sin(now * 0.0009 + ci * 1.7);
        const gx = ox + (C.x === 0 ? 60 : -60);
        const gy = oy + (C.y === 0 ? 60 : -60);
        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, 220);
        grad.addColorStop(0, `rgba(${color}, ${0.28 * pulse})`);
        grad.addColorStop(0.5, `rgba(${color}, ${0.09 * pulse})`);
        grad.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(ox - 300, oy - 300, 600, 600);

        for (let k = 0; k < RAYS; k++) {
          const a = C.a0 + (C.a1 - C.a0) * (k / (RAYS - 1));
          const jitter = Math.sin(k * 12.9 + ci * 4.1) * 0.03;
          for (let j = 0; j < DOTS; j++) {
            const baseT = j / DOTS;
            const t = flow ? (baseT + flow) % 1 : baseT;
            const ang = a + CURL * t + jitter;
            const r = reach * t;
            const x = ox + Math.cos(ang) * r + cx * par * t;
            const y = oy + Math.sin(ang) * r + cy * par * t;
            const env = Math.min(1, t / 0.05) * Math.min(1, (1 - t) / 0.4);
            const tw = reduced ? 0.85 : 0.55 + 0.45 * Math.sin(now * 0.002 + j * 0.5 + k * 1.3 + ci);
            const spark = (j + k) % 8 === 0;
            const col = spark ? WHITE : color;
            const alpha = env * tw * (spark ? 1 : 0.8);
            if (alpha <= 0.01) continue;
            const size = (2.7 * (1 - t) + 0.7 * t) * (spark ? 1.5 : 1);
            ctx.fillStyle = `rgba(${col}, ${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, size / 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.globalCompositeOperation = 'source-over';
      if (reduced) running = false;
    }

    raf = requestAnimationFrame(frame);

    const onVis = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (!reduced) { running = true; raf = requestAnimationFrame(frame); }
    };
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div className="hero-rays" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-rays-canvas" />
    </div>
  );
}
