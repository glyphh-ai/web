import HeroAscii from './HeroAscii';
import HeroMap from './HeroMap';

/**
 * CompanyHero: the home hero. Glyphh Desktop is the home product again
 * (his order, 2026-10-03): the eyebrow, the H1 and the pitch are the OS
 * hero's words (OsHero.js, the home hero until 2026-10-01), over the same
 * ASCII art, with the two products as doors below. The desktop's own page
 * keeps the screenshots.
 */
export default function CompanyHero() {
  return (
    <header className="oshero company-hero hero-loud">
      <div className="oshero-art" aria-hidden="true">
        <HeroAscii />
      </div>
      <div className="oshero-inner container">
        <p className="oshero-eyebrow">Open Weights &middot; Every frontier model &middot; Programs you own</p>

        <h1 className="oshero-title">
          <span>Glyphh is the operating system for <em>frontier AI.</em></span>
        </h1>

        <p className="oshero-pitch">
          The vendor neutral alternative to Claude Code, OpenAI Work, and Gemini Desktop.
        </p>

        <div className="oshero-actions">
          <a href="/products/desktop" className="os-cta os-cta-primary">Get Glyphh Desktop</a>
          <a href="https://docs.glyphh.ai" className="os-cta os-cta-ghost">Read the Docs</a>
        </div>

        <HeroMap />
      </div>
    </header>
  );
}
