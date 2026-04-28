'use client';

export default function Download() {
  return (
    <section className="download" id="download">
      <div className="container">
        <h2 className="section-title reveal">Get <span className="dot">.</span>Yo</h2>
        <p className="section-subtitle reveal">Free forever. No credit card required.</p>

        <div className="download-buttons reveal">
          <a
            href="/api/download?platform=mac"
            className="btn btn-primary btn-xl group"
          >
            <span className="btn-label">Download for Mac</span>
            <span className="btn-fill"></span>
          </a>
          <a
            href="/api/download?platform=win"
            className="btn btn-ghost-green btn-xl group"
          >
            <span className="btn-label">Download for Windows</span>
            <span className="btn-fill"></span>
          </a>
        </div>

        <p className="download-note reveal">macOS 12+ (Apple Silicon &amp; Intel) &middot; Windows 10+</p>
      </div>
    </section>
  );
}
