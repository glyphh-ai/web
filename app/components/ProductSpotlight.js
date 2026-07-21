/**
 * ProductSpotlight — the Desktop story on the home page, compressed: the
 * gradient canvas from the product page (ask over the delivered deck, static),
 * three one-liners, one link through. The product page owns the rest.
 */

const favicon = (d) => `https://www.google.com/s2/favicons?domain=${d}&sz=64`;

const POINTS = [
  { title: 'The right loop for every job', desc: 'The whole app reorients around the loop the work calls for.' },
  { title: 'Every model, one subscription', desc: 'Frontier when it matters, open weights when it doesn’t.' },
  { title: 'Governed by you', desc: 'Approvals, tool limits, and budgets — enforced at the gateway.' },
];

export default function ProductSpotlight() {
  return (
    <section className="spotlight" id="desktop">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">GLYPHH DESKTOP</span> {'}'}</div>
        <h2 className="section-title reveal">The AI that follows you everywhere you work.</h2>
        <p className="sp-sub reveal">
          Ask in plain words. It plans, does, and delivers — across the tools
          you already use.
        </p>

        <a href="/products/desktop" className="sp-link reveal" aria-label="Explore Glyphh Desktop">
          <div className="hs-canvas sp-canvas" aria-hidden="true">
            <div className="hs-slides sp-slides">
              <div className="hs-slide">
                <div className="hs-slide-art"><span className="hs-slide-art-glyph">⣿</span></div>
                <div className="hs-slide-title">Q3 Review</div>
                <div className="hs-slide-sub" />
              </div>
            </div>
            <div className="hs-ask sp-ask">
              <div className="hs-ask-text sp-ask-text">
                Read the <span className="hs-chip" style={{ color: '#4285f4' }}><img src={favicon('drive.google.com')} alt="" />Q3 folder</span> and
                build a <span className="hs-chip" style={{ color: '#f4b400' }}><img src={favicon('docs.google.com')} alt="" />slide deck</span> for
                the 2pm call
              </div>
              <div className="hs-bar">
                <span className="hs-pill hs-pill-mode"><i className="hs-mode-dot" />Auto</span>
                <span className="hs-bar-spacer" />
                <span className="hs-pill hs-pill-loop">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-2.6-6.3" /><polyline points="21 3 21 9 15 9" /></svg>
                  Plan &amp; Build
                </span>
                <span className="hs-meter"><i className="hs-meter-fill" /><i className="hs-meter-tick" /></span>
              </div>
            </div>
          </div>
        </a>

        <div className="sp-points reveal">
          {POINTS.map((pt) => (
            <div className="sp-point" key={pt.title}>
              <h3>{pt.title}</h3>
              <p>{pt.desc}</p>
            </div>
          ))}
        </div>
        <p className="sp-cta reveal"><a href="/products/desktop">Explore Glyphh Desktop →</a></p>
      </div>
    </section>
  );
}
