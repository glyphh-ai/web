const PRODUCTS = [
  {
    href: '/products/apps',
    name: 'Glyphh Apps',
    status: 'available now',
    desc: 'The workspace your AI drives. A native desktop app for Mac and Windows — your apps, windows, layouts, and 3,500+ connected services behind one secure MCP relay.',
    cta: 'Explore Glyphh Apps →',
  },
  {
    href: '/products/code',
    name: 'Glyphh Code',
    status: 'early access',
    desc: 'Agentic coding built on the Glyphh runtime — an agent with real memory via Ada, HDC-fast intent routing, and MCP-native tools, working in your repo on your terms.',
    cta: 'Explore Glyphh Code →',
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
