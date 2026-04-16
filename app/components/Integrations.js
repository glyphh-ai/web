const integrations = [
  { icon: 'C', name: 'Claude' },
  { icon: 'G', name: 'Gemini' },
  { icon: 'O', name: 'ChatGPT' },
  { icon: '>_', name: 'Claude Code' },
  { icon: '+', name: 'Any URL' },
];

export default function Integrations() {
  return (
    <section className="integrations" id="integrations">
      <div className="container">
        <h2 className="section-title">Works with every AI you already use</h2>
        <div className="integration-logos">
          {integrations.map((item, i) => (
            <div key={i} className="integration-item reveal">
              <div className="integration-icon">{item.icon}</div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        <p className="integration-note">
          Each AI runs in its own panel inside the .Yo desktop app. Context flows between them automatically.
        </p>
      </div>
    </section>
  );
}
