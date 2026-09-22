'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroAscii — the letter hall behind the OS hero.
 *
 * A grid of tiny mono letters, drawn like the openclaw.ai art but as a HALL:
 * the vanishing point sits on the mark, and nested FRAMES — the
 * cross-sections of a corridor — are born there small and flow outward,
 * accelerating the way things do in perspective, growing until they leave
 * the edges of the hero and are reborn at the centre. The hall's EDGE LINES
 * radiate from the vanishing point to the corners. Letters on a frame
 * flicker — the particle movement. The dark between the frames stays dark.
 * The copy sits in a box where the field thins to almost
 * nothing, so the words stay legible.
 *
 * Every cell is a letter from the phrase
 *   peace love and prosperity for all mankind
 * read along the rows; density becomes the letter's brightness. Drawn on a
 * canvas so each letter carries its own opacity, in the site's mono type.
 *
 * The cursor lights the letters near it. Under prefers-reduced-motion it
 * draws one still frame. It pauses off screen.
 */

const PHRASE = 'peaceloveandprosperityforallmankind';
const FONT = 7;      // px — tiny, so a letter reads as a particle first and a letter second
const CW = 5;        // px per letter column
const CH = 8;        // px per row
const FRAMES = 7;    // corridor cross-sections in flight at once
const FLOW = 0.028;  // hall lengths per second — a frame crosses the hero in ~36s
const FPS = 20;
const REACH = 150;   // px — how far the cursor lights the letters
// where the hall's edge lines run: the ratio |x| / |y| from the vanishing point
const EDGES = [0.42, 0.86, 1.45, 2.3];

const hash = (a, b) => {
  const s = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return s - Math.floor(s);
};

// Every cell's density this instant. Returns a flat list: i, j, value for
// each cell that shows at all.
function render(width, height, t, cursor) {
  const cols = Math.max(20, Math.floor(width / CW));
  const rows = Math.max(6, Math.floor(height / CH));
  const halfW = (cols * CW) / 2;
  // the vanishing point: centred, on the mark — about a third of the way down the hero
  const cx = halfW;
  const cy = rows * CH * 0.36;
  const halfH = Math.max(cy, rows * CH - cy);
  // the copy sits in a box under the mark; the field thins inside it so the words stay legible
  const BOX_W = 420, BOX_TOP = -70, BOX_BOTTOM = 400;
  const flow = t * FLOW;
  // the frames this instant: how far along the hall (0 far … 1 near), eased for perspective
  const frames = [];
  for (let k = 0; k < FRAMES; k++) {
    const s = (k / FRAMES + flow) % 1;
    frames.push({ size: Math.pow(s, 1.7), s });
  }
  const tick = Math.floor(t * 3);     // the flicker clock

  const cells = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const u = i * CW + CW / 2 - cx;                    // px from the centre line
      const v = j * CH + CH / 2 - cy;                    // px below the vanishing point (< 0 above)
      // the frame coordinate: how far out this cell is on the corridor's cross-section, 0 … 1
      const nx = Math.abs(u) / halfW;
      const ny = Math.abs(v) / halfH;
      const m = Math.max(nx, ny);
      let val = 0;

      // the frames: a band around each cross-section, sharp outside, trailing inward
      for (const f of frames) {
        const wdt = 0.012 + 0.035 * f.size;              // near frames are thicker
        const dd = (m - f.size) / wdt;
        if (dd < -3 || dd > 2) continue;
        const band = dd > 0 ? Math.exp(-dd * dd * 2.4) : Math.exp(-dd * dd * 0.5);
        // faint far away, bright near; gone before it pops off the edge
        const life = Math.min(1, f.s * 5) * Math.min(1, (1 - f.s) * 6);
        // the flicker: letters on a frame come and go on a 3Hz clock
        const flick = 0.55 + 0.45 * hash(i + tick * 0.37, j + tick * 0.11);
        val += band * (0.22 + 0.78 * f.size) * life * flick;
      }

      // the hall's edge lines, radiating from the vanishing point to the corners
      const ratio = Math.abs(u) / (Math.abs(v) + 1);
      for (const e of EDGES) {
        const dd = (ratio - e) / (0.035 * e);
        if (dd < -2.5 || dd > 2.5) continue;
        val += 0.28 * Math.exp(-dd * dd) * Math.min(1, m * 2.5);
      }

      // grain: some cells thin out, some thicken
      val *= 0.7 + 0.6 * hash(i, j);

      // the copy's box: the field fades to almost nothing inside it, softly at the edges
      const inX = Math.max(0, Math.min(1, (Math.abs(u) - BOX_W) / 120 + 1));
      const inY = Math.max(0, Math.min(1, Math.max((BOX_TOP - v) / 60, (v - BOX_BOTTOM) / 60) + 1));
      const outside = Math.max(inX, inY);            // 0 deep inside the box … 1 outside it
      val *= 0.12 + 0.88 * outside;

      // the cursor: letters near it light up, with a soft falloff and their own grain
      if (cursor.on > 0.01) {
        const d = Math.hypot(i * CW + CW / 2 - cursor.x, j * CH + CH / 2 - cursor.y);
        if (d < REACH) {
          const f = (1 - d / REACH) ** 2 * cursor.on * (0.35 + 0.65 * hash(i + 11, j + tick * 0.2));
          if (f > val) val = f;
        }
      }
      // nothing between the frames: the dark stays dark
      if (val >= 0.07) cells.push(i, j, Math.min(1, val));
    }
  }
  return cells;
}

export default function HeroAscii() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const host = canvas.parentElement;
    const hero = host.parentElement;   // the whole hero, so the cursor effect follows the pointer over the copy too
    const ctx = canvas.getContext('2d');
    const mono = getComputedStyle(canvas).fontFamily || 'monospace';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, raf = 0, last = -1, visible = true;
    // the cursor, in the art's own coordinates: where it is, where the field thinks it is (eased), how present
    const cursor = { tx: -1e4, ty: -1e4, x: -1e4, y: -1e4, on: 0, target: 0 };

    const measure = () => {
      const rect = host.getBoundingClientRect();
      w = rect.width; h = rect.height;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // draw every showing cell as its letter, at the density's opacity
    const paint = (t) => {
      const cells = render(w, h, t, cursor);
      ctx.clearRect(0, 0, w, h);
      ctx.font = FONT + 'px ' + mono;
      ctx.textBaseline = 'top';
      for (let n = 0; n < cells.length; n += 3) {
        const i = cells[n], j = cells[n + 1], val = cells[n + 2];
        const k = (i + j * 7) % PHRASE.length;
        const ch = PHRASE[k];
        // "peace" — the first five letters of the phrase — burns a shade brighter and lighter
        const peace = k < 5;
        const alpha = peace ? Math.min(1, 0.22 + 1.1 * val) : 0.12 + 0.88 * val;
        ctx.fillStyle = (peace ? 'rgba(196, 140, 255, ' : 'rgba(175, 95, 255, ') + alpha.toFixed(3) + ')';
        ctx.fillText(ch, i * CW, j * CH + 1);
      }
    };

    const onMove = (e) => {
      const rect = host.getBoundingClientRect();
      cursor.tx = e.clientX - rect.left;
      cursor.ty = e.clientY - rect.top;
      cursor.target = 1;
    };
    const onLeave = () => { cursor.target = 0; };

    const start = performance.now();
    measure();
    const ro = new ResizeObserver(() => { measure(); paint(reduced ? 4.2 : (performance.now() - start) / 1000); });
    ro.observe(host);

    if (reduced) {
      paint(4.2);
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(canvas);
    const tick = (now) => {
      const t = (now - start) / 1000;
      if (visible && t - last >= 1 / FPS) {
        // ease the cursor so the light follows the pointer rather than snapping
        if (cursor.on < 0.02 && cursor.target > 0) { cursor.x = cursor.tx; cursor.y = cursor.ty; }
        cursor.x += (cursor.tx - cursor.x) * 0.35;
        cursor.y += (cursor.ty - cursor.y) * 0.35;
        cursor.on += (cursor.target - cursor.on) * 0.15;
        last = t; paint(t);
      }
      raf = requestAnimationFrame(tick);
    };
    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="oshero-ascii" aria-hidden="true" />;
}
