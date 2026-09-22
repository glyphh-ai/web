import HeroCTA from './HeroCTA';
import HeroWaves from './HeroWaves';
import HeroAscii from './HeroAscii';

/**
 * OsHero — the home hero of the site refactor (2026-09-22, site.md §1.1).
 *
 * Centered on the page: the mark, a mono eyebrow, the H1 that names the
 * inversion, the golden pitch VERBATIM (never paraphrased, never shortened),
 * the climax line with the lifecycle under it, then the two doors — the
 * individual's download and the org buyer's Router.
 */
export default function OsHero({ variant = 'default' }) {
  return (
    <header className="oshero">
      {/* The canvas particle field is OFF (his call, 2026-09-22): the art is the
          ASCII picture below, like the reference. Hidden, not deleted. */}
      {false && <HeroWaves />}
      <div className="oshero-art" aria-hidden="true">
        <HeroAscii />
      </div>
      <div className="oshero-inner container">
        {/* The mascot mark came off the hero (his order, 2026-09-22). Hidden, not deleted. */}
        {false && (
          <img className="oshero-mark" src="/glyphh-mascot.png" alt="" width="72" height="72" aria-hidden="true" />
        )}
        <p className="oshero-eyebrow">Open Weights · Every frontier model · Programs you own</p>

        <h1 className="oshero-title">
          AI at build time. <em>Not</em> runtime.
        </h1>

        <p className="oshero-pitch">
          <strong>Glyphh is the operating system for frontier AI.</strong>
          Productivity doesn&rsquo;t come from prompting. It comes from using blended AI models to build
          predictable semantic applications that run on your data deterministically &mdash; validated, distributed,
          and governed by your teams at scale.
        </p>

        {/* The climax line + lifecycle strip came OFF the hero (his order,
            2026-09-22). Hidden, not deleted — the climax has its own band (§1.3). */}
        {false && (
          <p className="oshero-climax">
            Stop buying SaaS. Start building it.
            <br />
            <span className="oshero-cycle">Build · Validate · Distribute · Run</span>
          </p>
        )}

        <div className="oshero-actions">
          <HeroCTA
            variant={variant}
            href="#quick-start"
            label="Quick Start"
            className="os-cta os-cta-primary"
          />
          <a href="/docs" className="os-cta os-cta-ghost">
            Read the Docs
          </a>
        </div>
        {/* "See the Router" and "Also for Windows" came off the hero (his order,
            2026-09-22): the doors are Quick Start and the docs. Hidden, not deleted. */}
        {false && (
          <p className="oshero-alt">
            <a href="#quick-start">Also for Windows</a>
          </p>
        )}
      </div>
    </header>
  );
}
