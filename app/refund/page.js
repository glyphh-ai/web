// Rewritten 2026-10-22 for Ada Cloud's plans (server docs/pricing.md, docs/specs/ada-cloud.md section 7); counsel to review.
// Updated 2026-11-10 for the Hosted Model prepaid balance (matches Terms of Use sections 7 and 8); counsel to review.
// 2026-11-18: glyphh.ai is the games site. The text below still describes the earlier products and is to be rewritten.

export const metadata = {
  title: 'Refund Policy — Glyphh',
  description: 'Refund Policy for Glyphh, by Glyphh AI LLC.',
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
            <p>This is a plain-English summary of how Glyphh works today; it will be reviewed by counsel before general availability.</p>
          </div>

          <p><strong>Effective Date:</strong> July 3, 2026</p>
          <p><strong>Last updated 10 November 2026</strong></p>
          <p>This Refund Policy applies to Glyphh plans and to the prepaid balance for Hosted Models, offered by Glyphh AI LLC. Terms in capitals mean what they mean in our <a href="/terms">Terms of Use</a>.</p>

          <h2>1. Free</h2>
          <p>Free costs nothing and needs no card. Reads past its monthly allowance are refused, never charged. No refund applies. A prepaid balance bought on Free follows section 4.</p>

          <h2>2. Basic, Pro and Team</h2>
          <p>Basic ($20), Pro ($99) and Team ($299) are monthly subscriptions, billed in advance. You can cancel at any time from the platform. Your plan continues to the end of the period you paid for and is not renewed; your organisation then moves to Free. Your models and precedents are kept, and you can export them at any time.</p>
          <p>Payments already made are not refunded, and there are no partial refunds for unused time in a period.</p>

          <h2>3. Reads Past the Allowance</h2>
          <p>On Basic, Pro and Team, reads past the month&apos;s allowance are billed at $1 per 10,000, in arrears on a later invoice. They are charged for reads actually made, so they are not refunded, including after you cancel. If you believe a read count is wrong, write to us within 30 days and we will check it against our records.</p>

          <h2>4. Hosted Model Tokens and the Prepaid Balance</h2>
          <p>Hosted Model tokens past your plan&apos;s monthly allowance are paid from a prepaid balance you top up in US dollars through Stripe Checkout (Section 8 of our Terms of Use).</p>
          <ul>
            <li><strong>Top-ups are non-refundable</strong>, except where the law requires a refund or we choose, at our discretion, to give one. Tokens already used are charged at the rate shown when the request was made and are not refunded.</li>
            <li><strong>No expiry.</strong> Your balance does not expire while your organisation&apos;s account is open, and it stays with your organisation if you cancel or change plan. It earns no interest and cannot be transferred or exchanged for cash.</li>
            <li><strong>Closing your account.</strong> If your organisation is closed, by you or by us, any unused balance is forfeited unless the law requires otherwise, and any negative balance remains owed.</li>
            <li><strong>Granted balances</strong> (for example, a promotion) have no cash value and are never refunded.</li>
            <li><strong>Disputes.</strong> If you believe a token count or charge is wrong, write to us within 30 days of the charge and we will check it against our metering records, which are authoritative. If we find an error, we will correct your balance.</li>
          </ul>

          <h2>5. Plan Changes</h2>
          <p>You can change plan from the platform. A change does not refund a payment already made, and does not change your prepaid balance.</p>

          <h2>6. Enterprise</h2>
          <p>Enterprise plans are governed by their contract, including cancellation and any refunds.</p>

          <h2>7. Suspended or Terminated Accounts</h2>
          <p>If your account is suspended or ended for a breach of our Terms of Use or for non-payment, no refund is issued, including of any prepaid balance, unless the law requires it.</p>

          <h2>8. Your Statutory Rights</h2>
          <p>Nothing in this policy limits any refund or cancellation rights you have under the consumer-protection laws where you live.</p>

          <h2>9. Contact</h2>
          <p>Billing questions: <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>
        </div>
      </div>
    </>
  );
}
