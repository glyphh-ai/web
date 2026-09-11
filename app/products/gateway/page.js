import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Glyphh Gateway — every model, your keys, one governed endpoint',
  description:
    'One gateway between everything you run and every model you trust. Bring your own vendor keys, govern access by role, hand out keys with budgets and rate limits built in — and see every token, dollar, and millisecond without ever storing a prompt.',
};

/* The vendors the catalog fronts — favicon marks, same grammar as the relay. */
const VENDORS = [
  'anthropic.com', 'openai.com', 'gemini.google.com', 'mistral.ai',
  'x.ai', 'deepseek.com', 'groq.com', 'ollama.com',
];

/* The model catalog strip riding above the hub (the relay's connections strip). */
const CATALOG = [
  'anthropic.com', 'openai.com', 'gemini.google.com', 'mistral.ai', 'x.ai',
  'deepseek.com', 'groq.com', 'meta.com', 'cohere.com', 'ai21.com',
  'perplexity.ai', 'together.ai', 'fireworks.ai', 'ollama.com',
];

const PILLARS = [
  {
    title: 'Your keys, your bill',
    desc: 'Bring your own vendor keys — Anthropic, OpenAI, Google, and a hundred more. The vendor bills you directly; Glyphh never resells a token. Add a key, pick the models you support, done.',
  },
  {
    title: 'Governed by role',
    desc: 'Roles decide who reaches what: the models a team can call, the vendor key their usage bills to, rate limits, and budgets with a hard stop when you want one. Set it once; every key inherits it.',
  },
  {
    title: 'Keys the gateway hands out',
    desc: 'Mint a key against a role and hand it to a service, a pipeline, or a person. It reaches exactly that role’s models, carries its limits, and dies on your schedule — while its metrics live on.',
  },
  {
    title: 'Telemetry, never transcripts',
    desc: 'Tokens, spend, and speed per day, per model, per provider, per role. The gateway logs request metadata only — prompts and completions are never stored, so there is nothing to leak.',
  },
];

export default function GatewayPage() {
  return (
    <div className="office-page">
      <Reveal />
      <Nav />

      {/* ── HERO ── */}
      <header className="page-hero page-hero-tight op-hero">
        <div className="container">
          <div className="op-hero-copy" style={{ maxWidth: 720 }}>
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
              you trust through one governed endpoint. Your vendor keys pay the vendors; your
              roles decide who gets what; your dashboards see every token without ever reading
              a prompt.
            </p>
            <div className="hero-ctas">
              <a href="/#download" className="btn btn-primary btn-lg group">
                <span className="btn-label">Get Glyphh Desktop — Free</span>
                <span className="btn-fill"></span>
              </a>
            </div>
          </div>

          {/* Marketecture — the relay grammar (apx/mcx): your surfaces on the
              left routing into the mascot, the vendors on the right, the model
              catalog streaming through above the hub. */}
          <div className="apx-stage mcx-stage reveal" aria-hidden="true">
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
              {/* the model catalog — every vendor the gateway fronts, streaming through */}
              <div className="mcx-apps">
                <span className="mcx-apps-label">models</span>
                <div className="mcx-apps-track">
                  {[...CATALOG, ...CATALOG].map((d, i) => (
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
              <img src="/glyphh-mascot-square-black.png" alt="" className="apx-mascot" width="88" height="88" />
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
        </div>
      </header>

      {/* ── HOW IT'S GOVERNED ── */}
      <section className="op-memory" id="governance">
        <div className="container">
          <span className="rp-eyebrow">{'{'} the gateway {'}'}</span>
          <h2 className="section-title">BYOK underneath. Governance on top.</h2>
          <p className="op-memory-sub">
            The org enables a vendor by adding its key and picking the models it supports. Roles
            narrow that to what each team actually needs — their models, their budget, even their
            own vendor key when the bill should split. Every key the gateway hands out inherits
            the role that minted it: its model list, its rate limits, its budget, its expiry.
          </p>
          <div className="op-memory-points">
            {PILLARS.map((p) => (
              <div key={p.title} className="op-memory-point">
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-card">
            <h2>Point it at the gateway<span className="dot">.</span> Govern the rest<span className="dot">.</span></h2>
            <p>The Glyphh Gateway ships with every plan — full on <span className="compose-cmd">Basic</span> and up, with role governance on Pro.</p>
            <div className="cta-buttons">
              <a href="/#download" className="btn btn-white btn-lg group">
                <span className="btn-label">Download for Mac — Free</span>
                <span className="btn-fill btn-fill-dark"></span>
              </a>
              <a href="/pricing" className="btn btn-ghost-white btn-lg group">
                <span className="btn-label">See Pricing</span>
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
