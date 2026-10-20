// The FAQ's questions as hairline rows; each row is a native <details>, so it
// opens without a script. The answers live in ../faq/faq-data.js.

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
