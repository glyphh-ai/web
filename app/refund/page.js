// Rewritten 2026-11-18: Glyphh is a game studio. The owner's rule: every purchase in a game is final and Glyphh gives
// no refunds, with the one carve-out the law demands. Event registrations and league money in Bams & Brags are under
// that game's own terms (bamsandbrags.com/legal) and are not restated here. A careful draft, not a lawyer's text.
// test/games.test.mjs checks what the three legal pages may and may not say.

export const metadata = {
  title: 'Refund Policy — Glyphh',
  description: 'Refund Policy for the games made by Glyphh AI LLC.',
  alternates: { canonical: '/refund' },
};

export default function RefundPage() {
  return (
    <>
      <div className="policy-page">
        <div className="container">
          <a href="/" className="policy-back">&larr; Back</a>
          <h1 className="policy-title">Refund Policy</h1>

          <div className="policy-note">
            <p>This page is written in plain English. It was updated on 18 November 2026 to describe Glyphh as it is now: a small independent game studio, and its games.</p>
          </div>

          <p><strong>Effective Date:</strong> November 18, 2026</p>
          <p><strong>Last updated 18 November 2026</strong></p>
          <p>This Refund Policy applies to every purchase in a game made by Glyphh AI LLC (&ldquo;Glyphh&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). It is part of our <a href="/terms">Terms of Use</a>. The website glyphh.ai sells nothing.</p>

          <h2>1. All Purchases Are Final</h2>
          <p>Every purchase in our games is final. We give no refunds, except where the law gives you a right we cannot exclude.</p>
          <p>That covers every game purchase:</p>
          <ul>
            <li><strong>Free Fall Frank:</strong> all the Franks ($0.99, once) and the level ROCK BOTTOM ($0.99, once).</li>
            <li><strong>Bams &amp; Brags:</strong> the pass ($2.99, once) and starting a league ($29.99, once for each league).</li>
            <li><strong>Crabby Knife Fight:</strong> free. There is nothing to buy.</li>
          </ul>
          <p>Each purchase is one payment through Stripe, not a subscription, so there is nothing to cancel and nothing renews.</p>

          <h2>2. Bams &amp; Brags Events and Leagues</h2>
          <p>Registrations for a league&apos;s events, and a league&apos;s money, are handled under that game&apos;s own terms, at <a href="https://bamsandbrags.com/legal">bamsandbrags.com/legal</a>.</p>

          <h2>3. If You Believe a Charge Is Wrong</h2>
          <p>Write to <a href="mailto:support@glyphh.ai">support@glyphh.ai</a> first, from the email address on your account, and tell us which game, what was charged and when. We will check it against our records.</p>

          <h2>4. Suspended or Ended Accounts</h2>
          <p>If your account is suspended or ended for a breach of our Terms of Use, no refund is issued, except where the law gives you a right we cannot exclude.</p>

          <h2>5. Contact</h2>
          <p>Billing questions: <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>
        </div>
      </div>
    </>
  );
}
