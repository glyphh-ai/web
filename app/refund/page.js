// Rewritten 2026-10-20 to match the product; counsel to review.
import Footer from '../components/Footer';

export const metadata = {
  title: 'Refund Policy — Glyphh',
  description: 'Cancelling a Glyphh plan, and refunds, by Glyphh AI LLC.',
};

export default function RefundPage() {
  return (
    <>
      <div className="policy-page">
        <div className="container">
          <a href="/" className="policy-back">&larr; Back</a>
          <h1 className="policy-title">Refund Policy</h1>

          <p><strong>Effective Date:</strong> July 3, 2026</p>
          <p><strong>Last Updated:</strong> October 20, 2026</p>
          <p>This Refund Policy applies to Glyphh plans offered by Glyphh AI LLC. Capitalised terms have the meaning given in our <a href="/terms">Terms of Use</a>.</p>

          <h2>1. The Free Plan</h2>
          <p>The Free plan costs nothing and requires no payment. No refund applies.</p>

          <h2>2. Monthly Plans</h2>
          <p>Pro and Team are monthly subscriptions, billed in advance. You may cancel at any time from the platform. Your plan then continues to the end of the month you have paid for, and is not renewed. No further licence keys are issued after that month, and your runtime nodes return to the Free plan&apos;s limits when the last key expires. Your models and precedents stay on your own infrastructure.</p>
          <p>Payments already made are not refunded, and no partial refunds are issued for unused time within a month.</p>

          <h2>3. Enterprise</h2>
          <p>Enterprise plans are governed by their agreement. Cancellation and any refunds are as set out in that agreement.</p>

          <h2>4. Plan Changes</h2>
          <p>You can change plan from the platform. A change does not entitle you to a refund of a payment already made.</p>

          <h2>5. Suspended or Terminated Accounts</h2>
          <p>If your account is suspended or terminated for a breach of our Terms of Use, no refund is issued.</p>

          <h2>6. Your Statutory Rights</h2>
          <p>Nothing in this policy limits any non-waivable refund or cancellation rights you may have under the consumer-protection laws of your jurisdiction.</p>

          <h2>7. Contact</h2>
          <p>For billing questions, contact us at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
