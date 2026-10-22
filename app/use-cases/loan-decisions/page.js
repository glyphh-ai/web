import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import '../use-cases.css';

// Loan decisions: Ada on typed fields, priced in the lender's own costs. Every
// figure is glyphh-ai/glyphh's benchmarks/credit (README and results/), labelled as the
// experiment it is, with what it does not prove beside it.

export const metadata = {
  title: 'Loan decisions with Ada — Glyphh',
  description:
    'Approve or refuse applications from your own past decisions, priced in what a wrong answer costs you. On German Credit, Ada cost the bank 100 against 110 and 114 for Claude.',
};

const PLATFORM_URL = 'https://platform.glyphh.ai';
const DOCS = 'https://docs.glyphh.ai';
const BENCH = 'https://github.com/glyphh-ai/glyphh/tree/main/benchmarks/credit';

const FLOW = [
  { n: '1', title: 'Past decisions', body: 'Record the applications you have decided, each with how it turned out. Each one becomes a precedent.' },
  { n: '2', title: 'Your costs', body: 'Say what each mistake costs: approving a bad loan, refusing a good one. Ada decides by the cheaper risk.' },
  { n: '3', title: 'A decision with receipts', body: 'Approve or refuse, a calibrated probability, and the past applications it stands on.' },
  { n: '4', title: 'A person when it is dear', body: 'Where every answer would cost too much, Ada asks instead. Record the outcome, and the next one is Ada’s.' },
];

const RESULTS = [
  ['Always approve', '67.5%', '325'],
  ['Claude Fable 5.1, run 1', '77.0%', '110'],
  ['Claude Fable 5.1, run 2', '79.0%', '114'],
  ['Logistic regression, cost-aware', '68.5%', '103'],
  ['Ada, learned and calibrated, decide', '70.0%', '100'],
];

const CODE = `from glyphh import Ada

loans = Ada().model("loans")   # GLYPHH_API_KEY

# once: the applications you have decided, with how each turned out
for a in history:
    loans.record(a.fields, a.outcome)   # "good" or "bad"

# each new application
r = loans.decide(application.fields)
if not r.ask:
    act(application, r.outcome)       # approve or refuse, with r.receipts
else:                                 # every answer is dear: ask a person
    outcome = ask_underwriter(application, r.receipts)
    loans.record(application.fields, outcome)`;

const NEED = [
  ['Past decisions', 'Typed fields with the outcome each had. The experiment used 800; start with what you have.'],
  ['Your costs', 'What each kind of mistake costs you, in your own units, in the model’s spec.'],
  ['An API key', 'Made on the platform; your app calls https://ada.glyphh.ai with it, through the SDK or the API.'],
  ['Nothing to run', 'Your model runs in Glyphh’s cloud, isolated per organisation. We never train on your data.'],
];

export default function LoanDecisionsPage() {
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/use-cases" className="ix-crumb">&larr; Use cases</a>
          <span className="qs-kicker">Use case · Loan decisions</span>
          <h1 className="ix-title">Decide loans by what a wrong answer costs you.</h1>
          <p className="ix-lede">
            Glyphh Ada decides each application from your past decisions, weighs a bad loan approved against a good one
            refused, shows the precedents behind it, and asks a person when every answer is dear.
          </p>
          <div className="ix-actions">
            <a href={PLATFORM_URL} className="os-cta os-cta-primary">Start free</a>
            <a href="#experiment" className="os-cta os-cta-ghost">See the experiment</a>
          </div>
        </section>

        <section className="ix-section" id="how">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">How it works</span>
              <h2 className="ix-h2">Decided by the cheaper risk, with receipts.</h2>
            </div>
          </div>
          <ol className="rt-flow">
            {FLOW.map((s) => (
              <li key={s.n} className="rt-step">
                <span className="rt-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="ix-section" id="experiment">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">The experiment</span>
              <h2 className="ix-h2">200 loan applications, approve or refuse.</h2>
              <p className="ix-desc">
                One experiment on one public dataset, not a guarantee for your book. The method, the data and every run
                are in the repository, so you can rerun it.
              </p>
            </div>
            <a href={BENCH} className="qs-more">Reproduce it &rarr;</a>
          </div>

          <dl className="rt-facts">
            <div><dt>Dataset</dt><dd>German Credit (UCI Statlog): 1,000 real loan applications, 20 typed fields each (checking account, credit history, purpose, amount, duration, savings, employment, …) and the bank’s outcome, good or bad.</dd></div>
            <div><dt>Split</dt><dd>One shuffle (seed 7): 800 to learn from, 200 held out, the same for every system. Ada’s weights and calibration came from the 800 alone.</dd></div>
            <div><dt>Baselines</dt><dd>Claude Fable 5.1, two independent runs, each given the 800 and told the costs; a logistic regression with a cost threshold; and always approving.</dd></div>
            <div><dt>The cost</dt><dd>The dataset’s own: approving a bad loan costs 5, refusing a good one costs 1. Lower is better.</dd></div>
            <div><dt>Asking</dt><dd>With asking a person priced at half a refused good loan, Ada decided 111 of the 200 itself, right on 81.1% of them, at a cost of 45 on those, and asked on 89.</dd></div>
          </dl>

          <div className="rt-table">
            <table>
              <thead><tr><th>System</th><th>Accuracy on the 200</th><th>Bank’s cost</th></tr></thead>
              <tbody>
                {RESULTS.map(([s, a, c]) => (
                  <tr key={s} className={s.startsWith('Ada') ? 'rt-best' : undefined}>
                    <td>{s}</td><td>{a}</td><td>{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rt-caveats">
            <h3>What it does not show</h3>
            <ul>
              <li>Higher accuracy. Ada trades accuracy for the bank’s cost: it refuses more good loans to approve fewer bad ones, which is what the costs ask for.</li>
              <li>Your book. 200 applications from one bank; the hold-out ran a little easy for every system, so read the ranking, not the third digit.</li>
              <li>A wide margin over a classic model. On purely typed data a tuned logistic regression is close (103 against 100). Ada adds the precedents behind each decision, asking, and learning one case at a time without retraining.</li>
            </ul>
          </div>
        </section>

        <section className="ix-section" id="code">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">In your code</span>
              <h2 className="ix-h2">Your decisions in, a decision out.</h2>
            </div>
            <a href={`${DOCS}/sdks`} className="qs-more">The SDKs &rarr;</a>
          </div>
          <pre className="rt-code">{CODE}</pre>
        </section>

        <section className="ix-section" id="adopt">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">What it takes</span>
              <h2 className="ix-h2">Your history, your costs and an API key.</h2>
            </div>
            <a href={`${DOCS}/getting-started`} className="qs-more">Getting started &rarr;</a>
          </div>
          <div className="ix-grid ix-grid-4">
            {NEED.map(([t, d]) => (
              <div key={t} className="ix-card ix-card-tall">
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="ix-section">
          <div className="ix-cta">
            <div>
              <span className="qs-kicker">Get started</span>
              <h3>Free: 1,000 precedents, 5,000 reads a month.</h3>
              <p>Upgrade for more precedents and more reads.</p>
            </div>
            <div className="ix-actions">
              <a href={PLATFORM_URL} className="os-cta os-cta-primary">Start free</a>
              <a href="/pricing" className="os-cta os-cta-ghost">Pricing</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
