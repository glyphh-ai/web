import Nav from '../components/Nav';
import Reveal from '../components/Reveal';
import Footer from '../components/Footer';

const GITHUB_URL = 'https://github.com/glyphh-ai';

export const metadata = {
  title: 'Research — Glyphh',
  description: 'The science under Glyphh: hyperdimensional computing, schema-on-write memory, and deterministic agent runtimes. Every project ships as running code on GitHub — the path from a research idea to a product you can run.',
};

// The path from research → product, as a vertical timeline. Each stage is a real
// repo; the destination is the products the stack becomes.
const STAGES = [
  {
    n: '01',
    tag: 'memory',
    name: 'adaL',
    title: 'Memory that never confabulates',
    desc: 'Schema-on-write: every fact mapped into a universal 7-layer × 33-role lattice at write time. Recall becomes a deterministic scan — exact answers, versioned history, no model in the read path. Speaks MCP; SQLite or Postgres.',
    href: `${GITHUB_URL}/adaL`,
  },
  {
    n: '02',
    tag: 'engine',
    name: 'ada',
    title: 'The engine everything plugs into',
    desc: 'Ingest, query, and stream, with glyph storage, websocket listeners, and runtime analytics. It hosts the HDC models and MCP tools right next to your agents — state, memory, and compute over open protocols.',
    href: `${GITHUB_URL}/ada`,
  },
  {
    n: '03',
    tag: 'hdc',
    name: 'models',
    title: 'Inference in microseconds, no GPU',
    desc: 'An open catalog of pure-HDC models — classification, intent parsing, prompt-injection detection, and more. Character-level encoding, morphology, and syntax, with no LLM in the loop.',
    href: `${GITHUB_URL}/models`,
  },
  {
    n: '04',
    tag: 'runtime',
    name: 'rrotor',
    title: 'Deterministic agent loops',
    desc: 'OpenRotor — the open runtime for RotorSpec, the standard for deterministic AI agent loops. The machinery under every product: tools, state, and compute, desktop to cloud.',
    href: `${GITHUB_URL}/rrotor`,
  },
  {
    n: '05',
    tag: 'agent',
    name: 'code',
    title: 'The coding agent, in the open',
    desc: 'The same governed loop Glyphh Desktop is built on, with Ada memory wired in from the first turn — so the agent remembers the codebase, the decisions, and you.',
    href: GITHUB_URL,
    soon: true,
  },
];

export default function ResearchPage() {
  return (
    <div className="research-page">
      <Reveal />
      <Nav />

      <header className="rp-hero">
        <div className="rp-hero-glow" aria-hidden="true" />
        <div className="container rp-hero-inner">
          <div className="rp-hero-copy">
            <div className="rp-badge"><span className="rp-badge-dot" aria-hidden="true" /> RESEARCH</div>
            <h1 className="rp-title">The science <span className="rp-accent">under the products</span>.</h1>
            <p className="rp-sub">
              Hyperdimensional computing, schema-on-write memory, and deterministic
              runtimes — published as running code. This is the path from a research
              idea to a product you can run.
            </p>
            <div className="rp-hero-ctas">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg group">
                <span className="btn-label">Follow on GitHub</span>
                <span className="btn-fill"></span>
              </a>
              <a href="#stack" className="btn btn-ghost btn-lg group">
                <span className="btn-label">See the stack</span>
                <span className="btn-fill"></span>
              </a>
            </div>
          </div>

          {/* research → glyphh → product flow */}
          <div className="rp-flow" aria-hidden="true">
            <div className="rpf-col">
              <span className="rpf-col-label">research</span>
              <span className="rpf-chip">memory</span>
              <span className="rpf-chip">hdc</span>
              <span className="rpf-chip">runtime</span>
            </div>
            <div className="rpf-wires">
              <svg viewBox="0 0 120 220" preserveAspectRatio="none">
                <path d="M0 30 C 60 30, 60 110, 118 110" /><path d="M0 110 L 118 110" /><path d="M0 190 C 60 190, 60 110, 118 110" />
                <path d="M2 110 C 60 110, 60 40, 118 40" /><path d="M2 110 C 60 110, 60 180, 118 180" />
              </svg>
            </div>
            <div className="rpf-core">
              <span className="rpf-core-ring" />
              <img src="/glyphh-mascot-square.png" alt="" className="rpf-logo" width="88" height="88" />
              <span className="rpf-core-label">glyphh</span>
            </div>
            <div className="rpf-wires">
              <svg viewBox="0 0 120 220" preserveAspectRatio="none">
                <path d="M2 110 C 60 110, 60 40, 118 40" /><path d="M2 110 C 60 110, 60 180, 118 180" />
              </svg>
            </div>
            <div className="rpf-col rpf-col-product">
              <span className="rpf-col-label">product</span>
              <span className="rpf-chip rpf-chip-live">Desktop</span>
              <span className="rpf-chip rpf-chip-live">CLI</span>
            </div>
          </div>
        </div>
      </header>

      <section className="rp-timeline" id="stack">
        <div className="container">
          <div className="rp-timeline-head">
            <span className="rp-eyebrow">{'{'} the stack {'}'}</span>
            <h2>From representation to running agent</h2>
          </div>

          <div className="rp-track">
            <div className="rp-spine" aria-hidden="true" />

            {STAGES.map((s, i) => (
              <div key={s.name} className={`rp-stage reveal ${i % 2 ? 'rp-stage-right' : 'rp-stage-left'}`}>
                <span className="rp-dot" aria-hidden="true"><em>{s.n}</em></span>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rp-card"
                >
                  <div className="rp-card-head">
                    <span className="rp-card-name">{s.name}</span>
                    <span className="pillar-tag">{s.tag}</span>
                    {s.soon && <span className="rp-soon">opening soon</span>}
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <span className="rp-card-link">{s.soon ? 'Follow the org →' : 'View on GitHub →'}</span>
                </a>
              </div>
            ))}
          </div>

          {/* the destination — the line continues down and lands on the circle,
              with the products centered beneath it. */}
          <div className="rp-dest reveal">
            <span className="rp-dot-end" aria-hidden="true"><em>◆</em></span>
            <span className="rp-dest-label">the path arrives</span>
            <h3>Products you can run</h3>
            <div className="rp-dest-links">
              <a href="/products/desktop" className="rp-dest-pill">Glyphh Desktop →</a>
              <a href="/products/cli" className="rp-dest-pill">Glyphh CLI →</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
