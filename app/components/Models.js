const models = [
  {
    name: 'Will 7b',
    tag: 'The assistant',
    desc: 'The everyday assistant built into Glyphh Desktop. Free, private, and always there — nothing you say or see leaves your machine.',
    can: [
      'Opens your apps and arranges your workspace on command',
      'Runs your connected tools — send the email, file the ticket, update the doc',
      'Answers questions about whatever you’re working on',
    ],
    specs: ['8 GB memory or more', '5 GB download', 'Works offline'],
  },
  {
    name: 'William 14b',
    tag: 'The coder',
    desc: 'The heavier hand for real work on files and projects. Free on your hardware — and your code never leaves it.',
    can: [
      'Reads, edits, and creates files across a whole project',
      'Automates multi-step jobs end-to-end on your workspace',
      'Everything will-7b-mini does, with more muscle',
    ],
    specs: ['16 GB memory or more', '9 GB download', 'Works offline'],
  },
];

export default function Models() {
  return (
    <section className="features-grid" id="models">
      <div className="container">
        <div className="section-label">{'{'}
          <span className="accent">BUILT-IN MODELS</span>
          {'}'}</div>
        <h2 className="section-title">Two models live on your machine</h2>
        <div className="grid-2">
          {models.map((m) => (
            <div key={m.name} className="model-card reveal">
              <h3>{m.name}<span className="feature-badge">{m.tag}</span></h3>
              <p>{m.desc}</p>
              <ul className="model-can">
                {m.can.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
              <div className="model-specs">
                {m.specs.map((s, i) => <span key={i}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
        <p className="models-note">
          Both download on first use, run entirely on your device, and cost nothing to use — no account required.
        </p>
      </div>
    </section>
  );
}
