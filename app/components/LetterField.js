'use client';

import { useEffect, useRef } from 'react';

/**
 * LetterField — the hero's letter hall, as a patch behind a tile.
 *
 * A sparse grid of tiny mono letters from the phrase, very dim at rest with a
 * slow flicker, that light up around the cursor while the pointer is over the
 * tile. The signature from the hero, propagated down the page. Cheap: a few
 * hundred cells, drawn at 12fps only while the tile is hovered or a flicker
 * is due; a still frame otherwise and under prefers-reduced-motion.
 */

const PHRASE = 'peaceloveandprosperityforallmankind';
const CW = 6, CH = 9, FONT = 7;
const DENSITY = 0.42;   // share of cells that carry a letter at all
const REACH = 140;      // px — how far the cursor lights

const hash = (a, b) => {
  const s = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return s - Math.floor(s);
};

export default function LetterField({ seed = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const host = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    const mono = getComputedStyle(canvas).fontFamily || 'monospace';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, cols = 0, rows = 0, raf = 0, last = 0, hot = false;
    const cur = { x: -1e4, y: -1e4, on: 0 };

    const measure = () => {
      const r = host.getBoundingClientRect();
      w = r.width; h = r.height;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CW); rows = Math.ceil(h / CH);
    };

    const paint = (t) => {
      ctx.clearRect(0, 0, w, h);
      ctx.font = FONT + 'px ' + mono;
      ctx.textBaseline = 'top';
      const tick = Math.floor(t * 2);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const g = hash(i + seed * 7.3, j);
          if (g > DENSITY) continue;
          // rest: dim; a slow flicker lifts a few; the cursor lifts its neighbourhood
          let v = 0.08 + 0.07 * hash(i + tick * 0.31, j + seed);
          if (hash(i + tick * 1.7, j * 0.9 + seed) > 0.985) v = 0.45;
          if (cur.on > 0.01) {
            const d = Math.hypot(i * CW - cur.x, j * CH - cur.y);
            if (d < REACH) v = Math.max(v, (1 - d / REACH) ** 1.6 * cur.on * (0.55 + 0.45 * hash(i, j + 3)));
          }
          const k = (i + j * 5 + seed) % PHRASE.length;
          const peace = k < 5;
          ctx.fillStyle = (peace ? 'rgba(198, 140, 255, ' : 'rgba(176, 102, 255, ') + Math.min(1, v).toFixed(3) + ')';
          ctx.fillText(PHRASE[k], i * CW, j * CH);
        }
      }
    };

    const tickFn = (now) => {
      const t = now / 1000;
      // ease the cursor's presence; keep drawing while it's lit or fading
      cur.on += ((hot ? 1 : 0) - cur.on) * 0.18;
      if (t - last >= 1 / 12) { last = t; paint(t); }
      if (hot || cur.on > 0.01) raf = requestAnimationFrame(tickFn);
      else { raf = 0; paint(t); }
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(tickFn); };

    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      cur.x = e.clientX - r.left; cur.y = e.clientY - r.top;
      hot = true; start();
    };
    const onLeave = () => { hot = false; start(); };

    measure();
    paint(0);
    const ro = new ResizeObserver(() => { measure(); paint(performance.now() / 1000); });
    ro.observe(host);
    if (reduced) return () => ro.disconnect();

    // the idle flicker: a frame every second or so, only while on screen
    let idle = 0;
    const io = new IntersectionObserver(([en]) => {
      clearInterval(idle);
      if (en.isIntersecting) idle = setInterval(() => { if (!raf) paint(performance.now() / 1000); }, 900);
    });
    io.observe(canvas);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf); clearInterval(idle); ro.disconnect(); io.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [seed]);

  return <canvas ref={ref} className="lf" aria-hidden="true" />;
}
