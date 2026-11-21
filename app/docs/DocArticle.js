import { PAGES, GROUPS, hrefOf } from './content';

// One docs page: the group as the eyebrow, the title and lede, the body, and
// the previous and next links.
export default function DocArticle({ slug }) {
  const i = PAGES.findIndex((x) => x.slug === slug);
  const p = PAGES[i];
  const group = GROUPS.find((g) => g.pages.some((x) => x.slug === slug));
  const prev = PAGES[i - 1];
  const next = PAGES[i + 1];
  return (
    <article className="dx-article">
      <header className="dx-head">
        <span className="dx-eyebrow">{group?.title}</span>
        <h1>{p.title}</h1>
        <p className="dx-lede">{p.lede}</p>
      </header>
      <div className="dx-body">{p.body}</div>
      <nav className="dx-pager" aria-label="Next and previous">
        {prev ? <a href={hrefOf(prev)} className="dx-pager-link"><span>Previous</span>{prev.title}</a> : <span />}
        {next ? <a href={hrefOf(next)} className="dx-pager-link dx-pager-next"><span>Next</span>{next.title}</a> : <span />}
      </nav>
    </article>
  );
}
