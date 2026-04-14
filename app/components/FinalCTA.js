export default function FinalCTA() {
  return (
    <section className="final-cta" id="download">
      <div className="container">
        <div className="cta-card">
          <h2>Stop losing your best AI conversations<span className="dot">.</span></h2>
          <p>Download Yo and start building your context library today.</p>
          <div className="cta-buttons">
            <a href="#" className="btn btn-white btn-lg group">
              <span className="btn-label">Download for macOS</span>
              <span className="btn-fill btn-fill-dark"></span>
            </a>
            <a href="#" className="btn btn-ghost-white btn-lg group">
              <span className="btn-label">Download for Windows</span>
              <span className="btn-fill"></span>
            </a>
          </div>
          <p className="cta-version">v0.1.2 &middot; macOS 12+ &middot; Windows 10+</p>
        </div>
      </div>
    </section>
  );
}
