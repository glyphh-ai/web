import Footer from '../components/Footer';

export const metadata = {
  title: 'Developer Agreement — Glyphh',
  description: 'Developer Agreement for publishing apps on the Glyphh Marketplace, by Glyphh AI LLC.',
};

export default function DeveloperAgreementPage() {
  return (
    <>
      <div className="policy-page">
        <div className="container">
          <a href="/" className="policy-back">&larr; Back</a>
          <h1 className="policy-title">Developer Agreement</h1>

          <p><strong>Effective Date:</strong> August 17, 2026</p>
          <p><strong>Last Updated:</strong> August 18, 2026</p>
          <p>This Developer Agreement (&ldquo;Agreement&rdquo;) governs your publication of apps on the Glyphh Marketplace, operated by Glyphh AI LLC (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). It supplements our <a href="/terms">Terms of Use</a>, <a href="/marketplace-terms">Marketplace Terms</a>, <a href="/privacy">Privacy Policy</a>, and <a href="/code-of-conduct">Code of Conduct</a>, all of which also apply to you as a developer. By creating a developer profile or submitting an app, you agree to this Agreement.</p>

          <h2>1. Eligibility</h2>
          <p>You may publish as an individual or on behalf of an organization. You must hold a Glyphh account in good standing, be at least 18 years old (or the age of majority in your jurisdiction), and have the authority to bind the organization you publish for, if any. One developer profile is permitted per organization or per individual. We may decline, suspend, or revoke developer status at our discretion.</p>

          <h2>2. Submission and Review</h2>
          <p>Nothing appears on the Marketplace without review. You submit each app, and each release, for our approval:</p>
          <ul>
            <li><strong>Every release is re-reviewed.</strong> Initial submissions and every subsequent release or update go through review before they ship. An approved release is the only version users can install.</li>
            <li><strong>Automated and human review.</strong> Review includes automated scans (source, manifest, permissions, sandboxed behavior, and content) and human review. We may request changes, additional information, or access needed to complete review.</li>
            <li><strong>Approval is a status, not a promise.</strong> We may approve, reject, or revoke approval of any release at our discretion. Approval is not a warranty, endorsement, or certification of your app, and does not shift any responsibility for your app to us.</li>
          </ul>

          <h2>3. Prohibited Apps and Conduct</h2>
          <p>You must not submit or maintain apps that:</p>
          <ul>
            <li>Contain malware, spyware, or hidden functionality, or that collect data beyond what the app discloses</li>
            <li>Are deceptive about what they do, who made them, or what they cost</li>
            <li>Circumvent, probe, or interfere with the Service&apos;s security, metering, review, or sandboxing</li>
            <li>Infringe any third party&apos;s intellectual property, privacy, or other rights</li>
            <li>Violate applicable law, the <a href="/terms">Terms of Use</a> (including its acceptable-use rules), or the <a href="/code-of-conduct">Code of Conduct</a></li>
          </ul>
          <p>You must not manipulate the Marketplace itself: no fake installs, fake or incentivized reviews, rating manipulation, or interference with other developers&apos; listings.</p>

          <h2>4. Support Is Your Obligation</h2>
          <p>You — not Glyphh — are responsible for supporting your apps. This includes responding to user questions, fixing defects, and maintaining compatibility. Your listing must include a working support contact, and the listing&apos;s &ldquo;Support&rdquo; link points to you. We do not provide support for your apps, and persistent failure to support your apps is grounds for suspension or removal.</p>

          <h2>5. Hosting and Data Handling</h2>
          <p>Glyphh apps run on our hosting infrastructure — hosting an app elsewhere and pointing a listing at it is not permitted. Hosting is billed to you in credits; if your hosting lapses, your app is suspended and unrouted until it is restored, and its data is retained during the lapse, not deleted. Running on our infrastructure does not change whose data it is:</p>
          <ul>
            <li><strong>User data belongs to the users.</strong> Tenant and user data your app collects belongs to the users who provided it, and it is your responsibility. You handle it under your own privacy policy — every listed app must publish one, and your listing must link to it.</li>
            <li><strong>We host; we do not read.</strong> We operate the infrastructure your app&apos;s database runs on, and we may suspend or unroute your app, but we do not access the contents of your app&apos;s database except as needed to investigate a security incident or credible policy violation — and we will notify you of any such access unless law or the integrity of the investigation prevents it.</li>
            <li><strong>Portability and deletion are on you.</strong> You must honor user requests to export or delete their data from your app, and you are responsible for complying with the data-protection laws that apply to you.</li>
            <li><strong>Breach notification.</strong> If your app suffers a data breach, you must notify both us and the affected users without undue delay, and no later than any deadline applicable law imposes.</li>
          </ul>

          <h2>6. Pricing and Payout</h2>
          <p>You set the price of your app in credits: a monthly credit subscription, optionally with discount windows or a free tier. Credits are a limited license to use the Service — they are not money, have no cash value, and are never redeemable for cash. The economics of any developer payout, revenue share, or other compensation are defined separately by us and may change; nothing in this Agreement promises payment in dollars or any other currency for credits spent on your apps.</p>

          <h2>7. Intellectual Property and License to Distribute</h2>
          <p>You retain ownership of your apps. You represent and warrant that you own or have all rights necessary to publish your app and everything in it (code, content, media, marks), and that your app does not infringe any third party&apos;s rights. You grant us a worldwide, non-exclusive, royalty-free license to host, reproduce, review, scan, distribute, display, and promote your app and its listing materials as needed to operate the Marketplace, for as long as your app is listed and as needed to serve existing installs thereafter.</p>

          <h2>8. Takedown and Suspension</h2>
          <p>We may suspend or remove any app, release, or listing at any time, with or without notice, including for policy violations, credible reports of malicious behavior, legal claims, or security risk. Reports of malicious apps are triaged seriously and suspension may be immediate while we investigate. Where practical, we will notify you of the reason and any path to reinstatement, but we are not obligated to reinstate any app.</p>

          <h2>9. Indemnification</h2>
          <p>You will defend, indemnify, and hold harmless Glyphh AI LLC and its officers, employees, and agents from and against any claims, damages, liabilities, and expenses (including reasonable legal fees) arising out of or related to your apps, your listing content, your breach of this Agreement, or your violation of any law or third-party right.</p>

          <h2>10. Termination</h2>
          <p>Either party may terminate this Agreement at any time; you terminate by unpublishing your apps and closing your developer profile, and we may terminate by notice to you. We may also terminate immediately for breach. Upon termination your apps are delisted; we may continue serving previously installed releases to existing users for a reasonable wind-down period. Sections 5 (as to your continuing data obligations), 6, 7 (to the extent needed for wind-down), 8, and 9 survive termination.</p>

          <h2>11. Contact</h2>
          <p>For questions about this Agreement, contact us at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
