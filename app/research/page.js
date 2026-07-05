import Nav from '../components/Nav';
import Reveal from '../components/Reveal';
import ResearchCTA from '../components/ResearchCTA';
import Footer from '../components/Footer';

const GITHUB_URL = 'https://github.com/glyphh-ai';

export const metadata = {
  title: 'Research — Glyphh',
  description: 'Open research from Glyphh: vector-symbolic architectures, hyperdimensional computing, memory systems, and agentic runtimes. Every project ships as running code on GitHub.',
};

const PROJECTS = [
  {
    name: 'glyphh-adaL',
    tags: ['memory'],
    status: { label: 'open source', kind: 'live' },
    meta: 'Apache-2.0 · Python',
    desc: 'Ada — a schema-on-write memory system for LLMs. Every fact is mapped into a universal 7-layer × 33-role lattice at write time, so recall is a deterministic scan: exact answers, versioned history, no confabulation, and no LLM in the read path. Speaks MCP, runs on SQLite or Postgres.',
    href: `${GITHUB_URL}/glyphh-adaL`,
    link: 'View on GitHub →',
    external: true,
  },
  {
    name: 'glyphh-models',
    tags: ['hdc', 'vsa'],
    status: { label: 'open source', kind: 'live' },
    meta: 'MIT · Python',
    desc: 'The open catalog of pure-HDC models for the Glyphh runtime — classification, churn prediction, intent parsing, prompt-injection detection, and more. Character-level encoding, morphology, and syntax with no LLM in the loop: inference in microseconds on a CPU.',
    href: `${GITHUB_URL}/glyphh-models`,
    link: 'View on GitHub →',
    external: true,
  },
  {
    name: 'glyphh-ada',
    tags: ['memory', 'vsa'],
    status: { label: 'in development', kind: '' },
    meta: 'opening soon',
    desc: 'The Ada research program — the theory line behind adaL. Universal fact schemas, deterministic recall, versioned belief, and where vector-symbolic representations meet structured memory.',
    href: GITHUB_URL,
    link: 'Follow the org →',
    external: true,
  },
  {
    name: 'glyphh-runtime',
    tags: ['runtime', 'hdc'],
    status: { label: 'in development', kind: '' },
    meta: 'opening soon',
    desc: 'The agentic runtime everything else plugs into. Hosts HDC models from the catalog and MCP tools next to your agents, giving them state, memory, and compute over open protocols.',
    href: GITHUB_URL,
    link: 'Follow the org →',
    external: true,
  },
  {
    name: 'glyphh-code',
    tags: ['runtime', 'memory'],
    status: { label: 'early access', kind: '' },
    meta: 'research → product',
    desc: 'Agentic coding on the Glyphh runtime — an agent with real memory via Ada and HDC-fast intent routing, working in your repo. Also ships as a product.',
    href: '/products/code',
    link: 'See the product →',
    external: false,
  },
];

export default function ResearchPage() {
  return (
    <>
      <Reveal />
      <Nav />
      <header className="page-hero">
        <div className="container">
          <div className="hero-badge">
            <span className="badge-dot" aria-hidden="true"></span>
            RESEARCH
          </div>
          <h1 className="page-hero-title">
            Open research, <span className="hero-accent">running code</span>.
          </h1>
          <p className="page-hero-sub">
            Vector-symbolic architectures, hyperdimensional computing, memory
            systems, and agentic runtimes. Every project we publish is real
            software under a real license — no papers without repos.
          </p>
        </div>
      </header>
      <section className="projects">
        <div className="container">
          <div className="projects-grid">
            {PROJECTS.map((p) => (
              <a
                key={p.name}
                href={p.href}
                className="project-card reveal"
                {...(p.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <div className="project-head">
                  <span className="project-name">{p.name}</span>
                  <span className={`prod-status ${p.status.kind}`}>{p.status.label}</span>
                </div>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="pillar-tag">{t}</span>
                  ))}
                  <span className="project-meta">{p.meta}</span>
                </div>
                <p>{p.desc}</p>
                <span className="oss-link">{p.link}</span>
              </a>
            ))}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card project-card-org reveal"
            >
              <svg width="28" height="28" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
              <span className="project-name">github.com/glyphh-ai</span>
              <p>Everything lives here — releases, roadmaps, and the projects that haven&apos;t been announced yet.</p>
              <span className="oss-link">Visit the org →</span>
            </a>
          </div>
        </div>
      </section>
      <ResearchCTA />
      <Footer />
    </>
  );
}
