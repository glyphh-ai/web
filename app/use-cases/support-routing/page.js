import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { SALES_HREF, EARLY_ACCESS_LABEL } from '../../components/Pricing';
import AdaField from '../../components/AdaField';
import '../use-cases.css';

// Support routing: Ada's flagship use case, and the proof behind the home page's
// claim. Every figure is rrotor's benchmarks/banking77 (README and results/),
// labelled as the experiment it is, with what it does not prove beside it.

export const metadata = {
  title: 'Support ticket routing with Ada — Glyphh',
  description:
    'Route support tickets from your labelled history on your own infrastructure, and hand only the uncertain ones to an LLM. On Banking77, Ada then Claude routed 97.5% right with Claude seeing 22% of messages.',
};

const DOCS = 'https://docs.glyphh.ai';

const FLOW = [
  { n: '1', title: 'Labelled examples', body: 'Record the tickets you have already routed, each with its queue. Each one becomes a precedent.' },
  { n: '2', title: 'A new ticket', body: 'Your helpdesk sends its text to Ada in your runtime, from the SDK or REST.' },
  { n: '3', title: 'Queue and confidence', body: 'Ada answers from the nearest precedents: a queue, a calibrated confidence and the precedents it stands on.' },
  { n: '4', title: 'LLM for the rest', body: 'Below your confidence bar, your app asks an LLM instead. Record its answer, and next time that case is Ada’s.' },
];

const RESULTS = [
  ['Claude Haiku 4.5 alone', '81.0%', '100%'],
  ['Claude Sonnet 5.5 alone', '86.0%', '100%'],
  ['Ada alone', '90.0%', '0%'],
  ['Claude Opus 5.5 alone', '96.0%', '100%'],
  ['Claude Fable 5.1 alone', '96.5%', '100%'],
  ['Ada, then Haiku below 0.7', '91.5%', '22%'],
  ['Ada, then Sonnet below 0.7', '94.0%', '22%'],
  ['Ada, then Fable below 0.7', '97.5%', '22%'],
];

const CODE = `from glyphh import Ada

tickets = Ada().model("tickets")   # GLYPHH_RUNTIME_URL, GLYPHH_RUNTIME_KEY

# once: the tickets you have already routed
for t in history:
    tickets.record({"message": t.text}, outcome=t.queue)

# each new ticket
r = tickets.decide({"message": ticket.text})
if r.done:
    route(ticket, r.data)                  # Ada was sure
elif r.waiting:                            # below your bar: ask the LLM
    queue = ask_llm(ticket.text)
    route(ticket, queue)
    tickets.record({"message": ticket.text}, outcome=queue)`;

const NEED = [
  ['Labelled tickets', 'Text with the queue each went to. The experiment used 10,003; start with what you have, and the share Ada keeps grows as you record more.'],
  ['One node', 'rrotor on a machine you run, with Docker Compose, Helm or Terraform. A small machine is enough for one model.'],
  ['A runtime key', 'Made on the platform; your app sends it to your runtime. Ticket text never passes through Glyphh.'],
  ['Your side', 'The machine, its volume and its backups, and upgrading the image. Glyphh issues the licence key and the sign-in.'],
];

export default function SupportRoutingPage() {
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/use-cases" className="ix-crumb">&larr; Use cases</a>
          <span className="qs-kicker">Use case · Support routing</span>
          <h1 className="ix-title">Route support tickets without paying an LLM to read every one.</h1>
          <p className="ix-lede">
            Glyphh Ada routes each new ticket from the tickets you have already labelled, says how sure it is, and
            leaves the uncertain ones to your LLM. It runs on your own infrastructure.
          </p>
          <div className="ix-actions">
            <a href={SALES_HREF} className="os-cta os-cta-primary">{EARLY_ACCESS_LABEL}</a>
            <a href="#experiment" className="os-cta os-cta-ghost">See the experiment</a>
          </div>
        </section>

        <section className="ix-section" id="how">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">How it works</span>
              <h2 className="ix-h2">Ada first, the LLM only when Ada is unsure.</h2>
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
          <div className="mh-field rt-field">
            <AdaField />
          </div>
          <p className="rt-note">
            Above: cases arrive, the nearest precedents vote, Ada answers with its confidence or asks, and every graded
            case becomes a precedent.
          </p>
        </section>

        <section className="ix-section" id="experiment">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">The experiment</span>
              <h2 className="ix-h2">200 bank messages, 77 queues.</h2>
              <p className="ix-desc">
                One experiment on one public dataset, not a guarantee for your tickets.
              </p>
            </div>
          </div>

          <dl className="rt-facts">
            <div><dt>Dataset</dt><dd><a href="https://github.com/PolyAI-LDN/task-specific-datasets">Banking77</a> (PolyAI, CC BY 4.0): 13,083 real messages from a bank’s customers, each labelled with one of 77 intents.</dd></div>
            <div><dt>Split</dt><dd>The dataset’s own: 10,003 to learn from, 3,080 held out. A fixed sample of 200 held-out messages (seed 7, opaque shuffled ids) is scored for every system. Nothing was tuned on the held-out messages.</dd></div>
            <div><dt>Baselines</dt><dd>Four Claude models, each given the same 10,003 labelled messages and the 77 intent names, routing by judgement alone.</dd></div>
            <div><dt>Accuracy</dt><dd>The share of the 200 messages routed to their labelled intent.</dd></div>
            <div><dt>The bar</dt><dd>Ada keeps a message when its calibrated confidence is at least 0.7, and hands the rest to the model with its three nearest precedents. At 0.7 Ada kept 156 of the 200 and was right on 98.7% of them; the other 44 (22%) went to the model.</dd></div>
          </dl>

          <div className="rt-table">
            <table>
              <thead><tr><th>System</th><th>Accuracy on the 200</th><th>Messages the LLM saw</th></tr></thead>
              <tbody>
                {RESULTS.map(([s, a, l]) => (
                  <tr key={s} className={s.startsWith('Ada, then Fable') ? 'rt-best' : undefined}>
                    <td>{s}</td><td>{a}</td><td>{l}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rt-caveats">
            <h3>What it does not show</h3>
            <ul>
              <li>Total cost. Fewer LLM calls is measured; the saving after your own infrastructure, the fallback calls and your prompts is not. Price it on your traffic.</li>
              <li>Your data. 200 messages from one bank, with a fixed store of 10,003; a sample of 200 moves a point or two either way.</li>
              <li>Learning over time. Here the store was fixed. How quickly the LLM’s share falls as answers are recorded is the next experiment.</li>
            </ul>
          </div>
        </section>

        <section className="ix-section" id="code">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">In your code</span>
              <h2 className="ix-h2">Fifteen lines between your helpdesk and Ada.</h2>
            </div>
            <a href={`${DOCS}/sdks`} className="qs-more">The SDKs &rarr;</a>
          </div>
          <pre className="rt-code">{CODE}</pre>
        </section>

        <section className="ix-section" id="adopt">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">What it takes</span>
              <h2 className="ix-h2">Your history, one node and a key.</h2>
            </div>
            <a href={`${DOCS}/run-rrotor`} className="qs-more">Run rrotor &rarr;</a>
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
              <span className="qs-kicker">Early access</span>
              <h3>Glyphh is in early access.</h3>
              <p>We are working with a small number of teams. Write to us and we will set you up.</p>
            </div>
            <div className="ix-actions">
              <a href={SALES_HREF} className="os-cta os-cta-primary">{EARLY_ACCESS_LABEL}</a>
              <a href="/pricing" className="os-cta os-cta-ghost">Pricing</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
