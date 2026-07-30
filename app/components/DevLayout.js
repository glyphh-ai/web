/**
 * DevLayout — "{ BUILD }" — the dev workspace as a single 16:9 product shot
 * (real screenshot in /screen-shots/glyphh-builders.png; swap the file to
 * refresh).
 */

import ExpandableShot from './ExpandableShot';

export default function DevLayout() {
  return (
    <section className="devlayout" id="builders">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">BUILD</span> {'}'}</div>
        <h2 className="section-title reveal">Then you build.</h2>
        <p className="section-subtitle reveal">
          A full dev workspace is one Layout away — files, editor, diff,
          terminal, and a coding agent in its own pane. The same loops that
          clear your inbox write, test, and review code.
        </p>

        <div className="reveal">
          <ExpandableShot src="/screen-shots/glyphh-builders.png" alt="The Glyphh dev workspace — files, editor, terminal, and the coding agent side by side" />
        </div>
      </div>
    </section>
  );
}
