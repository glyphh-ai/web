import HeroCTA from './HeroCTA';
import HeroWaves from './HeroWaves';
import HeroAscii from './HeroAscii';
import HallLines from './HallLines';

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
      {/* Hover a point card and lines shoot from its corners down the hall (his order, 2026-09-22). */}
      <HallLines />
      <div className="oshero-inner container">
        {/* The mascot mark came off the hero (his order, 2026-09-22). Hidden, not deleted. */}
        {false && (
          <img className="oshero-mark" src="/glyphh-mascot.png" alt="" width="72" height="72" aria-hidden="true" />
        )}
        <p className="oshero-eyebrow">Open Weights · Every frontier model · Programs you own</p>

        <h1 className="oshero-title">
          Glyphh is the operating system for frontier AI.
        </h1>

        <p className="oshero-pitch">
          <strong>AI at build time. <em>Not</em> runtime.</strong>
        </p>
        {/* The four points (his options, 2026-09-22 — the Option 3 blend, to look at):
            replaces the pitch's second sentence, which stays hidden below. */}
        <ul className="oshero-points">
          <li><span>Run anywhere &middot; Desktop optional</span>Mac, Windows, Linux, CLI, or a headless server daemon. Your skills, apps, and tasks port with you.</li>
          <li><span>Model Router</span>Governed access to 3,900+ models and open weights. Frontier where it counts, open weights for the rest.</li>
          <li><span>MCP Engine</span>3,500+ tool integrations powered by Pipedream. Govern who connects to what, and which tools, by team.</li>
          <li><span>Governed by you</span>Approve models, set budgets, and gate apps by role. Your keys, your vendor&rsquo;s price, never marked up.</li>
        </ul>

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
        <p className="oshero-pitch oshero-pitch-after">
          Productivity doesn&rsquo;t come from prompting. It comes from using blended AI models to build
          predictable semantic applications that run on your data deterministically &mdash; validated, distributed,
          and governed by your teams at scale.
        </p>
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
