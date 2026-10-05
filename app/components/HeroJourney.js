'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroJourney — the hero's picture: following a kid and a round cat down
 * the path (his order, 2026-10-05: "a cartoon of the charlie brown esk
 * looking figure and a cat walking … they pass through a cross walk with
 * cars, still very very basic, white lines, then through the park, then
 * across a big bridge, then wind up at mountains in the distance and a
 * canyon … point up to the stars and the rocket ship").
 *
 * ONE WORLD, ONE CAMERA. Everything stands at a place along the path (z,
 * in units) and beside it (x). The two walkers are always six units ahead
 * of the camera, which follows them: they wait at the crosswalk while two
 * cars pass, cross, walk the park, cross the bridge, and stop at the rim of
 * the canyon under the mountains, where the camera tips down into the
 * canyon and comes back up as the stars drop into the sky and the kid
 * points at the rocket. Every frame projects every object through the same
 * lens (sx = VP + x·f/dz, scale = f/dz); nothing fades between scenes —
 * the fog only keeps what is far ahead unseen until the walk reaches it.
 * The deck's hand: 1px lines in the text colour, nothing filled, one
 * purple dot (the rocket's flame). Plays once (~30 s), then holds with the
 * rocket crossing; prefers-reduced-motion shows the end.
 */

const F = 600;            // the lens: px per unit at one unit of distance
const VPX = 700, VPY = 540;
const EYE = 1.1;          // the path's ground, in units below the eye
const ROAD = 1.5;         // half the path's width
const LIP = 130;          // where the path ends: the rim of the canyon
const FOG = 18;           // things show only within this many units ahead
const AHEAD = 6;          // the walkers keep this far ahead of the camera
const END = 31;

const ease = (u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
function track(t, keys) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t0, v0] = keys[i - 1], [t1, v1] = keys[i];
    if (t <= t1) return v0 + (v1 - v0) * ease((t - t0) / (t1 - t0));
  }
  return keys[keys.length - 1][1];
}
// the camera: up to the crosswalk, a wait while the cars pass, across, the
// long walk, a stop seven units short of the rim (the walkers one short)
const CAM = [[0, 1], [2.4, 5.2], [5.6, 5.2], [8.5, 13], [20.5, LIP - 7], [21.5, LIP - 7]];
const PITCH = [[21.5, 0], [24.5, -110], [26.5, -110], [29.8, 40]];
const STARS_DROP = [[26.5, -900], [29.8, 0]];
const POSE = [[27.6, 0], [29.4, 1]];     // 0 = walking, 1 = the kid points up, the cat sits
// the two cars crossing the walkers' path, one each way, before they cross
const CAR_A = [[0.2, 15], [4.2, -15]];
const CAR_B = [[1.4, -16], [5.4, 16]];

const frac = (x) => x - Math.floor(x);
const hash = (i, k) => frac(Math.sin(i * 12.9898 + k * 78.233) * 43758.5453);

// what stands along the path
const XWALK = 11.5;                                          // the crossing's middle
const STRIPES = [-1.25, -0.75, -0.25, 0.25, 0.75, 1.25];     // the crosswalk's white bars
const PARK_TREES = Array.from({ length: 10 }, (_, i) => ({ z: 24 + i * 5 + hash(i, 1) * 2, x: (i % 2 ? 1 : -1) * (2.6 + hash(i, 2) * 2), r: 0.9 + hash(i, 3) * 0.6 }));
const BENCHES = [{ z: 31, x: -2.1 }, { z: 52, x: 2.2 }];
const LAMPS = [{ z: 40, x: 2.0 }, { z: 64, x: -2.0 }];
const BRIDGE = { from: 80, to: 118, towerH: 5.2, sag: 4.3 };
const PLANKS = Array.from({ length: 19 }, (_, i) => BRIDGE.from + 1 + i * 2);
const WAVES = [82, 88, 94, 100, 106, 112, 118];
const RIM_LINES = [{ y: 4, z: 142, w: 'M-4000 0q800-60 1600-20t1600 30 1600-40' }, { y: 9, z: 156, w: 'M-4000 0q900 50 1800 0t1800-30 1600 40' }, { y: 15, z: 172, w: 'M-4000 0q700-40 1400 10t1600-20 1500 30' }];
const STARS = Array.from({ length: 60 }, (_, i) => ({ x: 60 + hash(i, 8) * 1280, y: -660 + hash(i, 9) * 600, cross: hash(i, 10) > 0.6 }));
// the mountains: a line on the horizon, far beyond everything
const MOUNTAINS = 'M-200 0L-60-70 60-30 200-120 330-40 450-90 600-10 700-60 820-140 960-50 1080-100 1200-20 1320-80 1460-30 1600 0';

const r1 = (n) => n.toFixed(1);
const WAVE = 'M0 0q30-10 60 0t60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0';

// the kid, from behind, standing on (0, 0) at 100 px per unit: a round head
// with a few curls, the shirt with its zigzag, shorts, short legs and arms
// that swing with the walk; `pose` lifts one arm to point at the sky
function kidPath(phase, pose) {
  const swing = (1 - pose) * 0.5;
  const lf = Math.sin(phase) * swing, rf = -lf;
  const la = -Math.sin(phase) * swing, ra = -la;
  const leg = (x, a) => `M${x} -18L${r1(x + Math.sin(a) * 20)} ${r1(-18 + Math.cos(a) * 18)}h12`;
  const arm = (x, a) => `M${x} -90L${r1(x + Math.sin(a) * 22)} ${r1(-90 + Math.cos(a) * 46)}`;
  const upX = 32 * (1 - pose) + 46 * pose, upY = (-90 + Math.cos(la) * 46) * (1 - pose) + -168 * pose, upHx = (32 + Math.sin(la) * 22) * (1 - pose) + upX * pose;
  return (
    `M-6 -156q6-10 12 0q6-10 12 0M-16 -152q4-8 8-2` +           // the curls
    `M0 -104V-96` +                                               // the neck
    `M-32 -96H32L38 -40H-38Z` +                                   // the shirt
    `M-36 -62l9-10 9 10 9-10 9 10 9-10 9 10 9-10 9 10` +          // the zigzag
    `M-38 -40H38V-18H-38ZM0 -40V-18` +                            // the shorts
    `${leg(-14, lf)}${leg(14, rf)}${arm(-32, ra)}` +
    `M32 -90L${r1(upHx)} ${r1(upY)}`
  );
}
// the cat beside him: a round body, a round head with two pointed ears, a
// tail; it bobs as it walks and sits when the kid stops
function catPath(phase, pose) {
  const bob = Math.abs(Math.sin(phase * 2)) * 4 * (1 - pose);
  const by = -22 - bob, bodyR = 22 - pose * 3, hy = by - 24 + pose * 2;
  const tail = pose < 0.5 ? `M${r1(-bodyR)} ${r1(by)}q-20 -8 -16 -34` : `M${r1(-bodyR)} ${r1(by + 10)}q-22 6 -18 -14`;
  return `M${r1(-bodyR)} ${r1(by)}a${r1(bodyR)} ${r1(bodyR)} 0 1 0 ${r1(bodyR * 2)} 0a${r1(bodyR)} ${r1(bodyR)} 0 1 0 ${r1(-bodyR * 2)} 0` +
    `M-14 ${r1(hy)}a14 14 0 1 0 28 0a14 14 0 1 0 -28 0M-11 ${r1(hy - 9)}l-5 -13 12 6M11 ${r1(hy - 9)}l5 -13 -12 6` + tail;
}

export default function HeroJourney() {
  const ref = useRef(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const q = (sel) => svg.querySelector(sel);
    const all = (sel) => [...svg.querySelectorAll(sel)];
    const el = {
      horizon: q('.hj-horizon'), roadL: q('.hj-road-l'), roadR: q('.hj-road-r'), mountains: q('.hj-mountains'),
      xroadNear: q('.hj-xroad-near'), xroadFar: q('.hj-xroad-far'), stripes: all('.hj-stripe'), cars: all('.hj-car'),
      trees: all('.hj-ptree'), benches: all('.hj-bench'), lamps: all('.hj-lamp'),
      planks: all('.hj-plank'), wavesL: all('.hj-wave-l'), wavesR: all('.hj-wave-r'),
      towers: all('.hj-tower'), cables: all('.hj-cable'), hangers: all('.hj-hanger'),
      lip: q('.hj-lip'), rims: all('.hj-rim'), river: q('.hj-river'),
      kid: q('.hj-kid'), kidPath: q('.hj-kid path'), cat: q('.hj-cat'), catPath: q('.hj-cat path'),
      sky: q('.hj-sky'), rocket: q('.hj-rocket'),
    };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const P = (x, y, z, cam, pitch) => { const dz = z - cam; return [VPX + x * F / dz, VPY + pitch + y * F / dz, F / dz / 100]; };
    const place = (node, x, y, z, cam, pitch, near = 0.45, far = FOG) => {
      const dz = z - cam;
      if (dz < near || dz > far) { node.setAttribute('visibility', 'hidden'); return null; }
      const [sx, sy, s] = P(x, y, z, cam, pitch);
      node.setAttribute('visibility', 'visible');
      node.setAttribute('opacity', Math.max(0, Math.min(1, (far - dz) / 4)).toFixed(2));
      node.setAttribute('transform', `translate(${r1(sx)} ${r1(sy)}) scale(${s.toFixed(4)})`);
      return [sx, sy, s];
    };
    const seg = (node, a, b, cam, za, zb, far = FOG) => {
      const on = za - cam > 0.45 && zb - cam > 0.45 && Math.min(za, zb) - cam < far;
      node.setAttribute('visibility', on ? 'visible' : 'hidden');
      if (on) { node.setAttribute('x1', r1(a[0])); node.setAttribute('y1', r1(a[1])); node.setAttribute('x2', r1(b[0])); node.setAttribute('y2', r1(b[1])); }
    };
    // the bridge's cable: it hangs from the tower tops and sags to the deck's rail mid-span
    const cableY = (z) => { const u = (z - (BRIDGE.from + BRIDGE.to) / 2) / ((BRIDGE.to - BRIDGE.from) / 2); return EYE - BRIDGE.towerH + BRIDGE.sag * (1 - u * u); };

    const frame = (t) => {
      const cam = track(t, CAM), pitch = track(t, PITCH), pose = track(t, POSE), drop = track(t, STARS_DROP);
      svg.dataset.t = t.toFixed(2);
      const H = VPY + pitch;

      // the ground: the horizon, the mountains on it once the park is behind, the path's edges, the rim
      el.horizon.setAttribute('transform', `translate(0 ${r1(H)})`);
      el.mountains.setAttribute('transform', `translate(0 ${r1(H)})`);
      el.mountains.setAttribute('opacity', Math.max(0, Math.min(1, (cam - 70) / 25)).toFixed(2));
      const lineP = (node, a, b) => { node.setAttribute('x1', r1(a[0])); node.setAttribute('y1', r1(a[1])); node.setAttribute('x2', r1(b[0])); node.setAttribute('y2', r1(b[1])); };
      lineP(el.roadL, P(-ROAD, EYE, LIP, cam, pitch), P(-ROAD, EYE, cam + 0.5, cam, pitch));
      lineP(el.roadR, P(ROAD, EYE, LIP, cam, pitch), P(ROAD, EYE, cam + 0.5, cam, pitch));
      place(el.lip, 0, EYE, LIP, cam, pitch, 0.6, FOG + 6);

      // the crosswalk: the road's two edges across the path, the white bars, the two cars
      place(el.xroadNear, 0, EYE, XWALK - 3, cam, pitch);
      place(el.xroadFar, 0, EYE, XWALK + 3, cam, pitch);
      STRIPES.forEach((x, i) => seg(el.stripes[i], P(x, EYE, XWALK - 2.6, cam, pitch), P(x, EYE, XWALK + 2.6, cam, pitch), cam, XWALK - 2.6, XWALK + 2.6));
      place(el.cars[0], track(t, CAR_A), EYE, XWALK + 1.2, cam, pitch);
      place(el.cars[1], track(t, CAR_B), EYE, XWALK - 1.2, cam, pitch);

      // the park: round trees, two benches, two lamps
      PARK_TREES.forEach((tr, i) => place(el.trees[i], tr.x, EYE, tr.z, cam, pitch));
      BENCHES.forEach((b, i) => place(el.benches[i], b.x, EYE, b.z, cam, pitch));
      LAMPS.forEach((l, i) => place(el.lamps[i], l.x, EYE, l.z, cam, pitch));

      // the big bridge: the water, the planks, two towers each side, the cables and their hangers
      WAVES.forEach((z, i) => { place(el.wavesL[i], -2.2, EYE, z, cam, pitch); place(el.wavesR[i], 2.2, EYE, z, cam, pitch); });
      PLANKS.forEach((z, i) => place(el.planks[i], 0, EYE, z, cam, pitch));
      const BF = 44;   // the bridge is big: it shows from farther off than the fog
      [[BRIDGE.from, -1.9], [BRIDGE.from, 1.9], [BRIDGE.to, -1.9], [BRIDGE.to, 1.9]].forEach(([z, x], i) => place(el.towers[i], x, EYE, z, cam, pitch, 0.45, BF));
      [-1.9, 1.9].forEach((x, side) => {
        const pts = [];
        for (let z = BRIDGE.from; z <= BRIDGE.to + 0.01; z += 2) {
          if (z - cam > 0.45 && z - cam < BF) { const p = P(x, cableY(z), z, cam, pitch); pts.push(`${r1(p[0])} ${r1(p[1])}`); }
        }
        el.cables[side].setAttribute('d', pts.length > 1 ? `M${pts.join('L')}` : '');
        PLANKS.forEach((z, i) => {
          const h = el.hangers[side * PLANKS.length + i];
          seg(h, P(x, EYE - 1, z, cam, pitch), P(x, cableY(z), z, cam, pitch), cam, z, z, BF);
        });
      });

      // the canyon beyond the rim: the far rims stepping down, the river at the bottom
      const canyonFar = cam >= 96 ? 400 : 0;
      RIM_LINES.forEach((r, i) => place(el.rims[i], 0, r.y, r.z, cam, pitch, 0.45, canyonFar));
      place(el.river, 0, 21, 186, cam, pitch, 0.45, canyonFar);

      // the two walkers, six units ahead, their steps paced by the ground covered
      const phase = cam * 2.8;
      place(el.kid, 0.38, EYE, cam + AHEAD, cam, pitch, 0.45, 400);
      el.kidPath.setAttribute('d', kidPath(phase, pose));
      place(el.cat, -0.42, EYE, cam + AHEAD, cam, pitch, 0.45, 400);
      el.catPath.setAttribute('d', catPath(phase, pose));

      // the sky rides the pitch; the stars drop into it at the end; then the rocket
      el.sky.setAttribute('transform', `translate(0 ${r1(H + drop)})`);
      if (t > 30) {
        const u = ((t - 30) % 12) / 12;
        if (u < 0.55) { const k = u / 0.55; el.rocket.setAttribute('visibility', 'visible'); el.rocket.setAttribute('transform', `translate(${r1(-200 + 1900 * k)} ${r1(-110 - 90 * k)}) rotate(-22)`); }
        else el.rocket.setAttribute('visibility', 'hidden');
      } else el.rocket.setAttribute('visibility', 'hidden');
    };

    if (reduced) { frame(END + 3); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now) => { frame((now - t0) / 1000); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg ref={ref} className="hj" viewBox="0 0 1400 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <g className="hj-sky">
          {STARS.map((s, i) => s.cross
            ? <path key={i} d={`M${(s.x - 5).toFixed(0)} ${s.y.toFixed(0)}h10M${s.x.toFixed(0)} ${(s.y - 5).toFixed(0)}v10`} />
            : <circle key={i} cx={s.x.toFixed(0)} cy={s.y.toFixed(0)} r="1.6" fill="currentColor" stroke="none" />)}
          <g className="hj-rocket" visibility="hidden">
            <g className="hj-putter"><path d="M-16-4l-22-9M-18 0h-30M-16 4l-22 9" /></g>
            <path d="M0 0C10-9 30-9 44 0C30 9 10 9 0 0ZM10-4l-9-10h8M10 4l-9 10h8" />
            <circle cx="26" cy="0" r="3" />
            <circle cx="-8" cy="0" r="4" className="hj-dot" stroke="none" />
          </g>
        </g>

        {/* the mountains on the horizon, the horizon, the path, the rim of the canyon and what lies below it */}
        <g className="hj-mountains" opacity="0"><path d={MOUNTAINS} /></g>
        <g className="hj-horizon"><path d="M0 0H1400" /></g>
        <line className="hj-road-l" /><line className="hj-road-r" />
        {RIM_LINES.map((r, i) => <g key={i} className="hj-rim"><path d={r.w} /></g>)}
        <g className="hj-river"><path d="M-3000 0q200-30 400 0t400 0 400 0 400 0 400 0 400 0 400 0 400 0 400 0 400 0 400 0 400 0 400 0 400 0 400 0" /></g>
        <g className="hj-lip"><path d="M-3000 0q1000-40 2000-20t2000 10t2000 20" /></g>

        {/* the crosswalk */}
        <g className="hj-xroad-near"><path d="M-6000 0H6000" /></g>
        <g className="hj-xroad-far"><path d="M-6000 0H6000" /></g>
        {STRIPES.map((x) => <line key={x} className="hj-stripe" strokeWidth="3" />)}
        <g className="hj-car"><path d="M-120 0h240v-50h-70l-40-44h-90l-25 44h-15zM-80 -50v-44M30 -50v-44" /><circle cx="-72" cy="0" r="22" /><circle cx="72" cy="0" r="22" /></g>
        <g className="hj-car"><path d="M-120 0h240v-50h-15l-25-44h-90l-40 44h-70zM-30 -50v-44M80 -50v-44" /><circle cx="-72" cy="0" r="22" /><circle cx="72" cy="0" r="22" /></g>

        {/* the park */}
        {PARK_TREES.map((tr, i) => <g key={i} className="hj-ptree"><path d={`M0 0V${(-170 * tr.r).toFixed(0)}`} /><circle cx="0" cy={(-170 * tr.r - 80 * tr.r).toFixed(0)} r={(80 * tr.r).toFixed(0)} /></g>)}
        {BENCHES.map((b, i) => <g key={i} className="hj-bench"><path d="M-60 0V-46M60 0V-46M-60 -46H60M-60 -68H60M-60 -68V-46M60 -68V-46" /></g>)}
        {LAMPS.map((l, i) => <g key={i} className="hj-lamp"><path d="M0 0V-290M-14 -290h28M-10 -290v-26h20v26" /></g>)}

        {/* the big bridge */}
        {WAVES.map((z) => <g key={`l${z}`} className="hj-wave-l"><path d={WAVE} transform="translate(-600 0)" /></g>)}
        {WAVES.map((z) => <g key={`r${z}`} className="hj-wave-r"><path d={WAVE} /></g>)}
        {PLANKS.map((z) => <g key={z} className="hj-plank"><path d="M-150 0H150M-150 0v-14M150 0v-14" /></g>)}
        {[0, 1, 2, 3].map((i) => <g key={i} className="hj-tower"><path d={`M-10 0V${-BRIDGE.towerH * 100}H10V0M-10 -100H10`} /></g>)}
        <path className="hj-cable" d="" /><path className="hj-cable" d="" />
        {PLANKS.map((z) => <line key={`hl${z}`} className="hj-hanger" />)}
        {PLANKS.map((z) => <line key={`hr${z}`} className="hj-hanger" />)}

        {/* the two walkers, drawn last so they stand in front of everything */}
        <g className="hj-kid"><circle cx="0" cy="-130" r="26" /><path d="" /></g>
        <g className="hj-cat"><path d="" /></g>
      </g>
    </svg>
  );
}
