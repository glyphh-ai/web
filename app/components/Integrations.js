'use client';

const APPS_ROW1 = [
  { name: 'Claude', domain: 'claude.ai' },
  { name: 'ChatGPT', domain: 'chatgpt.com' },
  { name: 'Gemini', domain: 'gemini.google.com' },
  { name: 'Perplexity', domain: 'perplexity.ai' },
  { name: 'Grok', domain: 'grok.com' },
  { name: 'GitHub', domain: 'github.com' },
  { name: 'Notion', domain: 'notion.so' },
  { name: 'Figma', domain: 'figma.com' },
  { name: 'Slack', domain: 'app.slack.com' },
  { name: 'Gmail', domain: 'mail.google.com' },
  { name: 'Linear', domain: 'linear.app' },
  { name: 'Vercel', domain: 'vercel.com' },
  { name: 'Stripe', domain: 'dashboard.stripe.com' },
  { name: 'Reddit', domain: 'reddit.com' },
  { name: 'YouTube', domain: 'youtube.com' },
  { name: 'Midjourney', domain: 'midjourney.com' },
];

const APPS_ROW2 = [
  { name: 'Boomi', domain: 'boomi.com' },
  { name: 'n8n', domain: 'n8n.io' },
  { name: 'Copilot', domain: 'copilot.microsoft.com' },
  { name: 'Mistral', domain: 'chat.mistral.ai' },
  { name: 'Discord', domain: 'discord.com' },
  { name: 'Supabase', domain: 'supabase.com' },
  { name: 'Replit', domain: 'replit.com' },
  { name: 'v0', domain: 'v0.dev' },
  { name: 'Canva', domain: 'canva.com' },
  { name: 'Miro', domain: 'miro.com' },
  { name: 'Google Docs', domain: 'docs.google.com' },
  { name: 'Outlook', domain: 'outlook.live.com' },
  { name: 'Twitter', domain: 'x.com' },
  { name: 'LinkedIn', domain: 'linkedin.com' },
  { name: 'Sentry', domain: 'sentry.io' },
  { name: 'PostHog', domain: 'app.posthog.com' },
  { name: 'AWS', domain: 'console.aws.amazon.com' },
];

const APPS_ROW3 = [
  { name: 'Make', domain: 'make.com' },
  { name: 'Workato', domain: 'workato.com' },
  { name: 'Jira', domain: 'atlassian.net' },
  { name: 'Confluence', domain: 'atlassian.net' },
  { name: 'Asana', domain: 'asana.com' },
  { name: 'Airtable', domain: 'airtable.com' },
  { name: 'Dropbox', domain: 'dropbox.com' },
  { name: 'Google Drive', domain: 'drive.google.com' },
  { name: 'Loom', domain: 'loom.com' },
  { name: 'Calendly', domain: 'calendly.com' },
  { name: 'HubSpot', domain: 'hubspot.com' },
  { name: 'Intercom', domain: 'intercom.com' },
  { name: 'Datadog', domain: 'datadoghq.com' },
  { name: 'Grafana', domain: 'grafana.com' },
  { name: 'Shopify', domain: 'shopify.com' },
  { name: 'Webflow', domain: 'webflow.com' },
  { name: 'Trello', domain: 'trello.com' },
  { name: 'Zapier', domain: 'zapier.com' },
];

function ScrollRow({ apps, direction }) {
  const items = [...apps, ...apps];
  return (
    <div className="scroll-track-wrap">
      <div className={`scroll-track ${direction}`}>
        {items.map((app, i) => (
          <div
            key={`${app.domain}-${i}`}
            className="scroll-app"
            aria-label={app.name}
          >
            <img
              src={`https://www.google.com/s2/favicons?domain=${app.domain}&sz=64`}
              alt={app.name}
              width={32}
              height={32}
              loading="lazy"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling?.classList.add('visible'); }}
            />
            <span className="scroll-app-fallback" aria-hidden="true">{app.name.charAt(0)}</span>
            <span>{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * ConnectionsRiver — the scrolling icon wall plus its note, on its own so the
 * CONNECTIONS story band (StoryHeads) can host it. The old standalone
 * Integrations section below kept its header copy for reference until the
 * messaging pass settles.
 */
export function ConnectionsRiver() {
  return (
    <>
      <div className="scroll-rows reveal">
        <ScrollRow apps={APPS_ROW1} direction="scroll-left" />
        <ScrollRow apps={APPS_ROW2} direction="scroll-right" />
        <ScrollRow apps={APPS_ROW3} direction="scroll-left-slow" />
      </div>
      <div className="container">
        <p className="integration-note reveal">
          3,500+ connected services — and your integration platforms, from
          Zapier and Make to n8n, Boomi, and Workato, over MCP. Shared with
          your team, governed by your admins.
        </p>
      </div>
    </>
  );
}

export default function Integrations() {
  return (
    <section className="integrations" id="integrations">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">CONNECTIONS</span> {'}'}</div>
        <h2 className="section-title reveal">Connect your systems once. Glyphh does real work in them.</h2>
        <p className="section-subtitle reveal">
          Link Gmail, Slack, Drive and 3,500+ services — then just ask. The
          agent acts in your actual accounts, behind the scenes, and asks
          first when something&apos;s risky. You decide what it can reach.
        </p>
      </div>
      <ConnectionsRiver />
    </section>
  );
}
