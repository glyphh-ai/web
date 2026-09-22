// The curated Connect list — the fallback for /integrations/connect when the
// server's live Pipedream directory is not reachable. Plain data.
const ROWS = [
  ['Gmail', 'mail.google.com', 'Mail and calendar'], ['Outlook', 'outlook.live.com', 'Mail and calendar'],
  ['Google Calendar', 'calendar.google.com', 'Mail and calendar'], ['Calendly', 'calendly.com', 'Mail and calendar'],
  ['Google Docs', 'docs.google.com', 'Docs and files'], ['Google Drive', 'drive.google.com', 'Docs and files'],
  ['Google Sheets', 'sheets.google.com', 'Docs and files'], ['Notion', 'notion.so', 'Docs and files'],
  ['Dropbox', 'dropbox.com', 'Docs and files'], ['Box', 'box.com', 'Docs and files'], ['Airtable', 'airtable.com', 'Docs and files'],
  ['Confluence', 'atlassian.net', 'Docs and files'], ['Slack', 'app.slack.com', 'Messaging'], ['Discord', 'discord.com', 'Messaging'],
  ['Microsoft Teams', 'teams.microsoft.com', 'Messaging'], ['Telegram', 'telegram.org', 'Messaging'], ['WhatsApp', 'whatsapp.com', 'Messaging'],
  ['Twilio', 'twilio.com', 'Messaging'], ['Intercom', 'intercom.com', 'Messaging'], ['Zendesk', 'zendesk.com', 'Messaging'],
  ['GitHub', 'github.com', 'Developer tools'], ['GitLab', 'gitlab.com', 'Developer tools'], ['Linear', 'linear.app', 'Developer tools'],
  ['Jira', 'atlassian.net', 'Developer tools'], ['Vercel', 'vercel.com', 'Developer tools'], ['Sentry', 'sentry.io', 'Developer tools'],
  ['PostHog', 'app.posthog.com', 'Developer tools'], ['Supabase', 'supabase.com', 'Developer tools'], ['AWS', 'console.aws.amazon.com', 'Developer tools'],
  ['Cloudflare', 'cloudflare.com', 'Developer tools'], ['Salesforce', 'salesforce.com', 'CRM and commerce'], ['HubSpot', 'hubspot.com', 'CRM and commerce'],
  ['Pipedrive', 'pipedrive.com', 'CRM and commerce'], ['Stripe', 'dashboard.stripe.com', 'CRM and commerce'], ['Shopify', 'shopify.com', 'CRM and commerce'],
  ['QuickBooks', 'quickbooks.intuit.com', 'CRM and commerce'], ['Mailchimp', 'mailchimp.com', 'CRM and commerce'], ['Asana', 'asana.com', 'Projects and design'],
  ['Trello', 'trello.com', 'Projects and design'], ['Monday', 'monday.com', 'Projects and design'], ['ClickUp', 'clickup.com', 'Projects and design'],
  ['Figma', 'figma.com', 'Projects and design'], ['Canva', 'canva.com', 'Projects and design'], ['Miro', 'miro.com', 'Projects and design'],
  ['LinkedIn', 'linkedin.com', 'Social and media'], ['X / Twitter', 'x.com', 'Social and media'], ['YouTube', 'youtube.com', 'Social and media'],
  ['Reddit', 'reddit.com', 'Social and media'], ['Zapier', 'zapier.com', 'Automation platforms'], ['Make', 'make.com', 'Automation platforms'],
  ['n8n', 'n8n.io', 'Automation platforms'], ['Boomi', 'boomi.com', 'Automation platforms'], ['Workato', 'workato.com', 'Automation platforms'],
  ['Pipedream', 'pipedream.com', 'Automation platforms'], ['MuleSoft', 'mulesoft.com', 'Automation platforms'],
  ['Power Automate', 'powerautomate.microsoft.com', 'Automation platforms'], ['Activepieces', 'activepieces.com', 'Automation platforms'],
];

export const FALLBACK_APPS = ROWS.map(([name, domain, group]) => ({
  id: domain + ':' + name,
  name,
  icon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
  description: '',
  categories: [group],
}));

export const FALLBACK_CATEGORIES = [...new Set(ROWS.map((r) => r[2]))].map((name) => ({
  name,
  count: ROWS.filter((r) => r[2] === name).length,
}));
