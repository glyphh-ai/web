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
            <h4>Product</h4>
            <a href="/#inside">Inside the app</a>
            <a href="/pricing">Pricing</a>
            <a href="/docs">Docs</a>
            <a href="/research">Research</a>
            <a href="/#download">Download</a>
            <a href="https://github.com/glyphh-ai/releases/releases" target="_blank" rel="noopener noreferrer">Changelog</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="/terms">Terms of Use</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/refund">Refund Policy</a>
            <a href="/marketplace-terms">Marketplace Terms</a>
            <a href="/developer-agreement">Developer Agreement</a>
            <a href="/code-of-conduct">Code of Conduct</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Glyphh AI LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
