import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './use-cases.css';

// The use cases: each one an experiment you can rerun (glyphh-ai/glyphh's benchmarks/).

export const metadata = {
  title: 'Use cases — Glyphh',
  description:
    'What Glyphh Ada classifies, each with the experiment behind it: support ticket routing and loan decisions.',
};

const USE_CASES = [
  {
    href: '/use-cases/support-routing',
    kicker: 'Text',
    title: 'Support routing',
    body: 'Each ticket to the queue that owns it, from the tickets you have already routed. The uncertain ones go to your LLM.',
    proof: 'Banking77: 97.5% with the LLM seeing 22% of messages',
  },
  {
    href: '/use-cases/loan-decisions',
    kicker: 'Typed fields',
    title: 'Loan decisions',
    body: 'Approve or refuse from your past decisions, by what each mistake costs you, and ask a person when every answer is dear.',
    proof: 'German Credit: a bank’s cost of 100 against 110 and 114 for Claude',
  },
];

export default function UseCasesPage() {
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/" className="ix-crumb">&larr; Home</a>
          <span className="qs-kicker">Use cases</span>
          <h1 className="ix-title">Anything you have labelled examples of.</h1>
          <p className="ix-lede">
            Glyphh Ada classifies from your own history, says how sure it is, and hands on what it is unsure of. Each use
            case here comes with an experiment you can rerun; every one, with its data and scripts, is in{' '}
            <a href="https://github.com/glyphh-ai/glyphh/tree/main/benchmarks">the public benchmarks</a>.
          </p>
        </section>

        <section className="ix-section">
          <div className="ix-grid uc-grid">
            {USE_CASES.map((u) => (
              <a key={u.href} href={u.href} className="ix-card ix-card-tall uc-card">
                <span className="qs-kicker">{u.kicker}</span>
                <h3>{u.title}</h3>
                <p>{u.body}</p>
                <span className="uc-proof">{u.proof}</span>
                <span className="uc-more">Read it &rarr;</span>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
