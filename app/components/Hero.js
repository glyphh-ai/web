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
            A new way to <span className="hero-accent">build software</span> and <span className="hero-accent">automate your work</span>.
          </h1>
          <p className="hero-sub-big">
            Glyphh is a native desktop workspace where an AI agent builds in a
            real IDE, runs every app you use as a live panel, and automates the
            work across them. Describe what you want — it writes the code, clicks
            through your tools, and ships the result.
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
