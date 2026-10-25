'use client';

import { useEffect, useRef } from 'react';
import { K, UNSURE, SEEDED, hash, truth, makeCycle, learnedWv, answer, inks } from './ada-math';

/**
 * AdaField — the home page's animation: Ada as a learning classifier, drawn
 * in the letter-field style of LetterField (tiny mono letters on a canvas,
 * each with its own opacity), in the page's own text colour.
 *
 * Cases arrive one by one as a "?". The first few are graded at once and
 * recorded: each becomes a precedent, an x or an o. After that each new case
 * is answered first: the nearest precedents vote (dotted lines), Ada shows its
 * probability, and when it is unsure it asks instead. Then the case is graded
 * and recorded too. Behind it all, the field of letters is what Ada would
 * answer at every point: dark where it is unsure, brighter where it is sure.
 * It sharpens as precedents accumulate and as Ada learns its weights. After a
 * few dozen cases it starts again.
 *
 * THE HERO IS THE FIELD (his order, 2026-10-25: "the entire hero have the
 * effect"): with `fill`, the canvas is the whole hero behind the words. The
 * element marked `data-clear` inside the host (the copy column) is a clear
 * zone: the letters under it fade to a whisper, no purple glows there, and
 * no case, tag or precedent is ever placed on the words. The caption row
 * sits on the hero's base line, aligned to the frame's inner edges.
 *
 * THE POINTER IS A CASE (`interactive`): wherever it moves over the field,
 * the nearest precedents send it their votes and a tag reads what Ada would
 * answer there; a click (a tap on a phone) grades it where it stands and it
 * joins the precedents. The numbers come from the same answer() the field is
 * drawn with, so the picture never lies.
 *
 * Under prefers-reduced-motion it draws one still frame of a model well
 * along. It pauses off screen. The field is drawn to its own canvas only
 * when it changes.
 */

const FPS = 24;
const CAPTION_H = 26;               // px kept for the caption under the field
const FEATHER = 150;                // px over which the clear zone's mask fades back in
const MASK_IN = 0.22;               // the letters' strength inside the clear zone

// The phases of one case, in seconds.
const T = { arrive: 1.0, vote: 0.8, answer: 1.3, ask: 1.4, record: 0.8, reset: 1.6 };

export default function AdaField({ fill = false, interactive = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const host = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    const style = getComputedStyle(canvas);
    const mono = style.fontFamily || 'monospace';
    // the two colours follow the theme: re-read when it flips
    let { rgba, purple } = inks(style);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    const field = document.createElement('canvas');
    const fctx = field.getContext('2d');
    let w = 0, h = 0, dpr = 1, cols = 0, rows = 0, CW = 6, CH = 9, FONT = 7;
    let shown = new Float32Array(0), target = new Float32Array(0), letters = [], mask = new Float32Array(0);
    let easing = true;
    let clear = null;                 // the clear zone, in canvas px, or null

    // the simulation
    let cycle = 0, cases = makeCycle(1), precs = [], idx = 0;
    let phase = 'arrive', since = 0, wv = 1, fieldWv = 1, current = null, ans = null, origin = null, ripple = null;
    // the visitor's own case
    let hover = null, hoverAns = null, hoverFade = 0;

    const inset = () => (fill ? (w >= 1200 ? (w - 1200) / 2 + 48 : w > 720 ? 48 : 20) : 10);
    // where cases and precedents live: inside the frame's inner edges, under the nav
    const area = () => ({ x: inset(), y: fill ? 84 : 8, w: Math.max(40, w - 2 * inset()), h: Math.max(40, h - CAPTION_H - (fill ? 28 : 14) - (fill ? 84 : 8)) });
    const toPx = (u, v) => { const a = area(); return [a.x + u * a.w, a.y + v * a.h]; };
    const toUv = (x, y) => { const a = area(); return [(x - a.x) / a.w, (y - a.y) / a.h]; };

    // the clear zone: the copy column's box, with room around it
    const measureClear = () => {
      const el = fill ? host.querySelector('[data-clear]') : null;
      if (!el) { clear = null; return; }
      const hr = host.getBoundingClientRect(), r = el.getBoundingClientRect();
      clear = { x: r.left - hr.left - 48, y: r.top - hr.top - 36, w: r.width + 96, h: r.height + 72 };
    };
    const inClear = (x, y, pad = 0) => !!clear && x > clear.x - pad && x < clear.x + clear.w + pad && y > clear.y - pad && y < clear.y + clear.h + pad;
    // how much of the field shows at (x, y): a whisper inside the zone, full strength FEATHER px out
    const maskAt = (x, y) => {
      if (!clear) return 1;
      const dx = Math.max(clear.x - x, x - (clear.x + clear.w), 0);
      const dy = Math.max(clear.y - y, y - (clear.y + clear.h), 0);
      const d = Math.hypot(dx, dy);
      return MASK_IN + (1 - MASK_IN) * Math.min(1, d / FEATHER);
    };
    // a case that would land on the words moves to the band above or below them
    const keepOut = (c) => {
      if (!clear) return c;
      const [x, y] = toPx(c.u, c.v);
      if (!inClear(x, y, 24)) return c;
      const a = area();
      const top = (clear.y - 30 - a.y) / a.h, bottom = (clear.y + clear.h + 30 - a.y) / a.h;
      const v = c.v < 0.5 ? Math.max(0.04, c.v * Math.max(0.05, top)) : Math.min(0.96, bottom + (c.v - 0.5) * 2 * Math.max(0.05, 1 - bottom));
      return { ...c, v, label: truth(c.u, v) };
    };

    const measure = () => {
      const r = host.getBoundingClientRect();
      w = r.width; h = r.height;
      const phone = w < 760;
      CW = phone ? 7 : 6; CH = phone ? 10 : 9; FONT = phone ? 8 : 7;
      dpr = Math.min(fill ? (phone ? 1.25 : 1.5) : 2, window.devicePixelRatio || 1);
      for (const c of [canvas, field]) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CW); rows = Math.ceil((h - CAPTION_H) / CH);
      shown = new Float32Array(cols * rows);
      target = new Float32Array(cols * rows);
      mask = new Float32Array(cols * rows);
      letters = new Array(cols * rows).fill('');
      measureClear();
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) mask[j * cols + i] = maskAt(i * CW + CW / 2, j * CH + CH / 2);
      cases = cases.map(keepOut);
      precs = precs.map(keepOut);
      retarget();
    };

    // what the field should show now: Ada's confidence at each cell
    const retarget = () => {
      fieldWv = wv;
      const a = area();
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = j * cols + i;
          if (hash(i, j) > 0.6 || precs.length === 0) { target[k] = 0; continue; }
          const u = (i * CW + CW / 2 - a.x) / a.w, v = (j * CH + CH / 2 - a.y) / a.h;
          // the letters run edge to edge in the hero; in the box they stop at its margin
          const slack = fill ? 0.6 : 0.02;
          if (u < -slack || u > 1 + slack || v < -slack || v > 1 + slack) { target[k] = 0; continue; }
          const r = answer(precs, u, v, wv);
          const c = (r.conf - 0.5) * 2;                    // 0 unsure … 1 sure
          target[k] = (0.04 + 0.3 * c * c) * mask[k];
          letters[k] = r.label;
        }
      }
      easing = true;
    };

    const drawField = () => {
      let moving = false;
      fctx.clearRect(0, 0, w, h);
      fctx.font = FONT + 'px ' + mono;
      fctx.textBaseline = 'top';
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = j * cols + i;
          const d = target[k] - shown[k];
          if (Math.abs(d) > 0.004) { shown[k] += d * 0.18; moving = true; } else shown[k] = target[k];
          if (shown[k] < 0.03 || !letters[k]) continue;
          // where Ada is sure, the letters glow purple; never under the words
          fctx.fillStyle = shown[k] > 0.2 && mask[k] > 0.98 ? purple(Math.min(1, shown[k] * 2.2)) : rgba(shown[k]);
          fctx.fillText(letters[k], i * CW, j * CH);
        }
      }
      easing = moving;
    };

    const record = (c) => {
      precs.push({ u: c.u, v: c.v, label: c.label });
      ripple = { u: c.u, v: c.v, t: 0 };
      retarget();
    };

    const nextCase = () => {
      idx += 1;
      if (idx >= cases.length) { phase = 'reset'; since = 0; current = null; return; }
      current = cases[idx];
      const edge = Math.floor(hash(idx, cycle) * 4);
      origin = [[-0.05, current.v], [1.05, current.v], [current.u, -0.08], [current.u, 1.08]][edge];
      ans = null; phase = 'arrive'; since = 0;
    };

    const startCycle = () => {
      cycle += 1;
      cases = makeCycle(cycle * 7919).map(keepOut);
      precs = []; wv = 1; idx = -1; ripple = null;
      for (let n = 0; n < SEEDED; n++) precs.push(cases[n]);
      idx = SEEDED - 1;
      retarget();
      nextCase();
    };

    const step = (dt) => {
      since += dt;
      if (ripple) { ripple.t += dt; if (ripple.t > 0.9) ripple = null; }
      hoverFade += ((hover ? 1 : 0) - hoverFade) * Math.min(1, dt * 8);
      // the weights ease toward what the precedents teach
      const goal = learnedWv(precs.length);
      if (Math.abs(goal - wv) > 0.005) {
        wv += (goal - wv) * Math.min(1, dt * 1.5);
        if (Math.abs(wv - fieldWv) > 0.02) retarget();
      }
      if (phase === 'arrive' && since >= T.arrive) {
        // the first cases are graded at once; after that Ada answers first
        if (precs.length < 5) { phase = 'record'; record(current); }
        else { phase = 'vote'; ans = answer(precs, current.u, current.v, wv); }
        since = 0;
      } else if (phase === 'vote' && since >= T.vote) {
        phase = ans.conf < UNSURE ? 'ask' : 'answer'; since = 0;
      } else if ((phase === 'answer' && since >= T.answer) || (phase === 'ask' && since >= T.ask)) {
        phase = 'record'; since = 0; record(current);
      } else if (phase === 'record' && since >= T.record) {
        nextCase();
      } else if (phase === 'reset' && since >= T.reset) {
        startCycle();
      }
    };

    const caption = () => {
      const n = precs.length;
      let event = '';
      if (hover && hoverAns) event = hoverAns.conf < UNSURE ? `your case: ${hoverAns.label} ${hoverAns.conf.toFixed(2)} · asks` : `your case: ${hoverAns.label} ${hoverAns.conf.toFixed(2)}`;
      else if (phase === 'reset') event = 'starting again';
      else if (phase === 'arrive') event = `item ${idx + 1} arrives`;
      else if (phase === 'vote') event = `the nearest ${Math.min(K, n)} precedents vote`;
      else if (phase === 'answer') event = `answers ${ans.label}, p ${ans.conf.toFixed(2)}`;
      else if (phase === 'ask') event = `unsure (${ans.label} ${ans.conf.toFixed(2)}): asks`;
      else if (phase === 'record') event = `graded ${current.label}: a precedent`;
      return [`precedents ${n}`, event, `weights  u 1.00  v ${wv.toFixed(2)}`];
    };

    // the votes, the mark and the tag for one case at (x, y)
    const drawCase = (x, y, a, mark, alpha, asksColour) => {
      ctx.globalAlpha = alpha;
      if (a) {
        ctx.font = `${FONT + 2}px ${mono}`;
        for (const { p } of a.near) {
          const [px, py] = toPx(p.u, p.v);
          const len = Math.hypot(px - x, py - y);
          const steps = Math.floor(len / 7);
          for (let s = 1; s < steps; s++) {
            const f = (s * 7) / len;
            const lx = x + (px - x) * f, ly = y + (py - y) * f;
            ctx.fillStyle = purple(0.85 * maskAt(lx, ly));
            ctx.fillText('·', lx, ly);
          }
        }
      }
      ctx.font = `700 15px ${mono}`;
      ctx.fillStyle = rgba(1);
      ctx.fillText(mark, x, y);
      if (a) {
        const asks = a.conf < UNSURE;
        const tag = asks ? `${a.label} ${a.conf.toFixed(2)} · asks` : `${a.label} ${a.conf.toFixed(2)}`;
        ctx.font = `11px ${mono}`;
        const bw = ctx.measureText(tag).width + 10;
        // the tag sits beside the case; it flips so it never crosses the words or the edge
        let right = x < w - bw - 24, bx = right ? x + 12 : x - 12 - bw, by = y - 9;
        if (inClear(bx, by) || inClear(bx + bw, by + 18)) { right = !right; bx = right ? x + 12 : x - 12 - bw; }
        if (inClear(bx, by) || inClear(bx + bw, by + 18)) { bx = x - bw / 2; by = y < h / 2 ? y + 14 : y - 32; }
        ctx.textAlign = 'left';
        ctx.strokeStyle = asks ? rgba(0.7) : asksColour || purple(0.95);
        ctx.lineWidth = 1;
        ctx.strokeRect(Math.round(bx) + 0.5, Math.round(by) + 0.5, Math.round(bw), 18);
        ctx.fillStyle = rgba(0.95);
        ctx.fillText(tag, bx + 5, by + 9);
        ctx.textAlign = 'center';
      }
      ctx.globalAlpha = 1;
    };

    const paint = () => {
      if (easing) drawField();
      ctx.clearRect(0, 0, w, h);
      const fade = phase === 'reset' ? Math.max(0, 1 - since / (T.reset * 0.7)) : 1;
      ctx.globalAlpha = fade;
      ctx.drawImage(field, 0, 0, w, h);
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      // the precedents
      ctx.font = `600 13px ${mono}`;
      for (const p of precs) {
        const [x, y] = toPx(p.u, p.v);
        ctx.fillStyle = rgba(0.95 * maskAt(x, y));
        ctx.fillText(p.label, x, y);
      }

      // a new precedent's ripple, in dots
      if (ripple) {
        const [x, y] = toPx(ripple.u, ripple.v);
        const rad = 6 + ripple.t * 34;
        ctx.font = `${FONT + 2}px ${mono}`;
        ctx.fillStyle = purple(0.95 * (1 - ripple.t / 0.9));
        const nDots = 18;
        for (let n = 0; n < nDots; n++) {
          const a = (n / nDots) * Math.PI * 2;
          const dx = x + Math.cos(a) * rad, dy = y + Math.sin(a) * rad;
          if (!inClear(dx, dy)) ctx.fillText('·', dx, dy);
        }
      }

      if (current && phase !== 'reset') {
        const [tx, ty] = toPx(current.u, current.v);
        let x = tx, y = ty;
        if (phase === 'arrive') {
          const e = 1 - (1 - Math.min(1, since / T.arrive)) ** 3;
          const [ox, oy] = toPx(origin[0], origin[1]);
          x = ox + (tx - ox) * e; y = oy + (ty - oy) * e;
          // the trail behind it
          ctx.font = `${FONT + 2}px ${mono}`;
          for (let n = 1; n <= 6; n++) {
            const e2 = Math.max(0, e - n * 0.035);
            const sx = ox + (tx - ox) * e2, sy = oy + (ty - oy) * e2;
            ctx.fillStyle = rgba((0.5 - n * 0.07) * maskAt(sx, sy));
            ctx.fillText('·', sx, sy);
          }
        }
        const voting = ans && (phase === 'vote' || phase === 'answer' || phase === 'ask');
        if (voting && phase === 'vote') {
          // the votes grow out toward the case
          const grow = Math.min(1, since / (T.vote * 0.8));
          ctx.font = `${FONT + 2}px ${mono}`;
          for (const { p } of ans.near) {
            const [px, py] = toPx(p.u, p.v);
            const full = Math.hypot(px - x, py - y), len = full * grow;
            const steps = Math.floor(len / 7);
            for (let s = 1; s < steps; s++) {
              const f = (s * 7) / full;
              ctx.fillStyle = purple(0.85);
              ctx.fillText('·', x + (px - x) * f, y + (py - y) * f);
            }
          }
          ctx.font = `700 15px ${mono}`;
          ctx.fillStyle = rgba(1);
          ctx.fillText('?', x, y);
        } else {
          drawCase(x, y, phase === 'answer' || phase === 'ask' ? ans : null, phase === 'record' ? current.label : '?', 1);
        }
      }

      // the visitor's own case
      if (hoverFade > 0.02 && hover && hoverAns) drawCase(hover.x, hover.y, hoverAns, '?', hoverFade, rgba(0.9));

      // the caption on the base line
      ctx.globalAlpha = 1;
      const [left, mid, rightText] = caption();
      const cy = h - CAPTION_H / 2 - (fill ? 6 : 0);
      const ix = inset();
      ctx.font = `11px ${mono}`;
      ctx.fillStyle = rgba(0.72);
      ctx.textAlign = 'left'; ctx.fillText(left, ix, cy);
      if (w > 640) { ctx.textAlign = 'right'; ctx.fillText(rightText, w - ix, cy); }
      ctx.textAlign = w > 640 ? 'center' : 'right'; ctx.fillStyle = rgba(0.95); ctx.fillText(mid, w > 640 ? w / 2 : w - ix, cy);
      ctx.textAlign = 'start';
    };

    // the pointer is a case
    const pointAt = (e) => {
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const a = area();
      if (x < a.x || x > a.x + a.w || y < a.y || y > a.y + a.h || inClear(x, y, 8)) return null;
      return { x, y };
    };
    const onMove = (e) => {
      if (coarse) return;
      hover = pointAt(e);
      if (hover && precs.length) { const [u, v] = toUv(hover.x, hover.y); hoverAns = answer(precs, u, v, wv); } else hoverAns = null;
      if (reduced) paint();
    };
    const onLeave = () => { hover = null; hoverAns = null; if (reduced) paint(); };
    const onClick = (e) => {
      if (e.target.closest('a, button')) return;
      const at = pointAt(e);
      if (!at) return;
      const [u, v] = toUv(at.x, at.y);
      record({ u, v, label: truth(u, v) });
      hover = null; hoverAns = null;
      if (reduced) { for (let n = 0; n < 60 && easing; n++) drawField(); paint(); }
    };

    measure();
    startCycle();
    const ro = new ResizeObserver(() => { measure(); paint(); });
    ro.observe(host);
    // the theme toggle flips the page's colours under the canvas: read them again and redraw
    const mo = new MutationObserver(() => {
      ({ rgba, purple } = inks(getComputedStyle(canvas)));
      easing = true;
      for (let n = 0; n < 60 && easing; n++) drawField();
      paint();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    if (interactive) {
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);
      host.addEventListener('click', onClick);
    }
    const off = () => {
      ro.disconnect();
      mo.disconnect();
      if (interactive) {
        host.removeEventListener('pointermove', onMove);
        host.removeEventListener('pointerleave', onLeave);
        host.removeEventListener('click', onClick);
      }
    };

    if (reduced) {
      // one still frame: a model well along, answering a case
      for (let n = SEEDED; n < 20; n++) precs.push(cases[n]);
      wv = learnedWv(precs.length);
      idx = 20; current = cases[idx]; ans = answer(precs, current.u, current.v, wv); phase = 'answer';
      retarget();
      for (let n = 0; n < 60 && easing; n++) drawField();
      paint();
      return off;
    }

    let raf = 0, last = performance.now(), acc = 0, visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; last = performance.now(); });
    io.observe(canvas);
    const tick = (now) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (visible) {
        acc += dt;
        if (acc >= 1 / FPS) { step(acc); acc = 0; paint(); }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); off(); };
  }, [fill, interactive]);

  return <canvas ref={ref} className="mh-field-canvas" aria-hidden="true" />;
}
