const PILLARS = [
  {
    num: '01',
    tag: 'vsa',
    title: 'Vector-Symbolic Architectures',
    desc: 'Structure you can compute with. We represent knowledge as compositional high-dimensional vectors — binding, bundling, and permuting symbols algebraically instead of approximating them.',
  },
  {
    num: '02',
    tag: 'hdc',
    title: 'Hyperdimensional Computing',
    desc: 'Inference in microseconds, not GPUs. Pure-HDC encoders classify, parse, and route language with character-level precision — no LLM in the loop.',
  },
  {
    num: '03',
    tag: 'memory',
    title: 'Memory Systems',
    desc: 'Memory that never confabulates. Ada writes every fact into a universal schema at write time, so recall is a deterministic scan — exact, versioned, auditable.',
  },
  {
    num: '04',
    tag: 'runtime',
    title: 'Agentic Runtimes',
    desc: 'The machinery agents run on. Runtimes that give models tools, state, and compute — from the desktop to the cloud — over open protocols like MCP.',
  },
];

export default function ResearchPillars() {
  return (
    <section className="pillars" id="frontier">
      <div className="container">
        <div className="section-label">{'{'} <span className="accent">THE FRONTIER</span> {'}'}</div>
        <h2 className="section-title">A search for a cognitive primitive</h2>
        <p className="section-sub">
          Deep learning got us here. We believe the next layer is memory,
          structure, and the machinery agents run on. The frontier is a
          mathematical primitive models can leverage as a cognitive substrate.
        </p>
        <div className="pillars-grid">
          {PILLARS.map((p) => (
            <div key={p.tag} className="pillar-card reveal">
              <div className="pillar-head">
                <span className="pillar-num">{p.num}</span>
                <span className="pillar-tag">{p.tag}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
