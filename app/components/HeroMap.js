/**
 * HeroMap: the two products in the home hero (his order, 2026-10-02), the
 * docs overview seen from much higher up. Glyphh Desktop on the left, the
 * Model Router on the right carrying what passes through it. Each box opens
 * its product page.
 */

const ICON = {
  desktop: (
    <>
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="M8 21h8" /><path d="M12 17v4" />
    </>
  ),
  router: (
    <>
      <path d="M4 21v-7" /><path d="M4 10V3" /><path d="M12 21v-9" /><path d="M12 8V3" />
      <path d="M20 21v-5" /><path d="M20 12V3" /><path d="M2 14h4" /><path d="M10 8h4" /><path d="M18 16h4" />
    </>
  ),
};

const NODES = [
  {
    key: 'desktop',
    href: '/products/desktop',
    step: 'Your desk',
    title: 'Glyphh Desktop',
    sub: 'Chat, work and code with any agent, on your machine.',
    chips: ['Agent', 'Skills', 'Workspaces'],
  },
  {
    key: 'router',
    href: '/products/router',
    step: 'One endpoint',
    title: 'Model Router',
    sub: 'Every model and your connections behind one address.',
    chips: ['Every model', 'Connections', 'One budget'],
    centre: true,
  },
];

function Link({ label }) {
  return (
    <div className="hmap-link" aria-hidden="true">
      <span className="hmap-link-label">{label}</span>
      <span className="hmap-link-line" />
    </div>
  );
}

export default function HeroMap() {
  return (
    <nav className="hmap" aria-label="Glyphh products">
      {NODES.map((n, i) => (
        <div key={n.key} className="hmap-cell">
          {i > 0 && <Link label="models + tools" />}
          <a href={n.href} className={`hmap-node${n.centre ? ' hmap-node-centre' : ''}`}>
            <span className="hmap-step">{n.step}</span>
            <span className="hmap-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {ICON[n.key]}
              </svg>
              {n.title}
            </span>
            <span className="hmap-sub">{n.sub}</span>
            <span className="hmap-chips">
              {n.chips.map((c) => <span key={c} className="hmap-chip">{c}</span>)}
            </span>
            <span className="hmap-go">Explore &rarr;</span>
          </a>
        </div>
      ))}
    </nav>
  );
}
