import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';
import ExpandableShot from '../../components/ExpandableShot';
import FinalCTA from '../../components/FinalCTA';
import ModelCatalog from '../../components/ModelCatalog';
import { ContractTabs, RolesMock, KeysMock, MetricsMock, WayCard } from './mocks';

// The models are LIVE — the server's list at each plan's rate (ModelCatalog,
// /api/models). No BYOK, no subscriptions to burn down (his order, 2026-09-29).

export const metadata = {
  title: 'Glyphh Router — one endpoint, every model',
  description:
    'One endpoint in front of every model Glyphh runs. Auto-routers pick the model per request: frontier where it counts, open weights for the rest. Roles decide who gets what. Every token accounted for at your plan’s published rate, cached calls at cache rates.',
};

/* The marks — copied from the Design page's set; Gateway reuses, never invents. */
const ICONS = {
  apps: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.5" y="2.5" width="8.6" height="8.6" rx="2" fill="#af5fff" />
      <rect x="12.9" y="2.5" width="8.6" height="8.6" rx="2" fill="#a78bfa" />
      <rect x="2.5" y="12.9" width="8.6" height="8.6" rx="2" fill="#a78bfa" />
      <rect x="12.9" y="12.9" width="8.6" height="8.6" rx="2" fill="#af5fff" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5a9.5 9.5 0 1 0 0 19h1.2a2 2 0 0 0 1.5-3.3 1.6 1.6 0 0 1 1.2-2.7h2.1A3.5 3.5 0 0 0 21.5 12 9.6 9.6 0 0 0 12 2.5z" fill="#ec4899" />
      <circle cx="8" cy="9" r="1.5" fill="#ffffff" />
      <circle cx="12.5" cy="6.8" r="1.5" fill="#f9a8d4" />
      <circle cx="16.4" cy="9.4" r="1.5" fill="#ffffff" />
      <circle cx="7.2" cy="13.8" r="1.5" fill="#f9a8d4" />
    </svg>
  ),
};

/* The vendors on the stage's far side + the connections streaming through. */
const VENDORS = [
  'anthropic.com', 'openai.com', 'gemini.google.com', 'mistral.ai',
  'x.ai', 'deepseek.com', 'groq.com', 'ollama.com',
];
const CONNECTIONS = [
  'slack.com', 'mail.google.com', 'salesforce.com', 'github.com', 'notion.so',
  'figma.com', 'linear.app', 'stripe.com', 'vercel.com', 'discord.com',
  'zoom.us', 'asana.com', 'airtable.com', 'dropbox.com', 'shopify.com',
];

/* ── The relay stage, drawn in the site's own apx/mcx grammar ── */
function GatewayStage() {
  return (
    <div className="apx-stage mcx-stage gwx-hero-stage" aria-hidden="true">
      <div className="apx-col">
        <div className="apx-col-label">everything you run</div>
        <div className="apx-node">Glyphh Desktop</div>
        <div className="apx-node">Agents</div>
        <div className="apx-node">Machines</div>
      </div>
      <div className="mcx-flows">
        <div className="apx-flow"><i /><i /><i /></div>
        <div className="apx-flow mcx-flow-back"><i /><i /></div>
      </div>
      <div className="apx-hub mcx-hub">
        <div className="mcx-apps">
          <span className="mcx-apps-label">Glyphh Connect</span>
          <div className="mcx-apps-track">
            {[...CONNECTIONS, ...CONNECTIONS].map((d, i) => (
              <span key={d + i} className="mcx-app">
                <img src={`https://www.google.com/s2/favicons?domain=${d}&sz=64`} alt="" width="16" height="16" loading="lazy" />
              </span>
            ))}
          </div>
        </div>
        <div className="mcx-vflows">
          <div className="mcx-vflow"><i /><i /></div>
          <div className="mcx-vflow mcx-vflow-up"><i /><i /></div>
        </div>
        <div className="apx-glow" />
        <div className="apx-orbit" />
        <div className="mcx-orbit-b" />
        <img src="/glyphh-mascot-square-black.png" alt="" className="apx-mascot" width="64" height="64" />
        <span className="apx-hub-label">Glyphh</span>
      </div>
      <div className="mcx-flows">
        <div className="apx-flow"><i /><i /><i /></div>
        <div className="apx-flow mcx-flow-back"><i /><i /></div>
      </div>
      <div className="apx-col">
        <div className="apx-col-label">every provider</div>
        <div className="mcx-llms">
          {VENDORS.map((domain, i) => (
            <span key={domain} className="mcx-llm" style={{ '--d': `${i * 0.45}s` }}>
              <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} alt="" width="20" height="20" loading="lazy" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


const WAYS = [
  {
    tag: 'one endpoint',
    title: 'Change one line.',
    desc: 'It speaks the OpenAI API. Swap the base URL and every SDK, framework, and tool you already use just works. Every model Glyphh runs behind it.',
  },
  {
    tag: 'one bill',
    title: 'One rate per model, per plan.',
    desc: 'No keys to bring. Every call is paid from your plan’s budget at a published rate, and the bigger the plan, the better the rate.',
  },
  {
    tag: 'your call',
    title: 'Turn off what you do not run.',
    desc: 'Every model is on until your admin turns it off. Teams narrow it from there. Budgets stop at the line. No surprise spend.',
  },
];

const GOVERN = [
  {
    icon: ICONS.apps,
    name: 'Roles',
    title: 'Governance is a role, not a spreadsheet.',
    desc: 'Models, rate limits, budgets — set per team, once. Hard-stop the budget when it matters.',
    mock: <RolesMock />,
  },
  {
    icon: ICONS.apps,
    name: 'Keys',
    title: 'Keys the Router hands out.',
    desc: 'Mint one for a service, a pipeline, a teammate. It dies the moment you revoke it. Its history stays on the books.',
    mock: <KeysMock />,
  },
  {
    icon: ICONS.apps,
    name: 'Telemetry',
    title: 'Every token. Never a transcript.',
    desc: 'Tokens, spend, and speed — per model, per role, per day. We log metadata only. Prompts are never stored. There is nothing to leak.',
    mock: <MetricsMock />,
  },
];

export default async function GatewayPage() {
  return (
    <div className="office-page design-page">
      <Reveal />
      <Nav />

      {/* ── HERO ── */}
      <header className="page-hero page-hero-tight op-hero">
        <div className="container op-hero-inner">
          <div className="op-hero-copy">
            <div className="hero-badge">
              <span className="badge-dot" aria-hidden="true"></span>
              GLYPHH ROUTER
            </div>
            <h1 className="page-hero-title">
              One endpoint<span className="dot">.</span>{' '}
              <span className="hero-accent">Every model</span><span className="dot">.</span>
            </h1>
            <p className="page-hero-sub">
              One endpoint in front of every model Glyphh runs. An <strong>auto-router</strong> picks the model
              per request: frontier models for the hard turns, open weights for the rest. Every plan runs every
              model at its own published rate. Roles decide who gets what. Every token accounted for, cached
              calls at cache rates, no prompt ever stored.
            </p>
            <div className="hero-ctas">
              <a href="/#download" className="btn btn-primary btn-lg group">
                <span className="btn-label">Get Glyphh Desktop</span>
                <span className="btn-fill"></span>
              </a>
            </div>
          </div>
          <div className="od-hero-mock reveal"><GatewayStage /></div>
        </div>
      </header>

      {/* ── THREE WAYS IN ── */}
      <section className="od-extract">
        <div className="container">
          <span className="rp-eyebrow">{'{'} the front door {'}'}</span>
          <h2 className="section-title">You don&rsquo;t integrate models. You point at the router.</h2>
          <div className="od-extract-grid">
            {WAYS.map((e) => (
              <WayCard key={e.tag} tag={e.tag} title={e.title} desc={e.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* ── THE CONTRACT ── */}
      <section className="od-contract-band">
        <div className="container op-prod">
          <div className="op-prod-copy">
            <div className="op-prod-mark">{ICONS.apps} Glyphh Router</div>
            <h3>A key that carries its own rules.</h3>
            <p>
              Every key is minted against a role. It knows which models it can call, how fast,
              on whose budget, and until when. The Router enforces it at the edge. Your
              services just make requests.
            </p>
          </div>
          <div className="op-prod-mock reveal"><ContractTabs /></div>
        </div>
      </section>

      {/* ── GOVERNANCE ── */}
      <section className="od-extract">
        <div className="container">
          <div className="shots-grid">
            <div className="reveal"><ExpandableShot src="/screen-shots/v2/code-2.jpg" alt="Claude Code in a Glyphh terminal, routed through the org" /></div>
            <div className="reveal"><ExpandableShot src="/screen-shots/v2/code-1.5.jpg" alt="The agent reading Gmail beside the code it is writing" /></div>
          </div>
        </div>
      </section>

      <section className="op-products">
        <div className="container">
          {GOVERN.map((c, i) => (
            <div className={`op-prod reveal ${i % 2 ? 'op-prod-flip' : ''}`} key={c.name}>
              <div className="op-prod-copy">
                <div className="op-prod-mark">{c.icon} {c.name}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
              <div className="op-prod-mock">{c.mock}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE MODELS — live from the server, at every plan's rate ── */}
      <section className="models-section" id="models">
        <div className="container">
          <div className="models-table-head">
            <h2>Every model behind the router</h2>
            <span className="models-live">
              <span className="models-live-dot" aria-hidden="true"></span>
              Live from the server
            </span>
          </div>
          <p className="models-intro">
            Per million tokens, input and output, on every plan. The bigger the plan, the better the rate.
          </p>
          <ModelCatalog compact />
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <FinalCTA
        title={<h2>Point it at the router<span className="dot">.</span> Govern the rest<span className="dot">.</span></h2>}
        text={<p>Every model on every plan. Governance on Pro. Solo from $20 a month.</p>}
        primary={{ href: '/#download', label: 'Download Glyphh' }}
      />

      <Footer />
    </div>
  );
}
