import HeroCTA from './HeroCTA';
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
        <p className="oshero-eyebrow">Open Weights · Every frontier model · Programs you own</p>

        <h1 className="oshero-title">
          Glyphh is the operating system for <em>frontier AI.</em>
        </h1>

        <p className="oshero-pitch">
          The vendor neutral alternative to Claude Code, OpenAI Work, and Gemini Desktop.
        </p>

        <div className="oshero-actions">
          <HeroCTA variant="default" href="#quick-start" label="Quick Start" className="os-cta os-cta-primary" />
          <a href="https://docs.glyphh.ai" className="os-cta os-cta-ghost">Read the Docs</a>
        </div>

        <div className="oshero-shots">
          <DesktopShots />
        </div>
      </div>
    </header>
  );
}
