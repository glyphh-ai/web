import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';
import HeroAscii from '../../components/HeroAscii';
import LetterField from '../../components/LetterField';

// Ada: the product page, in the home page's frame grammar. The facts are
// rrotor's and the kernel's (the functions, the answer's fields, where it
// runs); the example answer is illustrative.

export const metadata = {
  title: 'Ada: decisions from precedent, in your own runtime',
  description:
    'Record each case with its outcome; a new case is answered from the precedents closest to it, deterministically, with the precedents it stands on. Built with Claude, called by your software.',
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
    title: 'Query',
    head: 'What the closest precedents say',
    body: 'The leading outcome, its confidence, how many precedents voted, and their receipts. When nothing is close enough, sufficient is false.',
    icon: (<><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>),
  },
  {
    title: 'Explain',
    head: 'Why, part by part',
    body: 'facts explains each close precedent as a fact tree: per layer, segment and role its score, weight and share, cut to what the caller may see.',
    icon: (<><path d="M12 3v6" /><path d="M12 9 6 15" /><path d="M12 9l6 6" /><circle cx="6" cy="17" r="2" /><circle cx="18" cy="17" r="2" /></>),
  },
];

const WHERE = [
  {
    title: 'Your runtime',
    head: 'Hosted at <machine>.glyphh.app, or self-hosted',
    body: 'Your models live and run in a runtime of your own. Nothing of Glyphh’s is between your callers and it. Self-hosting is free on every plan.',
  },
  {
    title: 'From Claude',
    head: 'The runtime’s MCP connector',
    body: 'Add <runtime>/mcp as a connector and click Allow. The glyphh plugin’s Ada skill writes the model with you, deploys a commit and calls it.',
  },
  {
    title: 'From your software',
    head: 'The SDKs, or POST /v1/runs',
    body: 'pip install glyphh or npm install @glyphh-ai/glyphh, with your runtime’s address and a runtime key.',
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

# then add your runtime's connector, https://<machine>.glyphh.app/mcp,
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
          <p className="oshero-eyebrow">Ada</p>
          <h1 className="oshero-title">
            Decisions from precedent, in your own <em>runtime.</em>
          </h1>
          <p className="oshero-pitch">
            Record each case with its outcome. A new case is answered from the precedents closest to it: the same
            answer every time, the precedents it stands on, and no language model in the path.
          </p>
          <div className="oshero-actions">
            <a href={`${DOCS}/quick-start`} className="os-cta os-cta-primary">Quick start</a>
            <a href={`${DOCS}/ada`} className="os-cta os-cta-ghost">Read the Docs</a>
          </div>
        </div>
      </header>

      <div className="site-frame">
        <section className="hiw" id="how-it-works">
          <div className="qs-head">
            <span className="qs-kicker">How it works</span>
            <a href={`${DOCS}/ada`} className="qs-more">A model &rarr;</a>
          </div>
          <div className="hv-grid">
            {STEPS.map((t, i) => <Tile key={t.title} t={t} i={i} />)}
          </div>
        </section>

        <section className="hiw" id="answer">
          <div className="qs-head">
            <span className="qs-kicker">The answer</span>
            <a href={`${DOCS}/fact-trees`} className="qs-more">Answer fields &rarr;</a>
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
            <a href={`${DOCS}/runtimes`} className="qs-more">Runtimes &rarr;</a>
          </div>
          <div className="hv-grid hv-grid-2">
            {WHERE.map((t, i) => <Tile key={t.title} t={t} i={i + 3} />)}
          </div>
        </section>

        <section className="hiw" id="install">
          <div className="qs-head">
            <span className="qs-kicker">Install</span>
            <a href={`${DOCS}/ada-install`} className="qs-more">Connect Claude &rarr;</a>
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
