import Nav from './components/Nav';
import Reveal from './components/Reveal';
import Footer from './components/Footer';
import AdaField from './components/AdaField';
import LetterField from './components/LetterField';
import { HOME_TITLE, HOME_DESCRIPTION } from './lib/home-meta';

// THE HOME PAGE is Ada (his order, 2026-10-21): the promise, Ada learning and
// the next steps as the hero, then the Ada page as it was at /products/ada.
// The facts are Ada Cloud's and the kernel's (the functions, where it runs; live
// 2026-10-22); the example answer is illustrative.

export const metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
};

const DOCS = "https://docs.glyphh.ai";

const STEPS = [
  {
    title: 'Record',
    head: 'Each case, with its outcome',
    body: 'A case is typed JSON in the shape your spec gives it. Recorded with the outcome the world confirmed, it becomes a precedent, and counts from the next question.',
    icon: (<><path d="M12 5v14" /><path d="M5 12h14" /></>),
  },
  {
    title: 'Answer',
    head: 'From the nearest precedents',
    body: 'A calibrated probability for each outcome, how many precedents voted, and their receipts. When nothing is close enough, Ada says so and asks.',
    icon: (<><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>),
  },
  {
    title: 'Learn',
    head: 'Sharper with every graded case',
    body: 'Each graded case is a new precedent, and Ada learns its own weights from them: the parts of a case that predict the outcome count for more.',
    icon: (<><path d="M4 18l5-5 4 4 7-8" /><path d="M15 9h5v5" /></>),
  },
];

const WHERE = [
  {
    title: 'Ada Cloud',
    head: 'Your models, in Glyphh’s cloud',
    body: 'Your models live and run in Glyphh’s cloud, isolated per organisation. Nothing to install or run. We never train on your data.',
  },
  {
    title: 'From Claude',
    head: 'The Glyphh connector',
    body: 'Add https://api.glyphh.ai/mcp as a connector, sign in and click Allow. The glyphh plugin’s Ada skill builds the model with you and asks it.',
  },
  {
    title: 'From your software',
    head: 'The SDKs, or the API',
    body: 'pip install glyphh or npm install @glyphh-ai/glyphh, with an API key from the platform, calling https://ada.glyphh.ai.',
  },
  {
    title: 'Clearance',
    head: 'Each caller sees what they may',
    body: 'A spec can put layers behind a clearance. A status bot gets the fix; an engineer also gets the cause, the owner and the runbook.',
  },
];

const ASK = `incidents.decide({
  "error": {
    "what": { "class": "TimeoutError",
              "message": "payment gateway timed out",
              "status": 504 }
  }
})`;

const ANSWER = `{
  "fix": "raise circuit breaker",
  "confidence": 0.82,
  "from": 6,
  "last_time": {
    "cause": "gateway rate limit hit on retry storm",
    "owner": "payments",
    "runbook": "RB-12 back off retries, raise circuit breaker"
  }
}`;

const INSTALL = `/plugin marketplace add glyphh-ai/glyphh
/plugin install glyphh@glyphh

# then add the Glyphh connector, https://api.glyphh.ai/mcp,
# and ask Claude to build a model with you`;

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

export default function Home() {
  return (
    <div className="home-page">
      <Reveal />
      <Nav />

      {/* The hero runs the full width, with a full-width line at its base; the frame's rails start there and never
          rise into the hero (his order, 2026-10-22). */}
      <section className="mh-hero">
          <h1 className="mh-line">Give your code the ability to reason without an LLM.</h1>
          <p className="mh-what">
            Glyphh Ada classifies anything you have labelled examples of — tickets, transactions, documents, events,
            etc. — returns a confidence, probability gates, and the precedents behind them for auditability.
          </p>
          <div className="mh-actions">
            <a href="https://platform.glyphh.ai" className="os-cta os-cta-primary">Start free</a>
            <a href="/use-cases/support-routing" className="os-cta os-cta-ghost">See ticket routing in action</a>
          </div>
          <div className="mh-field">
            <AdaField />
          </div>
      </section>

      <div className="site-frame">
        <section className="hiw" id="how-it-works">
          <div className="qs-head">
            <span className="qs-kicker">How it works</span>
            <a href={`${DOCS}/plugin`} className="qs-more">A model &rarr;</a>
          </div>
          <div className="hv-grid">
            {STEPS.map((t, i) => <Tile key={t.title} t={t} i={i} />)}
          </div>
        </section>

        <section className="hiw" id="answer">
          <div className="qs-head">
            <span className="qs-kicker">The answer</span>
            <a href={`${DOCS}/sdks`} className="qs-more">The SDKs &rarr;</a>
          </div>
          <h2 className="ix-h2 lt-h2">An answer you can check, not a guess you have to trust.</h2>
          <p className="ix-desc">
            Ada does not generate. It finds the precedents closest to the case, weighs them, and reports what
            they say. A single precedent is not consensus, and the answer says how many stand behind it.
          </p>
          <div className="ada-split">
            <div>
              <p className="ada-split-label">Your software asks</p>
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
            <a href={`${DOCS}/getting-started`} className="qs-more">Getting started &rarr;</a>
          </div>
          <div className="hv-grid hv-grid-2">
            {WHERE.map((t, i) => <Tile key={t.title} t={t} i={i + 3} />)}
          </div>
        </section>

        <section className="hiw" id="install">
          <div className="qs-head">
            <span className="qs-kicker">Install</span>
            <a href={`${DOCS}/plugin`} className="qs-more">Connect Claude &rarr;</a>
          </div>
          <h2 className="ix-h2 lt-h2">Two commands and a connector.</h2>
          <p className="ix-desc">
            Claude signs in with your Glyphh account: no key to type. Ada is in every plan, Free included, and
            never priced per seat, per model or per call.
          </p>
          <pre className="hv-code" style={{ marginTop: '1.25rem' }}><code>{INSTALL}</code></pre>
          <p className="hv-foot-link"><a href="https://github.com/glyphh-ai/glyphh">github.com/glyphh-ai/glyphh</a></p>
        </section>
      </div>

      <Footer />
    </div>
  );
}
