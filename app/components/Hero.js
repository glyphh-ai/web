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
          Give your AI hands.
        </h1>
        <p className="hero-sub-big">
          Glyphh is the workspace your AI drives. Claude, ChatGPT, Gemini —
          the AI you already pay for opens your apps, tiles your windows,
          works across 3,500+ connected services, and runs your skills.
          One secure relay. No token markup, ever.
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
