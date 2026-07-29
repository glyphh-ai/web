import ExpandableShot from './ExpandableShot';

/**
 * Cowork — "Where you work." One real 16:9 product shot
 * (/screen-shots/glyphh-workspace.png; swap the file to refresh). The old
 * animated mock (command overlay, Slack/Gmail/Calendar/Asana scenes) is gone.
 */

export default function Cowork() {
  return (
    <section className="cowork" id="workspace">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">WORKSPACE</span> {'}'}</div>
        <h2 className="section-title reveal">Where you work.</h2>
        <p className="cw-sub reveal">
          One click builds the workspace — the agent always at your side.
        </p>

        <div className="reveal">
          <ExpandableShot src="/screen-shots/glyphh-workspace.png" alt="A Glyphh workspace — apps arranged beside the agent" />
        </div>
      </div>
    </section>
  );
}
