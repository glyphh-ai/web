import LetterField from './LetterField';

/**
 * Products: the home page's three doors (2026-10-01 mock). Ada, Glyphh
 * Desktop and the Model Router, each a tile in the How-it-works grammar that
 * opens its own page.
 */

const PRODUCTS = [
  {
    href: '/products/ada',
    title: 'Ada',
    head: 'Typed models your agents build, feed and query',
    body:
      'Record what was tried and whether it worked. Ask what worked in situations like this one. Every answer is a fact tree that cites the records it stands on, and says when it does not know.',
    more: 'Ada',
    icon: (
      <>
        <path d="M12 3v6" /><path d="M12 9 6 15" /><path d="M12 9l6 6" />
        <circle cx="12" cy="3" r="1.5" /><circle cx="6" cy="17" r="2" /><circle cx="18" cy="17" r="2" />
      </>
    ),
  },
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
      'Point any client at one base URL. Auto-routers pick the model per request, roles decide who gets what, and every token is paid from one budget at a published rate.',
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
      <div className="hv-grid">
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
