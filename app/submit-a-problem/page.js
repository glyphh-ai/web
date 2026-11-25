import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ProblemForm from '../components/ProblemForm';

export const metadata = {
  title: 'Submit a Problem — Glyphh',
  description: 'Send an interesting problem for a possible project, journal entry or YouTube episode. You choose whether it may be explored in public.',
  alternates: { canonical: '/submit-a-problem' },
  openGraph: { title: 'Give us a problem. We’ll find a solution.', description: 'Submit a problem for a possible Glyphh episode or project.', url: '/submit-a-problem' },
};

export default function SubmitProblemPage() {
  return (
    <div className="st">
      <Nav />
      <main className="st-main" style={{ maxWidth: 980 }}>
        <span className="st-kicker">Submit a problem</span>
        <h1>Give us a problem.</h1>
        <p className="st-lede">
          Got a problem that would make a good episode or experiment? Send it. Any interesting problem counts, technical or
          not. If we pick it up, the two of us may talk it through and build or test a solution on the show, or it may
          become a project or a journal entry.
        </p>
        <p className="st-note">
          This is not the consulting form, and nothing here is paid work. You decide below whether the problem may be explored
          in public; without your permission, nothing you send is ever published. If you need help with your own project,
          use <a className="st-link" href="/work-with-us">Work With Us</a>.
        </p>
        <ProblemForm kind="problem" />
      </main>
      <Footer />
    </div>
  );
}
