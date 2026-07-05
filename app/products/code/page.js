import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import Pricing from '../../components/Pricing';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Glyphh Code — agentic coding on the Glyphh runtime',
  description: 'Glyphh Code is an agentic coding product built on the Glyphh runtime: real memory via Ada, HDC-fast intent routing, MCP-native tools, and credit-based pricing with no token markup.',
};

const FEATURES = [
  {
    title: 'Built on the runtime',
    desc: 'Glyphh Code runs on the same agentic runtime we’re open-sourcing — tools, state, and compute over MCP, not a walled garden.',
  },
  {
    title: 'Memory via Ada',
    desc: 'Your agent remembers the codebase between sessions. Facts land in Ada’s schema-on-write memory — exact, versioned recall, never confabulated.',
  },
  {
    title: 'HDC-fast routing',
    desc: 'Intent parsing and tool routing run on pure-HDC models from our open catalog — microseconds on a CPU, no extra LLM calls burning your tokens.',
  },
  {
    title: 'Your AI, your repo',
    desc: 'Bring the model you already pay for. Glyphh never resells tokens — credits meter only the compute the runtime does for you.',
  },
];

export default function GlyphhCodePage() {
  return (
    <>
      <Reveal />
      <Nav />
      <header className="page-hero">
        <div className="container">
          <div className="hero-badge">
            <span className="badge-dot" aria-hidden="true"></span>
            PRODUCT · EARLY ACCESS
          </div>
          <h1 className="page-hero-title">
            Glyphh Code<span className="dot">.</span>{' '}
            <span className="hero-accent">Agentic coding, on your terms.</span>
          </h1>
          <p className="page-hero-sub">
            A coding agent built directly on our research — the Glyphh
            runtime underneath, Ada for memory, HDC models for routing.
            Open source, like everything we build.
          </p>
          <div className="hero-ctas">
            <a href="mailto:support@glyphh.ai?subject=Glyphh%20Code%20early%20access" className="btn btn-primary btn-lg group">
              <span className="btn-label">Request early access</span>
              <span className="btn-fill"></span>
            </a>
            <a href="/research" className="btn btn-ghost btn-lg group">
              <span className="btn-label">Read the research</span>
              <span className="btn-fill"></span>
            </a>
          </div>
        </div>
      </header>
      <section className="code-features">
        <div className="container">
          <div className="pillars-grid">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="pillar-card reveal">
                <div className="pillar-head">
                  <span className="pillar-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Pricing />
      <Footer />
    </>
  );
}
