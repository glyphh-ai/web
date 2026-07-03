/**
 * MCP — the lead story: one secure relay connects the AI you already use to
 * your real desktop. No new chatbot to learn, no tokens resold — your LLM,
 * our workspace.
 */

const pillars = [
  {
    title: 'Bring the AI you already pay for',
    desc: 'Claude, ChatGPT, Gemini, Cursor — any MCP client connects to your Glyphh endpoint with one approval. No copied tokens, no config files: sign in, connect, done.',
  },
  {
    title: 'Real control of a real desktop',
    desc: 'Your AI opens apps, tiles OS windows into saved layouts, clicks, types, reads, and screenshots — native window control on Mac and Windows, not a browser sandbox.',
  },
  {
    title: 'Every tool, one surface',
    desc: 'Connected services (Gmail, Slack, Notion, GitHub — 3,500+), installed Glyphh apps, your skills, and your local MCP servers all appear as tools your AI can discover and call.',
  },
  {
    title: 'Guarded by default',
    desc: 'An injection firewall screens every request before it reaches your machine, tool calls are scoped per user, and there’s a local-only server mode when you want no cloud at all.',
  },
];

export default function Mcp() {
  return (
    <section className="adal" id="mcp">
      <div className="container">
        <div className="section-label reveal">{'{'}
          <span className="accent">THE RELAY</span>
          {'}'}</div>
        <h2 className="section-title reveal">
          Your AI on one side.<br/>Your computer on the other.
        </h2>
        <p className="adal-lede reveal">
          Glyphh is a secure MCP relay between the AI you already use and the
          desktop you already work on. Connect Claude or ChatGPT once and it
          can drive your workspace from anywhere — open apps, run layouts,
          work your tools — while you watch it happen on screen.
        </p>
        <div className="adal-grid">
          {pillars.map((p, i) => (
            <div key={i} className="adal-pillar reveal">
              <div className="adal-pillar-bullet" aria-hidden="true">·</div>
              <h3>{p.title}{p.badge && <span className="feature-badge">{p.badge}</span>}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
