import Nav from './components/Nav';
import Footer from './components/Footer';
import CtaBand from './components/CtaBand';
import ProjectCard from './components/ProjectCard';
import YouTube from './components/YouTube';
import HeroCollage, { TechStrip } from './components/HeroCollage';
import { PROJECTS } from './projects/projects';
import { POSTS, fmtDate } from './journal/posts';
import { SHOW, latestEpisode } from './lib/episodes';
import { HOME_TITLE, HOME_DESCRIPTION, YOUTUBE_URL, EXPERIENCE } from './lib/site';

// THE HOME PAGE (2026-11-25, the consulting brief): Glyphh is a consulting and app-building business. The hero says
// what we do for clients; the method says how we build production software with Claude and modern tooling; then
// what we build for clients, the work, and the show and journal as the studio's blog. The hero wall and the tech
// strip stay (#81).

export const metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
};

const LATEST = [...PROJECTS.filter((p) => p.featured), ...PROJECTS.filter((p) => !p.featured).sort((a, b) => b.updated.localeCompare(a.updated))].slice(0, 6);

// How an engagement runs, in order: the order is the point, so the steps are numbered.
const METHOD = [
  {
    title: 'Define the problem and the bar',
    body: 'We start with the business problem, the people it affects and what success is worth. Before any code, we write down how we will know it works: the measures, the baseline and the pass bar.',
  },
  {
    title: 'Prototype in days, on real data',
    body: 'Claude Code lets two senior engineers put a working prototype in front of you in days, not a slide deck. You use it with your own data, and we learn what matters before the expensive decisions.',
  },
  {
    title: 'Engineer it for production',
    body: 'AI writes code quickly; experienced engineers decide what ships. Every change is reviewed, tested and run through CI, with security, observability and failure handling designed in from the start.',
  },
  {
    title: 'Ship it, measure it, hand it over',
    body: 'We deploy to your cloud or ours, measure the result against the bar we set at the start, and leave you with documented code, runbooks and a team that can run it, or we keep running it with you.',
  },
];

const PRINCIPLES = [
  ['Claude at the center', 'Claude Code, the Claude Agent SDK and MCP are how we design, write, test and review software every day, with independent models from other providers as a second opinion on hard calls.'],
  ['Senior engineers accountable', 'Two founders with 57+ years in enterprise software own every line that reaches production. The models make us fast; they do not make the decisions.'],
  ['Measured, not demoed', 'We report results against baselines we set before testing, including the comparisons we lose. A demo is where the work starts.'],
];

const SERVICES = [
  ['Custom applications', 'Web, desktop and mobile software built for production from day one.'],
  ['AI inside your systems', 'Agents, assistants and automation wired into the tools and data you already run.'],
  ['Architecture and advisory', 'Technical strategy, design reviews and a second set of senior eyes on hard calls.'],
  ['Prototypes and feasibility', 'A working answer to “can this be built, and is it worth it?” in weeks.'],
];

export default function Home() {
  const ep = latestEpisode();
  return (
    <div className="st">
      <Nav />
      <main className="st-main">
        <section className="st-hero hc-hero">
          <HeroCollage />
          <div className="hc-copy">
            <span className="st-kicker">Software consulting &amp; product engineering</span>
            <h1>
              <span>World-class production software,</span>
              <span>built with AI.</span>
            </h1>
            <p className="st-lede">
              Glyphh designs, builds and ships applications for businesses, using Claude and modern engineering practice
              to move fast without cutting corners. {EXPERIENCE}
            </p>
            <div className="st-actions">
              <a className="st-btn primary" href="/work-with-us">Work with us</a>
              <a className="st-btn" href="#method">How we build</a>
            </div>
          </div>
          <TechStrip />
        </section>

        <section className="st-section" id="method">
          <div className="st-section-head">
            <h2>How we build</h2>
          </div>
          <ol className="hm-method">
            {METHOD.map((m, i) => (
              <li key={m.title}>
                <span className="st-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </li>
            ))}
          </ol>
          <div className="hm-principles">
            {PRINCIPLES.map(([t, b]) => (
              <div key={t}>
                <h3>{t}</h3>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="st-section">
          <div className="st-section-head">
            <h2>What we build for clients</h2>
            <a href="/work-with-us">Work with us &rarr;</a>
          </div>
          <div className="hm-services">
            {SERVICES.map(([t, b]) => (
              <div key={t}>
                <h3>{t}</h3>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="st-section">
          <div className="st-section-head">
            <h2>Our work</h2>
            <a href="/projects">All projects &rarr;</a>
          </div>
          <div className="st-cards">
            {LATEST.map((p) => <ProjectCard key={p.slug} p={p} />)}
          </div>
        </section>

        <section className="st-section">
          <div className="st-section-head">
            <h2>From the studio</h2>
            <a href="/journal">The journal &rarr;</a>
          </div>
          <div className="hm-notes">
            <div className="st-rows">
              {POSTS.slice(0, 3).map((p) => (
                <a key={p.slug} className="st-row" href={`/journal/${p.slug}`}>
                  <time dateTime={p.date}>{fmtDate(p.date)}</time>
                  <div><h3>{p.title}</h3><p>{p.summary}</p></div>
                </a>
              ))}
            </div>
            <aside className="hm-show">
              <div className="st-episode-art">
                {ep ? <YouTube id={ep.video} title={ep.title} /> : <img src="/glyphh-mascot.png" alt="" className="hm-show-art" />}
              </div>
              <h3>{SHOW.title}</h3>
              <p>{SHOW.summary}</p>
              <a className="st-link" href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">Watch on YouTube &rarr;</a>
            </aside>
          </div>
        </section>

        <section className="st-section">
          <div className="st-section-head">
            <h2>About Glyphh</h2>
            <a href="/about">More &rarr;</a>
          </div>
          <div className="st-prose" style={{ maxWidth: 760 }}>
            <p>
              Glyphh is an independent software studio founded by Chris Timmerman and Darrell Whatley, built on their
              57+ years of combined enterprise software and business experience. Glyphh began as a product, a decision
              engine called Ada; it&rsquo;s now the studio where we build software for clients and for ourselves.
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
