/**
 * ReleaseStrip — "{ RELEASE }" — the payoff of the heart: work ships as a
 * live app. Text-only section; the published URL is the visual.
 */

export default function ReleaseStrip() {
  return (
    <section className="release" id="release">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">RELEASE</span> {'}'}</div>
        <h2 className="section-title reveal">And release it as a live app.</h2>
        <div className="release-url reveal" aria-hidden="true">
          <span className="release-lock">🔒</span> your-app.glyphh.app
        </div>
        <p className="section-subtitle reveal">
          Ask for an app and the loop goes all the way: built, hosted, and
          published — on your phone, shareable with your team. Work that used
          to end as a file ends as a product.
        </p>
      </div>
    </section>
  );
}
