import { notFound } from 'next/navigation';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import CtaBand from '../../components/CtaBand';
import { publishedPeople, personBySlug, initials } from '../../lib/people';

/**
 * /about/[slug]: one co-founder's bio, high level and in their own voice (app/lib/people.js).
 */

export function generateStaticParams() {
  return publishedPeople().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = personBySlug(slug);
  if (!p) return {};
  const title = `${p.short} — Glyphh`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: `/about/${p.slug}` },
    openGraph: { title, description: p.summary, url: `/about/${p.slug}`, ...(p.photo ? { images: [p.photo] } : {}) },
  };
}

export default async function PersonPage({ params }) {
  const { slug } = await params;
  const p = personBySlug(slug);
  if (!p) notFound();
  const others = publishedPeople().filter((o) => o.slug !== p.slug);
  return (
    <div className="st">
      <Nav />
      <main className="st-main st-narrow">
        <a href="/about" className="st-kicker" style={{ textDecoration: 'none' }}>&larr; About</a>
        <div className="st-bio-head">
          {p.photo
            ? <img className="st-bio-photo" src={p.photo} alt={p.name} />
            : <span className="st-bio-photo" aria-hidden="true">{initials(p.name)}</span>}
          <div>
            <h1>{p.name}</h1>
            <p className="st-person-meta">{[p.role, p.location].filter(Boolean).join(' · ')}</p>
          </div>
        </div>
        <div className="st-prose" style={{ marginTop: 40 }}>
          {p.bio.map((para, i) => <p key={i}>{para}</p>)}
        </div>
        <div className="st-actions">
          {p.linkedin ? <a className="st-btn" href={p.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> : null}
          {others.map((o) => <a key={o.slug} className="st-btn" href={`/about/${o.slug}`}>{o.short}</a>)}
          <a className="st-btn primary" href="/work-with-us">Work with us</a>
        </div>
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
