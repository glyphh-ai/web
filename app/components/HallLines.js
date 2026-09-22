'use client';

import { useEffect, useRef } from 'react';

/**
 * HallLines — hover one of the hero's four cards and lines shoot from its
 * corners toward the hall's vanishing point (his order, 2026-09-22), with
 * square particles running down them into the distance, shrinking as they
 * go. One canvas over the whole hero, under the copy. The lines extend over
 * half a second and retract when the pointer leaves.
 */

const VP_Y = 0.36;       // the vanishing point, as HeroAscii places it: centred, 36% down
const PER_LINE = 5;      // particles per line
const FLARE_AFTER = 0.5; // s of dwell before the flare begins to build
const FLARE_FULL = 3.2;  // s of dwell for the flare to reach full
const rnd = (a, b) => a + Math.random() * (b - a);

export default function HallLines({ selector = '.oshero-points li' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const host = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, raf = 0, last = 0, dwell = 0, flare = 0;
    const cards = [...host.querySelectorAll(selector)].map((el) => ({ el, heat: 0, hot: false, rect: null, seed: Math.random() * 10 }));

    const measure = () => {
      const r = host.getBoundingClientRect();
      w = r.width; h = r.height;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const c of cards) {
        const b = c.el.getBoundingClientRect();
        c.rect = { x: b.left - r.left, y: b.top - r.top, w: b.width, h: b.height };
      }
    };

    const step = (now) => {
      const t = now / 1000;
      const dt = last ? Math.min(0.05, t - last) : 0.016;
      last = t;
      ctx.clearRect(0, 0, w, h);
      const vp = { x: w / 2, y: h * VP_Y };
      let alive = false;
      // the longer the pointer stays on one card, the more the vanishing point flares
      const anyHot = cards.some((c) => c.hot);
      dwell = anyHot ? dwell + dt : 0;
      const target = anyHot ? Math.min(1, Math.max(0, (dwell - FLARE_AFTER) / (FLARE_FULL - FLARE_AFTER))) : 0;
      flare += (target - flare) * (anyHot ? 0.06 : 0.1);
      if (flare > 0.01) {
        alive = true;
        const R = 40 + 220 * flare;
        const pulse = 0.85 + 0.15 * Math.sin(t * 6.3) + 0.06 * Math.sin(t * 17);
        // the corona: white core, lavender, purple, out to nothing
        const g = ctx.createRadialGradient(vp.x, vp.y, 0, vp.x, vp.y, R);
        g.addColorStop(0, `rgba(255, 255, 255, ${(0.85 * flare * pulse).toFixed(3)})`);
        g.addColorStop(0.12, `rgba(214, 172, 255, ${(0.55 * flare * pulse).toFixed(3)})`);
        g.addColorStop(0.4, `rgba(176, 102, 255, ${(0.22 * flare).toFixed(3)})`);
        g.addColorStop(1, 'rgba(140, 59, 242, 0)');
        ctx.fillStyle = g;
        ctx.fillRect(vp.x - R, vp.y - R, R * 2, R * 2);
        // the rays: thin spikes turning slowly, flickering
        const rays = 10;
        for (let i = 0; i < rays; i++) {
          const ang = (i / rays) * Math.PI * 2 + t * 0.25 + (i % 2 ? 0.3 : 0);
          const len = R * (0.9 + 0.5 * Math.abs(Math.sin(t * 3.1 + i * 1.7))) * flare;
          const rg = ctx.createLinearGradient(vp.x, vp.y, vp.x + Math.cos(ang) * len, vp.y + Math.sin(ang) * len);
          rg.addColorStop(0, `rgba(255, 255, 255, ${(0.5 * flare).toFixed(3)})`);
          rg.addColorStop(1, 'rgba(214, 172, 255, 0)');
          ctx.strokeStyle = rg; ctx.lineWidth = i % 3 === 0 ? 2 : 1;
          ctx.beginPath(); ctx.moveTo(vp.x, vp.y); ctx.lineTo(vp.x + Math.cos(ang) * len, vp.y + Math.sin(ang) * len); ctx.stroke();
        }
      }
      for (const c of cards) {
        c.heat += ((c.hot ? 1 : 0) - c.heat) * (c.hot ? 0.14 : 0.08);
        if (c.heat < 0.01 || !c.rect) continue;
        alive = true;
        const { x, y, w: cw, h: ch } = c.rect;
        const corners = [[x, y], [x + cw, y], [x, y + ch], [x + cw, y + ch]];
        // the lines grow toward the vanishing point with the heat
        const reach = Math.min(1, c.heat * 1.15) * 0.92;   // stop just short of the point
        corners.forEach(([px, py], ci) => {
          const ex = px + (vp.x - px) * reach, ey = py + (vp.y - py) * reach;
          const g = ctx.createLinearGradient(px, py, ex, ey);
          g.addColorStop(0, `rgba(176, 102, 255, ${(0.7 * c.heat).toFixed(3)})`);
          g.addColorStop(0.6, `rgba(214, 172, 255, ${(0.35 * c.heat).toFixed(3)})`);
          g.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.strokeStyle = g;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(ex, ey); ctx.stroke();
          // particles run the line toward the point and shrink into the distance
          for (let k = 0; k < PER_LINE; k++) {
            const s = ((t * (0.45 + 0.1 * ((k + ci) % 3)) + k / PER_LINE + c.seed) % 1);
            if (s > reach) continue;
            const qx = px + (vp.x - px) * s, qy = py + (vp.y - py) * s;
            const size = Math.max(1, Math.round(4 * (1 - s) + 1));
            const white = s > 0.55;
            const a = c.heat * (s < 0.08 ? s / 0.08 : 1 - Math.pow(s, 3));
            ctx.fillStyle = white ? `rgba(255, 255, 255, ${a.toFixed(3)})` : `rgba(214, 172, 255, ${a.toFixed(3)})`;
            ctx.fillRect(Math.round(qx - size / 2), Math.round(qy - size / 2), size, size);
          }
        });
      }
      if (alive || anyHot) raf = requestAnimationFrame(step);
      else { raf = 0; ctx.clearRect(0, 0, w, h); }
    };
    const start = () => { if (!raf) { last = 0; raf = requestAnimationFrame(step); } };

    const offs = cards.map((c) => {
      const enter = () => { measure(); c.hot = true; start(); };
      const leave = () => { c.hot = false; start(); };
      c.el.addEventListener('pointerenter', enter);
      c.el.addEventListener('pointerleave', leave);
      return () => { c.el.removeEventListener('pointerenter', enter); c.el.removeEventListener('pointerleave', leave); };
    });

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); offs.forEach((f) => f()); };
  }, [selector]);

  return <canvas ref={ref} className="oshero-hall" aria-hidden="true" />;
}
