'use client';

import { useEffect, useRef } from 'react';

/**
 * SpaceFlame — space flames behind a card, on hover (his order, 2026-09-22).
 *
 * A canvas larger than its parent card, sitting behind it. While the pointer
 * is over the card, square sparks are born just inside the card's edges and
 * thrown outward and up: they wobble with turbulence, shrink, and burn from
 * purple through lavender to white before they die. A faint glow breathes
 * behind the whole card. The card's own interior is cut out of the canvas,
 * so everything reads as coming from BEHIND the card. Nothing draws at rest;
 * the fire dies out over a second once the pointer leaves.
 */

const PAD = 56;          // px the canvas extends past the card on every side
const SPAWN = 90;        // sparks per second while hot
const MAX = 260;

const rnd = (a, b) => a + Math.random() * (b - a);

export default function SpaceFlame() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const host = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, cw = 0, ch = 0, raf = 0, last = 0, hot = 0, heat = 0;
    let sparks = [];

    const measure = () => {
      const r = host.getBoundingClientRect();
      cw = r.width; ch = r.height;
      w = cw + PAD * 2; h = ch + PAD * 2;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // a spark is born on the card's edge — mostly the top and the sides — and
    // leaves outward from that edge, upward on the whole
    const born = () => {
      const edge = Math.random();
      let x, y, vx, vy;
      if (edge < 0.5) { x = rnd(0, cw); y = rnd(0, 6); vx = rnd(-12, 12); vy = rnd(-70, -28); }            // top
      else if (edge < 0.75) { x = rnd(0, 6); y = rnd(0, ch); vx = rnd(-55, -18); vy = rnd(-40, -4); }      // left
      else if (edge < 0.9) { x = rnd(cw - 6, cw); y = rnd(0, ch); vx = rnd(18, 55); vy = rnd(-40, -4); }   // right
      else { x = rnd(0, cw); y = rnd(ch - 6, ch); vx = rnd(-14, 14); vy = rnd(10, 30); }                  // a few fall off the foot
      return { x: PAD + x, y: PAD + y, vx, vy, life: 0, ttl: rnd(0.6, 1.4), size: rnd(1.5, 3.5), seed: Math.random() * 10, white: Math.random() < 0.35 };
    };

    const step = (now) => {
      const t = now / 1000;
      const dt = last ? Math.min(0.05, t - last) : 0.016;
      last = t;
      heat += ((hot ? 1 : 0) - heat) * (hot ? 0.12 : 0.05);

      // births
      if (hot) {
        let n = SPAWN * dt * heat + Math.random();
        while (n >= 1 && sparks.length < MAX) { sparks.push(born()); n -= 1; }
      }

      ctx.clearRect(0, 0, w, h);

      // the glow behind the card, breathing with the heat
      if (heat > 0.01) {
        const g = ctx.createRadialGradient(w / 2, h / 2 - 10, 10, w / 2, h / 2, Math.max(w, h) * 0.62);
        const a = 0.22 * heat * (0.85 + 0.15 * Math.sin(t * 7));
        g.addColorStop(0, `rgba(255, 255, 255, ${(a * 0.55).toFixed(3)})`);
        g.addColorStop(0.18, `rgba(176, 102, 255, ${a})`);
        g.addColorStop(0.55, `rgba(140, 59, 242, ${a * 0.45})`);
        g.addColorStop(1, 'rgba(140, 59, 242, 0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // the sparks
      const keep = [];
      for (const s of sparks) {
        s.life += dt;
        if (s.life >= s.ttl) continue;
        const u = s.life / s.ttl;
        // turbulence: a wobble that grows as the spark ages
        s.vx += Math.sin(t * 9 + s.seed) * 60 * dt * (0.4 + u);
        s.vy -= 26 * dt;                        // rising
        s.x += s.vx * dt; s.y += s.vy * dt;
        const size = s.size * (1 - u * 0.7);
        // purple → lavender → white as it burns out
        const c = s.white ? [255, 255, 255]
          : u < 0.25 ? [176 + (214 - 176) * (u / 0.25), 102 + (172 - 102) * (u / 0.25), 255]
          : [214 + (255 - 214) * ((u - 0.25) / 0.75), 172 + (255 - 172) * ((u - 0.25) / 0.75), 255];
        const alpha = (u < 0.12 ? u / 0.12 : 1 - (u - 0.12) / 0.88) * heat;
        ctx.fillStyle = `rgba(${c[0] | 0}, ${c[1] | 0}, 255, ${alpha.toFixed(3)})`;
        ctx.fillRect(Math.round(s.x), Math.round(s.y), Math.max(1, Math.round(size)), Math.max(1, Math.round(size)));
        keep.push(s);
      }
      sparks = keep;

      // the card's interior is cut out: the fire comes from behind the card
      ctx.clearRect(PAD, PAD, cw, ch);

      if (hot || heat > 0.01 || sparks.length) raf = requestAnimationFrame(step);
      else { raf = 0; ctx.clearRect(0, 0, w, h); }
    };
    const start = () => { if (!raf) { last = 0; raf = requestAnimationFrame(step); } };

    const onEnter = () => { hot = 1; start(); };
    const onLeave = () => { hot = 0; start(); };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    host.addEventListener('pointerenter', onEnter);
    host.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      host.removeEventListener('pointerenter', onEnter);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} className="sf" style={{ inset: -PAD }} aria-hidden="true" />;
}
