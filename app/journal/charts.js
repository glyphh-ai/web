/**
 * Charts for the blog, drawn as inline SVG strings at build time so they
 * follow the site's theme (article.css colours them from the tokens). Each
 * returns a `<figure>` for a post body's `{ html }` entry. Every mark is
 * placed on one scale; labels name values the chart reaches.
 */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const figure = (title, sub, svg) =>
  `<figure class="ch">` +
  `<figcaption><span class="ch-title">${esc(title)}</span><span class="ch-sub">${esc(sub)}</span></figcaption>` +
  svg +
  `</figure>`;

const svgOpen = (w, h, label) => `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">`;

/**
 * Horizontal bars. rows: [label, value, kind?] where kind is 'ada' (accent)
 * or 'base' (a baseline, dimmed). opts: max, ticks, fmt, ref (a dashed line).
 */
export function bars(title, sub, rows, { max, ticks, fmt = String, tickFmt = String, ref } = {}) {
  const W = 720, L = 210, R = 56, rowH = 30, top = 6, H = top + rows.length * rowH + 26;
  const x = (v) => L + (v / max) * (W - L - R);
  let s = svgOpen(W, H, title);
  for (const t of ticks) {
    s += `<line class="ch-grid" x1="${x(t)}" x2="${x(t)}" y1="${top}" y2="${H - 20}"/>`;
    s += `<text x="${x(t)}" y="${H - 5}" text-anchor="middle">${esc(tickFmt(t))}</text>`;
  }
  rows.forEach(([label, v, kind], i) => {
    const y = top + i * rowH;
    const k = kind ? ` ${kind}` : '';
    s += `<text class="ch-lab${k}" x="${L - 10}" y="${y + 19}" text-anchor="end">${esc(label)}</text>`;
    s += `<rect class="ch-bar${k}" x="${L}" y="${y + 7}" width="${Math.max(1, x(v) - L)}" height="16"/>`;
    s += `<text class="ch-val${k}" x="${x(v) + 6}" y="${y + 19}">${esc(fmt(v))}</text>`;
  });
  if (ref != null) s += `<line class="ch-ref" x1="${x(ref)}" x2="${x(ref)}" y1="${top}" y2="${H - 20}"/>`;
  return figure(title, sub, s + '</svg>');
}

/**
 * Paired bars per row: rows [label, a, b, kind?]; keys names a and b for the
 * legend. a is drawn solid (accent on 'ada' rows), b dimmed.
 */
export function pairs(title, sub, rows, keys, { max = 100, ticks = [0, 25, 50, 75, 100], fmt = (v) => `${v}%` } = {}) {
  const W = 720, L = 210, R = 56, gH = 46, top = 28, H = top + rows.length * gH + 24;
  const x = (v) => L + (v / max) * (W - L - R);
  let s = svgOpen(W, H, title);
  for (const t of ticks) {
    s += `<line class="ch-grid" x1="${x(t)}" x2="${x(t)}" y1="${top - 4}" y2="${H - 20}"/>`;
    s += `<text x="${x(t)}" y="${H - 5}" text-anchor="middle">${esc(fmt(t))}</text>`;
  }
  s += `<rect class="ch-bar ada" x="${L}" y="5" width="12" height="10"/><text x="${L + 18}" y="14">${esc(keys[0])}</text>`;
  s += `<rect class="ch-bar base" x="${L + 200}" y="5" width="12" height="10"/><text x="${L + 218}" y="14">${esc(keys[1])}</text>`;
  rows.forEach(([label, a, b, kind], i) => {
    const y = top + i * gH;
    const k = kind ? ` ${kind}` : '';
    s += `<text class="ch-lab${k}" x="${L - 10}" y="${y + 24}" text-anchor="end">${esc(label)}</text>`;
    s += `<rect class="ch-bar${k}" x="${L}" y="${y + 4}" width="${Math.max(1, x(a) - L)}" height="15"/>`;
    s += `<text class="ch-val${k}" x="${x(a) + 6}" y="${y + 16}">${esc(fmt(a))}</text>`;
    s += `<rect class="ch-bar base" x="${L}" y="${y + 21}" width="${Math.max(1, x(b) - L)}" height="15"/>`;
    s += `<text class="ch-val" x="${x(b) + 6}" y="${y + 33}">${esc(fmt(b))}</text>`;
  });
  return figure(title, sub, s + '</svg>');
}

/**
 * Log-log scatter. points: [label, x0, x1, y0, y1, kind?, side] — a range
 * draws as a bar through the geometric mean; side 'left' or 'right' of it
 * for the label. ax/ay: { min, max, ticks: [[value, label]], title }.
 */
export function scatter(title, sub, points, ax, ay) {
  const W = 720, H = 360, L = 92, R = 24, T = 14, B = 46;
  const lg = Math.log10;
  const x = (v) => L + (lg(v) - lg(ax.min)) / (lg(ax.max) - lg(ax.min)) * (W - L - R);
  const y = (v) => T + (1 - (lg(v) - lg(ay.min)) / (lg(ay.max) - lg(ay.min))) * (H - T - B);
  let s = svgOpen(W, H, title);
  for (const [v, t] of ax.ticks) {
    s += `<line class="ch-grid" x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${H - B}"/>`;
    s += `<text x="${x(v)}" y="${H - B + 17}" text-anchor="middle">${esc(t)}</text>`;
  }
  for (const [v, t] of ay.ticks) {
    s += `<line class="ch-grid" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/>`;
    s += `<text x="${L - 8}" y="${y(v) + 4}" text-anchor="end">${esc(t)}</text>`;
  }
  s += `<text x="${(L + W - R) / 2}" y="${H - 6}" text-anchor="middle">${esc(ax.title)}</text>`;
  s += `<text x="14" y="${(T + H - B) / 2}" text-anchor="middle" transform="rotate(-90 14 ${(T + H - B) / 2})">${esc(ay.title)}</text>`;
  for (const [label, x0, x1, y0, y1, kind, side] of points) {
    const cx = x(Math.sqrt(x0 * x1)), cy = y(Math.sqrt(y0 * y1));
    const k = kind ? ` ${kind}` : '';
    if (x0 !== x1) s += `<line class="ch-span" x1="${x(x0)}" x2="${x(x1)}" y1="${cy}" y2="${cy}"/>`;
    if (y0 !== y1) s += `<line class="ch-span" x1="${cx}" x2="${cx}" y1="${y(y0)}" y2="${y(y1)}"/>`;
    s += `<circle class="ch-dot${k}" cx="${cx}" cy="${cy}" r="${kind ? 6 : 4.5}"/>`;
    const tx = side === 'left' ? x(x0) - 11 : x(x1) + 11;
    s += `<text class="ch-lab${k}" x="${tx}" y="${cy + 4}" text-anchor="${side === 'left' ? 'end' : 'start'}">${esc(label)}</text>`;
  }
  return figure(title, sub, s + '</svg>');
}

/**
 * Log-log lines. series: [label, [[x, y], ...], kind?]. The label sits at
 * the series' last point.
 */
export function lines(title, sub, series, ax, ay) {
  const W = 720, H = 320, L = 72, R = 132, T = 14, B = 46;
  const lg = Math.log10;
  const x = (v) => L + (lg(v) - lg(ax.min)) / (lg(ax.max) - lg(ax.min)) * (W - L - R);
  const y = (v) => T + (1 - (lg(v) - lg(ay.min)) / (lg(ay.max) - lg(ay.min))) * (H - T - B);
  let s = svgOpen(W, H, title);
  for (const [v, t] of ax.ticks) {
    s += `<line class="ch-grid" x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${H - B}"/>`;
    s += `<text x="${x(v)}" y="${H - B + 17}" text-anchor="middle">${esc(t)}</text>`;
  }
  for (const [v, t] of ay.ticks) {
    s += `<line class="ch-grid" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/>`;
    s += `<text x="${L - 8}" y="${y(v) + 4}" text-anchor="end">${esc(t)}</text>`;
  }
  s += `<text x="${(L + W - R) / 2}" y="${H - 6}" text-anchor="middle">${esc(ax.title)}</text>`;
  for (const [label, pts, kind] of series) {
    const k = kind ? ` ${kind}` : '';
    s += `<polyline class="ch-line${k}" points="${pts.map(([a, b]) => `${x(a)},${y(b)}`).join(' ')}"/>`;
    for (const [a, b] of pts) s += `<circle class="ch-dot${k}" cx="${x(a)}" cy="${y(b)}" r="3.5"/>`;
    const [a, b] = pts[pts.length - 1];
    s += `<text class="ch-lab${k}" x="${x(a) + 10}" y="${y(b) + 4}">${esc(label)}</text>`;
  }
  return figure(title, sub, s + '</svg>');
}

/**
 * A punched card, for decoration: a fixed pseudo-random pattern of holes
 * (not any model's output), `cols` by `rows`, holes in the text colour and
 * the rest faint, so it follows the theme.
 */
export function punchCard(cols, rows, label) {
  let seed = 0x2545f491;
  const next = () => { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; return (seed >>> 0) / 4294967296; };
  const c = 5;
  let on = '', off = '';
  for (let i = 0; i < cols * rows; i++) {
    const cell = `M${(i % cols) * c} ${Math.floor(i / cols) * c}h4v4h-4z`;
    if (next() < 0.5) on += cell; else off += cell;
  }
  return `<svg class="ft-punch" viewBox="0 0 ${cols * c - 1} ${rows * c - 1}" role="img" aria-label="${esc(label)}"><path class="off" d="${off}"/><path class="on" d="${on}"/></svg>`;
}
