import LetterField from './LetterField';
import { POSTS, fmtDate } from '../blog/posts';

/**
 * Latest — the newest posts on the home page (his order, 2026-09-22), in the
 * frame: a kicker row, a headline, then up to three cards — cover, date,
 * title, summary — each a link to its post. The demo + YouTube links sit in
 * the head row too (his order, 2026-09-23; they came off the hero).
 */

export default function Latest() {
  const posts = POSTS.slice(0, 3);
  return (
    <section className="lt" id="latest">
      <div className="qs-head">
        <span className="qs-kicker">Latest</span>
        <span className="qs-links">
          <a href="/video-demo" className="qs-more">Watch the demo &rarr;</a>
          <a href="https://www.youtube.com/@glyphhai" className="qs-more qs-yt" target="_blank" rel="noopener">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>
            YouTube
          </a>
          <a href="/blog" className="qs-more">Read all &rarr;</a>
        </span>
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
