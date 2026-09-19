import { notFound } from 'next/navigation';
import { PAGES, GROUPS } from '../content';
import { Mascot } from '../Mascot';

export function generateStaticParams() {
  return PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = PAGES.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.lede } : {};
}

export default async function DocPage({ params }) {
  const { slug } = await params;
  const i = PAGES.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = PAGES[i];
  const group = GROUPS.find((g) => g.pages.some((x) => x.slug === slug));
  const prev = PAGES[i - 1];
  const next = PAGES[i + 1];
  return (
    <article className="dx-article">
      <header className="dx-head">
        <div className="dx-head-copy">
          <span className="dx-eyebrow">{group?.title}</span>
          <h1>{p.title}</h1>
          <p className="dx-lede">{p.lede}</p>
        </div>
        <Mascot name={p.mascot} size={84} className="dx-head-mascot" />
      </header>
      <div className="dx-body">{p.body}</div>
      <nav className="dx-pager" aria-label="Next and previous">
        {prev ? <a href={`/docs/${prev.slug}`} className="dx-pager-link"><span>Previous</span>{prev.title}</a> : <span />}
        {next ? <a href={`/docs/${next.slug}`} className="dx-pager-link dx-pager-next"><span>Next</span>{next.title}</a> : <span />}
      </nav>
    </article>
  );
}
