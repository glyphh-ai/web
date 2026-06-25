import GlyphhDemo from './GlyphhDemo';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="badge-dot" aria-hidden="true"></span>
            Native desktop app · Mac &amp; Windows
          </div>
          <h1 className="hero-title">
            A new way to build software and automate your work.
          </h1>
          <p className="hero-sub-big">
            Glyphh is your coding agent, automation assistant, and workspace
            navigator for building world class everything!
          </p>
          <div className="hero-ctas">
            <a href="#download" className="btn btn-primary btn-lg group">
              <span className="btn-label">Download Now</span>
              <span className="btn-fill"></span>
            </a>
            <a href="#develop" className="btn btn-ghost btn-lg group">
              <span className="btn-label">See How It Works</span>
              <span className="btn-fill"></span>
            </a>
          </div>
        </div>
        <div className="hero-visual-col">
          <GlyphhDemo />
        </div>
      </div>
    </section>
  );
}
