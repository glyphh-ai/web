'use client';

import { useEffect, useRef } from 'react';

/**
 * AdaField — the home page's animation: Ada as a learning classifier, drawn
 * in the letter-field style of HeroAscii and LetterField (tiny mono letters
 * on a canvas, each with its own opacity), in the page's own text colour.
 *
 * Cases arrive one by one as a "?". The first few are graded at once and
 * recorded: each becomes a precedent, an x or an o. After that each new case
 * is answered first: the nearest precedents vote (dotted lines), Ada shows its
 * probability, and when it is unsure it asks instead. Then the case is graded
 * and recorded too. Behind it all, the field of letters is what Ada would
 * answer at every point: dark where it is unsure, brighter where it is sure.
 * It sharpens as precedents accumulate and as Ada learns its weights (the
 * vertical difference between cases turns out to matter less, so its
 * neighbourhoods stretch). After a few dozen cases it starts again.
 *
 * Under prefers-reduced-motion it draws one still frame. It pauses off
 * screen. The field is drawn to its own canvas only when it changes.
 */

const CW = 6, CH = 9, FONT = 7;     // the field's letter grid, as LetterField
const FPS = 24;
const K = 5;                        // precedents that vote
const SIGMA = 0.2;                  // how far a precedent's vote reaches
const UNSURE = 0.68;                // below this, Ada asks
const SEEDED = 3;                   // precedents a cycle starts with
const CASES = 26;                   // cases per cycle
const CAPTION_H = 26;               // px kept for the caption under the field

// The phases of one case, in seconds.
const T = { arrive: 1.0, vote: 0.8, answer: 1.3, ask: 1.4, record: 0.8, reset: 1.6 };

const hash = (a, b) => {
  const s = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return s - Math.floor(s);
};

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// The world's answer, which Ada never sees: mostly the horizontal position.
const truth = (u, v) => (u < 0.5 + 0.11 * Math.sin(v * 5.2) ? 'x' : 'o');

function makeCycle(seed) {
  const r = rng(seed);
  const cases = [];
  for (let n = 0; n < CASES; n++) {
    // the seeded precedents sit one on each side, then anywhere
    const u = n < SEEDED ? [0.22, 0.78, 0.4][n] + (r() - 0.5) * 0.1 : 0.06 + r() * 0.88;
    const v = 0.1 + r() * 0.8;
    cases.push({ u, v, label: truth(u, v) });
  }
  return cases;
}

// The weight Ada has learned for the vertical difference, from how many precedents it has.
const learnedWv = (n) => 1 - 0.72 * Math.min(1, Math.max(0, (n - 4) / 14));

// Ada's answer at (u, v): the K nearest precedents by weighted distance, each
// voting by closeness; a Laplace prior keeps a thin vote near even.
function answer(precs, u, v, wv) {
  const near = precs
    .map((p) => ({ p, d: Math.hypot(p.u - u, (p.v - v) * wv) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, K);
  let sx = 0, s = 0;
  for (const { p, d } of near) {
    const w = Math.exp(-((d / SIGMA) ** 2));
    s += w;
    if (p.label === 'x') sx += w;
  }
  const px = (sx + 1) / (s + 2);
  return { px, label: px >= 0.5 ? 'x' : 'o', conf: Math.max(px, 1 - px), near };
}

export default function AdaField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const host = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    const style = getComputedStyle(canvas);
    const mono = style.fontFamily || 'monospace';
    const ink = (style.color.match(/\d+(\.\d+)?/g) || ['255', '255', '255']).slice(0, 3).join(', ');
    const rgba = (a) => `rgba(${ink}, ${Math.max(0, Math.min(1, a)).toFixed(3)})`;
    // The flare: the site's purple on what Ada is sure of, its votes and each new precedent.
    const hex = (style.getPropertyValue('--accent').trim().match(/^#([0-9a-f]{6})$/i) || [, 'b066ff'])[1];
    const flare = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(', ');
    const purple = (a) => `rgba(${flare}, ${Math.max(0, Math.min(1, a)).toFixed(3)})`;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const field = document.createElement('canvas');
    const fctx = field.getContext('2d');
    let w = 0, h = 0, dpr = 1, cols = 0, rows = 0;
    let shown = new Float32Array(0), target = new Float32Array(0), letters = [];
    let easing = true;

    // the simulation
    let cycle = 0, cases = makeCycle(1), precs = [], idx = 0;
    let phase = 'arrive', since = 0, wv = 1, fieldWv = 1, current = null, ans = null, origin = null, ripple = null;

    const area = () => ({ x: 10, y: 8, w: Math.max(40, w - 20), h: Math.max(40, h - CAPTION_H - 14) });
    const toPx = (u, v) => { const a = area(); return [a.x + u * a.w, a.y + v * a.h]; };

    const measure = () => {
      const r = host.getBoundingClientRect();
      w = r.width; h = r.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      for (const c of [canvas, field]) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CW); rows = Math.ceil((h - CAPTION_H) / CH);
      shown = new Float32Array(cols * rows);
      target = new Float32Array(cols * rows);
      letters = new Array(cols * rows).fill('');
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
          if (u < -0.02 || u > 1.02 || v < -0.02 || v > 1.02) { target[k] = 0; continue; }
          const r = answer(precs, u, v, wv);
          const c = (r.conf - 0.5) * 2;                    // 0 unsure … 1 sure
          target[k] = 0.04 + 0.3 * c * c;
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
          // where Ada is sure, the letters glow purple
          fctx.fillStyle = shown[k] > 0.2 ? purple(Math.min(1, shown[k] * 2.2)) : rgba(shown[k]);
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
      cases = makeCycle(cycle * 7919);
      precs = []; wv = 1; idx = -1; ripple = null;
      for (let n = 0; n < SEEDED; n++) precs.push(cases[n]);
      idx = SEEDED - 1;
      retarget();
      nextCase();
    };

    const step = (dt) => {
      since += dt;
      if (ripple) { ripple.t += dt; if (ripple.t > 0.9) ripple = null; }
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
      if (phase === 'reset') event = 'starting again';
      else if (phase === 'arrive') event = `item ${idx + 1} arrives`;
      else if (phase === 'vote') event = `the nearest ${Math.min(K, n)} precedents vote`;
      else if (phase === 'answer') event = `answers ${ans.label}, p ${ans.conf.toFixed(2)}`;
      else if (phase === 'ask') event = `unsure (${ans.label} ${ans.conf.toFixed(2)}): asks`;
      else if (phase === 'record') event = `graded ${current.label}: a precedent`;
      return [`precedents ${n}`, event, `weights  u 1.00  v ${wv.toFixed(2)}`];
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
        ctx.fillStyle = rgba(0.95);
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
          ctx.fillText('·', x + Math.cos(a) * rad, y + Math.sin(a) * rad);
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
            ctx.fillStyle = rgba(0.5 - n * 0.07);
            ctx.fillText('·', ox + (tx - ox) * e2, oy + (ty - oy) * e2);
          }
        }

        // the votes: a dotted line to each of the nearest precedents
        if (ans && (phase === 'vote' || phase === 'answer' || phase === 'ask')) {
          const grow = phase === 'vote' ? Math.min(1, since / (T.vote * 0.8)) : 1;
          ctx.font = `${FONT + 2}px ${mono}`;
          for (const { p } of ans.near) {
            const [px, py] = toPx(p.u, p.v);
            const len = Math.hypot(px - x, py - y) * grow;
            const steps = Math.floor(len / 7);
            for (let s = 1; s < steps; s++) {
              const f = (s * 7) / Math.hypot(px - x, py - y);
              ctx.fillStyle = purple(0.85);
              ctx.fillText('·', x + (px - x) * f, y + (py - y) * f);
            }
          }
        }

        // the case itself: a question until it is graded
        ctx.font = `700 15px ${mono}`;
        ctx.fillStyle = rgba(1);
        ctx.fillText(phase === 'record' ? current.label : '?', x, y);

        // the answer beside it
        if (ans && (phase === 'answer' || phase === 'ask')) {
          const tag = phase === 'ask' ? `${ans.label} ${ans.conf.toFixed(2)} · asks` : `${ans.label} ${ans.conf.toFixed(2)}`;
          ctx.font = `11px ${mono}`;
          const right = x < w - 120;
          ctx.textAlign = right ? 'left' : 'right';
          const bw = ctx.measureText(tag).width + 10;
          const bx = right ? x + 12 : x - 12 - bw;
          ctx.strokeStyle = phase === 'ask' ? rgba(0.7) : purple(0.95);
          ctx.lineWidth = 1;
          ctx.strokeRect(Math.round(bx) + 0.5, Math.round(y - 9) + 0.5, Math.round(bw), 18);
          ctx.fillStyle = rgba(0.95);
          ctx.fillText(tag, right ? bx + 5 : bx + bw - 5, y);
          ctx.textAlign = 'center';
        }
      }

      // the caption under the field
      ctx.globalAlpha = 1;
      const [left, mid, rightText] = caption();
      const cy = h - CAPTION_H / 2;
      ctx.font = `11px ${mono}`;
      ctx.fillStyle = rgba(0.72);
      ctx.textAlign = 'left'; ctx.fillText(left, 10, cy);
      ctx.textAlign = 'right'; ctx.fillText(rightText, w - 10, cy);
      ctx.textAlign = 'center'; ctx.fillStyle = rgba(0.95); ctx.fillText(mid, w / 2, cy);
      ctx.textAlign = 'start';
    };

    measure();
    startCycle();
    const ro = new ResizeObserver(() => { measure(); paint(); });
    ro.observe(host);

    if (reduced) {
      // one still frame: a model well along, answering a case
      for (let n = SEEDED; n < 20; n++) precs.push(cases[n]);
      wv = learnedWv(precs.length);
      idx = 20; current = cases[idx]; ans = answer(precs, current.u, current.v, wv); phase = 'answer';
      retarget();
      for (let n = 0; n < 60 && easing; n++) drawField();
      paint();
      return () => ro.disconnect();
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
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);

  return <canvas ref={ref} className="mh-field-canvas" aria-hidden="true" />;
}
