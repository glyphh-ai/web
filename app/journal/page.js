import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CtaBand from '../components/CtaBand';
import { POSTS, fmtDate } from './posts';

/**
 * /journal (was /blog): the engineering notebook. Experiments, architecture decisions, observations, failures and
 * what they taught. Entries live in posts.js; adding one is adding an entry there.
 */

export const metadata = {
  title: 'Journal — Glyphh',
  description: 'An engineering notebook: AI experiments, architecture decisions, industry observations, product failures and the lessons in them.',
  alternates: { canonical: '/journal', types: { 'application/rss+xml': '/journal/rss.xml' } },
  openGraph: { title: 'Journal — Glyphh', description: 'An engineering notebook: experiments, decisions, observations and lessons.', url: '/journal' },
};

export default function JournalIndex() {
  const tags = [...new Set(POSTS.flatMap((p) => p.tags))];
  return (
    <div className="st">
      <Nav />
      <main className="st-main" style={{ maxWidth: 980 }}>
        <span className="st-kicker">Journal</span>
        <h1>Notes from the bench.</h1>
        <p className="st-lede">
          Experiments, architecture decisions, observations and the occasional failure, written down as they happen.
          The earlier entries are from when Glyphh was building Ada as a product; they stay as they were written.
        </p>
        <div className="st-tags" style={{ marginTop: 28 }}>
          {tags.map((t) => <span key={t} className="st-tag">{t}</span>)}
          <a className="st-tag" href="/journal/rss.xml">RSS</a>
        </div>
        <div className="st-rows" style={{ marginTop: 40 }}>
          {POSTS.map((p) => (
            <a key={p.slug} className="st-row" href={`/journal/${p.slug}`}>
              <time dateTime={p.date}>{fmtDate(p.date)}</time>
              <div>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <p style={{ fontSize: 13 }}>{p.tags.join(' · ')} &middot; {p.minutes} min read</p>
              </div>
            </a>
          ))}
        </div>
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
