import Footer from '../components/Footer';

export const metadata = {
  title: 'Refund Policy — .Yo',
  description: 'Refund Policy for the .Yo desktop application by Glyphh AI LLC.',
};

export default function RefundPage() {
  return (
    <>
      <div className="policy-page">
        <div className="container">
          <a href="/" className="policy-back">&larr; Back</a>
          <h1 className="policy-title">Refund Policy</h1>

          <p><strong>Effective Date:</strong> January 1, 2026</p>
          <p>This Refund Policy applies to paid subscriptions for .Yo offered by Glyphh AI LLC.</p>

          <h2>1. Free Tier</h2>
          <p>The free tier of .Yo is available at no cost and requires no payment. No refund applies.</p>

          <h2>2. Paid Subscriptions (Basic &amp; Advanced)</h2>
          <p>Paid plans are billed on a monthly subscription basis. You may cancel your subscription at any time.</p>

          <h2>3. Refund Eligibility</h2>
          <p>We offer a full refund within 14 days of your first subscription payment (&ldquo;Refund Window&rdquo;) if you are not satisfied with the Service. To request a refund during this window, contact us at <a href="mailto:support@dotyo.dev">support@dotyo.dev</a> with your license key and the email associated with your account.</p>

          <h2>4. After the Refund Window</h2>
          <p>After the 14-day Refund Window, subscription payments are non-refundable. When you cancel your subscription, you retain access to paid features through the end of your current billing period. No partial refunds are issued for unused time within a billing cycle.</p>

          <h2>5. Plan Changes</h2>
          <p>If you cancel your Pro subscription, you retain access to Pro features through the end of your current billing period. No partial refunds are issued for unused time within a billing cycle.</p>

          <h2>6. Service Disruption</h2>
          <p>If the Service experiences a significant outage or disruption lasting more than 72 continuous hours, you may be eligible for a prorated credit at our discretion. Contact <a href="mailto:support@dotyo.dev">support@dotyo.dev</a> to report service disruptions.</p>

          <h2>7. Revoked Licenses</h2>
          <p>If your license is revoked due to a violation of our Terms of Use, no refund will be issued.</p>

          <h2>8. How to Cancel</h2>
          <p>You can cancel your subscription at any time through the Settings section of the .Yo application. Alternatively, contact <a href="mailto:support@dotyo.dev">support@dotyo.dev</a>. Cancellation takes effect at the end of your current billing period.</p>

          <h2>9. Contact</h2>
          <p>For billing or refund questions, contact us at <a href="mailto:support@dotyo.dev">support@dotyo.dev</a>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
