/**
 * MCP — the lead story: Glyphh is the connective tissue between every LLM a
 * developer uses and everything they've connected and built. Wire it up once;
 * every client gets it.
 */

// The hero panel's app rail (GlyphhHero APPS) — the connections that flow
// through the relay. Duplicated here because GlyphhHero is a client module.
const MCX_APPS = [
  'slack.com', 'mail.google.com', 'salesforce.com', 'github.com', 'notion.so',
  'figma.com', 'linear.app', 'stripe.com', 'vercel.com', 'discord.com',
  'zoom.us', 'asana.com', 'airtable.com', 'dropbox.com', 'shopify.com',
  'hubspot.com', 'atlassian.net', 'docs.google.com', 'calendly.com', 'intercom.com',
];

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

        {/* Marketecture: every LLM (left) ⇄ one relay (mascot) ⇄ everything
            you build (right). Two-way pulses = tool call out, result back.
            Shares the apx-* visual language from the PUBLISH graphic. */}
        <div className="apx-stage mcx-stage reveal" aria-hidden="true">
          <div className="apx-col">
            <div className="apx-col-label">every LLM</div>
            <div className="mcx-llms">
              {[
                'claude.ai', 'chatgpt.com', 'gemini.google.com', 'grok.com',
                'copilot.microsoft.com', 'chat.mistral.ai', 'chat.qwen.ai', 'ollama.com',
              ].map((domain, i) => (
                <span key={domain} className="mcx-llm" style={{ '--d': `${i * 0.45}s` }}>
                  <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} alt="" width="20" height="20" loading="lazy" />
                </span>
              ))}
            </div>
          </div>
          <div className="mcx-flows">
            <div className="apx-flow"><i /><i /><i /></div>
            <div className="apx-flow mcx-flow-back"><i /><i /></div>
          </div>
          <div className="apx-hub mcx-hub">
            {/* connections strip — the hero panel's app rail, marquee-scrolled
                above the hub: everything already connected flows through. */}
            <div className="mcx-apps">
              <span className="mcx-apps-label">connections</span>
              <div className="mcx-apps-track">
                {[...MCX_APPS, ...MCX_APPS].map((d, i) => (
                  <span key={d + i} className="mcx-app">
                    <img src={`https://www.google.com/s2/favicons?domain=${d}&sz=64`} alt="" width="16" height="16" loading="lazy" />
                  </span>
                ))}
              </div>
            </div>
            <div className="apx-glow" />
            <div className="apx-orbit" />
            <div className="mcx-orbit-b" />
            <img src="/glyphh-mascot-square-black.png" alt="" className="apx-mascot" width="88" height="88" />
            <span className="apx-hub-label">Glyphh</span>
          </div>
          <div className="mcx-flows">
            <div className="apx-flow"><i /><i /><i /></div>
            <div className="apx-flow mcx-flow-back"><i /><i /></div>
          </div>
          <div className="apx-col">
            <div className="apx-col-label">everything you build</div>
            <div className="apx-node">3,500+ services</div>
            <div className="apx-node">tools &amp; skills</div>
            <div className="apx-node">apps &amp; agents</div>
          </div>
        </div>

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
