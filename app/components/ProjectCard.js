// One project on the board (the old games.glyphh.ai card): its picture, title, status, summary and tags. A project
// with no real picture yet shows the plain mascot, never a made-up image.
export default function ProjectCard({ p }) {
  const status = p.status.toLowerCase().replace(/\s+/g, '-');
  const art = p.card || p.cover;
  return (
    <a className="st-card" href={`/projects/${p.slug}`}>
      {art
        ? <img className="st-card-art" src={art} alt="" loading="lazy" decoding="async" />
        : <div className="st-card-art empty"><img src="/glyphh-mascot.png" alt="" loading="lazy" /></div>}
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
