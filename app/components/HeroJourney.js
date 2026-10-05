'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroJourney — the hero's picture (his order, 2026-10-05: "remove all of
 * that and have a much simpler animation … just have the stars come down
 * and have the cat pointing up at the rocket as it goes by … I like the
 * last scene the mountains, cat, etc.").
 *
 * One still scene in the deck's hand — the path running to the rim of the
 * canyon, mountains on the horizon, the kid and the round pointy-eared cat
 * standing at the edge, seen from behind — and three small motions: the
 * stars drop into the sky, the rocket climbs straight up through them, and
 * the two of them point up at it each time it passes. 1px lines in the
 * text colour, nothing filled, one purple dot (the rocket's flame).
 * prefers-reduced-motion shows the scene with the stars in place.
 */

const H = 600;                      // the horizon, in the 1400 × 700 frame
const frac = (x) => x - Math.floor(x);
const hash = (i, k) => frac(Math.sin(i * 12.9898 + k * 78.233) * 43758.5453);
const STARS = Array.from({ length: 60 }, (_, i) => ({ x: 60 + hash(i, 8) * 1280, y: 40 + hash(i, 9) * 500, cross: hash(i, 10) > 0.6 }));
const MOUNTAINS = 'M-200 0L-60-70 60-30 200-120 330-40 450-90 600-10 700-60 820-140 960-50 1080-100 1200-20 1320-80 1460-30 1600 0';
const ease = (u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
const clamp = (u) => Math.max(0, Math.min(1, u));
const r1 = (n) => n.toFixed(1);

// the kid, from behind, on (0, 0): the round head with its curls, the shirt
// with its zigzag, shorts, short legs; `up` lifts the right arm to point
function kidPath(up) {
  const hx = 32 + 22 * up, hy = -44 - 124 * up;
  return (
    'M-6 -156q6-10 12 0q6-10 12 0M-16 -152q4-8 8-2M0 -104V-96' +
    'M-32 -96H32L38 -40H-38ZM-36 -62l9-10 9 10 9-10 9 10 9-10 9 10 9-10 9 10' +
    'M-38 -40H38V-18H-38ZM0 -40V-18M-14 -18V0h12M14 -18V0h12' +
    `M-32 -90L-40 -44M32 -90L${r1(hx)} ${r1(hy)}`
  );
}
// the cat beside him, sitting: a round body, a round head with two pointed
// ears, the tail curled; `up` lifts a paw to point too
function catPath(up) {
  const px = 26 + 10 * up, py = -30 - 46 * up;
  return (
    'M-19 -19a19 19 0 1 0 38 0a19 19 0 1 0 -38 0' +
    'M-14 -46a14 14 0 1 0 28 0a14 14 0 1 0 -28 0M-11 -55l-5-13 12 6M11 -55l5-13-12 6' +
    'M-19 -9q-22 6-18 -14' +
    `M14 -22L${r1(px)} ${r1(py)}`
  );
}

export default function HeroJourney() {
  const ref = useRef(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const sky = svg.querySelector('.hj-sky'), rocket = svg.querySelector('.hj-rocket');
    const kid = svg.querySelector('.hj-kid path'), cat = svg.querySelector('.hj-cat path');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const frame = (t) => {
      svg.dataset.t = t.toFixed(2);
      // the stars come down over the first seconds
      const drop = -700 * (1 - ease(clamp((t - 0.6) / 3.2)));
      sky.setAttribute('transform', `translate(0 ${r1(drop)})`);
      // the rocket climbs straight up every twelve seconds, from the fourth
      const period = 12, since = t - 4;
      let point = 0;
      if (since >= 0) {
        const u = (since % period) / period;
        if (u < 0.5) {
          const k = u / 0.5;
          rocket.setAttribute('visibility', 'visible');
          rocket.setAttribute('transform', `translate(${r1(1150 + 90 * k)} ${r1(760 - 920 * k)}) rotate(-78)`);
          point = clamp(k / 0.2) * (1 - clamp((k - 0.8) / 0.2));   // the arms rise as it appears, drop as it leaves
        } else rocket.setAttribute('visibility', 'hidden');
      } else rocket.setAttribute('visibility', 'hidden');
      kid.setAttribute('d', kidPath(ease(point)));
      cat.setAttribute('d', catPath(ease(point)));
    };

    if (reduced) { frame(5.4); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now) => { frame((now - t0) / 1000); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg ref={ref} className="hj" viewBox="0 0 1400 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* the sky: the stars, and the rocket that climbs through them */}
        <g className="hj-sky" transform="translate(0 -700)">
          {STARS.map((s, i) => s.cross
            ? <path key={i} d={`M${(s.x - 5).toFixed(0)} ${s.y.toFixed(0)}h10M${s.x.toFixed(0)} ${(s.y - 5).toFixed(0)}v10`} />
            : <circle key={i} cx={s.x.toFixed(0)} cy={s.y.toFixed(0)} r="1.6" fill="currentColor" stroke="none" />)}
        </g>
        <g className="hj-rocket" visibility="hidden">
          <g className="hj-putter"><path d="M-16-4l-22-9M-18 0h-30M-16 4l-22 9" /></g>
          <path d="M0 0C10-9 30-9 44 0C30 9 10 9 0 0ZM10-4l-9-10h8M10 4l-9 10h8" />
          <circle cx="26" cy="0" r="3" />
          <circle cx="-8" cy="0" r="4" className="hj-dot" stroke="none" />
        </g>

        {/* the mountains on the horizon, the horizon, the path to the rim, the rim */}
        <g transform={`translate(0 ${H})`}><path d={MOUNTAINS} /></g>
        <path d={`M0 ${H}H1400`} />
        <path d={`M560 ${H + 62}L300 700M840 ${H + 62}L1100 700`} />
        <path d={`M-100 ${H + 62}q500-16 800-8t700 10`} />

        {/* the two of them at the edge, seen from behind */}
        <g className="hj-kid" transform={`translate(760 ${H + 60}) scale(0.78)`}><circle cx="0" cy="-130" r="26" /><path d="" /></g>
        <g className="hj-cat" transform={`translate(664 ${H + 60}) scale(0.78)`}><path d="" /></g>
      </g>
    </svg>
  );
}
