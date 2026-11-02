import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import '../products.css';
import { AppDiagram, CliDiagram, ProgramDiagram } from './Diagrams';

// rrotor, the product page (his order, 2026-11-02): where what Claude builds goes to run. Apps first, then CLIs,
// then programs, each with one real exchange; then how it gets there, what stays yours, how to get it, and Ada
// once. Every fact is glyphh-ai/rrotor origin/main (README.md, docs/architecture.md 5.7, 5.8, 9, 12, 13),
// glyphh-ai/server docs/specs/apps.md and glyphh-ai/glyphh (README.md, plugins/glyphh/skills) on 2026-11-02.

export const metadata = {
  title: 'rrotor: govern the AI content your teams create — Glyphh',
  description:
    'Glyphh rrotor is a secure runtime you run yourself, where the pages, dashboards, documents, tools and jobs your teams make with Claude, Codex, Gemini, Cursor, Grok or Copilot live and are governed: reviewed by a person, opened by role, on record, at your own host.',
  alternates: { canonical: '/products/rrotor' },
};

const DOCS = 'https://docs.glyphh.ai';
const REPO = 'https://github.com/glyphh-ai/glyphh';

const FLOW = [
  { n: '1', title: 'Your team makes it', body: 'In a session with Claude, Codex or any agent: a page or a dashboard, a CLI’s manifest, or a glyphh.json and a program.py with its tests.' },
  { n: '2', title: 'Deployed by commit', body: 'rrotor fetches that one commit, checks its SHA and reads the manifest. A page is committed for you; the same files again are the same version.' },
  { n: '3', title: 'A person says yes', body: 'A reviewer approves an app before anyone opens it. A command or a step that matches an approval pattern waits for you.' },
  { n: '4', title: 'It runs at your host', body: 'Your people in a browser, an agent over MCP, your software over REST or the SDKs. Every call is a run on record.' },
];

const YOURS = [
  ['Your host', <>rrotor runs where you put it: <code>127.0.0.1:7777</code> on a laptop, or your own address on your servers, your DNS, your TLS. No Glyphh name on it.</>],
  ['The sandbox', <>Every run in bubblewrap, seccomp and Landlock, with no network but the hosts its manifest names, through the runtime’s own egress proxy.</>],
  ['The vault', <>Secrets encrypted on the runtime with its own key, read by a program as <code>ctx.secrets</code>, never shown back, not even to the agent.</>],
  ['Approvals', <>A step, a command or a page waits for a named person. The record says who said yes.</>],
  ['Roles', <>Your identity provider’s groups, read at sign-in (Okta or Entra ID over OIDC), decide who opens an app and who reviews. Nothing new to administer.</>],
  ['Each person', <>A CLI runs as the person who asked, in their own signed-in home on the runtime, so what Claude does with it is what they could do.</>],
  ['The record', <>Every call, deploy, approval and refusal is an audit event naming the actor. Enterprise keeps them, queryable; any plan can drain them to your own collector over OpenTelemetry.</>],
  ['Glyphh’s part', <>The server signs the licence and keeps the catalogue: a title, a version, a state. Never the page, the code, a run, a secret or a result.</>],
];

const GET = [
  {
    title: 'From Claude',
    head: 'Ask for it: “install rrotor”',
    body: 'The glyphh plugin finds Apple’s container, OrbStack or Docker, runs the image on 127.0.0.1:7777 with a local token, and adds rrotor to Claude Code. Then “publish this to my org” and the rest.',
    href: `${DOCS}/runtime`,
  },
  {
    title: 'On your servers',
    head: 'Docker Compose, Helm or Terraform',
    body: 'The same image at your own address behind your TLS, air-gapped if you like, or as a cluster with one head. The packages are in the public repo.',
    href: `${REPO}/tree/main/deploy`,
  },
  {
    title: 'The licence',
    head: 'Free on one node, no key',
    body: 'With no key rrotor runs as Community: one node. A plan’s key lifts the node cap, and Enterprise adds a cluster that elects its own head and the kept audit log. Nothing a licence does refuses a run.',
    href: '/pricing',
  },
];

function Tile({ title, head, body, href }) {
  return (
    <a href={href} className="hv-tile">
      <h3 className="hv-tile-title">{title}<span className="hv-tile-go" aria-hidden="true">&rarr;</span></h3>
      <p className="hv-tile-head">{head}</p>
      <p className="hv-tile-body">{body}</p>
    </a>
  );
}

function Line({ who, cls, children }) {
  return (
    <div className={cls}>
      <b>{who}</b>
      <span>{children}</span>
    </div>
  );
}

export default function RrotorPage() {
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/products" className="ix-crumb">&larr; Products</a>
          <span className="qs-kicker">rrotor</span>
          <h1 className="ix-title">Govern the AI content your teams create, in one place.</h1>
          <p className="ix-lede">
            Glyphh rrotor, recursive reasoning on top of reasoning, is a secure runtime you run yourself, where your
            teams’ AI content lives and is governed. The pages, dashboards, documents, tools and jobs people make with
            Claude, Codex, Gemini, Cursor, Grok or Copilot land on it under one contract: reviewed by a person, opened
            by role, on record, at your own host. Nothing of it passes through Glyphh.
          </p>
          <div className="ix-actions">
            <a href={`${DOCS}/runtime`} className="os-cta os-cta-primary">Install from Claude</a>
            <a href={`${DOCS}/programs`} className="os-cta os-cta-ghost">Read the docs</a>
          </div>
        </section>

        <section className="ix-section">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">What runs on it</span>
              <h2 className="ix-h2">Apps, CLIs and programs. One contract.</h2>
              <p className="ix-desc">
                AI content comes in three kinds here. Each is a folder with a glyphh.json manifest, deployed by commit
                and run in a sandbox that reaches only the hosts the manifest names, with its secrets in the runtime’s
                vault, approvals that wait for a person, and every call on record.
              </p>
            </div>
            <a href={`${DOCS}/programs`} className="qs-more">The contract &rarr;</a>
          </div>

          <div className="pr-kinds">
            <article className="pr-kind">
              <div>
                <span className="qs-kicker">Apps</span>
                <h3>A page your team made with AI, published to your people.</h3>
                <p>
                  Ask Claude to publish the dashboard it just wrote to your org, or send any page, document, diagram
                  or deck over the runtime’s API. It lands on your rrotor as a draft, a reviewer approves it, and your
                  people open it at your host, signed in to Glyphh, only the roles you named. A page can call
                  functions that run on the runtime, as the person viewing it.
                </p>
                <a href={`${DOCS}/apps`} className="pr-kind-more">Apps in the docs &rarr;</a>
              </div>
              <div>
                <AppDiagram />
                <div className="pr-chat">
                  <Line who="you" cls="pr-you">publish this to my org, engineering only</Line>
                  <Line who="agent" cls="pr-claude">app_publish deploy-failures  roles: [&quot;engineering&quot;]</Line>
                  <Line who="rrotor" cls="pr-rrotor">version 3  <em>draft</em>  …/apps/deploy-failures/</Line>
                  <Line who="admin" cls="pr-you">approve</Line>
                  <Line who="rrotor" cls="pr-rrotor"><em>approved</em>  serving version 3 to engineering</Line>
                </div>
              </div>
            </article>

            <article className="pr-kind">
              <div>
                <span className="qs-kicker">CLIs</span>
                <h3>A tool an agent drives without touching your machine.</h3>
                <p>
                  A pinned command-line tool, gh, stripe, your own, installed from a checksummed release and run one
                  command at a time, its arguments checked against the patterns you allow and the ones that need a
                  person first. Claude Code, Codex, Gemini, Cursor, Grok and Copilot come built in, each signed in
                  from your phone, and each runs as the person who asked.
                </p>
                <a href={`${DOCS}/clis`} className="pr-kind-more">CLIs in the docs &rarr;</a>
              </div>
              <div>
                <CliDiagram />
                <div className="pr-chat">
                  <Line who="agent" cls="pr-claude">cli_run github  pr merge 42</Line>
                  <Line who="rrotor" cls="pr-rrotor"><em>needs_approval</em>  &quot;pr merge *&quot; waits for you</Line>
                  <Line who="you" cls="pr-you">approve</Line>
                  <Line who="rrotor" cls="pr-rrotor"><em>done</em>  exit 0  <i>as you, in your own home</i></Line>
                </div>
                <pre className="pr-code">{`"allow":     ["pr *", "issue *", "repo view *"],
"approvals": ["pr merge *", "pr close *"]`}</pre>
              </div>
            </article>

            <article className="pr-kind">
              <div>
                <span className="qs-kicker">Programs</span>
                <h3>A job with its secrets, its schedule and its approvals.</h3>
                <p>
                  A glyphh.json and a program.py written with whichever agent you use, pushed to your repo and
                  deployed by commit.
                  It runs with a vault the runtime encrypts, a SQLite database, cron schedules the runtime fires
                  itself, and approvals that stop a step until a person says yes. Every call answers the same way:
                  done, needs input, needs approval or failed, with its data.
                </p>
                <a href={`${DOCS}/programs`} className="pr-kind-more">Programs in the docs &rarr;</a>
              </div>
              <div>
                <ProgramDiagram />
                <pre className="pr-code">{`{
  "name": "daily_sales",
  "functions": { "start": { "approvals": ["write"], "writes": true } },
  "hosts": ["api.frankfurter.dev"],
  "secrets": ["LEDGER_TOKEN"],
  "schedules": [
    { "function": "start", "cron": "15 6 * * *", "tz": "UTC" }
  ]
}`}</pre>
                <div className="pr-chat" style={{ marginTop: '0.75rem' }}>
                  <Line who="rrotor" cls="pr-rrotor">06:15  schedule each_morning  start</Line>
                  <Line who="rrotor" cls="pr-rrotor"><em>needs_approval</em>  Write 2026-11-01’s $4,812 to the ledger?</Line>
                  <Line who="you" cls="pr-you">approve</Line>
                  <Line who="rrotor" cls="pr-rrotor"><em>done</em>  {'{"day": "2026-11-01", "written": true}'}</Line>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="ix-section">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">How it gets there</span>
              <h2 className="ix-h2">From an AI session to your host, in four steps.</h2>
            </div>
            <a href={`${DOCS}/runtime`} className="qs-more">The runtime &rarr;</a>
          </div>
          <ol className="pr-flow">
            {FLOW.map((s) => (
              <li key={s.n} className="pr-step">
                <span className="pr-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="ix-section">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">What stays yours</span>
              <h2 className="ix-h2">Everything, except the licence.</h2>
              <p className="ix-desc">
                The code, the runs, the secrets, the schedules, the database, the pages and the record all live on
                the runtime. The Glyphh server never connects in; rrotor connects out for its licence and nothing
                else.
              </p>
            </div>
            <a href={`${DOCS}/runtime`} className="qs-more">Self-hosting &rarr;</a>
          </div>
          <dl className="pr-facts">
            {YOURS.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="ix-section">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">Get it</span>
              <h2 className="ix-h2">One image, wherever you run containers.</h2>
              <p className="ix-desc">
                <code>ghcr.io/glyphh-ai/rrotor</code>, for amd64 and arm64, with everything it keeps on one volume.
              </p>
            </div>
            <a href={REPO} className="qs-more">The public repo &rarr;</a>
          </div>
          <div className="hv-grid hv-grid-3">
            {GET.map((t) => <Tile key={t.title} {...t} />)}
          </div>
        </section>

        <section className="ix-section">
          <div className="pr-ada">
            <p>
              rrotor runs no Ada. <a href="/">Ada</a>, Glyphh’s other product, decides from precedent and Glyphh runs it;
              a program on rrotor can ask it through the glyphh command, with its API key in the vault.
            </p>
            <a href="/" className="os-cta os-cta-ghost">See Ada</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
