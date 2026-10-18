import LetterField from './LetterField';

/**
 * Products: the home page's two doors (2026-10-01 mock; two doors since 2026-10-03).
 * Glyphh Desktop first, then the Model Router, each a tile in the
 * How-it-works grammar that opens its own page.
 */

const PRODUCTS = [
  {
    href: '/products/desktop',
    title: 'Glyphh Desktop',
    head: 'The operating system for frontier AI',
    body:
      'Mac, Windows, Linux, and CLI. The agent, skills, tasks and semantic apps on your machine, with every frontier model and open weights beside the apps you already use.',
    more: 'Glyphh Desktop',
    icon: (
      <>
        <rect x="2" y="4" width="20" height="13" rx="2" />
        <path d="M8 21h8" /><path d="M12 17v4" />
      </>
    ),
  },
  {
    href: '/products/router',
    title: 'Model Router',
    head: 'One endpoint, every model, governed by you',
    body:
      'Point any client at one base URL. Auto-routers pick the model per request, roles decide who gets what.',
    more: 'the Model Router',
    icon: (
      <>
        <path d="M4 21v-7" /><path d="M4 10V3" /><path d="M12 21v-9" /><path d="M12 8V3" />
        <path d="M20 21v-5" /><path d="M20 12V3" /><path d="M2 14h4" /><path d="M10 8h4" /><path d="M18 16h4" />
      </>
    ),
  },
];

export default function Products() {
  return (
    <section className="hiw" id="products">
      <div className="qs-head">
        <span className="qs-kicker">Products</span>
        <a href="https://docs.glyphh.ai" className="qs-more">Read the docs &rarr;</a>
      </div>
      <div className="hv-grid hv-grid-2">
        {PRODUCTS.map((t, i) => (
          <a key={t.title} href={t.href} className="hv-tile">
            <LetterField seed={i + 1} />
            <svg className="hv-tile-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {t.icon}
            </svg>
            <h3 className="hv-tile-title">{t.title}</h3>
            <p className="hv-tile-head">{t.head}</p>
            <p className="hv-tile-body">{t.body}</p>
            <p className="hv-tile-more">Explore {t.more} &rarr;</p>
          </a>
        ))}
      </div>
    </section>
  );
}
