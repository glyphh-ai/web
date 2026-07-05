export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" className="footer-logo" aria-label="Glyphh">
              <img src="/glyphh-logo-black.png" alt="Glyphh" />
            </a>
            <p className="footer-tagline">AI research &amp; development. Open source, all the way down.</p>
          </div>
          <div className="footer-col">
            <h4>Research</h4>
            <a href="/research">Projects</a>
            <a href="https://github.com/glyphh-ai" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://github.com/glyphh-ai/glyphh-releases/releases" target="_blank" rel="noopener noreferrer">Changelog</a>
          </div>
          <div className="footer-col">
            <h4>Products</h4>
            <a href="/products/apps">Glyphh Apps</a>
            <a href="/products/code">Glyphh Code</a>
            <a href="/pricing">Pricing</a>
            <a href="/products/apps#download">Download</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="/terms">Terms of Use</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/refund">Refund Policy</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Glyphh AI LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
