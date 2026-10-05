/**
 * SystemMap — the one picture of the whole system (his order, 2026-10-05: "a
 * minimalistic image to give the overview of glyphh desktop, web, router,
 * memory, connections, apps, etc. some way to convey the story"). Drawn in
 * the deck's hand: 1px lines in the text colour, nothing filled, and one
 * purple dot where the router meets the bus. Seven parts stand on one bus:
 * the surfaces on the left, the router in the middle, what it reaches on the
 * right. Inline SVG so the lines take the theme's colour on both grounds.
 */
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };

const LABELS = [
  [150, 'Desktop'], [300, 'Web'], [450, 'Apps'], [600, 'Router'], [750, 'Memory'], [900, 'Connections'], [1050, 'Tasks'],
];

export default function SystemMap() {
  return (
    <svg className="sysmap" viewBox="0 0 1200 400" role="img" aria-labelledby="sysmap-title">
      <title id="sysmap-title">Glyphh: desktop, web, apps, router, memory, connections and tasks on one bus</title>
      <g {...S}>
        {/* the bus */}
        <path d="M60 330H1140" />
        {/* drops */}
        <path d="M150 252v78M300 236v78M450 238v92M600 254v76M750 246v84M900 224v106M1050 236v94" />

        {/* desktop: a monitor */}
        <rect x="100" y="170" width="100" height="64" rx="4" />
        <path d="M150 234v18M128 252h44" />

        {/* web: a browser window */}
        <rect x="250" y="176" width="100" height="60" rx="4" />
        <path d="M250 192h100" />
        <circle cx="262" cy="184" r="2" />
        <circle cx="272" cy="184" r="2" />

        {/* apps: a grid of programs */}
        <rect x="405" y="166" width="90" height="72" />
        <rect x="411" y="172" width="22" height="22" /><rect x="439" y="172" width="22" height="22" /><rect x="467" y="172" width="22" height="22" />
        <rect x="411" y="202" width="22" height="22" /><rect x="439" y="202" width="22" height="22" /><rect x="467" y="202" width="22" height="22" />

        {/* router: the hub */}
        <circle cx="600" cy="210" r="44" />
        <path d="M556 210h-26M644 210h26M600 166v-22" />

        {/* memory: a cylinder */}
        <ellipse cx="750" cy="172" rx="36" ry="10" />
        <path d="M714 172v64a36 10 0 0 0 72 0v-64" />
        <path d="M714 194a36 10 0 0 0 72 0M714 216a36 10 0 0 0 72 0" />

        {/* connections: a plug on a cord */}
        <path d="M856 198h16M856 212h16M872 188h20a17 17 0 0 1 0 34h-20zM909 205h28" />
        <path d="M900 224v0" />

        {/* tasks: a clock */}
        <circle cx="1050" cy="206" r="30" />
        <path d="M1050 182v6M1050 224v6M1026 206h6M1068 206h6M1050 206v-16M1050 206l11 9" />
      </g>
      {/* the one purple dot: the router on the bus */}
      <circle cx="600" cy="330" r="7" className="sysmap-dot" />
      <g className="sysmap-labels">
        {LABELS.map(([x, t]) => <text key={t} x={x} y="366" textAnchor="middle">{t}</text>)}
      </g>
    </svg>
  );
}
