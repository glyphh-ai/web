import Nav from './components/Nav';
import Footer from './components/Footer';
import CtaBand from './components/CtaBand';
import ProjectCard from './components/ProjectCard';
import YouTube from './components/YouTube';
import { PROJECTS } from './projects/projects';
import { POSTS, fmtDate } from './journal/posts';
import { EPISODES, SHOW, latestEpisode } from './lib/episodes';
import { HOME_TITLE, HOME_DESCRIPTION, YOUTUBE_URL, EXPERIENCE } from './lib/site';

// THE HOME PAGE (the brand brief, 2026-11-25): what Glyphh is, who is behind it and why it exists. The hero, the
// featured episode, the latest projects, the latest journal entries, a short about, and the call to action.

export const metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
};

const LATEST = [...PROJECTS.filter((p) => p.featured), ...PROJECTS.filter((p) => !p.featured).sort((a, b) => b.updated.localeCompare(a.updated))].slice(0, 6);

export default function Home() {
  const ep = latestEpisode();
  return (
    <div className="st">
      <Nav />
      <main className="st-main">
        <section className="st-hero">
          <span className="st-kicker">Independent AI engineering studio</span>
          <h1>
            <span>Give us a problem.</span>
            <span>We&rsquo;ll find a solution.</span>
          </h1>
          <p className="st-lede">
            {EXPERIENCE} Combined with the power of artificial intelligence: building applications, exploring ideas and
            solving real-world problems.
          </p>
          <div className="st-actions">
            <a className="st-btn primary" href="/projects">Explore projects</a>
            <a className="st-btn" href="/work-with-us">Work with us</a>
          </div>
        </section>

        <section className="st-section">
          <div className="st-section-head">
            <h2>{SHOW.title}</h2>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">YouTube &rarr;</a>
          </div>
          <div className="st-episode">
            <div className="st-episode-art">
              {ep ? <YouTube id={ep.video} title={ep.title} /> : <span className="empty">First episode in production</span>}
            </div>
            <div>
              <p style={{ color: 'var(--text-2)', fontSize: 18, marginTop: 0 }}>{SHOW.summary}</p>
              {ep ? <h3 style={{ fontSize: 22, letterSpacing: '-0.02em' }}>Latest: {ep.title}</h3> : null}
              <ul className="st-list" style={{ gridTemplateColumns: '1fr', marginTop: 24 }}>
                {EPISODES.filter((e) => e !== ep).map((e) => {
                  const project = e.project ? PROJECTS.find((p) => p.slug === e.project) : null;
                  return (
                    <li key={e.title} style={{ fontSize: 15, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                      {project ? <a href={`/projects/${project.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>{e.title}</a> : <span>{e.title}</span>}
                      {e.video ? null : <span className="st-status planned" style={{ flexShrink: 0 }}>Planned</span>}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <section className="st-section">
          <div className="st-section-head">
            <h2>Latest projects</h2>
            <a href="/projects">All projects &rarr;</a>
          </div>
          <div className="st-cards">
            {LATEST.map((p) => <ProjectCard key={p.slug} p={p} />)}
          </div>
        </section>

        <section className="st-section">
          <div className="st-section-head">
            <h2>From the journal</h2>
            <a href="/journal">The journal &rarr;</a>
          </div>
          <div className="st-rows">
            {POSTS.slice(0, 3).map((p) => (
              <a key={p.slug} className="st-row" href={`/journal/${p.slug}`}>
                <time dateTime={p.date}>{fmtDate(p.date)}</time>
                <div><h3>{p.title}</h3><p>{p.summary}</p></div>
              </a>
            ))}
          </div>
        </section>

        <section className="st-section">
          <div className="st-section-head">
            <h2>About Glyphh</h2>
            <a href="/about">More &rarr;</a>
          </div>
          <div className="st-prose" style={{ maxWidth: 760 }}>
            <p>
              Glyphh is an independent engineering studio founded by Chris Timmerman and Darrell Whatley, built on their
              57+ years of combined enterprise software experience. Glyphh began as a product, a decision engine called Ada;
              it&rsquo;s now the home for everything we build, the experiments behind it and the problems we take on for others.
            </p>
            <p>Real problems. Real engineering. No hype.</p>
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
