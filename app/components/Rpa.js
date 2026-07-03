/**
 * Automation — the work your AI does through Glyphh: driving real apps,
 * running deterministic skills, and moving data across services. RPA where
 * the "robot" is the AI you already trust.
 */

const pillars = [
  {
    title: 'Automate across every app',
    desc: 'Your AI navigates windows, fills forms, extracts data, and moves it between apps — the same point-and-click work you’d otherwise do by hand, done for you while you watch.',
  },
  {
    title: 'Skills — deterministic, repeatable',
    desc: 'Capture a workflow once as a skill and any connected AI can run it on demand. Skills execute exactly the same way every time — auditable and shareable, not improvised.',
  },
  {
    title: 'Resilient by design',
    desc: 'An AI with judgment drives the work — not pixel coordinates. When a button moves or a layout changes, it adapts instead of shattering like legacy RPA scripts.',
  },
  {
    title: 'Hand off and walk away',
    desc: 'Ask from your phone, your laptop, or a chat window: the relay reaches your workspace wherever you left it running and reports back when the job is done.',
  },
];

export default function Rpa() {
  return (
    <section className="adal" id="rpa">
      <div className="container">
        <div className="section-label reveal">{'{'}
          <span className="accent">AUTOMATION</span>
          {'}'}</div>
        <h2 className="section-title reveal">
          RPA without<br/>the brittle scripts.
        </h2>
        <p className="adal-lede reveal">
          Glyphh automates the actual work across your apps — clicking,
          filling, extracting, moving data — driven by the AI you already
          use, through tools it can see and you can audit. Not a click
          recorder that breaks the moment a button moves.
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
