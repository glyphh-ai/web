/**
 * DevLayout — "Built for builders, too." as a single 16:9 product shot
 * (real screenshot in /screen-shots/glyphh-builders.png; swap the file to
 * refresh). The old abstract files/editor/terminal/picker mock is gone.
 */

export default function DevLayout() {
  return (
    <section className="devlayout" id="builders">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">BUILD</span> {'}'}</div>
        <h2 className="section-title reveal">Built for builders, too.</h2>

        <div className="dv-shot reveal">
          <span className="dv-shot-inner">
            <img src="/screen-shots/glyphh-builders.png" alt="The Glyphh dev workspace — files, editor, terminal, and the coding agent side by side" loading="lazy" />
          </span>
        </div>
      </div>
    </section>
  );
}
