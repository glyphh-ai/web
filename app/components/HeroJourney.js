/**
 * HeroJourney — the hero's picture, animated, FIRST PERSON (his order,
 * 2026-10-05: "a door on a wall, then the camera walks through the door as
 * it opens … through the wood, very stick figure big tall tree, across a
 * river, the edge of a mountain … looking down on the city … then up to the
 * stars … a rocket going by with a line coming out the back", then "first
 * person perspective of walking through the door … fps style").
 *
 * One SVG in the deck's hand: 1px lines in the text colour, nothing filled,
 * one purple dot (the door's handle, then the rocket's flame). The camera
 * never pans sideways: it stands at the vanishing point (700, 540, eye
 * height) and WALKS. The door leaf swings inward in perspective (an SMIL
 * morph of its outline) and the frame grows past the viewer; the trees and
 * the bridge planks stream out of the vanishing point and past the edges;
 * at the cliff the view tilts down to the city, then up to the stars
 * (globals.css, "the journey"). Plays once, holds on the stars; the rocket
 * keeps crossing. Under prefers-reduced-motion it shows the end.
 */

const VP = { x: 700, y: 540 };
const frac = (x) => x - Math.floor(x);
// a hashed scatter for the stars, the same on every render
const STARS = Array.from({ length: 54 }, (_, i) => {
  const a = frac(Math.sin(i * 12.9898) * 43758.5453), b = frac(Math.sin(i * 78.233) * 12345.678), c = frac(Math.sin(i * 39.17) * 7777.7);
  return { x: 80 + a * 1240, y: -680 + b * 640, cross: c > 0.6, k: i };
});

// a stick-figure tall tree standing on (0, 0): a trunk and branches sweeping
// up in pairs, drawn once and streamed past the camera at two sides
const TREE = (() => {
  const d = ['M0 0V-440'];
  for (let y = -370, i = 0; y < -20; y += 90, i++) {
    const r = 30 + i * 9;
    d.push(`M0 ${y}l-${r} -${r * 0.9}M0 ${y}l${r} -${r * 0.9}`);
  }
  return d.join('');
})();

const FAR_TOWERS = [[612, 522, 10], [630, 512, 14], [652, 526, 8], [668, 500, 16], [694, 518, 10], [712, 508, 12], [732, 524, 8], [748, 514, 14], [772, 520, 10]];
const CITY = [[320, 880, 50], [400, 820, 70], [500, 900, 40], [580, 760, 90], [700, 860, 50], [790, 800, 60], [880, 890, 36], [950, 830, 76], [1060, 870, 48]];

export default function HeroJourney() {
  return (
    <svg className="hj" viewBox="0 0 1400 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* ── 1 · the door, and the walk through it ───────────────────────── */}
        <g className="hj-s hj-door">
          {/* the floor running to the eye: the horizon, four lines to it */}
          <path d={`M0 ${VP.y}H1400M0 700L${VP.x} ${VP.y}L1400 700M300 700L${VP.x} ${VP.y}L1100 700`} />
          {/* the wall and its courses, the frame */}
          <path d="M470 380H930V640H470ZM470 470H640M760 470H930M470 555H640M760 555H930" />
          <path d="M640 640V460H760V640" />
          {/* the leaf, hinged left, swinging inward: its free edge runs toward the eye */}
          <path d="M640 460H760V640H640Z">
            <animate attributeName="d" begin="1.2s" dur="2.2s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.3 1"
              values="M640 460H760V640H640Z;M640 460L716 518L716 566L640 640Z" />
          </path>
          <circle cx="742" cy="550" r="6" className="hj-dot" stroke="none">
            <animate attributeName="cx" begin="1.2s" dur="2.2s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.3 1" values="742;706" />
            <animate attributeName="cy" begin="1.2s" dur="2.2s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.3 1" values="550;545" />
            <animate attributeName="r" begin="1.2s" dur="2.2s" fill="freeze" values="6;3" />
          </circle>
        </g>

        {/* ── 2 · the woods, streaming past ───────────────────────────────── */}
        <g className="hj-s hj-woods">
          <path d={`M0 ${VP.y}H1400M560 700L${VP.x} ${VP.y}L840 700`} />
          {[0, 1, 2, 3].map((k) => (
            <g key={`l${k}`} className="hj-tree hj-tree-l" style={{ animationDelay: `${6 + k * 1.1}s` }}><path d={TREE} /></g>
          ))}
          {[0, 1, 2, 3].map((k) => (
            <g key={`r${k}`} className="hj-tree hj-tree-r" style={{ animationDelay: `${6.55 + k * 1.1}s` }}><path d={TREE} /></g>
          ))}
        </g>

        {/* ── 3 · the river, the footbridge coming at you ─────────────────── */}
        <g className="hj-s hj-river">
          <path d={`M0 ${VP.y}H1400`} />
          {/* the rails */}
          <path d={`M430 700L688 ${VP.y + 2}M970 700L712 ${VP.y + 2}M450 640L690 ${VP.y - 24}M950 640L710 ${VP.y - 24}`} />
          {/* the water either side */}
          <path d="M0 585q40-8 80 0t80 0 80 0 80 0 80 0M0 640q50-10 100 0t100 0 100 0 100 0M980 585q40-8 80 0t80 0 80 0 80 0 80 0M1000 640q50-10 100 0t100 0 100 0 100 0" />
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <g key={k} className="hj-plank" style={{ animationDelay: `${13 + k * 0.6}s` }}><path d="M-270 160H270M-290 160V130M290 160V130" /></g>
          ))}
        </g>

        {/* ── 4 · the edge, the city below, the sky above (this group tilts) ─ */}
        <g className="hj-tilt">
          <g className="hj-s hj-edge">
            {/* the ground to the lip of the cliff; the far city on the horizon */}
            <path d={`M0 ${VP.y}H1400M0 700L${VP.x} ${VP.y}L1400 700M120 700L${VP.x} ${VP.y}L1280 700`} />
            <path d="M0 612q350-14 700-14t700 14" />
            {FAR_TOWERS.map(([x, y, w]) => <rect key={x} x={x} y={y} width={w} height={540 - y} />)}
            {/* looking down: the city at the foot of the cliff */}
            <path d="M0 740q200 40 350 10t350 20 350-10 350 30" />
            <path d="M200 960H1200" />
            <path d="M200 940q200-60 400-20t300-16 300-30" />
            {CITY.map(([x, y, w]) => <rect key={x} x={x} y={y} width={w} height={960 - y} />)}
            <path d="M615 760l10-18 10 18" />
            <path d="M1140 960q14-70 0-130M1140 830q-34-8-58 16M1140 830q34-8 58 16M1140 830q-12-32-42-34M1140 830q12-32 42-34" />
            <path d="M250 960q-12-60 0-112M250 848q-30-4-50 14M250 848q30-4 50 14M250 848q-8-28-36-30M250 848q8-28 36-30" />
          </g>
          <g className="hj-sky">
            {STARS.map((s) => s.cross
              ? <path key={s.k} d={`M${s.x - 5} ${s.y}h10M${s.x} ${s.y - 5}v10`} />
              : <circle key={s.k} cx={s.x} cy={s.y} r="1.6" fill="currentColor" stroke="none" />)}
            <g className="hj-rocket">
              <g transform="rotate(-22)">
                {/* the line coming out the back */}
                <path d="M-16 0H-380" strokeWidth="1" />
                <path d="M0 0C10-9 30-9 44 0C30 9 10 9 0 0ZM10-4l-9-10h8M10 4l-9 10h8" />
                <circle cx="26" cy="0" r="3" />
                <circle cx="-8" cy="0" r="4" className="hj-dot" stroke="none" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
