import HeroTabs from './HeroTabs';

/**
 * Hero — the home thesis, set in the desktop product page's own type
 * (.rhero-* verbatim, so home and product can never drift): big white title,
 * the brand gradient on the reveal, the product page's gray for the lede.
 * One CTA, then the Chat/Work/Code/Dream tab stage.
 */
export default function Hero() {
  return (
    <section className="rhero rhero-product">
      <div className="hh-glow" aria-hidden="true" />
      <div className="rhero-inner container">
        <div className="rhero-copy">
          <h1 className="rhero-title">
            Chat, work &amp; code <br />
            in one place, your way, with <span className="rhero-accent">all your AI&nbsp;models.</span>
          </h1>
          <p className="rhero-sub">
            Glyphh connects your AI models, apps, files, and computer in one
            workspace. Switch instantly between research, work, code, and
            anything you build&mdash;with persistent context and agents that
            keep working even when your computer is off.
          </p>
          <div className="hero-ctas rhero-ctas">
            {/* ONE funnel: straight into the platform (login-first). */}
            <a
              href={process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai'}
              className="btn btn-primary btn-lg group"
            >
              <span className="btn-label">Launch Glyphh</span>
              <span className="btn-fill"></span>
            </a>
          </div>
        </div>
      </div>

      {/* The tab stage IS the hero's payoff — side caption, a touch wider
          than the standard container. */}
      <div className="rhero-tabs-wrap">
        <HeroTabs />
      </div>
    </section>
  );
}
