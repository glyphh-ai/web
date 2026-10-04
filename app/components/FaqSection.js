import { HOME_FAQ } from '../faq/faq-data';

/**
 * FaqSection — the short FAQ on the home page (his order, 2026-10-04): a
 * kicker row, then the questions as hairline rows in a High Vis panel; each
 * row is a native <details>, so it opens without a script. The full list is
 * /faq. The answers live in ../faq/faq-data.js, shared with that page.
 */

export function FaqAnswer({ a }) {
  if (typeof a === 'string') return <p>{a}</p>;
  return <p dangerouslySetInnerHTML={{ __html: a.html }} />;
}

export function FaqList({ items, open = -1 }) {
  return (
    <div className="fq-list">
      {items.map((item, i) => (
        <details key={item.id} id={item.id} className="fq-item" open={i === open || undefined}>
          <summary className="fq-q">
            <span className="fq-n">{String(i + 1).padStart(2, '0')}</span>
            <span className="fq-text">{item.q}</span>
            <span className="fq-mark" aria-hidden="true" />
          </summary>
          <div className="fq-a"><FaqAnswer a={item.a} /></div>
        </details>
      ))}
    </div>
  );
}

export default function FaqSection() {
  return (
    <section className="fq" id="faq">
      <div className="qs-head">
        <span className="qs-kicker">FAQ</span>
        <a href="/faq" className="qs-more">All questions &rarr;</a>
      </div>
      <div className="hv-panel fq-panel">
        <FaqList items={HOME_FAQ} open={0} />
        <div className="ww-foot fq-foot">
          <a href="/faq">Read the full FAQ &rarr;</a>
          <a href="mailto:support@glyphh.ai">Ask us: support@glyphh.ai &rarr;</a>
        </div>
      </div>
    </section>
  );
}
