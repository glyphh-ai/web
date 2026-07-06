import GlyphhHero from './GlyphhHero';

export default function Hero() {
  return (
    <section className="hero hero-stacked">
      <div className="hero-copy hero-copy-center">
        <div className="hero-badge">
          <span className="badge-dot" aria-hidden="true"></span>
          Native desktop app · Mac &amp; Windows
        </div>
        <h1 className="hero-title">
          Connect once. Put any AI to work.
        </h1>
        <p className="hero-sub-big">
          One orchestrator across every LLM. Build apps or expose your agent&apos;s
          tools to any AI — no hosting, no token markup.
        </p>
        <div className="hero-ctas">
          <a href="#download" className="btn btn-primary btn-lg group">
            <span className="btn-label">Download Now</span>
            <span className="btn-fill"></span>
          </a>
          <a href="#mcp" className="btn btn-ghost btn-lg group">
            <span className="btn-label">See How It Works</span>
            <span className="btn-fill"></span>
          </a>
        </div>
      </div>
      <div className="hero-stage">
        <GlyphhHero />
      </div>
    </section>
  );
}
