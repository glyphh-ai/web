import HeroCTA from './HeroCTA';

/**
 * OsPitch — the pitch, in the frame (his order, 2026-09-23: "switch the
 * sections"). The hero keeps its title and the vendor-neutral line over the
 * screenshots; the rest lives here, first in the frame: the inversion line
 * as the heading, the four point cards, the two doors, and the golden pitch
 * VERBATIM (never paraphrased, never shortened). The classes are the hero's, so the type is
 * identical; `.hv-pitch` only re-homes them inside the rails.
 */
export default function OsPitch({ variant = 'default' }) {
  return (
    <section className="hv-pitch" id="pitch">
      <div className="oshero-inner">
        <h2 className="oshero-title">
          AI at build time. <em>Not</em> runtime.
        </h2>
        <ul className="oshero-points">
          <li><span>Run anywhere &middot; Desktop optional</span>Mac, Windows, Linux, CLI, or a headless server daemon. Your skills, apps, and tasks port with you.</li>
          <li><span>Model Router</span>Governed access to 3,900+ models and open weights. Frontier where it counts, open weights for the rest.</li>
          <li><span>MCP Engine</span>3,500+ tool integrations powered by Pipedream. Govern who connects to what, and which tools, by team.</li>
          <li><span>Governed by you</span>Approve models, set budgets, and gate apps by role. Your keys, your vendor&rsquo;s price, never marked up.</li>
        </ul>

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
      </div>
    </section>
  );
}
