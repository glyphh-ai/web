'use client';

/**
 * OrbitGraphic — the hero's marketing visual.
 *
 * Glyphh sits at the core; the AI models (Claude, ChatGPT, Gemini) orbit on
 * the inner ring and the apps you reach through Pipedream + MCP orbit on the
 * outer ring. The story in one picture: every model and every app, connected
 * through one workspace.
 *
 * Each icon stays upright while its ring revolves — the ring rotates, the slot
 * places the icon around it, and an inner counter-rotation cancels both the
 * ring's spin and the slot's offset. Disabled under prefers-reduced-motion.
 */

const AI_NODES = [
  { name: 'Claude', domain: 'claude.ai' },
  { name: 'ChatGPT', domain: 'chatgpt.com' },
  { name: 'Gemini', domain: 'gemini.google.com' },
  { name: 'Grok', domain: 'grok.com' },
  { name: 'Perplexity', domain: 'perplexity.ai' },
  { name: 'DeepSeek', domain: 'chat.deepseek.com' },
  { name: 'Mistral', domain: 'mistral.ai' },
  { name: 'Copilot', domain: 'copilot.microsoft.com' },
];

const APP_NODES = [
  { name: 'Slack', domain: 'slack.com' },
  { name: 'GitHub', domain: 'github.com' },
  { name: 'Notion', domain: 'notion.so' },
  { name: 'Gmail', domain: 'mail.google.com' },
  { name: 'Stripe', domain: 'stripe.com' },
  { name: 'Figma', domain: 'figma.com' },
  { name: 'Linear', domain: 'linear.app' },
  { name: 'Shopify', domain: 'shopify.com' },
  { name: 'Jira', domain: 'atlassian.com' },
  { name: 'Airtable', domain: 'airtable.com' },
  { name: 'Asana', domain: 'asana.com' },
  { name: 'Discord', domain: 'discord.com' },
  { name: 'Supabase', domain: 'supabase.com' },
  { name: 'Vercel', domain: 'vercel.com' },
  { name: 'HubSpot', domain: 'hubspot.com' },
  { name: 'Salesforce', domain: 'salesforce.com' },
];

const favicon = (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

function Ring({ nodes, className }) {
  const step = 360 / nodes.length;
  return (
    <div className={`orbit-ring ${className}`} aria-hidden="true">
      {nodes.map((n, i) => (
        <div key={n.name} className="orbit-slot" style={{ '--a': `${i * step}deg` }}>
          <div className="orbit-node">
            <div className="orbit-node-spin">
              <span className="orbit-chip" title={n.name}>
                <img
                  src={favicon(n.domain)}
                  alt=""
                  width={28}
                  height={28}
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling?.classList.add('visible');
                  }}
                />
                <span className="orbit-chip-fallback">{n.name.charAt(0)}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function OrbitGraphic() {
  return (
    <div
      className="orbit"
      role="img"
      aria-label="Glyphh at the center, connecting Claude, ChatGPT and Gemini to Slack, GitHub, Notion and 3,500+ apps"
    >
      <span className="orbit-glow" aria-hidden="true" />
      <Ring nodes={APP_NODES} className="orbit-ring-outer" />
      <Ring nodes={AI_NODES} className="orbit-ring-inner" />
      <div className="orbit-core" aria-hidden="true">
        <img src="/glyphh-mascot.png" alt="" width={76} height={76} />
      </div>
    </div>
  );
}
