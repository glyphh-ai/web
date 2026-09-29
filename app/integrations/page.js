import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { APPS_ROW1, APPS_ROW2 } from '../components/apps-data';
import { PROVIDERS } from '../model-info';
import { PanelIcon } from '../components/panel-icons';

/**
 * /integrations — the hub (site refactor 2026-09-22): everything Glyphh
 * connects to, in the frame. Connections (the Pipedream catalog), models
 * (the LiteLLM catalog), the tools built into the harness, and apps — the
 * house apps, yours, and the org-scoped ones. The two catalogs are full
 * pages of their own: /integrations/connect and /integrations/models.
 */

export const metadata = {
  title: 'Integrations — Glyphh',
  description:
    'Connect Glyphh to the models, services, tools, and apps you already use. 3,500+ services through Connect, every model Glyphh runs through the Router, and the tools built into the desktop.',
};

// One line for each featured service on the hub. Anything not listed here
// gets the generic line.
const BLURBS = {
  Gmail: 'Read, triage, draft, and send from any loop.',
  Slack: 'Channels, DMs, and threads as tools; post back where work happens.',
  Salesforce: 'Accounts, opportunities, and pipeline in reach of every program.',
  GitHub: 'Issues, PRs, and repos; the coding agent files and reviews.',
  Notion: 'Pages and databases your programs read and write.',
  Figma: 'Files and comments for design work beside the agent.',
  Linear: 'Issues and cycles; plan and update without leaving the loop.',
  Stripe: 'Customers, invoices, and payments, governed by role.',
  'Google Docs': 'Documents the agent drafts, edits, and shares.',
  HubSpot: 'Contacts, deals, and sequences from one sign-in.',
  Jira: 'Tickets and boards; the agent files and moves them.',
  'Google Drive': 'Folders and files as sources for programs and tasks.',
};
const GENERIC = 'Connect once; every loop, app, and program can call it.';
const FEATURED = APPS_ROW1.slice(0, 12);

// What the harness ships with — the panels and tools every loop can use
// (docs: Panels and tools).
const BUILT_IN = [
  { title: 'Files and editor', icons: ['files','monaco'], body: 'The working folder’s tree and a Monaco editor over it.', href: '/docs/panels' },
  { title: 'Terminal', icons: ['terminal'], body: 'A real shell in the working folder, beside the agent.', href: '/docs/panels' },
  { title: 'Diff', icons: ['diff'], body: 'What changed as the agent works, as it works.', href: '/docs/panels' },
  { title: 'Browser', icons: ['preview'], body: 'Tabs and an address bar; the agent drives the screen where there is no API.', href: '/docs/panels' },
  { title: 'Plan and transcript', icons: ['plan','thread'], body: 'The agent’s plan, live, and the full turn log.', href: '/docs/panels' },
  { title: 'Scheduled tasks', icons: ['tasks'], body: 'Every schedule and run. A task is a skill on a clock.', href: '/docs/tasks' },
  { title: 'Work panels', icons: ['gpoint','gdrive','gdesign'], body: 'Slides, Drive, and Design: decks, folders, and documents the agent writes with you.', href: '/docs/panels' },
  { title: 'Generated media', icons: ['gimage','gvideo','gsound'], body: 'Image, video, and sound panels for what the models make.', href: '/docs/panels' },
];

const BACKGROUND = [
  { n: '01', label: 'Tasks', href: '/docs/tasks' },
  { n: '02', label: 'Schedules', href: '/docs/tasks' },
  { n: '03', label: 'Skills', href: '/docs/skills' },
  { n: '04', label: 'Artifacts', href: '/docs/artifacts' },
  { n: '05', label: 'Workspaces', href: '/docs/desktop' },
  { n: '06', label: 'Loops', href: '/docs/loops' },
];

function Icon({ domain }) {
  return (
    <img
      className="ix-icon"
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt=""
      width={28}
      height={28}
      loading="lazy"
    />
  );
}

export default function IntegrationsPage() {
  const providers = Object.entries(PROVIDERS).slice(0, 8);
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/" className="ix-crumb">&larr; Home</a>
          <span className="qs-kicker">Works with everything</span>
          <h1 className="ix-title">Integrations</h1>
          <p className="ix-lede">Connect Glyphh to the models, services, tools, and apps you already use.</p>
          <p className="ix-sub">
            Every model Glyphh runs, on every plan, through one Router. Reach 3,500+ services through Connect. Extend the desktop with skills,
            tasks, and apps &mdash; yours, the house&rsquo;s, and your org&rsquo;s.
          </p>
          <div className="ix-actions">
            <a href="/docs/connect" className="os-cta os-cta-primary">Read the docs</a>
            <a href="/integrations/connect" className="os-cta os-cta-ghost">Browse the catalog &rarr;</a>
          </div>
          <div className="ix-stats">
            <div><b>3,500+</b><span>Connected services</span></div>
            <div><b>Every</b><span>Model, on every plan</span></div>
            <div><b>{BUILT_IN.length}</b><span>Built-in panels</span></div>
          </div>
        </section>

        <section className="ix-section" id="connections">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">Every service, one sign-in</span>
              <h2 className="ix-h2">Connections</h2>
              <p className="ix-desc">
                Pipedream Connect powers the connector framework. Sign in to a service once and it is a tool in every
                loop, every app, every program. Admins share connections org-wide and govern who can use what.
              </p>
            </div>
            <a href="/integrations/connect" className="qs-more">Full catalog &rarr;</a>
          </div>
          <div className="ix-grid ix-grid-4">
            {FEATURED.map((a) => (
              <a key={a.domain} href="/integrations/connect" className="ix-card">
                <Icon domain={a.domain} />
                <h3>{a.name}</h3>
                <p>{BLURBS[a.name] || GENERIC}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="ix-section" id="models">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">Every plan, every model</span>
              <h2 className="ix-h2">Models and providers</h2>
              <p className="ix-desc">
                One Router in front of every model Glyphh runs, open weights included. Each model has a published rate
                on each plan, and your admin turns models on or off for your organization.
              </p>
            </div>
            <a href="/integrations/models" className="qs-more">Every model &rarr;</a>
          </div>
          <div className="ix-grid ix-grid-4">
            {providers.map(([key, p]) => (
              <a key={key} href="/integrations/models" className="ix-card ix-card-prov">
                {p.domain ? <Icon domain={p.domain} /> : <span className="ix-icon ix-icon-blank" />}
                <h3>{key}</h3>
                <p>{p.blurb}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="ix-section" id="built-in">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">In the harness</span>
              <h2 className="ix-h2">Built-in tools and panels</h2>
              <p className="ix-desc">
                Everything that opens beside the agent ships with the desktop. Tools are callable actions, skills
                teach repeatable work, and apps add panels with their own data.
              </p>
            </div>
            <a href="/docs/panels" className="qs-more">Panels and tools &rarr;</a>
          </div>
          <div className="ix-grid ix-grid-4">
            {BUILT_IN.map((t) => (
              <a key={t.title} href={t.href} className="ix-card">
                <span className="ix-icons">{t.icons.map((n) => <PanelIcon key={n} name={n} />)}</span>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </a>
            ))}
          </div>
          {/* The "Background work" list came off (his order, 2026-09-22: too OpenClaw). Hidden, not deleted. */}
          {false && (
            <div className="ix-bg">
              <div className="ix-bg-copy">
                <span className="qs-kicker">Background work</span>
                <h3>Automation is more than a prompt</h3>
                <p>Tasks on a clock, skills that teach, artifacts that persist, workspaces that remember.</p>
              </div>
              <ol className="ix-bg-list">
                {BACKGROUND.map((b) => (
                  <li key={b.n}><a href={b.href}><span>{b.n}</span>{b.label} &nearr;</a></li>
                ))}
              </ol>
            </div>
            )}
        </section>

        <section className="ix-section" id="apps">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">Extend the runtime</span>
              <h2 className="ix-h2">Apps: the house&rsquo;s, yours, and your org&rsquo;s</h2>
              <p className="ix-desc">
                A Glyphh app is a panel built on the Glyphh runtime with its own data store. Some ship with the
                desktop. You build the rest with the agent. Your org reviews, approves, and distributes them.
              </p>
            </div>
            <a href="/docs/semantic-apps" className="qs-more">Semantic Apps &rarr;</a>
          </div>
          <div className="ix-grid ix-grid-3">
            <a href="/docs/panels" className="ix-card ix-card-tall">
              <span className="ix-icons">{['gpoint', 'gdrive', 'gdesign', 'gimage', 'gvideo', 'gsound'].map((n) => <PanelIcon key={n} name={n} size={24} />)}</span>
              <h3>House apps</h3>
              <p>The panels the desktop ships with: Slides, Drive, Design, media, the dev tools. Present on every seat from the first open.</p>
            </a>
            <a href="/docs/semantic-apps" className="ix-card ix-card-tall">
              <h3>Your apps</h3>
              <p>Built with the agent from a skill folder and a manifest. Deterministic data, the system&rsquo;s storage and memory, state that persists. Yours to run and to publish.</p>
            </a>
            <a href="/docs/review" className="ix-card ix-card-tall">
              <h3>Org-scoped apps</h3>
              <p>Submitted for review, approved by an admin, distributed through the org library to every seat &mdash; with roles, budgets, and permissions riding along.</p>
            </a>
          </div>
          <div className="ix-cta">
            <div>
              <span className="qs-kicker">Need something else?</span>
              <h3>Build it.</h3>
              <p>Apps can add panels, tools, schedules, and data. Skills teach the agent how your team works.</p>
            </div>
            <div className="ix-actions">
              <a href="/docs/semantic-apps" className="os-cta os-cta-primary">Build an app &rarr;</a>
              <a href="/docs/skills" className="os-cta os-cta-ghost">Write a skill &rarr;</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
