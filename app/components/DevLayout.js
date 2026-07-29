/**
 * DevLayout — "Some tasks end as a live app." — the ship beat, as a single
 * 16:9 product shot (real screenshot in /screen-shots/glyphh-builders.png;
 * swap the file to refresh).
 */

import ExpandableShot from './ExpandableShot';

export default function DevLayout() {
  return (
    <section className="devlayout" id="builders">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">SHIP</span> {'}'}</div>
        <h2 className="section-title reveal">Some tasks end as a live app.</h2>
        <p className="section-subtitle reveal">
          Built for builders — files, editor, terminal, and a coding agent in
          its own pane. And when a job deserves to be a product, it goes all
          the way: built, hosted, and published at your-app.glyphh.app, ready
          on your phone.
        </p>

        <div className="reveal">
          <ExpandableShot src="/screen-shots/glyphh-builders.png" alt="The Glyphh dev workspace — files, editor, terminal, and the coding agent side by side" />
        </div>
      </div>
    </section>
  );
}
