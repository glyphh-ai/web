import HeroWaves from './HeroWaves';
import HeroAscii from './HeroAscii';
import HallLines from './HallLines';
import DesktopShots from './DesktopShots';

/**
 * OsHero — the home hero of the site refactor (site.md §1.1).
 *
 * 2026-09-23, his order ("switch the sections"): the eyebrow, the H1
 * "Glyphh is the operating system for frontier AI.", the vendor-neutral
 * line under it, the demo + YouTube links, and the v2 screenshots cycling
 * in the white-ruled frame — over the same letter-hall backdrop. The
 * inversion line, the four points and the doors moved down into the frame
 * (OsPitch.js).
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
          Glyphh is the operating system for frontier AI.
        </h1>

        <p className="oshero-pitch">
          <strong>The vendor neutral alternative to Claude Code, OpenAI Work, and Gemini Desktop.</strong>
        </p>

        <p className="oshero-links qs-links">
          <a href="/video-demo" className="qs-more">Watch the demo &rarr;</a>
          <a href="https://www.youtube.com/@glyphhai" className="qs-more qs-yt" target="_blank" rel="noopener">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>
            YouTube
          </a>
        </p>

        <div className="oshero-shots">
          <DesktopShots />
        </div>
      </div>
    </header>
  );
}
