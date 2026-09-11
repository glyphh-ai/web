import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Glyphh Gateway — every model, your keys, one governed endpoint',
  description:
    'One OpenAI-compatible endpoint in front of every model you trust. Bring your own vendor keys, govern access by role, hand out keys with budgets and rate limits built in — and see every token, dollar, and millisecond without ever storing a prompt.',
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
          <span className="mcx-apps-label">connections</span>
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

/* The consumable contract — the endpoint, verbatim shape (Design's ContractMock). */
function EndpointMock() {
  return (
    <div className="od-contract" aria-hidden="true">
      <div className="od-contract-tab">gateway key acme-org · engineering</div>
      <pre className="od-contract-code">{`# Anything that speaks OpenAI speaks Glyphh.
client = OpenAI(
    base_url = "https://router.glyphh.ai",
    api_key  = "sk-…"   # minted against a role
)

# The key carries its governance with it:
#   models      the role's supported set
#   rpm / tpm   the role's rate limits
#   max_budget  the role's hard budget
#   expiry      yours to choose`}</pre>
    </div>
  );
}

const WAYS = [
  {
    tag: 'one endpoint',
    title: 'Point anything at it.',
    desc: 'The gateway speaks the OpenAI API, so every SDK, agent framework, and tool you already use connects by changing one base URL. A hundred-plus providers and thousands of models behind it — one integration, forever.',
  },
  {
    tag: 'your keys',
    title: 'The vendor bills you.',
    desc: 'Bring your own Anthropic, OpenAI, Google, Mistral keys — the gateway routes on your credentials and the vendor invoices you directly. Glyphh never resells a token, never marks one up, never sees your bill.',
  },
  {
    tag: 'your call',
    title: 'Support what you mean to.',
    desc: 'The whole catalog is there, but nothing is on until you say so: enable a vendor by adding its key, pick the models your org supports, and let roles narrow it from there. No surprise models, no surprise spend.',
  },
];

const GOVERN = [
  {
    icon: ICONS.apps,
    name: 'Roles',
    title: 'Governance is a role, not a spreadsheet.',
    desc: 'Every team gets a role: the models it can call, the rate it can call them, the budget it burns — daily, weekly, or monthly, advisory or hard-stop — and even its own vendor key when the bill should split. Set it once; every key that role mints inherits all of it.',
    chips: ['models', 'rpm_limit', 'max_budget'],
  },
  {
    icon: ICONS.apps,
    name: 'Keys',
    title: 'Keys the gateway hands out.',
    desc: 'Mint a key against a role and hand it to a service, a pipeline, a teammate. It reaches exactly that role’s models, carries its limits and expiry, and dies the moment you revoke it — while its history stays on the books forever. Sign in with Glyphh and your personal key mints itself off your role.',
    chips: ['key_alias', 'expiry', 'revoke'],
  },
  {
    icon: ICONS.apps,
    name: 'Telemetry',
    title: 'Every token. Never a transcript.',
    desc: 'Requests, tokens, spend, and speed — per day, per model, per provider, per role — on a dashboard your org admin reads at a glance. The gateway logs request metadata only: prompts and completions are never stored, so there is nothing to subpoena, leak, or train on.',
    chips: ['tokens', 'spend_usd', 'p95_ms'],
  },
];

export default function GatewayPage() {
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
              GLYPHH GATEWAY
            </div>
            <h1 className="page-hero-title">
              Every model<span className="dot">.</span> Your keys<span className="dot">.</span>{' '}
              <span className="hero-accent">One gateway</span><span className="dot">.</span>
            </h1>
            <p className="page-hero-sub">
              Everything you run — the desktop, your agents, your machines — reaches every model
              you trust through one OpenAI-compatible endpoint. Your vendor keys pay the vendors;
              your roles decide who gets what; your dashboards see every token without ever
              reading a prompt.
            </p>
            <div className="hero-ctas">
              <a href="/#download" className="btn btn-primary btn-lg group">
                <span className="btn-label">Get Glyphh Desktop — Free</span>
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
          <h2 className="section-title">You don&rsquo;t integrate models. You integrate once.</h2>
          <div className="od-extract-grid">
            {WAYS.map((e) => (
              <div className="od-extract-card reveal" key={e.tag}>
                <span className="od-extract-tag">{e.tag}</span>
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE CONTRACT ── */}
      <section className="od-contract-band">
        <div className="container op-prod">
          <div className="op-prod-copy">
            <div className="op-prod-mark">{ICONS.apps} Glyphh Gateway</div>
            <h3>A key that carries its own rules.</h3>
            <p>
              A gateway key here isn&rsquo;t a bare secret in a vault — it&rsquo;s a contract.
              Minted against a role, it arrives already knowing which models it may call, how
              fast, on whose budget, and until when. The gateway enforces all of it at the edge;
              your services just make requests. Change the role once and every key minted after
              follows.
            </p>
          </div>
          <div className="op-prod-mock reveal"><EndpointMock /></div>
        </div>
      </section>

      {/* ── GOVERNANCE ── */}
      <section className="op-products">
        <div className="container">
          {GOVERN.map((c, i) => (
            <div className={`op-prod reveal ${i % 2 ? 'op-prod-flip' : ''}`} key={c.name}>
              <div className="op-prod-copy">
                <div className="op-prod-mark">{c.icon} {c.name}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
              <div className="op-prod-mock">
                <div className={`od-consumer od-consumer-${i}`} aria-hidden="true">
                  <span className="od-consumer-chip">{c.chips[0]}</span>
                  <span className="od-consumer-chip alt">{c.chips[1]}</span>
                  <span className="od-consumer-chip">{c.chips[2]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-card reveal">
            <h2>Point it at the gateway. Govern the rest.</h2>
            <p>The Glyphh Gateway ships with every plan — full on Basic and up, role governance on Pro.</p>
            <div className="hero-ctas">
              <a href="/#download" className="btn btn-primary btn-lg group">
                <span className="btn-label">Download Glyphh</span>
                <span className="btn-fill"></span>
              </a>
              <a href="/products/design" className="btn btn-ghost btn-lg group">
                <span className="btn-label">See Glyphh Design</span>
                <span className="btn-fill"></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
