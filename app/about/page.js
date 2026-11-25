import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CtaBand from '../components/CtaBand';
import { publishedPeople, initials } from '../lib/people';

/**
 * /about: the studio and its two co-founders. The studio speaks as "we"; each person's bio is in their own voice
 * (app/lib/people.js). Only what is true and on record: the founders' 57+ years combined (Chris's 27 in his own bio), the move from a product to a studio. No
 * employers, clients, credentials or testimonials are named, because none were given.
 */

export const metadata = {
  title: 'About — Glyphh',
  description: 'Glyphh is an independent engineering studio founded by Chris Timmerman and Darrell Whatley, built on their 57+ years of combined enterprise software and business experience.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'About — Glyphh', description: 'Two founders, 57+ years of combined enterprise software and business experience. Real problems, real engineering, no hype.', url: '/about' },
};

export default function AboutPage() {
  return (
    <div className="st">
      <Nav />
      <main className="st-main st-narrow">
        <span className="st-kicker">About</span>
        <h1>Two founders. One problem at a time.</h1>
        <div className="st-prose" style={{ marginTop: 40 }}>
          <p>
            Glyphh is an independent engineering studio, founded by Chris Timmerman and Darrell Whatley and built on
            their 57+ years of combined enterprise software and business experience. Darrell runs support for a large
            enterprise software company and brings how enterprises support customers at scale; Chris runs AI governance
            and innovation for a company and brings how enterprises adopt AI responsibly. We take on
            difficult problems with software engineering and artificial intelligence, build things, run experiments and
            share what we learn, including what doesn&rsquo;t work.
          </p>
          <h2>From a product to a studio</h2>
          <p>
            Glyphh started as a product. Chris built Ada, a decision engine that learns from precedent instead of a
            language model, and Ada Cloud to sell it by subscription. The technology works. But building software is
            getting cheaper every month, the market is crowded, and finding customers for one sophisticated product is a
            different problem from solving problems.
          </p>
          <p>
            So we changed the model. Ada and everything else built along the way is open source and lives on the Projects
            page. Glyphh is now the name for everything we make: applications, experiments, research, the show, and
            consulting for people who have a problem worth solving.
          </p>
          <h2>What doesn&rsquo;t change</h2>
          <p>
            Technology changes constantly. The ability to understand a difficult problem, take it apart and build
            something that actually solves it stays valuable. AI makes that ability go further than it ever has, and
            that&rsquo;s what we want to show, in public, one problem at a time.
          </p>
          <h2>How we work</h2>
          <p>
            Real problems. Real engineering. No hype. We publish the process, not just the result, including the
            experiments that fail. We keep things small and inexpensive, and we&rsquo;d rather build something useful than
            a speculative business.
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
                  <h3><a href={`/about/${p.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>{p.name}</a></h3>
                  <p className="st-person-meta">{[p.role, p.location].filter(Boolean).join(' · ')}</p>
                  {p.position ? <p className="st-person-meta">{p.position}</p> : null}
                  <p>{p.summary}</p>
                  <a className="st-link" href={`/about/${p.slug}`}>Read the bio</a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <div className="st-actions">
          <a className="st-btn primary" href="/work-with-us">Work with us</a>
          <a className="st-btn" href="/projects">See the projects</a>
        </div>
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
