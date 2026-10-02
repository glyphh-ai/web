/**
 * HoloTree: the home hero's picture (2026-10-01). A fact tree as an
 * orthographic hologram: three stacked planes (the glyph, its segments, its
 * roles), a node on each plane for every part, edges that pulse from the whole
 * down to the parts, and the score beside each. Drawn, not rendered: one SVG,
 * animated in CSS, the projector and scanlines included. Decorative.
 */
export default function HoloTree() {
  return (
    <div className="holo" aria-hidden="true">
      <svg viewBox="140 84 620 476" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="holo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="holo-beam" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.38" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <pattern id="holo-lines" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="4" height="1" fill="#000" opacity="0.55" />
          </pattern>
          <clipPath id="holo-clip"><rect x="0" y="0" width="900" height="560" /></clipPath>
        </defs>

        <polygon className="holo-beam" points="410,548 490,548 678.6,392.0 221.4,392.0" fill="url(#holo-beam)" />
        <ellipse className="holo-base" cx="450" cy="548" rx="56" ry="8" />

        <g filter="url(#holo-glow)" className="holo-body">
        <g className="holo-plane holo-z0">
          <polygon className="holo-sheet" points="450.0,260.0 678.6,392.0 450.0,524.0 221.4,392.0" />
          <path className="holo-grid" d="M460.4 266.0 L231.8 398.0 M439.6 266.0 L668.2 398.0 M495.0 286.0 L266.4 418.0 M405.0 286.0 L633.6 418.0 M529.7 306.0 L301.0 438.0 M370.3 306.0 L599.0 438.0 M564.3 326.0 L335.7 458.0 M335.7 326.0 L564.3 458.0 M599.0 346.0 L370.3 478.0 M301.0 346.0 L529.7 478.0 M633.6 366.0 L405.0 498.0 M266.4 366.0 L495.0 498.0 M668.2 386.0 L439.6 518.0 M231.8 386.0 L460.4 518.0" />
          <text className="holo-tag" x="207.4" y="396.0" textAnchor="end">ROLES</text>
        </g>
        <g className="holo-plane holo-z1">
          <polygon className="holo-sheet" points="450.0,186.0 602.4,274.0 450.0,362.0 297.6,274.0" />
          <path className="holo-grid" d="M456.9 190.0 L304.5 278.0 M443.1 190.0 L595.5 278.0 M491.6 210.0 L339.2 298.0 M408.4 210.0 L560.8 298.0 M526.2 230.0 L373.8 318.0 M373.8 230.0 L526.2 318.0 M560.8 250.0 L408.4 338.0 M339.2 250.0 L491.6 338.0 M595.5 270.0 L443.1 358.0 M304.5 270.0 L456.9 358.0" />
          <text className="holo-tag" x="283.6" y="278.0" textAnchor="end">SEGMENTS</text>
        </g>
        <g className="holo-plane holo-z2">
          <polygon className="holo-sheet" points="450.0,106.0 536.6,156.0 450.0,206.0 363.4,156.0" />
          <path className="holo-grid" d="M458.7 111.0 L372.1 161.0 M441.3 111.0 L527.9 161.0 M493.3 131.0 L406.7 181.0 M406.7 131.0 L493.3 181.0 M527.9 151.0 L441.3 201.0 M372.1 151.0 L458.7 201.0" />
          <text className="holo-tag" x="349.4" y="160.0" textAnchor="end">GLYPH</text>
        </g>
        <path className="holo-edge" d="M450.0 156.0 L401.5 266.0" />
        <path className="holo-pulse" style={{ animationDelay: "0.00s" }} d="M450.0 156.0 L401.5 266.0" />
        <path className="holo-edge holo-dim" d="M450.0 156.0 L519.3 278.0" />
        <path className="holo-pulse holo-dim" style={{ animationDelay: "0.45s" }} d="M450.0 156.0 L519.3 278.0" />
        <path className="holo-edge" d="M401.5 266.0 L363.4 350.0" />
        <path className="holo-pulse" style={{ animationDelay: "0.90s" }} d="M401.5 266.0 L363.4 350.0" />
        <path className="holo-edge" d="M401.5 266.0 L363.4 406.0" />
        <path className="holo-pulse" style={{ animationDelay: "1.35s" }} d="M401.5 266.0 L363.4 406.0" />
        <path className="holo-edge" d="M401.5 266.0 L377.3 454.0" />
        <path className="holo-pulse" style={{ animationDelay: "1.80s" }} d="M401.5 266.0 L377.3 454.0" />
        <path className="holo-edge holo-dim" d="M519.3 278.0 L581.6 404.0" />
        <path className="holo-pulse holo-dim" style={{ animationDelay: "2.25s" }} d="M519.3 278.0 L581.6 404.0" />
        <g className="holo-node">
          <path className="holo-pin" d="M450.0 156.0 V138.0" />
          <polygon className="holo-gem" points="450.0,140.8 476.3,156.0 450.0,171.2 423.7,156.0" />
          <circle className="holo-core" cx="450.0" cy="138.0" r="6.5" />
          <text className="holo-label" x="472.0" y="142.0" textAnchor="start">ticket<tspan className="holo-score" dx="8">0.91</tspan></text>
        </g>
        <g className="holo-node">
          <path className="holo-pin" d="M401.5 266.0 V248.0" />
          <polygon className="holo-gem" points="401.5,255.6 419.5,266.0 401.5,276.4 383.5,266.0" />
          <circle className="holo-core" cx="401.5" cy="248.0" r="4.5" />
          <text className="holo-label" x="379.5" y="252.0" textAnchor="end">issue<tspan className="holo-score" dx="8">0.91</tspan></text>
        </g>
        <g className="holo-node holo-dim">
          <path className="holo-pin" d="M519.3 278.0 V260.0" />
          <polygon className="holo-gem" points="519.3,267.6 537.3,278.0 519.3,288.4 501.3,278.0" />
          <circle className="holo-core" cx="519.3" cy="260.0" r="4.5" />
          <text className="holo-label" x="541.3" y="264.0" textAnchor="start">meta<tspan className="holo-score" dx="8">w 0</tspan></text>
        </g>
        <g className="holo-node">
          <path className="holo-pin" d="M363.4 350.0 V332.0" />
          <polygon className="holo-gem" points="363.4,339.6 381.4,350.0 363.4,360.4 345.4,350.0" />
          <circle className="holo-core" cx="363.4" cy="332.0" r="4.5" />
          <text className="holo-label" x="341.4" y="336.0" textAnchor="end">title<tspan className="holo-score" dx="8">0.80</tspan></text>
        </g>
        <g className="holo-node">
          <path className="holo-pin" d="M363.4 406.0 V388.0" />
          <polygon className="holo-gem" points="363.4,395.6 381.4,406.0 363.4,416.4 345.4,406.0" />
          <circle className="holo-core" cx="363.4" cy="388.0" r="4.5" />
          <text className="holo-label" x="341.4" y="392.0" textAnchor="end">component<tspan className="holo-score" dx="8">1.00</tspan></text>
        </g>
        <g className="holo-node">
          <path className="holo-pin" d="M377.3 454.0 V436.0" />
          <polygon className="holo-gem" points="377.3,443.6 395.3,454.0 377.3,464.4 359.2,454.0" />
          <circle className="holo-core" cx="377.3" cy="436.0" r="4.5" />
          <text className="holo-label" x="355.3" y="440.0" textAnchor="end">severity<tspan className="holo-score" dx="8">0.93</tspan></text>
        </g>
        <g className="holo-node holo-dim">
          <path className="holo-pin" d="M581.6 404.0 V386.0" />
          <polygon className="holo-gem" points="581.6,393.6 599.6,404.0 581.6,414.4 563.6,404.0" />
          <circle className="holo-core" cx="581.6" cy="386.0" r="4.5" />
          <text className="holo-label" x="603.6" y="390.0" textAnchor="start">opened</text>
        </g>
        </g>

        <rect className="holo-scan" x="0" y="0" width="900" height="560" fill="url(#holo-lines)" />
        <rect className="holo-sweep" x="170" y="-24" width="560" height="24" />
      </svg>
    </div>
  );
}
