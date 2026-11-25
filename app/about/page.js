import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CtaBand from '../components/CtaBand';
import { publishedPeople } from '../lib/people';

/**
 * /about: the founder, in his own voice. Only what is true and on record: 27 years of engineering, the move from a
 * product to a studio. No employers, clients, credentials or testimonials are named here, because none were given.
 */

export const metadata = {
  title: 'About — Glyphh',
  description: 'Glyphh is an independent engineering studio run by Chris Timmerman: 27 years of software engineering and problem solving, amplified by artificial intelligence.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'About — Glyphh', description: '27 years of engineering. One studio. Real problems, real engineering, no hype.', url: '/about' },
};

// The first and last names' first letters, for a person without a photo.
const initials = (name) => {
  const words = name.split(' ').filter((w) => /^[A-Za-z]/.test(w));
  return `${words[0][0]}${words[words.length - 1][0]}`;
};

export default function AboutPage() {
  return (
    <div className="st">
      <Nav />
      <main className="st-main st-narrow">
        <span className="st-kicker">About</span>
        <h1>Hi, I&rsquo;m Chris.</h1>
        <div className="st-prose" style={{ marginTop: 40 }}>
          <p>
            I&rsquo;ve been writing software and solving problems for 27 years. Glyphh is where I do that now: an independent
            engineering studio, one person with a lot of experience and the best tools there have ever been.
          </p>
          <h2>From a product to a studio</h2>
          <p>
            Glyphh started as a product. I built Ada, a decision engine that learns from precedent instead of a language
            model, and Ada Cloud to sell it by subscription. The technology works, and I&rsquo;m proud of it. But building
            software is getting cheaper every month, the market is crowded, and finding customers for one sophisticated
            product is a different problem from solving problems.
          </p>
          <p>
            So I changed the model. Ada and everything else I built along the way is open source and lives on the
            Projects page. Glyphh is now the name for everything I make: applications, experiments, research, the YouTube
            channel, and consulting for people who have a problem worth solving.
          </p>
          <h2>What doesn&rsquo;t change</h2>
          <p>
            Technology changes constantly. The ability to understand a difficult problem, take it apart and build
            something that actually solves it stays valuable. AI makes that ability go further than it ever has, and
            that&rsquo;s what I want to show, in public, one problem at a time.
          </p>
          <h2>How I work</h2>
          <p>
            Real problems. Real engineering. No hype. I publish the process, not just the result, including the experiments
            that fail. I keep things small and inexpensive, and I&rsquo;d rather build something useful than a speculative business.
          </p>
        </div>
        <section className="st-section" style={{ marginTop: 72 }}>
          <div className="st-section-head"><h2>People</h2></div>
          <div className="st-people">
            {publishedPeople().map((p) => (
              <article key={p.slug} className="st-person">
                {p.photo
                  ? <img className="st-person-photo" src={p.photo} alt={p.name} />
                  : <span className="st-person-photo" aria-hidden="true">{initials(p.name)}</span>}
                <div>
                  <h3>{p.name}</h3>
                  <p className="st-person-meta">{[p.role, p.location].filter(Boolean).join(' · ')}</p>
                  {p.bio.map((para, i) => <p key={i}>{para}</p>)}
                  {p.linkedin ? <a className="st-link" href={p.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> : null}
                </div>
              </article>
            ))}
          </div>
        </section>
        <div className="st-actions">
          <a className="st-btn primary" href="/work-with-me">Work with me</a>
          <a className="st-btn" href="/projects">See the projects</a>
        </div>
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
