// Rewritten 2026-10-22 for Ada Cloud's plans (server docs/pricing.md, docs/specs/ada-cloud.md section 7); counsel to review.
import Footer from '../components/Footer';

export const metadata = {
  title: 'Refund Policy — Glyphh',
  description: 'Cancelling a Glyphh plan, metered reads, and refunds, by Glyphh AI LLC.',
};

export default function RefundPage() {
  return (
    <>
      <div className="policy-page">
        <div className="container">
          <a href="/" className="policy-back">&larr; Back</a>
          <h1 className="policy-title">Refund Policy</h1>

          <div className="policy-note">
            <p>This is a plain-English summary of how Glyphh works today; it will be reviewed by counsel before general availability.</p>
          </div>

          <p><strong>Effective Date:</strong> July 3, 2026</p>
          <p><strong>Last updated 22 October 2026</strong></p>
          <p>This Refund Policy applies to Glyphh plans offered by Glyphh AI LLC. Terms in capitals mean what they mean in our <a href="/terms">Terms of Use</a>.</p>

          <h2>1. Free</h2>
          <p>Free costs nothing and needs no card. Reads past its monthly allowance are refused, never charged. No refund applies.</p>

          <h2>2. Basic, Pro and Team</h2>
          <p>Basic ($20), Pro ($99) and Team ($299) are monthly subscriptions, billed in advance. You can cancel at any time from the platform. Your plan continues to the end of the period you paid for and is not renewed; your organisation then moves to Free. Your models and precedents are kept, and you can export them at any time.</p>
          <p>Payments already made are not refunded, and there are no partial refunds for unused time in a period.</p>

          <h2>3. Reads Past the Allowance</h2>
          <p>On Basic, Pro and Team, reads past the month&apos;s allowance are billed at $1 per 10,000, in arrears on a later invoice. They are charged for reads actually made, so they are not refunded, including after you cancel. If you believe a read count is wrong, write to us and we will check it against our records.</p>

          <h2>4. Plan Changes</h2>
          <p>You can change plan from the platform. A change does not refund a payment already made.</p>

          <h2>5. Enterprise</h2>
          <p>Enterprise plans are governed by their contract, including cancellation and any refunds.</p>

          <h2>6. Suspended or Terminated Accounts</h2>
          <p>If your account is suspended or ended for a breach of our Terms of Use, no refund is issued.</p>

          <h2>7. Your Statutory Rights</h2>
          <p>Nothing in this policy limits any refund or cancellation rights you have under the consumer-protection laws where you live.</p>

          <h2>8. Contact</h2>
          <p>Billing questions: <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
