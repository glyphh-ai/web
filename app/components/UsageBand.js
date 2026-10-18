/**
 * UsageBand — the pricing strip, shared verbatim by the
 * homepage close and the CLI page close (consistency across products is
 * the point). Quiet on purpose: it sits directly above the loud CTA card,
 * so it's a bordered strip, not a second glowing panel.
 */

export default function UsageBand() {
  return (
    <div className="usage-band reveal">
      <div className="usage-band-copy">
        <h3>Never per seat, per model or per install.</h3>
        <p>
          Free on your own machines, without limit. Pro is <b>$99 a month</b> and
          Team <b>$299 a month</b>, flat, for managed precedents, hosted machines
          and sync. Enterprise from $10k a year.
        </p>
      </div>
      <a href="/pricing" className="btn btn-secondary btn-lg group">
        <span className="btn-label">See pricing</span>
        <span className="btn-fill"></span>
      </a>
    </div>
  );
}
