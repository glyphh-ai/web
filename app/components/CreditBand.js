/**
 * CreditBand — the one-credit-system pricing strip, shared verbatim by the
 * homepage close and the CLI page close (consistency across products is
 * the point). Quiet on purpose: it sits directly above the loud CTA card,
 * so it's a bordered strip, not a second glowing panel.
 */

export default function CreditBand() {
  return (
    <div className="credit-band reveal">
      <div className="credit-band-copy">
        <h3>One pricing model. Every product.</h3>
        <p>
          All Glyphh products share the same credit system:{' '}
          <b>1 credit = 30 seconds of compute</b>. Each product draws
          credits differently, but the meter never changes &mdash; and your AI
          is always your own, never marked up.
        </p>
      </div>
      <a href="/pricing" className="btn btn-secondary btn-lg group">
        <span className="btn-label">See pricing</span>
        <span className="btn-fill"></span>
      </a>
    </div>
  );
}
