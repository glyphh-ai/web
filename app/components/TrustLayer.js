/**
 * TrustLayer — one band, two halves, one message: "you can trust this."
 * Framed like every other section ({ label } + band ground), and both
 * halves share ONE card treatment so governance and science read as a
 * single layer, not two leftovers. The full research narrative lives on
 * /research.
 */

const GOVERNED = [
  { tag: 'approvals', title: 'Approvals', line: 'Irreversible actions wait for your yes.' },
  { tag: 'limits', title: 'Limits & budgets', line: 'Tool scopes, call caps, and spend ceilings, enforced on every call.' },
  { tag: 'firewall', title: 'Injection firewall', line: 'Every relayed request is screened before it reaches your machine.' },
  { tag: 'local', title: 'Local-only mode', line: 'Skip the cloud entirely when you want to.' },
];

const PILLARS = [
  {
    tag: 'vsa',
    title: 'Vector-Symbolic Architectures',
    desc: 'Knowledge as structure you can compute with — symbols bound and composed algebraically, not approximated.',
  },
  {
    tag: 'hdc',
    title: 'Hyperdimensional Computing',
    desc: 'Classification and routing in microseconds, no GPU in the loop.',
  },
  {
    tag: 'memory',
    title: 'Memory Systems',
    desc: 'Recall that never confabulates — exact, versioned, auditable. This is why the agent remembers.',
  },
  {
    tag: 'runtime',
    title: 'Agentic Runtimes',
    desc: 'The machinery under every loop: tools, state, and compute, desktop to cloud.',
  },
];

export default function TrustLayer() {
  return (
    <section className="trust" id="trust">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">THE TRUST LAYER</span> {'}'}</div>
        <h2 className="section-title reveal">Governed by you.</h2>

        <div className="trust-grid reveal">
          {GOVERNED.map((g) => (
            <div className="trust-card" key={g.tag}>
              <span className="pillar-tag">{g.tag}</span>
              <h4>{g.title}</h4>
              <p>{g.line}</p>
            </div>
          ))}
        </div>

        <div className="trust-science reveal">
          <h3 className="trust-sci-head">The science underneath</h3>
          <p className="trust-intro">The products earn trust because of what&rsquo;s under them.</p>
        </div>

        <div className="trust-grid reveal">
          {PILLARS.map((p) => (
            <div className="trust-card" key={p.tag}>
              <span className="pillar-tag">{p.tag}</span>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
