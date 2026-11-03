import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import '../use-cases.css';

// Claude bots: a Claude agent governed by a program, with Ada gates for the
// judgment calls. Every figure is the bots experiment run on 2026-11-03 (the lab's
// 103 trials and the coder bot's 30 held-out runs), labelled as the experiment it
// is, with what it does not prove beside it.

export const metadata = {
  title: 'Claude bots with Ada gates — Glyphh',
  description:
    'A Claude agent run by a program, with Ada gates that learn from real outcomes. A coder bot taught by its own lab passed 10 of 10 held-out coding tasks for a twentieth of what always-Opus cost.',
};

const PLATFORM_URL = 'https://platform.glyphh.ai';
const DOCS = 'https://docs.glyphh.ai';

const FLOW = [
  { n: '1', title: 'The program', body: 'Code runs the loop: what the bot does next, in what order, and when it is done. Nothing about the loop is left to a prompt.' },
  { n: '2', title: 'Hard gates', body: 'Rules in code: the budget, what the bot may do, what needs a person’s approval. A step that breaks one is refused, every time.' },
  { n: '3', title: 'Ada gates', body: 'Learned models make the judgment calls between steps, such as which model a task needs, and learn from each real outcome and each answer a person gives.' },
  { n: '4', title: 'Claude', body: 'Called only for the steps that need it, with the model the gate chose. Its result is recorded, so the next call is better judged.' },
];

const LAB = [
  ['Arms', 'Haiku, Sonnet and Opus; and four ways of asking: plain, tests first, plan first and edge cases first.'],
  ['Tasks', '12 small Python coding tasks: bugfixes, from-scratch builds and multi-file changes. Among them a cron next-run, an expression evaluator, a bank ledger bug, CSV quoting and money rounding.'],
  ['A trial', 'Claude Code (claude -p) in a fresh temporary folder, told the task, judged by hidden tests it never saw.'],
  ['Hard rules', 'The lab refused any proposal outside the allowed arms, or that changed more than one thing at a time.'],
  ['Ada gates', 'Each experiment bot’s gate learned which cells (a task and an arm) were already known, and sent trials only where the outcome was not. The lab’s own promising gate rated each new proposal before it ran.'],
  ['The bill', '103 trials, $3.97 of Claude usage for the whole lab, as Claude Code reports it.'],
];

const PER_TRIAL = [
  ['Haiku', '$0.0039', '1×'],
  ['Sonnet', '$0.0395', '10×'],
  ['Opus', '$0.1011', '26×'],
];

const PROOF = [
  ['Always Opus', '10', '10', '$1.057', '1.00×', '315'],
  ['Always Sonnet (Claude Code’s default)', '10', '9', '$0.487', '0.46×', '280'],
  ['Routed by the coder bot', '10', '10', '$0.050', '0.05×', '351'],
];

const NEED = [
  ['A program', 'The loop and the hard gates, in code you can read and test. The budget and the approvals live here, not in a prompt.'],
  ['An Ada model per gate', 'Each judgment call is an Ada model: its history in, a calibrated answer out, with the precedents it stands on.'],
  ['Real outcomes', 'Tests that pass or fail, a person’s yes or no. Each one is recorded, so the gate keeps learning.'],
  ['Claude', 'Claude Code or the API, for the steps that need a model, at the size the gate picks.'],
];

export default function ClaudeBotsPage() {
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/use-cases" className="ix-crumb">&larr; Use cases</a>
          <span className="qs-kicker">Use case · Claude bots</span>
          <h1 className="ix-title">A Claude agent that learns its job, then does it for less.</h1>
          <p className="ix-lede">
            A Glyphh bot is a Claude agent governed by a program. The program runs the loop and holds the hard gates in
            code. Ada gates make the judgment calls between steps and learn from what really happened. Claude is called
            only for the steps that need it.
          </p>
          <div className="ix-actions">
            <a href={PLATFORM_URL} className="os-cta os-cta-primary">Start free</a>
            <a href="#proof" className="os-cta os-cta-ghost">See the proof</a>
          </div>
        </section>

        <section className="ix-section" id="how">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">How it works</span>
              <h2 className="ix-h2">Rules in code, judgment from precedent.</h2>
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
          <dl className="rt-facts">
            <div><dt>The orchestrator</dt><dd>Bots are made by a bot. The orchestrator is itself a program with hard gates and Ada gates, and it learns from every bot it makes: which ones paid off, and which were not worth running.</dd></div>
          </dl>
        </section>

        <section className="ix-section" id="lab">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">The lab</span>
              <h2 className="ix-h2">The orchestrator, finding out how Claude codes best.</h2>
              <p className="ix-desc">
                Each generation, the orchestrator proposed experiments on how Claude does coding work best, its hard rules
                refused the ones that broke them, and it made an experiment bot for each one left. Run on 3 November
                2026, on one Mac.
              </p>
            </div>
          </div>

          <dl className="rt-facts">
            {LAB.map(([t, d]) => (
              <div key={t}><dt>{t}</dt><dd>{d}</dd></div>
            ))}
          </dl>

          <div className="rt-table">
            <table>
              <thead><tr><th>Model</th><th>Average cost per trial</th><th>Against Haiku</th></tr></thead>
              <tbody>
                {PER_TRIAL.map(([m, c, r]) => (
                  <tr key={m} className={m === 'Haiku' ? 'rt-best' : undefined}>
                    <td>{m}</td><td>{c}</td><td>{r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <dl className="rt-facts">
            <div><dt>Models</dt><dd>Haiku passed every task Sonnet and Opus did, at about a tenth of Sonnet’s cost and a 25th of Opus’s, six trials an arm per experiment. On the hardest tasks it took two to three times as long.</dd></div>
            <div><dt>Prompting</dt><dd>Tests first and edge cases first cost more and passed nothing the plain prompt did not.</dd></div>
            <div><dt>The lab learned</dt><dd>After its first three findings, the lab’s promising gate rated two model-against-model proposals at P(decisive) 1.00 and 0.95 and a prompting proposal at 0.17, and ran them in that order. The orchestrator had learned which experiments pay off.</dd></div>
          </dl>
        </section>

        <section className="ix-section" id="proof">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">The proof</span>
              <h2 className="ix-h2">Five tasks the lab never saw, at a twentieth of the cost.</h2>
              <p className="ix-desc">
                A coder bot was handed what the lab learned: its Ada route gate was seeded from the lab’s trials, each
                task’s cheapest model that passed every time. Then it was given five new tasks, twice each: a slugify
                bugfix, a token-bucket rate limiter bugfix, a topological sort that reports cycles, a small template
                language, and a multi-file job queue with retries and dead letters.
              </p>
            </div>
          </div>

          <div className="rt-table">
            <table>
              <thead><tr><th>Arm</th><th>Tasks</th><th>Passed</th><th>Total cost</th><th>Against always Opus</th><th>Total seconds</th></tr></thead>
              <tbody>
                {PROOF.map(([a, t, p, c, r, s]) => (
                  <tr key={a} className={a.startsWith('Routed') ? 'rt-best' : undefined}>
                    <td>{a}</td><td>{t}</td><td>{p}</td><td>{c}</td><td>{r}</td><td>{s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <dl className="rt-facts">
            <div><dt>What it chose</dt><dd>The route gate picked Haiku for every task, at P 1.00. Its escalation ladder (Haiku, then Sonnet, then Opus on a failure) was never needed.</dd></div>
            <div><dt>The result</dt><dd>Every task passed, as with always Opus, for 5% of the cost and about a tenth of Sonnet’s. Always Sonnet, Claude Code’s default, missed one.</dd></div>
          </dl>

          <div className="rt-caveats">
            <h3>What it does not show</h3>
            <ul>
              <li>Your codebase. The tasks are small and were written for the test, and they are Python only.</li>
              <li>A large sample. Five held-out tasks, twice each: read the cost gap, not the pass counts.</li>
              <li>Your tests. Hidden tests stood in for a project’s own; a bot is only as good as the outcome it learns from.</li>
              <li>Escalation. The route collapsed to one model, so the ladder to Sonnet and Opus went untested.</li>
              <li>Speed. Haiku was slower: 351 seconds against 315 for Opus and 280 for Sonnet.</li>
              <li>A bill. Costs are what Claude Code reports for each run, not an invoice.</li>
            </ul>
          </div>
        </section>

        <section className="ix-section" id="adopt">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">What it takes</span>
              <h2 className="ix-h2">A program, its gates and real outcomes.</h2>
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
              <p>Every Ada gate is an Ada model. Upgrade for more precedents and more reads.</p>
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
