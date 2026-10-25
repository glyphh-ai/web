'use client';

import { useEffect, useRef } from 'react';
import { SEEDED, hash, makeCycle, learnedWv, answer, inks } from './ada-math';

/**
 * AdaStills — three stills of the hero's field, under the receipt card: the
 * same model at 3, 12 and 26 precedents, drawn once each with the same maths
 * as AdaField, so the strip shows Ada learning without a sentence of claim.
 * Each still carries its mono caption: the count and the weight Ada has
 * learned for the vertical axis at that count.
 */

const CW = 5, CH = 8, FONT = 6;
const COUNTS = [3, 12, 26];

function Still({ n }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const host = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    const mono = getComputedStyle(canvas).fontFamily || 'monospace';

    const draw = () => {
      const { rgba, purple } = inks(getComputedStyle(canvas));
      const r = host.getBoundingClientRect();
      const w = r.width, h = r.height, dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const cases = makeCycle(7919);
      const precs = cases.slice(0, Math.max(SEEDED, n));
      const wv = learnedWv(precs.length);
      const a = { x: 8, y: 8, w: w - 16, h: h - 16 };
      const cols = Math.ceil(w / CW), rows = Math.ceil(h / CH);
      ctx.font = FONT + 'px ' + mono;
      ctx.textBaseline = 'top';
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          if (hash(i, j) > 0.6) continue;
          const u = (i * CW + CW / 2 - a.x) / a.w, v = (j * CH + CH / 2 - a.y) / a.h;
          if (u < -0.02 || u > 1.02 || v < -0.02 || v > 1.02) continue;
          const res = answer(precs, u, v, wv);
          const c = (res.conf - 0.5) * 2;
          const s = 0.04 + 0.3 * c * c;
          if (s < 0.03) continue;
          ctx.fillStyle = s > 0.2 ? purple(Math.min(1, s * 2.2)) : rgba(s);
          ctx.fillText(res.label, i * CW, j * CH);
        }
      }
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.font = `600 11px ${mono}`;
      ctx.fillStyle = rgba(0.95);
      for (const p of precs) ctx.fillText(p.label, a.x + p.u * a.w, a.y + p.v * a.h);
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(host);
    const mo = new MutationObserver(draw);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => { ro.disconnect(); mo.disconnect(); };
  }, [n]);
  return <canvas ref={ref} className="still-canvas" aria-hidden="true" />;
}

export default function AdaStills() {
  return (
    <div className="stills" role="img" aria-label="The same model at 3, 12 and 26 precedents: the field sharpens as it learns">
      {COUNTS.map((n) => (
        <figure key={n} className="still">
          <div className="still-field"><Still n={n} /></div>
          <figcaption className="still-cap">
            <span>precedents {n}</span>
            <span>weights u 1.00 v {learnedWv(n).toFixed(2)}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
