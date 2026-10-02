import HeroAscii from './HeroAscii';

/**
 * CompanyHero: the home hero as of the 2026-10-01 mock. Glyphh as an AI
 * company, not the desktop: his line "The primitive of meaning: Ada" as the H1 (2026-10-01), and two doors (the products below, the docs). The
 * desktop's own hero (OsHero, with the screenshots) moved to /products/desktop.
 */
export default function CompanyHero() {
  return (
    <header className="oshero company-hero hero-loud">
      <div className="oshero-art" aria-hidden="true">
        <HeroAscii />
      </div>
      <div className="oshero-inner container">
        <p className="oshero-eyebrow">Introducing Glyphh Ada...</p>

        <h1 className="oshero-title">
          <span>The first Glyphh model:</span>
          <span><em>Ada</em> is software&rsquo;s AI reasoning substrate.</span>
        </h1>

        <div className="oshero-actions">
          <a href="https://platform.glyphh.ai" className="os-cta os-cta-primary">Create an account</a>
          <a href="https://docs.glyphh.ai" className="os-cta os-cta-ghost">Read the Docs</a>
        </div>
      </div>
    </header>
  );
}
