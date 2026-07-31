import CreditBand from './CreditBand';

/**
 * CliClose — the same one-credit pricing strip as the homepage (verbatim —
 * consistency across products is the point), then the open-source block at
 * full volume: this audience clicks through.
 */

const GITHUB_URL = 'https://github.com/glyphh-ai';

const REPOS = [
  { name: 'cli', desc: 'This CLI — the full-screen agent TUI.' },
  { name: 'rrotor', desc: 'OpenRotor — the runtime for deterministic agent loops.' },
  { name: 'adaL', desc: 'Schema-on-write memory. Exact, versioned recall.' },
  { name: 'ada', desc: 'The engine — ingest, query, and stream.' },
  { name: 'models', desc: 'Pure-HDC models. Inference in microseconds, no GPU.' },
];

export default function CliClose() {
  return (
    <section className="cli-close" id="open-source">
      <div className="container">
        <CreditBand />

        <div className="cli-oss reveal">
          <h2 className="section-title">Open source, all the way down.</h2>
          <div className="oss-grid cli-oss-grid">
            {REPOS.map((r) => (
              <a
                key={r.name}
                href={`${GITHUB_URL}/${r.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="oss-card"
              >
                <div className="oss-card-head">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                  <span className="oss-name">{r.name}</span>
                </div>
                <p>{r.desc}</p>
                <span className="oss-link">View on GitHub &rarr;</span>
              </a>
            ))}
          </div>
          <div className="oss-ctas">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg group">
              <span className="btn-label">github.com/glyphh-ai</span>
              <span className="btn-fill"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
