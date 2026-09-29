import Footer from '../components/Footer';

export const metadata = {
  title: 'Refund Policy — Glyphh',
  description: 'Refund Policy for Glyphh plans and usage budget purchases by Glyphh AI LLC.',
};

export default function RefundPage() {
  return (
    <>
      <div className="policy-page">
        <div className="container">
          <a href="/" className="policy-back">&larr; Back</a>
          <h1 className="policy-title">Refund Policy</h1>

          <p><strong>Effective Date:</strong> July 3, 2026</p>
          <p>This Refund Policy applies to paid plans and usage budget purchases for Glyphh, offered by Glyphh AI LLC. Capitalized terms have the meaning given in our <a href="/terms">Terms of Use</a>.</p>

          <h2>1. Installing Without a Plan</h2>
          <p>Installing and setting up Glyphh without a plan costs nothing and requires no payment. No refund applies.</p>

          <h2>2. How Billing Works</h2>
          <p>Paid plans are billed on a recurring monthly basis and include a monthly usage budget in dollars. You may also add funds to that budget as one-time purchases (including automatic reloads you enable). The budget is a prepaid, consumable right to access the Service, as described in our Terms of Use.</p>

          <h2>3. 14-Day Money-Back on Your First Plan Payment</h2>
          <p>If you are not satisfied with the Service, you may request a full refund within fourteen (14) days of your <strong>first</strong> paid-plan payment (the &ldquo;Refund Window&rdquo;), less the value of any budget already consumed during that period. This money-back guarantee applies once per customer and only to the first payment. To request it, contact <a href="mailto:support@glyphh.ai">support@glyphh.ai</a> from the email associated with your account.</p>

          <h2>4. Renewals</h2>
          <p>Subscription renewals are non-refundable. You may cancel at any time to stop future renewals; you retain access to your plan through the end of the current billing period. No partial refunds are issued for unused time within a billing period.</p>

          <h2>5. Purchased Funds Are Non-Refundable</h2>
          <p>All funds added to your usage budget, including automatic reloads, are final and <strong>non-refundable</strong> once purchased. Unused budget is not refundable, redeemable for cash, or transferable, except where a refund is required by applicable law. Plan-included budget does not roll over and expires at the end of the billing period in which it is granted; purchased funds carry over until used.</p>

          <h2>6. No Refunds for Third-Party or Upstream Availability</h2>
          <p>The Service depends on the AI clients you connect, third-party integrations and connected services (for example, through our integration partner), and other infrastructure that we do not control. We do <strong>not</strong> provide refunds or credits for any interruption, downtime, degraded performance, latency, rate limiting, capacity limits, changes or deprecations, or content moderation, refusals, or output decisions that arise from or relate to a third party or any cause outside our reasonable control. Such events do not constitute a failure of the Service for refund purposes.</p>

          <h2>7. Our Own Service Disruptions</h2>
          <p>For prolonged outages caused solely by our own infrastructure (and not by a third-party provider or other cause outside our reasonable control), we may, at our sole discretion, issue a goodwill service credit. This is discretionary; nothing in this section creates an entitlement to a refund or credit. Report disruptions to <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>

          <h2>8. Plan Changes and Downgrades</h2>
          <p>You can change or cancel your plan through the billing portal. Upgrades take effect immediately; downgrades and cancellations take effect at the end of the current billing period. No partial refunds are issued for plan changes within a billing period.</p>

          <h2>9. Suspended or Revoked Accounts</h2>
          <p>If your account is suspended or terminated for a violation of our Terms of Use, no refund will be issued and any unused budget, including purchased funds, is forfeited.</p>

          <h2>10. How to Cancel</h2>
          <p>You can cancel your subscription at any time through the billing portal in the Settings section of the application, or by contacting <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>. Cancellation takes effect at the end of your current billing period.</p>

          <h2>11. Your Statutory Rights</h2>
          <p>Nothing in this policy limits any non-waivable refund or cancellation rights you may have under the consumer-protection laws of your jurisdiction.</p>

          <h2>12. Contact</h2>
          <p>For billing or refund questions, contact us at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
