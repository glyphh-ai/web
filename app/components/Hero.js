import HeroTabs from './HeroTabs';

/**
 * Hero — the home thesis, set in the desktop product page's own type
 * (.rhero-* verbatim, so home and product can never drift): big white title,
 * the brand gradient on the reveal, the product page's gray for the lede.
 * One CTA, then the Chat/Work/Code tab stage.
 */
export default function Hero() {
  return (
    <section className="rhero rhero-product">
      <div className="hh-glow" aria-hidden="true" />
      <div className="rhero-inner container">
        <div className="rhero-copy">
          <h1 className="rhero-title">
            Every Task, Every AI, <span className="rhero-accent">One&nbsp;App.</span>
          </h1>
          <p className="rhero-sub">
            Glyphh consolidates the number of applications you touch into one
            AI&nbsp;driven operating system.
          </p>
          <div className="hero-ctas rhero-ctas">
            {/* ONE funnel: straight into the platform (login-first). */}
            <a
              href={process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai'}
              className="btn btn-primary btn-lg group"
            >
              <span className="btn-label">Try it Now</span>
              <span className="btn-fill"></span>
            </a>
          </div>
        </div>
      </div>

      {/* Outside .rhero-inner on purpose — the stage runs wider than the copy. */}
      <HeroTabs />
    </section>
  );
}
