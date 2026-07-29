import ExpandableShot from './ExpandableShot';

/**
 * LoopStrip — "The right loop for every job." One real 16:9 product shot
 * (/screen-shots/glyphh-custom-apps.png; swap the file to refresh). The old
 * abstract mock (gradient canvas, project board, floating model flow) is gone.
 */

export default function LoopStrip() {
  return (
    <section className="loopstrip" id="loops">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">LOOPS</span> {'}'}</div>
        <h2 className="section-title reveal">The right loop for every job.</h2>
        <p className="ls-sub reveal">
          Not one loop for all work. Every job picks its loop — and the whole
          app reorients around it: the models that think, the tools it may
          touch, the workspace it opens. Your best way of working, saved and
          repeatable.
        </p>

        <div className="reveal">
          <ExpandableShot src="/screen-shots/glyphh-custom-apps.png" alt="A loop reorienting the Glyphh workspace — models, tools, and layout per job" />
        </div>
      </div>
    </section>
  );
}
