import HeroCTA from './HeroCTA';
import { APP_URL } from './downloads';
import HeroLine from './HeroLine';

/**
 * OsHero — the home hero of the site refactor (site.md §1.1).
 *
 * 2026-09-23, his order ("switch the sections"): the eyebrow, the H1
 * "Glyphh is the operating system for frontier AI.", the vendor-neutral
 * line under it, the two doors (Quick Start, Read the Docs), and the v2 screenshots cycling
 * in the white-ruled frame — over the same letter-hall backdrop. The
 * inversion line, the four points and the golden pitch moved down into the
 * frame (OsPitch.js); the demo + YouTube links went to the Latest section.
 *
 * The minimal cut (his order, 2026-10-05): the words, the two doors and the
 * line behind them (HeroLine.js: the dot draws the system in one stroke and
 * parks as the headline's full stop). The
 * screenshots moved down to the Desktop section (DesktopSection.js); the
 * letter hall, the particle field and the hall lines came off.
 */
export default function OsHero() {
  return (
    <header className="oshero oshero-min">
      <div className="oshero-art" aria-hidden="true">
        <HeroLine />
      </div>
      <div className="oshero-inner container">
        {/* His copy, verbatim (2026-10-04): the headline and the sub-line are the
            hero's only words. The eyebrow is off, not deleted. */}
        {false && <p className="oshero-eyebrow">Open Weights · Every frontier model · Programs you own</p>}

        <h1 className="oshero-title">
          Glyphh is the <em>vendor-neutral</em> alternative to frontier AI<span className="hero-stop" aria-hidden="true" />
        </h1>

        <p className="oshero-pitch">
          Scale your business with practical AI that is designed to maximize your return on investment
          and achieve real world results with open weight models, semantic data pipelines, universal skills, a2a agents, scheduled tasks, and governance.
        </p>

        {/* Get started lands in the app at app.glyphh.ai (his order, 2026-10-04); the
            desktop download is the section below. */}
        <div className="oshero-actions">
          <HeroCTA variant="default" href={APP_URL} label="Get started" className="os-cta os-cta-primary" />
          <a href="#download" className="os-cta os-cta-ghost">Download the desktop</a>
        </div>

      </div>
    </header>
  );
}
