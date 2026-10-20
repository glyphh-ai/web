import { notFound } from 'next/navigation';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import LetterField from '../../components/LetterField';
import { POSTS, postBySlug, fmtDate } from '../posts';
import './next-step.css';

/**
 * /blog/[slug] — an article, in the frame: the title, the summary as the
 * lede, the author row, a cover (the video, when the post has one), the
 * sections, and a right rail with "On this page" and "Related docs". Share
 * links for the social feeds.
 */

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = postBySlug(slug);
  return p ? { title: `${p.title} — Glyphh`, description: p.summary } : {};
}

const SITE = 'https://glyphh.ai';

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) notFound();
  const url = `${SITE}/blog/${p.slug}`;
  const share = encodeURIComponent(`${p.title} — ${url}`);
  const headings = p.sections.filter((s) => s.heading);
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame bl-article">
        <div className="bl-grid">
          <article className="bl-main">
            <a href="/blog" className="ix-crumb">&larr; All posts</a>
            <h1 className="ix-title">{p.title}</h1>
            <p className="ix-lede">{p.summary}</p>
            <div className="bl-byline">
              <span className="bl-author"><img src="/glyphh-mascot.png" alt="" width="26" height="26" /> {p.author}</span>
              <span className="bl-meta">{fmtDate(p.date)} &middot; {p.minutes} min read</span>
            </div>
            {p.video
              ? <div className="bl-cover bl-cover-hero"><iframe src={`https://www.youtube-nocookie.com/embed/${p.video}`} title={p.title} className="bl-cover-img" style={{ border: 0 }} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
              : p.cover
              ? <div className="bl-cover bl-cover-hero"><img src={p.cover} alt={p.coverAlt || ''} className="bl-cover-img" /></div>
              : <div className="bl-cover bl-cover-hero"><LetterField seed={11} /><span className="bl-cover-mark"><img src="/glyphh-mascot.png" alt="" width="64" height="64" /></span></div>}
            <div className="bl-body">
              {p.sections.map((s) => (
                <section key={s.id} id={s.id}>
                  {s.heading ? <h2>{s.heading}</h2> : null}
                  {s.body.map((para, i) =>
                    typeof para === 'string'
                      ? <p key={i} className={para.startsWith('—') ? 'bl-sign' : undefined}>{para}</p>
                      // a div, not a p: html bodies can carry block markup (lists)
                      : <div key={i} className="bl-html" dangerouslySetInnerHTML={{ __html: para.html }} />,
                  )}
                </section>
              ))}
            </div>
            <div className="ix-cta bl-next">
              <div>
                <span className="qs-kicker">Next step</span>
                <p>Ada learns from your labelled cases, answers from its nearest precedents, and hands what it is unsure of to an LLM, on your own infrastructure.</p>
              </div>
              <div className="ix-actions">
                <a href="https://platform.glyphh.ai" className="os-cta os-cta-primary">Start free</a>
                <a href="/use-cases/support-routing" className="os-cta os-cta-ghost">See ticket routing in action</a>
              </div>
            </div>
            <div className="bl-share">
              <span className="qs-kicker">Share</span>
              <a href={`https://x.com/intent/tweet?text=${share}`} target="_blank" rel="noopener noreferrer" className="os-cta os-cta-ghost os-cta-sm">X</a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="os-cta os-cta-ghost os-cta-sm">LinkedIn</a>
              <a href={`mailto:?subject=${encodeURIComponent(p.title)}&body=${share}`} className="os-cta os-cta-ghost os-cta-sm">Email</a>
            </div>
          </article>
          <aside className="bl-rail">
            <div className="bl-rail-block">
              <span className="qs-kicker">On this page</span>
              <nav>
                {headings.map((s) => <a key={s.id} href={`#${s.id}`}>{s.heading}</a>)}
              </nav>
            </div>
            {p.related?.length ? (
              <div className="bl-rail-block">
                <span className="qs-kicker">Related docs</span>
                <nav>
                  {p.related.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
                </nav>
              </div>
            ) : null}
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
