import Nav from '../components/Nav';
import Footer from '../components/Footer';
import LetterField from '../components/LetterField';
import { POSTS, fmtDate } from './posts';

/**
 * /blog — the index, in the frame: the newest post as a wide card, the rest
 * as rows. Where he writes and shares on a regular basis.
 */

export const metadata = {
  title: 'Blog — Glyphh',
  description: 'What we’re building, fixing and learning at Glyphh: notes on Ada, the self-hosted classifier that learns from precedent, guides, and the story so far.',
};

export default function BlogIndex() {
  const [first, ...rest] = POSTS;
  const tags = [...new Set(POSTS.flatMap((p) => p.tags))];
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/" className="ix-crumb">&larr; Home</a>
          <span className="qs-kicker">Glyphh blog</span>
          <h1 className="ix-title">What we&rsquo;re building, fixing, and learning.</h1>
          <p className="ix-lede">Notes on Ada, guides to what you can build with it, and the story so far. Posts marked Archive describe products since retired.</p>
          <div className="bl-tags">
            <span className="bl-tag active">Latest</span>
            {tags.map((t) => <span key={t} className="bl-tag">{t}</span>)}
          </div>
        </section>

        <section className="ix-section">
          {first ? (
            <a href={`/blog/${first.slug}`} className="bl-feature">
              {first.cover
                ? <div className="bl-cover"><img src={first.cover} alt={first.coverAlt || ''} className="bl-cover-img" /></div>
                : <div className="bl-cover"><LetterField seed={7} /><span className="bl-cover-mark"><img src="/glyphh-mascot.png" alt="" width="48" height="48" /></span></div>}
              <div className="bl-feature-copy">
                <p className="bl-meta"><span className="bl-date">{fmtDate(first.date)}</span> {first.author} &middot; {first.minutes} min read</p>
                <h2 className="bl-feature-title">{first.title}</h2>
                <p className="bl-summary">{first.summary}</p>
                <div className="bl-tags bl-tags-sm">{first.tags.map((t) => <span key={t} className="bl-tag">{t}</span>)}</div>
              </div>
            </a>
          ) : null}
          {rest.map((p) => (
            <a key={p.slug} href={`/blog/${p.slug}`} className="bl-row">
              {p.cover
                ? <div className="bl-cover bl-cover-sm"><img src={p.cover} alt={p.coverAlt || ''} className="bl-cover-img" /></div>
                : <div className="bl-cover bl-cover-sm"><LetterField seed={p.slug.length} /></div>}
              <div>
                <p className="bl-meta"><span className="bl-date">{fmtDate(p.date)}</span></p>
                <h3 className="bl-row-title">{p.title}</h3>
                <p className="bl-summary">{p.summary}</p>
                <p className="bl-meta">{p.author} &middot; {p.minutes} min read</p>
              </div>
            </a>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
