// The maths behind the home page's field, shared by AdaField (the hero) and
// AdaStills (the three stills under the receipt card), so every picture of Ada
// learning on the site is the same picture: a toy two-outcome classifier that
// answers from its nearest precedents, says how sure it is, and learns how
// much each axis of a case matters as precedents accumulate.

export const K = 5;            // precedents that vote
export const SIGMA = 0.2;      // how far a precedent's vote reaches
export const UNSURE = 0.68;    // below this, Ada asks
export const SEEDED = 3;       // precedents a cycle starts with
export const CASES = 26;       // cases per cycle

export const hash = (a, b) => {
  const s = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return s - Math.floor(s);
};

export function rng(seed) {
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
export const truth = (u, v) => (u < 0.5 + 0.11 * Math.sin(v * 5.2) ? 'x' : 'o');

export function makeCycle(seed) {
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
export const learnedWv = (n) => 1 - 0.72 * Math.min(1, Math.max(0, (n - 4) / 14));

// Ada's answer at (u, v): the K nearest precedents by weighted distance, each
// voting by closeness; a Laplace prior keeps a thin vote near even.
export function answer(precs, u, v, wv) {
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

// The page's two colours, read off the canvas's computed style: the text
// colour as "r, g, b" and the accent as "r, g, b".
export function inks(style) {
  const ink = (style.color.match(/\d+(\.\d+)?/g) || ['255', '255', '255']).slice(0, 3).join(', ');
  const hex = (style.getPropertyValue('--accent').trim().match(/^#([0-9a-f]{6})$/i) || [, 'b066ff'])[1];
  const flare = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(', ');
  const clamp = (a) => Math.max(0, Math.min(1, a)).toFixed(3);
  return { rgba: (a) => `rgba(${ink}, ${clamp(a)})`, purple: (a) => `rgba(${flare}, ${clamp(a)})` };
}
