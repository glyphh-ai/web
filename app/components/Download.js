'use client';

const DOWNLOAD_BASE = process.env.NEXT_PUBLIC_DOWNLOAD_BASE_URL
  || 'https://github.com/glyphh-ai/yo-client/releases/latest/download';

export default function Download() {
  return (
    <section className="download" id="download">
      <div className="container">
        <h2 className="section-title reveal">Get <span className="dot">.</span>Yo</h2>
        <p className="section-subtitle reveal">Free 14-day trial. No account required.</p>

        <div className="download-buttons reveal">
          <a
            href={`${DOWNLOAD_BASE}/Yo.dmg`}
            className="btn btn-primary btn-xl group"
          >
            <span className="btn-label">Download for Mac</span>
            <span className="btn-fill"></span>
          </a>
          <span className="btn btn-ghost-green btn-lg disabled">
            <span className="btn-label">Windows — Coming Soon</span>
          </span>
        </div>

        <p className="download-note reveal">macOS 12+ (Apple Silicon &amp; Intel)</p>
      </div>
    </section>
  );
}
