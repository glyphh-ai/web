import GlyphhDemo from './GlyphhDemo';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="badge-dot" aria-hidden="true"></span>
            Native desktop workspace · Mac &amp; Windows
          </div>
          <h1 className="hero-title">
            One AI workspace for <span className="hero-accent">every app</span> you use.
          </h1>
          <p className="hero-sub-big">
            Glyphh is a native desktop app that brings your IDE, inbox, browser,
            and AI tools into one window — with an assistant that sees everything
            you&rsquo;re working on and acts across all of it. No more copy-pasting
            context between tabs.
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
