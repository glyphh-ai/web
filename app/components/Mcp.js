/**
 * THE CALLOUT (his order, 2026-09-18): Glyphh in the middle. The loops on the
 * left, Glyphh Connect streaming in above, Glyphh Router on the right. This is
 * the pitch drawn once, and it sits directly under the hero.
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
    title: 'Any loop drives it',
    desc: 'Claude Code, Codex, Gemini, or the Glyphh loop. The desktop, the tools, the skills, and the connections are the same whichever one is in the seat. Swap mid-task.',
  },
  {
    title: 'Glyphh Connect',
    desc: '3,500+ services as tools: Gmail, Slack, Salesforce, GitHub, Notion, and the rest, with org-shared or personal auth. Every loop can call them. RPA reaches what has no API.',
  },
  {
    title: 'Glyphh Router',
    desc: 'One endpoint in front of every model, and a choice of how to spend. Burn down: your vendor subscriptions first, the proxy when they run dry. Reserved: the heavy models stay on your subscriptions, everything lighter rides the proxy. Roles decide who gets what; every token, cached or not, is accounted for.',
  },
  {
    title: 'Local by default',
    desc: 'Apps, files, memory, and keys stay on the machine. The router is the only thing in the cloud, and only when the org turns it on.',
  },
];

export default function Mcp() {
  return (
    <section className="adal" id="mcp">
      <div className="container">
        <div className="section-label reveal">{'{'}
          <span className="accent">THE HARNESS</span>
          {'}'}</div>
        <h2 className="section-title reveal">
          Glyphh in the middle.<br/>Loops on one side, models on the other.
        </h2>
        <p className="adal-lede reveal">
          Any loop drives the desktop. Glyphh Connect brings 3,500+ services in
          as tools. Glyphh Router sends the work to frontier AI on your credits,
          then to open-weight models when those run out.
        </p>

        {/* Marketecture: every LLM (left) ⇄ one relay (mascot) ⇄ everything
            you build (right). Two-way pulses = tool call out, result back.
            Shares the apx-* visual language from the PUBLISH graphic. */}
        <div className="apx-stage mcx-stage reveal" aria-hidden="true">
          <div className="apx-col">
            <div className="apx-col-label">the loops</div>
            <div className="apx-node">Claude Code</div>
            <div className="apx-node">Codex</div>
            <div className="apx-node">Gemini</div>
            <div className="apx-node">Glyphh loop</div>
            <div className="mcx-llms">
              {[
                'claude.ai', 'chatgpt.com', 'gemini.google.com', 'github.com',
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
              <span className="mcx-apps-label">Glyphh Connect · 3,500+ services</span>
              <div className="mcx-apps-track">
                {[...MCX_APPS, ...MCX_APPS].map((d, i) => (
                  <span key={d + i} className="mcx-app">
                    <img src={`https://www.google.com/s2/favicons?domain=${d}&sz=64`} alt="" width="16" height="16" loading="lazy" />
                  </span>
                ))}
              </div>
            </div>
            {/* vertical pulses: connections stream down into Glyphh, results back up */}
            <div className="mcx-vflows">
              <div className="mcx-vflow"><i /><i /></div>
              <div className="mcx-vflow mcx-vflow-up"><i /><i /></div>
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
            <div className="apx-col-label">Glyphh Router</div>
            <div className="apx-node">frontier, on your credits</div>
            <div className="apx-node">open-weight, direct</div>
            <div className="apx-node">roles &amp; budgets</div>
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
