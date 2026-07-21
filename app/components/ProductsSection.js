const PRODUCTS = [
  {
    href: '/products/desktop',
    name: 'Glyphh Desktop',
    status: 'available now',
    desc: 'The team collaboration agent for real work. Ask for the deck, the brief, the batch of replies — it plans, does, and delivers across 3,500+ connected services, with you deciding how far it goes.',
    cta: 'Explore Glyphh Desktop →',
  },
];

export default function ProductsSection() {
  return (
    <section className="prods" id="products">
      <div className="container">
        <div className="section-label">{'{'} <span className="accent">PRODUCTS</span> {'}'}</div>
        <h2 className="section-title">Research you can run</h2>
        <p className="section-sub">
          We&apos;re a software company too. Our products are built directly on
          the research — and stay open source, all the way down.
        </p>
        <div className="prods-grid">
          {PRODUCTS.map((p) => (
            <a key={p.href} href={p.href} className="prod-card reveal">
              <div className="prod-head">
                <h3>{p.name}</h3>
                <span className={`prod-status ${p.status === 'available now' ? 'live' : ''}`}>{p.status}</span>
              </div>
              <p>{p.desc}</p>
              <span className="prod-cta">{p.cta}</span>
            </a>
          ))}

          {/* Right: a theme-aligned graphic — the mascot as the hub of an
              orbiting relay, tying the "runnable research" story together. */}
          <div className="prod-graphic reveal">
            <div className="pg-head"><span className="pg-dot" aria-hidden="true" /> {'{'} open source {'}'}</div>
            <div className="pg-stage" aria-hidden="true">
              <div className="pg-orbit pg-orbit-a">
                <span className="pg-node" style={{ top: '-5px', left: '50%' }} />
                <span className="pg-node" style={{ bottom: '12%', right: '-5px' }} />
                <span className="pg-node" style={{ bottom: '12%', left: '-5px' }} />
              </div>
              <div className="pg-orbit pg-orbit-b" />
              <div className="pg-glow" />
              <img src="/glyphh-mascot-square-black.png" alt="" className="pg-mascot" width="112" height="112" />
            </div>
            <p className="pg-cap">Every product is built on the research — and open source, all the way down.</p>
            <a href="https://github.com/glyphh-ai" target="_blank" rel="noopener noreferrer" className="pg-link">github.com/glyphh-ai →</a>
          </div>
        </div>
        <div className="prods-pricing reveal">
          <div className="prods-pricing-copy">
            <h3>One pricing model. Every product.</h3>
            <p>
              All Glyphh products share the same credit system:{' '}
              <b>1 credit = 30 seconds of compute</b>. Each product draws
              credits differently, but the meter never changes — and your AI
              is always your own, never marked up.
            </p>
          </div>
          <a href="/pricing" className="btn btn-secondary btn-lg group">
            <span className="btn-label">See pricing</span>
            <span className="btn-fill"></span>
          </a>
        </div>
      </div>
    </section>
  );
}
