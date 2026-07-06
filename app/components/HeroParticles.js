'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroParticles — a very faint drifting particle field behind the hero.
 * Deliberately restrained (the old matrix backdrop was removed for a clean
 * dev-tool feel): ~1px dots, slow upward drift, low alpha, no connections.
 * Skips entirely under prefers-reduced-motion.
 */
export default function HeroParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    let raf = 0;
    let w = 0, h = 0, dpr = 1;
    let parts = [];

    const seed = () => {
      const count = Math.round(Math.min(70, Math.max(36, w / 22)));
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.1,
        vy: 0.06 + Math.random() * 0.16,          // slow upward drift
        vx: (Math.random() - 0.5) * 0.05,          // slight wander
        a: 0.05 + Math.random() * 0.16,            // faint
        tw: 0.4 + Math.random() * 1.2,             // twinkle rate
        ph: Math.random() * Math.PI * 2,
        purple: Math.random() < 0.35,              // most dots white, some accent
      }));
    };

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!parts.length) seed();
    };

    let t = 0;
    const tick = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        const alpha = p.a * (0.6 + 0.4 * Math.sin(t * p.tw + p.ph));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.purple
          ? `rgba(155, 60, 246, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />;
}
