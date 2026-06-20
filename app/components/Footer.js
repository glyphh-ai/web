export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" className="footer-logo" aria-label="Glyphh">
              <img src="/glyphh-logo-black.png" alt="Glyphh" />
            </a>
            <p className="footer-tagline">One workspace. Every tool. One assistant.</p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#download">Download</a>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <a href="https://github.com/glyphh-ai/glyphh-releases/releases" target="_blank" rel="noopener noreferrer">Changelog</a>
            <a href="https://github.com/glyphh-ai/glyphh-releases" target="_blank" rel="noopener noreferrer">GitHub</a>
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
