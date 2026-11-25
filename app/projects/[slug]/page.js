import { notFound } from 'next/navigation';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import CtaBand from '../../components/CtaBand';
import YouTube from '../../components/YouTube';
import { PROJECTS, projectBySlug } from '../projects';
import { postBySlug, fmtDate } from '../../journal/posts';

/**
 * /projects/[slug]: a project as a story, not an advert. The problem, why it matters, the solution, how it was
 * built, the decisions and tradeoffs, results and limitations, what was learned, then the video, source and links.
 * A section with nothing true to say is left out.
 */

const STORY = [
  ['problem', 'The problem'],
  ['why', 'Why it matters'],
  ['solution', 'The solution'],
  ['built', 'How it was built'],
  ['decisions', 'Decisions and tradeoffs'],
  ['results', 'Results and limitations'],
  ['learned', 'What was learned'],
];

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  return {
    title: `${p.title} — Glyphh Projects`,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: p.title, description: p.summary, url: `/projects/${p.slug}`, ...(p.cover ? { images: [p.cover] } : {}) },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();
  const story = STORY.filter(([key]) => p.story?.[key]);
  const related = (p.related || []).map(postBySlug).filter(Boolean);
  const unbuilt = p.status === 'Planned';
  return (
    <div className="st">
      <Nav />
      <main className="st-main st-narrow" style={{ maxWidth: 980 }}>
        <a href="/projects" className="st-kicker" style={{ textDecoration: 'none' }}>&larr; Projects</a>
        <h1 style={{ fontSize: 'clamp(36px, 5.4vw, 60px)' }}>{p.title}</h1>
        <p className="st-lede">{p.summary}</p>
        {unbuilt ? <p className="st-note">Planned: nothing here is built yet. This page is the plan, and it will change as the work happens.</p> : null}
        {p.status === 'Experimental' ? <p className="st-note">Experimental: results here are from experiments, not a validated production capability.</p> : null}
        <dl className="st-meta">
          {p.number ? <div><dt>Project</dt><dd>{p.number}</dd></div> : null}
          <div><dt>Status</dt><dd>{p.status}</dd></div>
          <div><dt>Category</dt><dd>{p.category}</dd></div>
          <div><dt>Started</dt><dd>{fmtDate(p.published)}</dd></div>
          <div><dt>Updated</dt><dd>{fmtDate(p.updated)}</dd></div>
          <div><dt>Built with</dt><dd>{p.tech.join(', ')}</dd></div>
        </dl>
        {p.cover ? <figure className="st-cover"><img src={p.cover} alt={`${p.title}`} /></figure> : null}

        {story.length ? (
          <div className="st-story">
            {story.map(([key, heading]) => (
              <section key={key}>
                <h2>{heading}</h2>
                <p>{p.story[key]}</p>
              </section>
            ))}
          </div>
        ) : null}

        <div className="st-section" style={{ marginTop: 64 }}>
          <div className="st-section-head"><h2>Video, source and links</h2></div>
          {p.video ? (
            <div className="st-episode-art" style={{ marginBottom: 24 }}><YouTube id={p.video} title={p.episode || p.title} /></div>
          ) : p.episode ? (
            <p className="st-note">Episode in the works: &ldquo;{p.episode}&rdquo;. Not published yet.</p>
          ) : null}
          <div className="st-links" style={{ marginTop: 20 }}>
            {p.repo ? <a className="st-btn primary" href={p.repo} target="_blank" rel="noopener noreferrer">Source on GitHub</a> : null}
            {p.live ? <a className="st-btn" href={p.live} target="_blank" rel="noopener noreferrer">Open the app</a> : null}
            {p.docs ? <a className="st-btn" href={p.docs} target="_blank" rel="noopener noreferrer">Documentation</a> : null}
            {(p.links || []).map(([label, href]) => (
              <a key={href} className="st-btn" href={href} target="_blank" rel="noopener noreferrer">{label}</a>
            ))}
            {!p.repo && !p.live ? <span className="st-form-status">No source or app yet.</span> : null}
          </div>
          {related.length ? (
            <div className="st-rows" style={{ marginTop: 40 }}>
              {related.map((r) => (
                <a key={r.slug} className="st-row" href={`/journal/${r.slug}`}>
                  <time dateTime={r.date}>{fmtDate(r.date)}</time>
                  <div><h3>{r.title}</h3><p>{r.summary}</p></div>
                </a>
              ))}
            </div>
          ) : null}
        </div>
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
