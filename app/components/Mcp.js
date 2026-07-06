/**
 * MCP — the lead story: Glyphh is the connective tissue between every LLM a
 * developer uses and everything they've connected and built. Wire it up once;
 * every client gets it.
 */

const pillars = [
  {
    title: 'Bring the AI you already pay for',
    desc: 'Claude, ChatGPT, Gemini, Cursor — any MCP client connects to your Glyphh endpoint with one approval. No copied tokens, no config files: sign in, connect, done.',
  },
  {
    title: 'Build once, call from every LLM',
    desc: 'Automations, integrations, agents, apps — whatever you build becomes MCP tools. Every connected client can call them instantly; no per-model plugins, no rebuilds when you switch LLMs.',
  },
  {
    title: 'Every tool, one surface',
    desc: 'Connected services (Gmail, Slack, Notion, GitHub — 3,500+), your Glyphh apps, your skills, and your local MCP servers all appear as tools any client can discover and call.',
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
          Every LLM on one side.<br/>Everything you build on the other.
        </h2>
        <p className="adal-lede reveal">
          Glyphh is the connective tissue between the LLMs you use and your
          stack. Connect your services once, build automations, agents, and
          apps on top — and every client you point at your Glyphh endpoint
          can use all of it, through one secure relay.
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
