const PILLARS = [
  {
    num: '01',
    tag: 'vsa',
    title: 'Vector-Symbolic Architectures',
    desc: 'Knowledge as structure you can compute with — symbols bound and composed algebraically, not approximated.',
  },
  {
    num: '02',
    tag: 'hdc',
    title: 'Hyperdimensional Computing',
    desc: 'Classification and routing in microseconds, no GPU in the loop.',
  },
  {
    num: '03',
    tag: 'memory',
    title: 'Memory Systems',
    desc: 'Recall that never confabulates — exact, versioned, auditable. This is why the agent remembers.',
  },
  {
    num: '04',
    tag: 'runtime',
    title: 'Agentic Runtimes',
    desc: 'The machinery under every loop: tools, state, and compute, desktop to cloud.',
  },
];

export default function ResearchPillars() {
  return (
    <section className="pillars" id="frontier">
      <div className="container">
        <div className="section-label">{'{'} <span className="accent">THE FRONTIER</span> {'}'}</div>
        <h2 className="section-title">The science underneath</h2>
        <p className="section-sub">
          The products earn trust because of what is under them: memory,
          structure, and the machinery agents run on.
          <a href="/research" className="pillars-link"> The full research →</a>
        </p>
        {/* The same offset-timeline flare as the research page — in our purple. */}
        <div className="rp-track rp-purple">
          <div className="rp-spine" aria-hidden="true" />
          {PILLARS.map((p, i) => (
            <div key={p.tag} className={`rp-stage reveal ${i % 2 ? 'rp-stage-right' : 'rp-stage-left'}`}>
              <span className="rp-dot" aria-hidden="true"><em>{p.num}</em></span>
              <div className="rp-card rp-card-static">
                <div className="rp-card-head">
                  <span className="pillar-tag">{p.tag}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
