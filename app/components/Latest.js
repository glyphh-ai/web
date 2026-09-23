import LetterField from './LetterField';
import { POSTS, fmtDate } from '../blog/posts';

/**
 * Latest — the newest posts on the home page (his order, 2026-09-22), in the
 * frame: a kicker row, a headline, then up to three cards — cover, date,
 * title, summary — each a link to its post.
 */

export default function Latest() {
  const posts = POSTS.slice(0, 3);
  return (
    <section className="lt" id="latest">
      <div className="qs-head">
        <span className="qs-kicker">Latest</span>
        <a href="/blog" className="qs-more">Read all &rarr;</a>
      </div>
      <h2 className="ix-h2 lt-h2">What we&rsquo;re building, fixing, and learning.</h2>
      <div className={`lt-grid lt-grid-${posts.length}`}>
        {posts.map((p, i) => (
          <a key={p.slug} href={`/blog/${p.slug}`} className="lt-card">
            {p.cover
              ? <div className="bl-cover"><img src={p.cover} alt={p.coverAlt || ''} className="bl-cover-img" /></div>
              : <div className="bl-cover"><LetterField seed={i + 60} /><span className="bl-cover-mark"><img src="/glyphh-mascot.png" alt="" width="40" height="40" /></span></div>}
            <div className="lt-copy">
              <span className="bl-date">{fmtDate(p.date)}</span>
              <h3 className="lt-title">{p.title}</h3>
              <p className="bl-summary">{p.summary}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
