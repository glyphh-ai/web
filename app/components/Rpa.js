/**
 * RPA — agent-driven robotic process automation across your apps.
 *
 * A huge, previously-unspoken feature: Glyphh automates the real work
 * across apps as durable Flows, driven by an agent that already has your
 * context — not a brittle click-recorder.
 */

const pillars = [
  {
    title: 'Automate across every app',
    desc: 'The agent navigates panels, fills forms, extracts data, and moves it between apps — the same point-and-click work you’d otherwise do by hand, done for you.',
  },
  {
    title: 'Durable Flows, not recordings',
    desc: 'Cron-scheduled or event-driven runbooks that chain skills, MCP tools, and agent turns into one process — auditable, retried, and observable on disk.',
  },
  {
    title: 'Resilient by design',
    desc: 'Because an agent with context drives it — not pixel coordinates — Flows adapt when a button moves or a layout changes, instead of shattering like legacy RPA.',
  },
  {
    title: 'Hand off and walk away',
    desc: 'Kick off a task and keep working. Glyphh runs the process in the background across your apps and reports back when it’s done.',
  },
];

export default function Rpa() {
  return (
    <section className="adal" id="rpa">
      <div className="container">
        <div className="section-label reveal">{'{'}
          <span className="accent">RPA / AUTOMATION</span>
          {'}'}</div>
        <h2 className="section-title reveal">
          RPA without<br/>the brittle scripts.
        </h2>
        <p className="adal-lede reveal">
          Glyphh automates the actual work across your apps — clicking,
          filling, extracting, moving data — as durable Flows. Robotic
          process automation driven by an agent that already has your
          context, not a recorder that breaks the moment a button moves.
        </p>
        <div className="adal-grid">
          {pillars.map((p, i) => (
            <div key={i} className="adal-pillar reveal">
              <div className="adal-pillar-bullet" aria-hidden="true">·</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
