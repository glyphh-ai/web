import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';
import HeroAscii from '../../components/HeroAscii';
import LetterField from '../../components/LetterField';

// Ada (2026-10-01 mock): the product page, in the home page's frame grammar.
// The facts are the server's (glyphh_auth/ada*.py): the tool names, the answer
// fields, where records live. The example answer is illustrative.

export const metadata = {
  title: 'Ada: typed models your agents build. Your software leverages it at runtime',
  description:
    'Seed Ada with data and she builds a lattice of algebraic meaning. Leverage our SDK or direct API to then make deterministic calls with no LLM in the middle.',
};

const DOCS = "https://docs.glyphh.ai";

const STEPS = [
  {
    title: 'Record',
    head: 'What was tried, and whether it worked',
    body: 'When the world has graded an outcome, the agent records it: a win with ada_record, a failure with ada_veto. A situation is JSON of any shape.',
    icon: (<><path d="M12 5v14" /><path d="M5 12h14" /></>),
  },
  {
    title: 'Query',
    head: 'What worked in situations like this one',
    body: 'Before repeating a decision, the agent asks. Ada returns the top outcome, its confidence, the records behind it, and act: true only when it is safe to go.',
    icon: (<><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>),
  },
  {
    title: 'Explain',
    head: 'Why, part by part',
    body: 'ada_facts explains each close record as a fact tree: per key its score, its weight and its share. The answer cites its records and says when it does not know.',
    icon: (<><path d="M12 3v6" /><path d="M12 9 6 15" /><path d="M12 9l6 6" /><circle cx="6" cy="17" r="2" /><circle cx="18" cy="17" r="2" /></>),
  },
];

const WHERE = [
  {
    title: 'Any MCP client',
    head: 'Claude Code, Claude, Cursor, Codex, your own agents',
    body: 'Add one URL and sign in with your Glyphh account. The Claude Code plugin adds the skill that tells Claude when to reach for Ada.',
  },
  {
    title: 'POST /ada',
    head: 'One endpoint, on a gateway key',
    body: 'Every tool is an op on one endpoint. Call it from a service, a job or a script, with the same budget and the same answer.',
  },
  {
    title: 'A chat model',
    head: 'glyphh-ada-1.0',
    body: 'Pick it like any other model and talk to it in plain language or JSON. It answers only by calling Ada, and cites what it used.',
  },
  {
    title: 'Your records, your place',
    head: 'In the cloud, or on a device you registered',
    body: 'A model keeps its records with Glyphh or on your own machine. Its configuration, weights and calibration always live on the server.',
  },
];

const ASK = `ada_query({
  model_id: "am_0123456789ab",
  situation: {
    task: "deploy_service",
    constraint: "canary_required"
  }
})`;

const ANSWER = `{
  "top": "canary_then_full",
  "confidence": 0.82,
  "count": 6,
  "act": true,
  "reason": "sufficient, confident, not vetoed",
  "veto_match": 0.12,
  "receipts": [
    { "id": "9f2c1a7b40de", "sim": 0.94, "outcome": "canary_then_full" },
    { "id": "5b7e03c1a9f2", "sim": 0.91, "outcome": "canary_then_full" }
  ]
}`;

const INSTALL = `claude plugin marketplace add glyphh-ai/ada
claude plugin install ada@glyphh-ai

# then, in Claude Code:  /mcp  ->  ada  ->  Authenticate`;

function Tile({ t, i }) {
  return (
    <div className="hv-tile">
      <LetterField seed={i + 1} />
      {t.icon ? (
        <svg className="hv-tile-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {t.icon}
        </svg>
      ) : null}
      <h3 className="hv-tile-title">{t.title}</h3>
      <p className="hv-tile-head">{t.head}</p>
      <p className="hv-tile-body">{t.body}</p>
    </div>
  );
}

export default function AdaPage() {
  return (
    <div className="home-page">
      <Reveal />
      <Nav />

      <header className="oshero company-hero">
        <div className="oshero-art" aria-hidden="true">
          <HeroAscii />
        </div>
        <div className="oshero-inner container">
          <p className="oshero-eyebrow">Ada · glyphh-ada-1.0</p>
          <h1 className="oshero-title">
            Typed models your agents build. Your software leverages it at <em>runtime.</em>
          </h1>
          <p className="oshero-pitch">
            Seed Ada with data and she builds a lattice of algebraic meaning. Leverage our SDK or direct API to
            then make deterministic calls with no LLM in the middle.
          </p>
          <div className="oshero-actions">
            <a href={`${DOCS}/ada-install`} className="os-cta os-cta-primary">Install Ada</a>
            <a href={`${DOCS}/ada`} className="os-cta os-cta-ghost">Read the Docs</a>
          </div>
        </div>
      </header>

      <div className="site-frame">
        <section className="hiw" id="how-it-works">
          <div className="qs-head">
            <span className="qs-kicker">How it works</span>
            <a href={`${DOCS}/ada-tools`} className="qs-more">Every tool &rarr;</a>
          </div>
          <div className="hv-grid">
            {STEPS.map((t, i) => <Tile key={t.title} t={t} i={i} />)}
          </div>
        </section>

        <section className="hiw" id="answer">
          <div className="qs-head">
            <span className="qs-kicker">The answer</span>
            <a href={`${DOCS}/ada-tools`} className="qs-more">Answer fields &rarr;</a>
          </div>
          <h2 className="ix-h2 lt-h2">An answer you can check, not a guess you have to trust.</h2>
          <p className="ix-desc">
            Ada does not generate. It finds the records closest to the situation, weighs them, and reports what
            they say. A single record is not consensus, and the answer says how many stand behind it.
          </p>
          <div className="ada-split">
            <div>
              <p className="ada-split-label">The agent asks</p>
              <pre className="hv-code"><code>{ASK}</code></pre>
            </div>
            <div>
              <p className="ada-split-label">Ada answers (example)</p>
              <pre className="hv-code"><code>{ANSWER}</code></pre>
            </div>
          </div>
        </section>

        <section className="hiw" id="where">
          <div className="qs-head">
            <span className="qs-kicker">Where it runs</span>
            <a href={`${DOCS}/ada`} className="qs-more">Ada models &rarr;</a>
          </div>
          <div className="hv-grid hv-grid-2">
            {WHERE.map((t, i) => <Tile key={t.title} t={t} i={i + 3} />)}
          </div>
        </section>

        <section className="hiw" id="install">
          <div className="qs-head">
            <span className="qs-kicker">Install</span>
            <a href={`${DOCS}/ada-install`} className="qs-more">Every client &rarr;</a>
          </div>
          <h2 className="ix-h2 lt-h2">Two commands and a sign-in.</h2>
          <p className="ix-desc">
            No key to create. Every call is metered per token on your organization&rsquo;s plan, like any model.
          </p>
          <pre className="hv-code" style={{ marginTop: '1.25rem' }}><code>{INSTALL}</code></pre>
          <p className="hv-foot-link"><a href="https://github.com/glyphh-ai/ada">github.com/glyphh-ai/ada</a></p>
        </section>
      </div>

      <Footer />
    </div>
  );
}
