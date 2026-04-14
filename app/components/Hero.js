export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Now available for macOS &amp; Windows
        </div>
        <h1 className="hero-title">
          Your AI conversations<br />deserve a home<span className="dot">.</span>
        </h1>
        <p className="hero-sub">
          Capture context from any AI. Refine it with Yo. Recall it anywhere with Sup.
          <br />One desktop app. Your data. Always local.
        </p>
        <div className="hero-ctas">
          <a href="#download" className="btn btn-primary btn-lg group">
            <span className="btn-label">Download Yo</span>
            <span className="btn-fill"></span>
          </a>
          <a href="#how-it-works" className="btn btn-ghost btn-lg group">
            <span className="btn-label">See How It Works</span>
            <span className="btn-fill"></span>
          </a>
        </div>
      </div>
    </section>
  );
}
