import Footer from '../components/Footer';

export const metadata = {
  title: 'Marketplace Terms — Glyphh',
  description: 'Terms for installing and using apps from the Glyphh Marketplace, by Glyphh AI LLC.',
};

export default function MarketplaceTermsPage() {
  return (
    <>
      <div className="policy-page">
        <div className="container">
          <a href="/" className="policy-back">&larr; Back</a>
          <h1 className="policy-title">Marketplace Terms</h1>

          <p><strong>Effective Date:</strong> August 17, 2026</p>
          <p><strong>Last Updated:</strong> August 18, 2026</p>
          <p>These Marketplace Terms govern your installation and use of apps from the Glyphh Marketplace, operated by Glyphh AI LLC (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). They supplement our <a href="/terms">Terms of Use</a> and <a href="/privacy">Privacy Policy</a>. Ratings, reviews, and comments are governed by our <a href="/code-of-conduct">Code of Conduct</a>; developers who publish apps are bound by the <a href="/developer-agreement">Developer Agreement</a>.</p>

          <h2>1. What the Marketplace Is</h2>
          <p>The Marketplace lists apps published by third-party developers: web apps (&ldquo;Glyphh apps&rdquo;) and work panel apps that install locally on your desktop. Every listed app is a sandboxed bundle that runs inside your own Glyphh — in your organization&apos;s environment, on the models your organization has configured, against your organization&apos;s data. The developer hosts nothing; we operate the platform the app runs on, and a capability sandbox limits each app to what its manifest declares. Every release is reviewed and approved by us before it is available to install, and the approved bundle is exactly what runs — but approval is a screening step only; it is not a warranty, endorsement, or guarantee of any app. Externally hosted or self-hosted apps that you deploy or register yourself are not Marketplace apps and are not covered by these terms.</p>

          <h2>2. Installing Apps</h2>
          <p>You choose which apps to install; installing an app is your decision and at your own risk. Installs are tied to your account or organization. Work panel apps run locally on your machine; Glyphh apps run inside your organization&apos;s Glyphh environment. Either way, your data stays in your organization&apos;s plane — an installed app never depends on a developer&apos;s server being up, and when an app calls a model, it does so through your organization&apos;s governed model catalog at the model choices your organization has made. You can uninstall any app at any time.</p>

          <h2>3. The Developer Is the Vendor of Record for Support</h2>
          <p>The developer of an app — not Glyphh — is responsible for supporting it: answering questions, fixing defects, and maintaining it. Each listing shows the developer&apos;s support contact, and the &ldquo;Support&rdquo; link on a listing points to the developer. We do not provide support for third-party apps.</p>

          <h2>4. Subscriptions in Credits</h2>
          <ul>
            <li><strong>Credits only.</strong> Paid apps are priced in credits and billed as a monthly credit subscription per install. Credits are a limited license to use the Service — not money, not redeemable for cash — as described in our <a href="/terms">Terms of Use</a>.</li>
            <li><strong>Glyphh is the merchant.</strong> We are the merchant for Marketplace credit subscriptions: we charge the subscription from your credit balance and account for the developer&apos;s share under the <a href="/developer-agreement">Developer Agreement</a>. Your billing relationship for a Marketplace subscription is with us — the developer never bills you directly for it.</li>
            <li><strong>Your usage is your own.</strong> The subscription covers the app itself, not the metered work it performs for you. Model inference and other metered operations an app runs are metered as your own usage, at your organization&apos;s model choices and rates, in addition to the subscription price.</li>
            <li><strong>Renewal and lapse.</strong> The subscription renews monthly from your credit balance. If the charge cannot be met, the app is disabled until the subscription is restored. Lapse disables the app — it never deletes your data, which remains in your organization&apos;s plane and is available again when the subscription resumes.</li>
            <li><strong>Discounts.</strong> Discounts and promotional pricing are honored as stated on the listing at the time you subscribe, for the period the listing states.</li>
            <li><strong>Refunds.</strong> Credits spent on Marketplace apps are non-refundable except as set out in our <a href="/refund">Refund Policy</a> or required by law.</li>
          </ul>

          <h2>5. Ratings, Reviews, and Comments</h2>
          <p>You may rate and review apps and developers, and comment on listings. Reviews and comments are public and attributed to your account or organization, must comply with the <a href="/code-of-conduct">Code of Conduct</a>, and are licensed to us for display and moderation as described in the <a href="/terms">Terms of Use</a>. We may remove content that violates our policies.</p>

          <h2>6. Reporting Apps</h2>
          <p>If you believe an app is malicious, deceptive, or otherwise violates our policies, report it through the listing&apos;s report tool. Reports go to a triage queue and are taken seriously; we may suspend or delist an app while we investigate.</p>

          <h2>7. Removal and Changes</h2>
          <p>We may remove, suspend, or delist any app or developer at any time. Developers may also unpublish their apps or change pricing prospectively. If an app you subscribe to is removed, your subscription stops renewing; removal does not entitle you to a refund of previously spent credits except as our <a href="/refund">Refund Policy</a> provides.</p>

          <h2>8. Disclaimer</h2>
          <p>THIRD-PARTY APPS ARE PROVIDED BY THEIR DEVELOPERS, NOT BY US. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE MAKE NO WARRANTY OF ANY KIND REGARDING ANY MARKETPLACE APP, AND OUR REVIEW OR APPROVAL OF AN APP DOES NOT CREATE ONE. THE LIMITATIONS OF LIABILITY IN OUR <a href="/terms">TERMS OF USE</a> APPLY TO YOUR USE OF THE MARKETPLACE.</p>

          <h2>9. Contact</h2>
          <p>For questions about these Marketplace Terms, contact us at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>. For help with a specific app, contact its developer through the listing.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
