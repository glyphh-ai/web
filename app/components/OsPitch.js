/**
 * OsPitch — the pitch, in the frame (his order, 2026-09-23: "switch the
 * sections", then "this section needs to match the others"). Same pattern
 * as How it works and Latest: a kicker row with a more-link, the small
 * left-aligned heading, the golden pitch VERBATIM (never paraphrased, never
 * shortened) as the lede, then the four point cards exactly as they were in
 * the hero (his order, 2026-09-23: "keep the squares the way they were …
 * with the same effect") — separated boxes, and HallLines hosted by this
 * section: hover a card and lines shoot from its corners to a vanishing
 * point above, the flare building the longer the pointer stays. The lines
 * came off in the minimal cut (2026-10-05).
 */

const POINTS = [
  ['Run anywhere · Desktop optional', 'Mac, Windows, Linux, CLI, or a headless server daemon. Your skills, apps, and tasks port with you.'],
  ['Model Router', 'Governed access to every model Glyphh runs, open weights included. Frontier where it counts, open weights for the rest.'],
  ['MCP Engine', '3,500+ tool integrations powered by Pipedream. Govern who connects to what, and which tools, by team.'],
  ['Governed by you', 'Approve models, set budgets, and gate apps by role. Never per seat, per model or per install.'],
];

export default function OsPitch() {
  return (
    <section className="hiw hv-pitch" id="pitch">
      <div className="qs-head">
        <span className="qs-kicker">The inversion</span>
        <a href="https://docs.glyphh.ai" className="qs-more">Read the docs &rarr;</a>
      </div>
      <h2 className="ix-h2 lt-h2">AI at build time. <em>Not</em> runtime.</h2>
      <p className="ix-desc hv-pitch-lede">
        Productivity doesn&rsquo;t come from prompting. It comes from using blended AI models to build
        predictable semantic applications that run on your data deterministically &mdash; validated, distributed,
        and governed by your teams at scale.
      </p>
      <ul className="oshero-points">
        {POINTS.map(([title, body]) => (
          <li key={title}><span>{title}</span>{body}</li>
        ))}
      </ul>
    </section>
  );
}
