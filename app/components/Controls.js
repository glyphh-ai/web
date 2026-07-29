import ExpandableShot from './ExpandableShot';

/**
 * Controls — "Security and governance." One real 16:9 product shot
 * (/screen-shots/glyphh-governance.png; swap the file to refresh). The old
 * abstract mock (connection toggles, narrowed tools, usage chart) is gone.
 */

export default function Controls() {
  return (
    <section className="controls" id="governance">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">SECURITY</span> {'}'}</div>
        <h2 className="section-title reveal">You decide how far it goes.</h2>
        <p className="section-subtitle reveal">
          Anything risky stops on an approval card. Connections shared by the
          org, tools narrowed per team, budgets enforced at the gateway —
          agents this capable need rules, and you set them.
        </p>

        <div className="reveal">
          <ExpandableShot src="/screen-shots/glyphh-governance.png" alt="Glyphh governance — org connections, narrowed tools, and enforced budgets" />
        </div>
      </div>
    </section>
  );
}
