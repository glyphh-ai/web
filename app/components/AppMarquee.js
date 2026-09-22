'use client';

/**
 * AppMarquee — the favicon wall as a slim two-row band directly under the
 * home hero (his order, 2026-09-21: between the hero and the callout). Continuous scroll, paused on
 * hover; a static wrap-grid under prefers-reduced-motion (the duplicate
 * set used for the seamless loop is hidden there).
 *
 * Row 1 leads with Gmail, Slack, Salesforce — the three named in the hero
 * subline.
 */

const APPS_ROW1 = [
  { name: 'Gmail', domain: 'mail.google.com' },
  { name: 'Slack', domain: 'app.slack.com' },
  { name: 'Salesforce', domain: 'salesforce.com' },
  { name: 'Claude', domain: 'claude.ai' },
  { name: 'ChatGPT', domain: 'chatgpt.com' },
  { name: 'GitHub', domain: 'github.com' },
  { name: 'Notion', domain: 'notion.so' },
  { name: 'Figma', domain: 'figma.com' },
  { name: 'Linear', domain: 'linear.app' },
  { name: 'Stripe', domain: 'dashboard.stripe.com' },
  { name: 'Google Docs', domain: 'docs.google.com' },
  { name: 'Outlook', domain: 'outlook.live.com' },
  { name: 'HubSpot', domain: 'hubspot.com' },
  { name: 'Jira', domain: 'atlassian.net' },
  { name: 'Google Drive', domain: 'drive.google.com' },
  { name: 'Vercel', domain: 'vercel.com' },
];

const APPS_ROW2 = [
  { name: 'Gemini', domain: 'gemini.google.com' },
  { name: 'Mistral', domain: 'chat.mistral.ai' },
  { name: 'Discord', domain: 'discord.com' },
  { name: 'Asana', domain: 'asana.com' },
  { name: 'Airtable', domain: 'airtable.com' },
  { name: 'Dropbox', domain: 'dropbox.com' },
  { name: 'Calendly', domain: 'calendly.com' },
  { name: 'Intercom', domain: 'intercom.com' },
  { name: 'Shopify', domain: 'shopify.com' },
  { name: 'Trello', domain: 'trello.com' },
  { name: 'Supabase', domain: 'supabase.com' },
  { name: 'LinkedIn', domain: 'linkedin.com' },
  { name: 'Canva', domain: 'canva.com' },
  { name: 'Miro', domain: 'miro.com' },
  { name: 'Sentry', domain: 'sentry.io' },
];

// Row 3 (his order, 2026-09-21): the integration platforms, reached over MCP.
const APPS_ROW3 = [
  { name: 'Zapier', domain: 'zapier.com' },
  { name: 'Make', domain: 'make.com' },
  { name: 'n8n', domain: 'n8n.io' },
  { name: 'Boomi', domain: 'boomi.com' },
  { name: 'Workato', domain: 'workato.com' },
  { name: 'Pipedream', domain: 'pipedream.com' },
  { name: 'MuleSoft', domain: 'mulesoft.com' },
  { name: 'Power Automate', domain: 'powerautomate.microsoft.com' },
  { name: 'Tray', domain: 'tray.ai' },
  { name: 'Celigo', domain: 'celigo.com' },
  { name: 'SnapLogic', domain: 'snaplogic.com' },
  { name: 'Jitterbit', domain: 'jitterbit.com' },
  { name: 'Activepieces', domain: 'activepieces.com' },
  { name: 'Pabbly', domain: 'pabbly.com' },
  { name: 'Integrately', domain: 'integrately.com' },
  { name: 'Relay.app', domain: 'relay.app' },
];

function MarqueeRow({ apps, direction }) {
  const sets = [apps, apps];
  return (
    <div className="scroll-track-wrap">
      <div className={`scroll-track ${direction}`}>
        {sets.map((set, s) =>
          set.map((app) => (
            <div
              key={`${app.domain}-${app.name}-${s}`}
              className={`scroll-app${s === 1 ? ' scroll-app-dup' : ''}`}
              aria-hidden={s === 1 || undefined}
              aria-label={s === 0 ? app.name : undefined}
            >
              {/* NOT loading="lazy": the track scrolls by CSS transform, so
                  items that start off-screen horizontally never re-trigger a
                  deferred fetch and would animate in as blank pills. Low
                  fetch priority keeps them behind the hero instead; the
                  duplicate set reuses the cache, and width/height are fixed
                  so nothing shifts. */}
              <img
                src={`https://www.google.com/s2/favicons?domain=${app.domain}&sz=64`}
                alt={app.name}
                width={32}
                height={32}
                decoding="async"
                fetchPriority="low"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling?.classList.add('visible'); }}
              />
              <span className="scroll-app-fallback" aria-hidden="true">{app.name.charAt(0)}</span>
              <span>{app.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function AppMarquee() {
  return (
    <section className="marquee" id="apps">
      <div className="scroll-rows marquee-rows">
        <MarqueeRow apps={APPS_ROW1} direction="scroll-left" />
        <MarqueeRow apps={APPS_ROW2} direction="scroll-right" />
        <MarqueeRow apps={APPS_ROW3} direction="scroll-left" />
      </div>
      {/* His copy, 2026-09-21: the scroller sits between the hero and the callout. */}
      <p className="marquee-cap">
        3,500+ connected services &mdash; and your integration platforms, from Zapier and Make
        to n8n, Boomi, and Workato, over MCP. Shared with your team, governed by your admins.
      </p>
    </section>
  );
}
