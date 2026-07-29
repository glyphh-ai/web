import ExpandableShot from './ExpandableShot';

/**
 * ProductSpotlight — the Desktop story on the home page, compressed: one real
 * 16:9 product shot (/screen-shots/glyphh-app-home.png; swap the file to
 * refresh), three one-liners, one link through. The product page owns the rest.
 */

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

        <div className="reveal">
          <ExpandableShot src="/screen-shots/glyphh-app-home.png" alt="Glyphh Desktop — the workspace at home" />
        </div>

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
