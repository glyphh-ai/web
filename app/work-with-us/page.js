import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ProblemForm from '../components/ProblemForm';
import { EMAIL } from '../lib/site';

export const metadata = {
  title: 'Work With Us — Glyphh',
  description: 'We help individuals and businesses turn complex problems into practical solutions using software engineering, automation and artificial intelligence.',
  alternates: { canonical: '/work-with-us' },
  openGraph: { title: 'Have a problem worth solving?', description: 'Consulting, custom software, automation and AI integration from the Glyphh studio.', url: '/work-with-us' },
};

const SERVICES = [
  'AI strategy and implementation',
  'Custom software and application development',
  'Workflow and business process automation',
  'AI integration into existing systems',
  'Architecture and technical advisory',
  'Prototyping and feasibility assessment',
  'Complex engineering challenges',
];

export default function WorkWithUsPage() {
  return (
    <div className="st">
      <Nav />
      <main className="st-main" style={{ maxWidth: 980 }}>
        <span className="st-kicker">Work With Us</span>
        <h1>Have a problem worth solving?</h1>
        <p className="st-lede">
          We help individuals and businesses turn complex problems into practical solutions using software engineering,
          automation and artificial intelligence.
        </p>
        <section className="st-section" style={{ marginTop: 64 }}>
          <div className="st-section-head"><h2>What we can help with</h2></div>
          <ul className="st-list">
            {SERVICES.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </section>
        <section className="st-section" style={{ marginTop: 72 }}>
          <div className="st-section-head"><h2>Tell us about your problem</h2></div>
          <p style={{ color: 'var(--text-3)', margin: 0 }}>
            A few sentences is enough. This is private: it comes to us by email, and nothing you send is published. No
            account needed. Prefer email? <a className="st-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
          <ProblemForm kind="inquiry" />
          <p style={{ color: 'var(--text-3)', marginTop: 32, fontSize: 15 }}>
            Not a project, just an interesting problem? <a className="st-link" href="/submit-a-problem">Submit it for a possible episode</a>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
