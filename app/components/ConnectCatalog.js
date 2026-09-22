'use client';

import { useMemo, useState } from 'react';

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';

/**
 * ConnectCatalog — the browsable slice of the Pipedream Connect catalog on
 * the public site (site refactor 2026-09-22). The full 3,500+ is searchable
 * inside the app once you are signed in (the server's app search needs an
 * org); here a curated set is grouped by what it is for, with a filter box.
 */

const CATALOG = [
  // Mail, calendar, docs
  ['Gmail', 'mail.google.com', 'Mail and calendar'],
  ['Outlook', 'outlook.live.com', 'Mail and calendar'],
  ['Google Calendar', 'calendar.google.com', 'Mail and calendar'],
  ['Calendly', 'calendly.com', 'Mail and calendar'],
  ['Google Docs', 'docs.google.com', 'Docs and files'],
  ['Google Drive', 'drive.google.com', 'Docs and files'],
  ['Google Sheets', 'sheets.google.com', 'Docs and files'],
  ['Notion', 'notion.so', 'Docs and files'],
  ['Dropbox', 'dropbox.com', 'Docs and files'],
  ['Box', 'box.com', 'Docs and files'],
  ['Airtable', 'airtable.com', 'Docs and files'],
  ['Confluence', 'atlassian.net', 'Docs and files'],
  // Messaging
  ['Slack', 'app.slack.com', 'Messaging'],
  ['Discord', 'discord.com', 'Messaging'],
  ['Microsoft Teams', 'teams.microsoft.com', 'Messaging'],
  ['Telegram', 'telegram.org', 'Messaging'],
  ['WhatsApp', 'whatsapp.com', 'Messaging'],
  ['Twilio', 'twilio.com', 'Messaging'],
  ['Intercom', 'intercom.com', 'Messaging'],
  ['Zendesk', 'zendesk.com', 'Messaging'],
  // Dev
  ['GitHub', 'github.com', 'Developer tools'],
  ['GitLab', 'gitlab.com', 'Developer tools'],
  ['Linear', 'linear.app', 'Developer tools'],
  ['Jira', 'atlassian.net', 'Developer tools'],
  ['Vercel', 'vercel.com', 'Developer tools'],
  ['Sentry', 'sentry.io', 'Developer tools'],
  ['PostHog', 'app.posthog.com', 'Developer tools'],
  ['Supabase', 'supabase.com', 'Developer tools'],
  ['AWS', 'console.aws.amazon.com', 'Developer tools'],
  ['Cloudflare', 'cloudflare.com', 'Developer tools'],
  // CRM, sales, commerce
  ['Salesforce', 'salesforce.com', 'CRM and commerce'],
  ['HubSpot', 'hubspot.com', 'CRM and commerce'],
  ['Pipedrive', 'pipedrive.com', 'CRM and commerce'],
  ['Stripe', 'dashboard.stripe.com', 'CRM and commerce'],
  ['Shopify', 'shopify.com', 'CRM and commerce'],
  ['QuickBooks', 'quickbooks.intuit.com', 'CRM and commerce'],
  ['Mailchimp', 'mailchimp.com', 'CRM and commerce'],
  // Project and design
  ['Asana', 'asana.com', 'Projects and design'],
  ['Trello', 'trello.com', 'Projects and design'],
  ['Monday', 'monday.com', 'Projects and design'],
  ['ClickUp', 'clickup.com', 'Projects and design'],
  ['Figma', 'figma.com', 'Projects and design'],
  ['Canva', 'canva.com', 'Projects and design'],
  ['Miro', 'miro.com', 'Projects and design'],
  // Social and media
  ['LinkedIn', 'linkedin.com', 'Social and media'],
  ['X / Twitter', 'x.com', 'Social and media'],
  ['YouTube', 'youtube.com', 'Social and media'],
  ['Reddit', 'reddit.com', 'Social and media'],
  // Automation platforms — reached over MCP
  ['Zapier', 'zapier.com', 'Automation platforms'],
  ['Make', 'make.com', 'Automation platforms'],
  ['n8n', 'n8n.io', 'Automation platforms'],
  ['Boomi', 'boomi.com', 'Automation platforms'],
  ['Workato', 'workato.com', 'Automation platforms'],
  ['Pipedream', 'pipedream.com', 'Automation platforms'],
  ['MuleSoft', 'mulesoft.com', 'Automation platforms'],
  ['Power Automate', 'powerautomate.microsoft.com', 'Automation platforms'],
  ['Activepieces', 'activepieces.com', 'Automation platforms'],
].map(([name, domain, group]) => ({ name, domain, group }));

const GROUPS = [...new Set(CATALOG.map((a) => a.group))];

export default function ConnectCatalog() {
  const [q, setQ] = useState('');
  const needle = q.trim().toLowerCase();
  const shown = useMemo(
    () => (needle ? CATALOG.filter((a) => `${a.name} ${a.group}`.toLowerCase().includes(needle)) : CATALOG),
    [needle],
  );

  return (
    <>
      <label className="ix-search">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter services"
          aria-label="Filter services"
          autoComplete="off"
          spellCheck={false}
        />
        <span className="ix-search-count">{shown.length} shown</span>
      </label>

      {GROUPS.map((g) => {
        const items = shown.filter((a) => a.group === g);
        if (!items.length) return null;
        return (
          <div key={g} className="ix-group">
            <h2 className="ix-group-title">{g}</h2>
            <div className="ix-grid ix-grid-4">
              {items.map((a) => (
                <div key={`${a.domain}-${a.name}`} className="ix-card ix-card-slim">
                  <img
                    className="ix-icon"
                    src={`https://www.google.com/s2/favicons?domain=${a.domain}&sz=64`}
                    alt=""
                    width={28}
                    height={28}
                    loading="lazy"
                  />
                  <h3>{a.name}</h3>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      {!shown.length && <p className="ix-empty">Nothing here matches &ldquo;{q.trim()}&rdquo; &mdash; it is likely in the full catalog below.</p>}

      <div className="ix-cta">
        <div>
          <span className="qs-kicker">The rest of the 3,500+</span>
          <h3>Search the full catalog in the app.</h3>
          <p>Every Pipedream Connect service is searchable from Settings &rarr; Connections once you are signed in. One sign-in per service; then it is a tool everywhere.</p>
        </div>
        <div className="ix-actions">
          <a href={PLATFORM_URL} className="os-cta os-cta-primary">Open the platform &rarr;</a>
          <a href="/docs/connections" className="os-cta os-cta-ghost">How connections work</a>
        </div>
      </div>
    </>
  );
}
