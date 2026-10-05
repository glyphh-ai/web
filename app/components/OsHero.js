import HeroCTA from './HeroCTA';
import { APP_URL } from './downloads';
import HeroWaves from './HeroWaves';
import HeroAscii from './HeroAscii';
import HallLines from './HallLines';
import DesktopShots from './DesktopShots';

/**
 * OsHero — the home hero of the site refactor (site.md §1.1).
 *
 * 2026-09-23, his order ("switch the sections"): the eyebrow, the H1
 * "Glyphh is the operating system for frontier AI.", the vendor-neutral
 * line under it, the two doors (Quick Start, Read the Docs), and the v2 screenshots cycling
 * in the white-ruled frame — over the same letter-hall backdrop. The
 * inversion line, the four points and the golden pitch moved down into the
 * frame (OsPitch.js); the demo + YouTube links went to the Latest section.
 */
export default function OsHero() {
  return (
    <header className="oshero oshero-shots-hero">
      {/* The canvas particle field is OFF (his call, 2026-09-22): the art is the
          ASCII picture below, like the reference. Hidden, not deleted. */}
      {false && <HeroWaves />}
      <div className="oshero-art" aria-hidden="true">
        <HeroAscii />
      </div>
      {/* The hall lines shot from the four point cards; the cards live in the
          frame now, with no vanishing point to run to — off, not deleted. */}
      {false && <HallLines />}
      <div className="oshero-inner container">
        {/* His copy, verbatim (2026-10-04): the headline and the sub-line are the
            hero's only words. The eyebrow is off, not deleted. */}
        {false && <p className="oshero-eyebrow">Open Weights · Every frontier model · Programs you own</p>}

        <h1 className="oshero-title">
          Glyphh is the <em>vendor-neutral</em> alternative to frontier AI
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

        <div className="oshero-shots">
          <DesktopShots />
        </div>
      </div>
    </header>
  );
}
