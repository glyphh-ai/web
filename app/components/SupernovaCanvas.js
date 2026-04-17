'use client';

import { useRef, useEffect } from 'react';

export default function SupernovaCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf;
    let particles = [];
    const MAX = 180;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function spawn() {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const angle = Math.random() * Math.PI * 2;
      const isFast = Math.random() < 0.15;
      const speed = isFast ? 0.2 + Math.random() * 0.35 : 0.008 + Math.random() * 0.08;
      const tailLen = Math.floor(40 + Math.random() * 80);
      return {
        x: cx + (Math.random() - 0.5) * 8,
        y: cy + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: isFast ? 1.5 + Math.random() * 2 : 2 + Math.random() * 3.5,
        speed,
        life: 0,
        maxLife: isFast ? 200 + Math.random() * 300 : 500 + Math.random() * 800,
        tail: [],
        tailLen,
        hue: Math.random(),
      };
    }

    // Pre-simulate so effect is mature on first paint
    for (let i = 0; i < MAX; i++) {
      const p = spawn();
      const advance = Math.floor(Math.random() * p.maxLife * 0.9);
      for (let j = 0; j < advance; j++) {
        p.tail.unshift({ x: p.x, y: p.y });
        if (p.tail.length > p.tailLen) p.tail.pop();
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 1.003;
        p.vy *= 1.003;
        p.life++;
      }
      particles.push(p);
    }

    function draw() {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Core glow — green
      const cx = w / 2;
      const cy = h / 2;
      const coreRadius = Math.max(w, h) * 0.55;
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
      coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
      coreGrad.addColorStop(0.04, 'rgba(200, 255, 220, 0.34)');
      coreGrad.addColorStop(0.12, 'rgba(37, 199, 94, 0.22)');
      coreGrad.addColorStop(0.3, 'rgba(37, 199, 94, 0.09)');
      coreGrad.addColorStop(0.55, 'rgba(37, 199, 94, 0.03)');
      coreGrad.addColorStop(1, 'rgba(37, 199, 94, 0)');
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, w, h);

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.tail.unshift({ x: p.x, y: p.y });
        if (p.tail.length > p.tailLen) p.tail.pop();

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 1.003;
        p.vy *= 1.003;
        p.life++;

        const lifeRatio = p.life / p.maxLife;
        const alpha = lifeRatio < 0.1 ? lifeRatio / 0.1 : lifeRatio > 0.7 ? 1 - (lifeRatio - 0.7) / 0.3 : 1;
        const dist = Math.hypot(p.x - cx, p.y - cy);
        const maxDist = Math.max(w, h) * 0.6;
        const perspScale = 1 + (dist / maxDist) * 3;

        if (p.life >= p.maxLife) {
          particles[i] = spawn();
          continue;
        }

        // Draw tail — white to green gradient
        for (let t = 0; t < p.tail.length; t++) {
          const tRatio = t / p.tail.length;
          const tAlpha = alpha * (1 - tRatio) * 0.8;
          // White-hot → green trails
          const r = Math.round(255 - tRatio * (255 - 37));
          const g = Math.round(255 - tRatio * (255 - 199));
          const b = Math.round(255 - tRatio * (255 - 94));
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${tAlpha})`;
          const tSize = p.size * perspScale * (1 - tRatio * 0.6);
          ctx.fillRect(
            p.tail[t].x - tSize / 2,
            p.tail[t].y - tSize / 2,
            tSize,
            tSize
          );
        }

        // Draw head — white-hot
        const headSize = p.size * perspScale;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(p.x - headSize / 2, p.y - headSize / 2, headSize, headSize);
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="supernova-canvas"
      aria-hidden="true"
    />
  );
}
