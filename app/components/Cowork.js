import ExpandableShot from './ExpandableShot';

/**
 * Cowork — "Watch the work happen." One real 16:9 product shot
 * (/screen-shots/glyphh-workspace.png; swap the file to refresh).
 */

export default function Cowork() {
  return (
    <section className="cowork" id="workspace">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">WORKSPACE</span> {'}'}</div>
        <h2 className="section-title reveal">Watch the work happen.</h2>
        <p className="section-subtitle reveal">
          Your agents don&apos;t work in a cloud somewhere. They work here, in
          the apps open beside them — reading the sheet, drafting the email —
          in front of your eyes and steerable at any moment.
        </p>

        <div className="reveal">
          <ExpandableShot src="/screen-shots/glyphh-workspace.png" alt="A Glyphh workspace — the agent working in Gmail and Calendar, open beside the chat" />
        </div>
      </div>
    </section>
  );
}
