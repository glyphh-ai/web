'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroLine — the hero's picture (his pick, 2026-10-05: "the dot that never
 * lifts its pen"). The purple dot is a pen. It draws the whole system in
 * ONE unbroken stroke along a bus — the desktop, the web, the apps, the
 * router, memory, connections, tasks — like a wire bent by hand, and when
 * the drawing is done it rolls off the end of the line, flies up, and
 * parks as the full stop at the end of the headline (OsHero.js puts a
 * `.hero-stop` span there) — and as it rises, the seven names fall into
 * place under their shapes, left to right. One line, never lifted.
 *
 * The deck's hand: 1px lines in the text colour, nothing filled, the one
 * purple dot. The stroke reveals by dash offset; the dot rides the pen tip
 * (getPointAtLength). Plays once; prefers-reduced-motion shows the drawing
 * complete with the stop in place.
 */

// the one stroke, left to right along the bus at y 620 (x 200–1200, inside
// the band a wide screen shows of the 1400 frame), each thing traced
// from the top of its stem and back down it — a stem is drawn twice, which
// is what a pen that never lifts does
const STROKE = [
  'M200 620H280',
  // the desktop: a monitor on its stand
  'V560H330V496H230V560H280V620H410',
  // the web: a window with its title bar
  'V560H460V500H360V512H460V560H410V620H545',
  // the apps: a window split in four
  'V560H590V500H500V560H545V500V530H500H590H545V560V620H700',
  // the router: the hub
  'V580a50 50 0 1 1 0-100a50 50 0 1 1 0 100V620H855',
  // memory: a cylinder
  'V570a36 10 0 0 1-36-10V505a36 10 0 1 1 72 0a36 10 0 1 1-72 0a36 10 0 0 0 72 0V560a36 10 0 0 1-36 10V620H985',
  // connections: a plug, two prongs up
  'V560H1010V535a25 25 0 0 0-13-21V500V514a25 25 0 0 0-24 0V500V514a25 25 0 0 0-13 21V560H985V620H1115',
  // tasks: a clock with its hands
  'V560a30 30 0 1 1 0-60a30 30 0 1 1 0 60V530V510V530L1127 540L1115 530V560V620H1200',
].join('');

// the names, under their shapes: they fall into place as the dot rises
const LABELS = [[280, 'Desktop'], [410, 'Web'], [545, 'Apps'], [700, 'Router'], [855, 'Memory'], [985, 'Connections'], [1115, 'Tasks']];
const ease = (u) => (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2);
const clamp = (u) => Math.max(0, Math.min(1, u));
const DRAW_S = 9, REST_S = 0.5, FLY_S = 1.1;

export default function HeroLine() {
  const ref = useRef(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const path = svg.querySelector('.hl-stroke'), dot = svg.querySelector('.hl-dot');
    const stop = document.querySelector('.hero-stop');
    const labels = [...svg.querySelectorAll('.hl-label')];
    const settle = (f) => labels.forEach((l, i) => {
      const u = ease(clamp((f * 1.6 - i * 0.07) / 0.55));
      l.setAttribute('transform', `translate(0 ${(-70 * (1 - u)).toFixed(1)})`);
      l.setAttribute('opacity', u.toFixed(2));
    });
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    const end = path.getPointAtLength(len);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // where the full stop sits, in the picture's own coordinates
    const target = () => {
      if (!stop) return null;
      const r = stop.getBoundingClientRect();
      const pt = svg.createSVGPoint();
      pt.x = r.left + r.width / 2; pt.y = r.top + r.height / 2;
      return pt.matrixTransform(svg.getScreenCTM().inverse());
    };

    const frame = (t) => {
      svg.dataset.t = t.toFixed(2);
      const p = ease(clamp(t / DRAW_S));
      path.style.strokeDashoffset = `${len * (1 - p)}`;
      if (t < DRAW_S + REST_S) {
        const at = path.getPointAtLength(len * p);
        dot.setAttribute('cx', at.x.toFixed(1)); dot.setAttribute('cy', at.y.toFixed(1));
        dot.setAttribute('visibility', 'visible');
        stop?.classList.remove('on');
        settle(0);
        return;
      }
      const f = clamp((t - DRAW_S - REST_S) / FLY_S);
      settle(f);
      const to = target();
      if (!to) { dot.setAttribute('visibility', 'hidden'); return; }
      if (f >= 1) { dot.setAttribute('visibility', 'hidden'); stop.classList.add('on'); return; }
      // off the end of the line and up, on an arc, slowing into place
      const u = ease(f), cx = (end.x + to.x) / 2 + 120, cy = Math.min(end.y, to.y) - 160;
      const x = (1 - u) * (1 - u) * end.x + 2 * (1 - u) * u * cx + u * u * to.x;
      const y = (1 - u) * (1 - u) * end.y + 2 * (1 - u) * u * cy + u * u * to.y;
      dot.setAttribute('cx', x.toFixed(1)); dot.setAttribute('cy', y.toFixed(1));
      dot.setAttribute('visibility', 'visible');
    };

    if (reduced) { frame(DRAW_S + REST_S + FLY_S + 1); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now) => { frame((now - t0) / 1000); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg ref={ref} className="hl" viewBox="0 0 1400 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path className="hl-stroke" d={STROKE} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle className="hl-dot" r="7" visibility="hidden" />
      {LABELS.map(([x, name]) => <text key={name} className="hl-label" x={x} y="664" opacity="0">{name}</text>)}
    </svg>
  );
}
