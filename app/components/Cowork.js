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
        <h2 className="section-title reveal">Your apps open beside the agent.</h2>
        <p className="section-subtitle reveal">
          Gmail, Slack, dashboards — anything with a page — opens as a panel
          next to Glyphh. You navigate your day in the same window the agent
          works in: watching it read the sheet and draft the email, steerable
          at any moment, no alt-tabbing around it.
        </p>

        <div className="reveal">
          <ExpandableShot src="/screen-shots/glyphh-workspace.png" alt="A Glyphh workspace — the agent working in Gmail and Calendar, open beside the chat" />
        </div>
      </div>
    </section>
  );
}
