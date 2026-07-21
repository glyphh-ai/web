/**
 * Controls — the gateway + enterprise story, made human: an approval card and
 * three rules. "You decide" is the product; the admin console is the proof.
 */
export default function Controls() {
  return (
    <section className="controls" id="control">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">CONTROL</span> {'}'}</div>
        <h2 className="section-title reveal">You decide how far it goes.</h2>
        <p className="ct-sub reveal">
          It asks before anything risky. Your org sets the rules — models, tools,
          and budgets — behind one gateway your admins own.
        </p>

        <div className="ct-stage reveal" aria-hidden="true">
          <div className="ct-card">
            <div className="ct-card-tag">Needs your OK</div>
            <div className="ct-card-title">Send 4 drafted replies</div>
            <div className="ct-card-sub">Gmail · outside your workspace</div>
            <div className="ct-card-actions">
              <span className="ct-btn ct-btn-ok">Approve</span>
              <span className="ct-btn">Not now</span>
            </div>
          </div>
          <div className="ct-rules">
            <div className="ct-rule"><span className="ct-rule-name">Models your org allows</span><span className="ct-pill ct-pill-on" /></div>
            <div className="ct-rule"><span className="ct-rule-name">Tools each team can touch</span><span className="ct-pill ct-pill-on" /></div>
            <div className="ct-rule"><span className="ct-rule-name">Budgets that stop at the line</span><span className="ct-pill ct-pill-on" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
