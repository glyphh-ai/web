/**
 * UsageBand — the one-budget pricing strip, shared verbatim by the
 * homepage close and the CLI page close (consistency across products is
 * the point). Quiet on purpose: it sits directly above the loud CTA card,
 * so it's a bordered strip, not a second glowing panel.
 */

export default function UsageBand() {
  return (
    <div className="usage-band reveal">
      <div className="usage-band-copy">
        <h3>One budget. Every product.</h3>
        <p>
          Every Glyphh product draws on one monthly budget, in dollars:{' '}
          <b>a plan&rsquo;s price is its budget, dollar for dollar</b>. Add funds
          any time. Every model runs on every plan, at your plan&rsquo;s rate.
        </p>
      </div>
      <a href="/pricing" className="btn btn-secondary btn-lg group">
        <span className="btn-label">See pricing</span>
        <span className="btn-fill"></span>
      </a>
    </div>
  );
}
