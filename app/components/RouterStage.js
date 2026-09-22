/**
 * RouterStage — the marketecture, drawn once (his order, 2026-09-18): the
 * loops on the left, Glyphh Connect streaming in above, Glyphh Router on the
 * right, Glyphh in the middle. Lifted out of Mcp.js on 2026-09-21 so it can
 * sit to the RIGHT of the home hero (his order); Mcp still renders it.
 * Pure JSX, so it renders in a client tree (the hero) or a server one.
 */

// The hero panel's app rail (GlyphhHero APPS) — the connections that flow
// through the relay. Duplicated here because GlyphhHero is a client module.
const MCX_APPS = [
  'slack.com', 'mail.google.com', 'salesforce.com', 'github.com', 'notion.so',
  'figma.com', 'linear.app', 'stripe.com', 'vercel.com', 'discord.com',
  'zoom.us', 'asana.com', 'airtable.com', 'dropbox.com', 'shopify.com',
  'hubspot.com', 'atlassian.net', 'docs.google.com', 'calendly.com', 'intercom.com',
];

export default function RouterStage({ className = '', style }) {
  return (
    <div className={`apx-stage mcx-stage ${className}`} style={style} aria-hidden="true">
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
        <div className="apx-node">frontier, on your keys</div>
        <div className="apx-node">open-weight, direct</div>
        <div className="apx-node">roles &amp; budgets</div>
      </div>
    </div>
  );
}
