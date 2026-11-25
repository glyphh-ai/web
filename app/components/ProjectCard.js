// One project on the board (the old games.glyphh.ai card): its picture, title, status, summary and tags.
export default function ProjectCard({ p }) {
  const status = p.status.toLowerCase().replace(/\s+/g, '-');
  return (
    <a className="st-card" href={`/projects/${p.slug}`}>
      {p.cover
        ? <img className="st-card-art" src={p.cover} alt="" loading="lazy" />
        : <div className="st-card-art empty">{p.number ? `${p.number} · ` : ''}{p.category}</div>}
      <div className="st-card-body">
        <div className="st-card-top">
          <h3>{p.title}</h3>
          <span className={`st-status ${status}`}>{p.status}</span>
        </div>
        <p>{p.summary}</p>
        <div className="st-tags">
          {p.number ? <span className="st-tag">{p.number}</span> : null}
          <span className="st-tag">{p.category}</span>
          {p.tech.slice(0, 3).map((t) => <span key={t} className="st-tag">{t}</span>)}
        </div>
      </div>
    </a>
  );
}
