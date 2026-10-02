import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';
import HeroAscii from '../../components/HeroAscii';
import LetterField from '../../components/LetterField';
import ModelCatalog from '../../components/ModelCatalog';
import { ContractTabs, RolesMock, KeysMock, MetricsMock } from './mocks';

// The Model Router (2026-10-02): the product page, in the home page's frame
// grammar, like Ada's. The models are LIVE: the server's list at each plan's
// rate (ModelCatalog, /api/models). No BYOK, no subscriptions to burn down
// (his order, 2026-09-29).

export const metadata = {
  title: 'Model Router: one endpoint, every model',
  description:
    'One endpoint, every model. Reduce your organization\'s token spend and harness the power of open models.',
};

const DOCS = "https://docs.glyphh.ai";
const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';

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
    name: 'Roles',
    title: 'Governance is a role, not a spreadsheet.',
    desc: 'Models, rate limits, budgets — set per team, once. Hard-stop the budget when it matters.',
    mock: <RolesMock />,
  },
  {
    name: 'Keys',
    title: 'Keys the Router hands out.',
    desc: 'Mint one for a service, a pipeline, a teammate. It dies the moment you revoke it. Its history stays on the books.',
    mock: <KeysMock />,
  },
  {
    name: 'Telemetry',
    title: 'Every token. Never a transcript.',
    desc: 'Tokens, spend, and speed — per model, per role, per day. We log metadata only. Prompts are never stored. There is nothing to leak.',
    mock: <MetricsMock />,
  },
];

const POINT = `export ANTHROPIC_BASE_URL="https://api.glyphh.ai"
export ANTHROPIC_AUTH_TOKEN="sk-…"   # a virtual key from the console

export OPENAI_BASE_URL="https://api.glyphh.ai"
export OPENAI_API_KEY="sk-…"`;

function Tile({ t, i }) {
  return (
    <div className="hv-tile">
      <LetterField seed={i + 1} />
      <h3 className="hv-tile-title">{t.tag}</h3>
      <p className="hv-tile-head">{t.title}</p>
      <p className="hv-tile-body">{t.desc}</p>
    </div>
  );
}

export default function RouterPage() {
  return (
    <div className="home-page">
      <Reveal />
      <Nav />

      <header className="oshero company-hero">
        <div className="oshero-art" aria-hidden="true">
          <HeroAscii />
        </div>
        <div className="oshero-inner container">
          <p className="oshero-eyebrow">Model Router</p>
          <h1 className="oshero-title">
            One endpoint. Every <em>model.</em>
          </h1>
          <p className="oshero-pitch">
            Reduce your organization&rsquo;s token spend and harness the power of open models.
          </p>
          <div className="oshero-actions">
            <a href={PLATFORM_URL} className="os-cta os-cta-primary">Create an account</a>
            <a href={`${DOCS}/gateway`} className="os-cta os-cta-ghost">Read the Docs</a>
          </div>
        </div>
      </header>

      <div className="site-frame">
        <section className="hiw" id="front-door">
          <div className="qs-head">
            <span className="qs-kicker">The front door</span>
            <a href={`${DOCS}/own-cli`} className="qs-more">Use your own CLI &rarr;</a>
          </div>
          <h2 className="ix-h2 lt-h2">You don&rsquo;t integrate models. You point at the router.</h2>
          <div className="hv-grid" style={{ marginTop: '1.5rem' }}>
            {WAYS.map((t, i) => <Tile key={t.tag} t={t} i={i} />)}
          </div>
        </section>

        <section className="hiw" id="contract">
          <div className="qs-head">
            <span className="qs-kicker">The contract</span>
            <a href={`${DOCS}/gateway`} className="qs-more">The Router &rarr;</a>
          </div>
          <div className="ada-split">
            <div>
              <h2 className="ix-h2 lt-h2">A key that carries its own rules.</h2>
              <p className="ix-desc">
                Every key is minted against a role. It knows which models it can call, how fast, on whose
                budget, and until when. The Router enforces it at the edge. Your services just make requests.
              </p>
            </div>
            <div><ContractTabs /></div>
          </div>
        </section>

        {GOVERN.map((c) => (
          <section className="hiw" key={c.name} id={c.name.toLowerCase()}>
            <div className="qs-head">
              <span className="qs-kicker">{c.name}</span>
              <a href={`${DOCS}/budgets`} className="qs-more">Roles and budgets &rarr;</a>
            </div>
            <div className="ada-split">
              <div>
                <h2 className="ix-h2 lt-h2">{c.title}</h2>
                <p className="ix-desc">{c.desc}</p>
              </div>
              <div>{c.mock}</div>
            </div>
          </section>
        ))}

        <section className="hiw" id="models">
          <div className="qs-head">
            <span className="qs-kicker">The models</span>
            <a href="/pricing" className="qs-more">Plans and rates &rarr;</a>
          </div>
          <h2 className="ix-h2 lt-h2">Every model behind the router.</h2>
          <p className="ix-desc">
            Live from the server. Per million tokens, input and output, on every plan. The bigger the plan,
            the better the rate.
          </p>
          <div style={{ marginTop: '1.5rem' }}><ModelCatalog compact /></div>
        </section>

        <section className="hiw" id="point">
          <div className="qs-head">
            <span className="qs-kicker">Point at it</span>
            <a href={`${DOCS}/own-cli`} className="qs-more">Every client &rarr;</a>
          </div>
          <h2 className="ix-h2 lt-h2">Change one line.</h2>
          <p className="ix-desc">
            Claude Code, Codex and any OpenAI or Anthropic SDK take a base URL and a key. Every call is paid
            from your plan&rsquo;s budget at a published rate.
          </p>
          <pre className="hv-code" style={{ marginTop: '1.25rem' }}><code>{POINT}</code></pre>
        </section>
      </div>

      <Footer />
    </div>
  );
}
