'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroWaves — bursts of digital micro-particles behind the OS hero.
 *
 * Black. Over it, a faint static lattice of tiny dots — barely there. The
 * only thing that moves is the BURSTS: arcs of micro-particles that sweep
 * across the field and are gone. A burst is an expanding partial ring; the
 * lattice cells it crosses light up — granular, not every cell, and never
 * off the lattice, so it reads as digital, like characters lighting on a
 * grid — flare quickly, and fade behind the ring as it moves on. Several
 * bursts live at once, born at random places, so the field is mostly black
 * with a few sweeps of light passing through it at any moment.
 *
 * The cursor lights the cells near it, with a soft falloff.
 *
 * Under prefers-reduced-motion it draws one still frame. It pauses off screen.
 */

const CELL = 10;         // px — the lattice pitch
const LATTICE_ALPHA = 0.055;
const MAX_BURSTS = 9;
const SPAWN_EVERY = [0.28, 0.75]; // s — a new burst somewhere in this window
const REACH = 150;       // px — how far the cursor lights

const hash = (a, b) => {
  const s = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return s - Math.floor(s);
};

export default function HeroWaves() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    const host = canvas.parentElement;

    let raf = 0;
    let w = 0, h = 0, dpr = 1;
    let cols = 0, rows = 0;
    let visible = true;
    let bursts = [];
    let nextSpawn = 0;
    let levels = null;       // per-cell light this frame
    const cursor = { x: -1e4, y: -1e4, on: 0, target: 0 };

    // A burst: a partial ring that expands from a point, lighting the lattice
    // it crosses. Big slow ones and small quick ones.
    const burst = (t) => {
      const big = Math.random() < 0.45;
      const R = big ? 220 + Math.random() * 260 : 70 + Math.random() * 120;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        born: t,
        life: big ? 2.2 + Math.random() * 1.6 : 0.9 + Math.random() * 0.8,
        R,                                          // radius at the end of life
        a0: Math.random() * Math.PI * 2,            // where the arc starts …
        span: 0.5 + Math.random() * 1.6,            // … and how much of the circle it covers (rad)
        thick: 14 + Math.random() * 22,             // px — the lit band behind the ring's edge
        grain: 0.45 + Math.random() * 0.35,         // share of cells on the arc that light at all
        seed: Math.random() * 1000,
        peak: 0.7 + Math.random() * 0.3,
      };
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL) + 1;
      rows = Math.ceil(h / CELL) + 1;
      levels = new Float32Array(cols * rows);
    };

    const onMove = (e) => {
      const rect = host.getBoundingClientRect();
      cursor.x = e.clientX - rect.left;
      cursor.y = e.clientY - rect.top;
      cursor.target = 1;
    };
    const onLeave = () => { cursor.target = 0; };

    let last = 0;
    const draw = (t, animate) => {
      const dt = last ? Math.min(0.05, t - last) : 0;
      last = t;
      ctx.clearRect(0, 0, w, h);

      if (animate) {
        cursor.on += (cursor.target - cursor.on) * (1 - Math.exp(-dt * 4));
        // births: a new burst every so often, up to the cap
        if (t >= nextSpawn) {
          if (bursts.length < MAX_BURSTS) bursts.push(burst(t));
          nextSpawn = t + SPAWN_EVERY[0] + Math.random() * (SPAWN_EVERY[1] - SPAWN_EVERY[0]);
        }
      } else if (!bursts.length) {
        // the still frame: a handful of bursts caught mid-flight
        for (let i = 0; i < 6; i++) bursts.push(burst(t - Math.random() * 2));
      }

      // ── light the lattice: every burst paints the cells its ring is crossing ──
      levels.fill(0);
      const keep = [];
      for (const b of bursts) {
        const age = t - b.born;
        const u = age / b.life;
        if (u >= 1) continue;
        keep.push(b);
        // the ring eases outward and the whole burst fades in fast, out slow
        const r = b.R * (1 - (1 - u) * (1 - u));
        const env = Math.min(1, u * 8) * (1 - u) * b.peak;
        const lo = Math.max(0, r - b.thick), hi = r + 2;
        // only the cells inside the ring's bounding box are worth a look
        const c0 = Math.max(0, Math.floor((b.x - hi) / CELL)), c1 = Math.min(cols - 1, Math.ceil((b.x + hi) / CELL));
        const r0 = Math.max(0, Math.floor((b.y - hi) / CELL)), r1 = Math.min(rows - 1, Math.ceil((b.y + hi) / CELL));
        for (let j = r0; j <= r1; j++) {
          const dy = j * CELL - b.y;
          for (let i = c0; i <= c1; i++) {
            const dx = i * CELL - b.x;
            const d = Math.hypot(dx, dy);
            if (d < lo || d > hi) continue;
            // is this cell inside the arc's angular span?
            let ang = Math.atan2(dy, dx) - b.a0;
            ang -= Math.floor(ang / (Math.PI * 2)) * Math.PI * 2;
            if (ang > b.span) continue;
            // granular: some cells on the arc never light; the rest at their own strength
            const g = hash(i + b.seed, j);
            if (g > b.grain) continue;
            // brightest right behind the ring's edge, fading into the trail
            const trail = 1 - (r - d) / b.thick;
            // the ends of the arc feather out
            const edge = Math.min(1, ang / 0.25, (b.span - ang) / 0.25);
            const v = env * trail * trail * edge * (0.55 + 0.45 * hash(j + b.seed, i));
            const idx = j * cols + i;
            if (v > levels[idx]) levels[idx] = v;
          }
        }
      }
      bursts = keep;

      // ── draw: the lattice, lit where the bursts and the cursor say so ─────
      for (let j = 0; j < rows; j++) {
        const y = j * CELL;
        for (let i = 0; i < cols; i++) {
          const x = i * CELL;
          let lv = levels[j * cols + i];
          if (cursor.on > 0.01) {
            const d = Math.hypot(x - cursor.x, y - cursor.y);
            if (d < REACH) {
              const f = (1 - d / REACH) ** 2 * cursor.on * (0.4 + 0.6 * hash(i, j + 7));
              if (f > lv) lv = f;
            }
          }
          if (lv < 0.02) {
            // the resting lattice: barely there
            ctx.fillStyle = `rgba(175, 95, 255, ${LATTICE_ALPHA})`;
            ctx.fillRect(x, y, 1, 1);
            continue;
          }
          // a lit cell: purple rising toward lavender, 1 → 3 px
          const alpha = Math.min(1, 0.15 + 0.85 * lv);
          const gch = 95 + 80 * lv, rch = 175 + 30 * lv;
          ctx.fillStyle = `rgba(${rch | 0}, ${gch | 0}, 255, ${alpha.toFixed(3)})`;
          const size = lv > 0.7 ? 3 : lv > 0.3 ? 2 : 1;
          ctx.fillRect(x - ((size - 1) >> 1), y - ((size - 1) >> 1), size, size);
        }
      }
    };

    const start = performance.now();
    const tick = (now) => {
      if (visible) draw((now - start) / 1000, true);
      raf = requestAnimationFrame(tick);
    };

    resize();
    const ro = new ResizeObserver(() => { resize(); if (reduced) draw(4.2, false); });
    ro.observe(host);

    if (reduced) {
      draw(4.2, false);
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(canvas);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="oshero-waves" aria-hidden="true" />;
}
