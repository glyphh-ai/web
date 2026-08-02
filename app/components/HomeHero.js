import HeroTabs from './HeroTabs';

/**
 * HomeHero — the headline, the two CTAs, and the Chat/Code/Work tabs.
 * Centered on black. Uses the .rhero-* classes verbatim so the type is
 * identical to the desktop page, not a copy that can drift.
 */

export default function HomeHero() {
  return (
    <section className="rhero rhero-product">
      <div className="hh-glow" aria-hidden="true" />
      <div className="rhero-inner container">
        <div className="rhero-copy">
          <h1 className="rhero-title">
            Chat, work, code, dream.{' '}
            <span className="rhero-accent">Every AI, one app.</span>
          </h1>
          <div className="hero-ctas rhero-ctas">
            <a href="/products/desktop#download" className="btn btn-primary btn-lg group">
              <span className="btn-label">Download Now</span>
              <span className="btn-fill"></span>
            </a>
            <a href="/products/desktop#layouts" className="btn btn-ghost btn-lg group">
              <span className="btn-label">Watch It Switch</span>
              <span className="btn-fill"></span>
            </a>
          </div>
        </div>
      </div>

      {/* Outside .rhero-inner on purpose — .rhero-copy caps at 62rem, and the
          shot is meant to run wider than the text column. */}
      <HeroTabs />
    </section>
  );
}
