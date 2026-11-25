import { notFound } from 'next/navigation';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import LetterField from '../../components/LetterField';
import YouTube from '../../components/YouTube';
import { POSTS, postBySlug, fmtDate } from '../posts';
import './next-step.css';
import './article.css';

/**
 * /journal/[slug] (was /blog/[slug]) — an article, in the frame: the title, the summary as the
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
  return p
    ? {
        title: `${p.title} — Glyphh Journal`,
        description: p.summary,
        alternates: { canonical: `/journal/${p.slug}` },
        openGraph: { title: p.title, description: p.summary, type: 'article', url: `/journal/${p.slug}`, ...(p.cover ? { images: [p.cover] } : {}) },
      }
    : {};
}

const SITE = 'https://glyphh.ai';

/** The sections. A string is a paragraph; an `{ html }` entry is markup, and `wide` lets it break out of a feature post's column. */
function Body({ p, className = 'bl-body' }) {
  return (
    <div className={className}>
      {p.sections.map((s) => (
        <section key={s.id} id={s.id}>
          {s.heading ? <h2>{s.heading}</h2> : null}
          {s.body.map((para, i) =>
            typeof para === 'string'
              ? <p key={i} className={para.startsWith('—') ? 'bl-sign' : undefined}>{para}</p>
              // a div, not a p: html bodies can carry block markup (lists)
              : <div key={i} className={para.wide ? 'bl-html ft-wide' : 'bl-html'} dangerouslySetInnerHTML={{ __html: para.html }} />,
          )}
        </section>
      ))}
    </div>
  );
}

/** The next-step block and the share links, at the end of every article. */
function Tail({ url, p, share }) {
  return (
    <>
      <div className="ix-cta bl-next">
        <div>
          <span className="qs-kicker">Have a problem?</span>
          <p>Let&rsquo;s solve it. Tell us what is in the way, or send a problem worth exploring in public.</p>
        </div>
        <div className="ix-actions">
          <a href="/work-with-us" className="os-cta os-cta-primary">Tell us about your problem</a>
          <a href="/projects" className="os-cta os-cta-ghost">Explore projects</a>
        </div>
      </div>
      <div className="bl-share">
        <span className="qs-kicker">Share</span>
        <a href={`https://x.com/intent/tweet?text=${share}`} target="_blank" rel="noopener noreferrer" className="os-cta os-cta-ghost os-cta-sm">X</a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="os-cta os-cta-ghost os-cta-sm">LinkedIn</a>
        <a href={`mailto:?subject=${encodeURIComponent(p.title)}&body=${share}`} className="os-cta os-cta-ghost os-cta-sm">Email</a>
      </div>
    </>
  );
}

/**
 * A feature post (`layout: 'feature'`): a launch or research piece, read
 * top to bottom. An editorial head (kicker, a headline with its emphasis in
 * the serif italic, the summary as the dek), the hero (`heroHtml`, else the
 * cover) full width with its caption, then one centred column that charts and tables break out of. No
 * rail.
 */
function Feature({ p, url, share }) {
  return (
    <main className="site-frame ix-frame ft-article">
      <header className="ft-head">
        <a href="/journal" className="ix-crumb">&larr; Journal</a>
        {p.kicker ? <span className="qs-kicker">{p.kicker}</span> : null}
        <h1 className="ft-title" dangerouslySetInnerHTML={{ __html: p.titleHtml || p.title }} />
        <p className="ft-dek">{p.summary}</p>
        <p className="ft-byline">{p.author} &middot; {fmtDate(p.date)} &middot; {p.minutes} min read</p>
      </header>
      {p.heroHtml || p.cover ? (
        <figure className="ft-cover">
          {p.heroHtml
            ? <div className="ft-hero" dangerouslySetInnerHTML={{ __html: p.heroHtml }} />
            : <img src={p.cover} alt={p.coverAlt || ''} />}
          {p.coverCaption ? <figcaption>{p.coverCaption}</figcaption> : null}
        </figure>
      ) : null}
      <Body p={p} className="bl-body ft-body" />
      <div className="ft-tail">
        <Tail p={p} url={url} share={share} />
      </div>
    </main>
  );
}

export default async function JournalEntry({ params }) {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) notFound();
  const url = `${SITE}/journal/${p.slug}`;
  const share = encodeURIComponent(`${p.title} — ${url}`);
  const headings = p.sections.filter((s) => s.heading);
  if (p.layout === 'feature') {
    return (
      <div className="ix-page">
        <Nav />
        <Feature p={p} url={url} share={share} />
        <Footer />
      </div>
    );
  }
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame bl-article">
        <div className="bl-grid">
          <article className="bl-main">
            <a href="/journal" className="ix-crumb">&larr; Journal</a>
            <h1 className="ix-title">{p.title}</h1>
            <p className="ix-lede">{p.summary}</p>
            <div className="bl-byline">
              <span className="bl-author"><img src="/glyphh-mascot.png" alt="" width="26" height="26" /> {p.author}</span>
              <span className="bl-meta">{fmtDate(p.date)} &middot; {p.minutes} min read</span>
            </div>
            {p.video
              ? <div className="bl-cover bl-cover-hero"><YouTube id={p.video} title={p.title} /></div>
              : p.cover
              ? <div className="bl-cover bl-cover-hero"><img src={p.cover} alt={p.coverAlt || ''} className="bl-cover-img" /></div>
              : <div className="bl-cover bl-cover-hero"><LetterField seed={11} /><span className="bl-cover-mark"><img src="/glyphh-mascot.png" alt="" width="64" height="64" /></span></div>}
            <Body p={p} />
            <Tail p={p} url={url} share={share} />
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
