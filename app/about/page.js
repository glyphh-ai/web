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
      <main className="st-main">
        <span className="st-kicker">About</span>
        <h1>Two founders. One problem at a time.</h1>
        {/* the founders first, side by side: each a card topped with their LinkedIn background */}
        <div className="st-founders">
          {publishedPeople().map((p) => (
            <article key={p.slug} className="st-founder">
              <div className="st-founder-banner">
                <img src={p.banner || '/art/router.webp'} alt="" className={p.banner ? '' : 'art'} />
              </div>
              <div className="st-founder-body">
                {p.photo
                  ? <img className="st-founder-photo" src={p.photo} alt={p.name} />
                  : <span className="st-founder-photo" aria-hidden="true">{initials(p.name)}</span>}
                <h2><a href={`/about/${p.slug}`}>{p.name}</a></h2>
                <p className="st-person-meta">{[p.role, p.location].filter(Boolean).join(' · ')}</p>
                {p.position ? <p className="st-founder-position">{p.position}</p> : null}
                <p>{p.summary}</p>
                <div className="st-founder-links">
                  <a className="st-btn primary" href={`/about/${p.slug}`}>Read the bio</a>
                  {p.linkedin ? <a className="st-btn" href={p.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> : null}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="st-prose st-narrow" style={{ marginTop: 72, padding: 0 }}>
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
        <div className="st-actions st-narrow" style={{ marginLeft: 0, marginRight: 0 }}>
          <a className="st-btn primary" href="/work-with-us">Work with us</a>
          <a className="st-btn" href="/projects">See the projects</a>
        </div>
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
