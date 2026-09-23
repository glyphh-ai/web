import LetterField from './LetterField';

/**
 * OsPitch — the pitch, in the frame (his order, 2026-09-23: "switch the
 * sections", then "this section needs to match the others"). Same pattern
 * as How it works and Latest: a kicker row with a more-link, the small
 * left-aligned heading, the golden pitch VERBATIM (never paraphrased, never
 * shortened) as the lede, then the four points as hairlined tiles with the
 * letter field behind each.
 */

const POINTS = [
  ['Run anywhere · Desktop optional', 'Mac, Windows, Linux, CLI, or a headless server daemon. Your skills, apps, and tasks port with you.'],
  ['Model Router', 'Governed access to 3,900+ models and open weights. Frontier where it counts, open weights for the rest.'],
  ['MCP Engine', '3,500+ tool integrations powered by Pipedream. Govern who connects to what, and which tools, by team.'],
  ['Governed by you', 'Approve models, set budgets, and gate apps by role. Your keys, your vendor’s price, never marked up.'],
];

export default function OsPitch() {
  return (
    <section className="hiw hv-pitch" id="pitch">
      <div className="qs-head">
        <span className="qs-kicker">The inversion</span>
        <a href="/docs" className="qs-more">Read the docs &rarr;</a>
      </div>
      <h2 className="ix-h2 lt-h2">AI at build time. <em>Not</em> runtime.</h2>
      <p className="ix-desc hv-pitch-lede">
        Productivity doesn&rsquo;t come from prompting. It comes from using blended AI models to build
        predictable semantic applications that run on your data deterministically &mdash; validated, distributed,
        and governed by your teams at scale.
      </p>
      <div className="hv-grid hv-grid-2">
        {POINTS.map(([title, body], i) => (
          <div key={title} className="hv-tile">
            <LetterField seed={i + 21} />
            <h3 className="hv-tile-title">{title}</h3>
            <p className="hv-tile-body">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
