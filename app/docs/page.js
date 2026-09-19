import { GROUPS } from './content';
import { Cast, Mascot } from './Mascot';

export const metadata = {
  title: 'Overview',
  description: 'Glyphh documentation: the desktop, the agent, skills and tasks, connections, the router, and the console.',
};

export default function DocsHome() {
  return (
    <article className="dx-article dx-home">
      <header className="dx-hero">
        <div className="dx-hero-copy">
          <span className="dx-eyebrow">DOCS</span>
          <h1>How Glyphh works.</h1>
          <p>
            The desktop, the agent, skills and tasks, connections, the router, and the console.
            Short pages, written from the source, kept current with each release.
          </p>
        </div>
        <Cast size={60} />
      </header>

      <div className="dx-groups">
        {GROUPS.map((g) => (
          <section key={g.title} className="dx-group">
            <h2>{g.title}</h2>
            <p className="dx-group-lede">{g.lede}</p>
            <div className="dx-cards">
              {g.pages.map((p) => (
                <a key={p.slug} href={`/docs/${p.slug}`} className="dx-card">
                  <Mascot name={p.mascot} size={40} />
                  <span className="dx-card-title">{p.title}</span>
                  <span className="dx-card-lede">{p.lede}</span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
