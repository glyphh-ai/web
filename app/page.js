import Nav from './components/Nav';
import Footer from './components/Footer';
import CtaBand from './components/CtaBand';
import ProjectCard from './components/ProjectCard';
import YouTube from './components/YouTube';
import { PROJECTS } from './projects/projects';
import { POSTS, fmtDate } from './journal/posts';
import { EPISODES, featuredEpisode } from './lib/episodes';
import { HOME_TITLE, HOME_DESCRIPTION, YOUTUBE_URL } from './lib/site';

// THE HOME PAGE (the brand brief, 2026-11-25): what Glyphh is, who is behind it and why it exists. The hero, the
// featured episode, the latest projects, the latest journal entries, a short about, and the call to action.

export const metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
};

const LATEST = [...PROJECTS.filter((p) => p.featured), ...PROJECTS.filter((p) => !p.featured).sort((a, b) => b.updated.localeCompare(a.updated))].slice(0, 6);

export default function Home() {
  const ep = featuredEpisode();
  const project = ep.project ? PROJECTS.find((p) => p.slug === ep.project) : null;
  return (
    <div className="st">
      <Nav />
      <main className="st-main">
        <section className="st-hero">
          <span className="st-kicker">Independent AI engineering studio</span>
          <h1>
            <span>Give me a problem.</span>
            <span>I&rsquo;ll find a solution.</span>
          </h1>
          <p className="st-lede">
            27 years of engineering experience, combined with the power of artificial intelligence. Building applications,
            exploring ideas and solving real-world problems.
          </p>
          <div className="st-actions">
            <a className="st-btn primary" href="/projects">Explore projects</a>
            <a className="st-btn" href="/work-with-me">Work with me</a>
          </div>
        </section>

        <section className="st-section">
          <div className="st-section-head">
            <h2>{ep.video ? 'Latest episode' : 'Coming to the channel'}</h2>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">YouTube &rarr;</a>
          </div>
          <div className="st-episode">
            <div className="st-episode-art">
              {ep.video ? <YouTube id={ep.video} title={ep.title} /> : <span className="empty">Episode in production</span>}
            </div>
            <div>
              {!ep.video ? <span className="st-status planned">Not published yet</span> : null}
              <h3 style={{ fontSize: 26, marginTop: 16, letterSpacing: '-0.02em' }}>{ep.title}</h3>
              <p style={{ color: 'var(--text-3)' }}>{ep.summary}</p>
              {project ? <a className="st-link" href={`/projects/${project.slug}`}>The project: {project.title}</a> : null}
              <ul className="st-list" style={{ gridTemplateColumns: '1fr', marginTop: 24 }}>
                {EPISODES.filter((e) => e !== ep).slice(0, 3).map((e) => (
                  <li key={e.title} style={{ fontSize: 15 }}>{e.title} <span style={{ color: 'var(--st-label)' }}>{e.video ? '' : '· planned'}</span></li>
                ))}
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
              Glyphh is an independent engineering studio run by me, Chris Timmerman. I&rsquo;ve spent 27 years writing software
              and solving problems. Glyphh began as a product, a decision engine called Ada; it&rsquo;s now the home for
              everything I build, the experiments behind it and the problems I take on for others.
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
