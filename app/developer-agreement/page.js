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

          <h2>2. Developer Program Enrollment and Consent</h2>
          <p>Publishing to the Marketplace requires enrollment in the Glyphh developer program. Enrollment includes creating your developer profile, accepting this Agreement, and — if you intend to receive payouts — completing a valid payout configuration (Section 7). We record the version of this Agreement you accept and when you accept it.</p>
          <ul>
            <li><strong>No enrollment, no listing.</strong> You cannot submit or list an app until your enrollment is complete and you have accepted the then-current version of this Agreement.</li>
            <li><strong>Re-consent on updates.</strong> When we update this Agreement, we will present the new version to you. Continuing to list apps, submitting new releases, or receiving payouts after the update takes effect requires your acceptance of the new version; if you do not accept, we may suspend new submissions and, after reasonable notice, unlist your apps.</li>
            <li><strong>Program suspension and termination.</strong> We may suspend or terminate your participation in the developer program for breach of this Agreement, fraud or abuse, legal risk, or as described in Sections 9 and 11. On suspension or termination, your listings are unlisted, and any earned balance is handled as described in Sections 7 and 11.</li>
          </ul>

          <h2>3. Submission and Review</h2>
          <p>Nothing appears on the Marketplace without review. You submit each app, and each release, for our approval:</p>
          <ul>
            <li><strong>Every release is re-reviewed.</strong> Initial submissions and every subsequent release or update go through review before they ship. An approved release is the only version users can install.</li>
            <li><strong>Automated and human review.</strong> Review includes automated scans (source, manifest, permissions, sandboxed behavior, and content) and human review. We may request changes, additional information, or access needed to complete review.</li>
            <li><strong>Approval is a status, not a promise.</strong> We may approve, reject, or revoke approval of any release at our discretion. Approval is not a warranty, endorsement, or certification of your app, and does not shift any responsibility for your app to us.</li>
          </ul>

          <h2>4. Prohibited Apps and Conduct</h2>
          <p>You must not submit or maintain apps that:</p>
          <ul>
            <li>Contain malware, spyware, or hidden functionality, or that collect data beyond what the app discloses</li>
            <li>Are deceptive about what they do, who made them, or what they cost</li>
            <li>Circumvent, probe, or interfere with the Service&apos;s security, metering, review, or sandboxing</li>
            <li>Infringe any third party&apos;s intellectual property, privacy, or other rights</li>
            <li>Violate applicable law, the <a href="/terms">Terms of Use</a> (including its acceptable-use rules), or the <a href="/code-of-conduct">Code of Conduct</a></li>
          </ul>
          <p>You must not manipulate the Marketplace itself: no fake installs, fake or incentivized reviews, rating manipulation, or interference with other developers&apos; listings.</p>

          <h2>5. Support Is Your Obligation</h2>
          <p>You — not Glyphh — are responsible for supporting your apps. This includes responding to user questions, fixing defects, and maintaining compatibility. Your listing must include a working support contact, and the listing&apos;s &ldquo;Support&rdquo; link points to you. We do not provide support for your apps, and persistent failure to support your apps is grounds for suspension or removal.</p>

          <h2>6. Execution Environment and Data Handling</h2>
          <p>Marketplace apps are not hosted by you — or by us as a separate service on your behalf. Every listed app is a sandboxed bundle that executes inside the installing user&apos;s own Glyphh environment: on the installing organization&apos;s chosen models and against that organization&apos;s data plane. You host nothing, and that defines what you are — and are not — responsible for:</p>
          <ul>
            <li><strong>The capability sandbox is the boundary.</strong> Your app declares the capabilities it needs in its manifest (for example, its app database, drive and media tooling, model calls, or connections), and at runtime it receives access only to what it declares. The approved bundle is exactly what runs; there is no server-side component of yours to change after review.</li>
            <li><strong>No data exfiltration.</strong> Your app must not transmit, copy, or otherwise move tenant or user data outside the installing organization&apos;s environment beyond what its declared capabilities expressly permit, and must not collect data covertly or include hidden functionality to that end. Exfiltrating data beyond declared capabilities is a fundamental breach of this Agreement: it results in immediate removal of your apps from the Marketplace and termination of your participation in the developer program, in addition to any other remedies available to us.</li>
            <li><strong>You do not receive user data.</strong> Data users create or process in your app stays in their organization&apos;s environment. You receive only the aggregate statistics we provide (for example, install counts and usage totals) — never tenant content, individual user activity, or personal information beyond what your declared capabilities expressly permit.</li>
            <li><strong>No hosting obligations.</strong> Because your apps run on the platform we operate, you have no hosting, uptime, or infrastructure obligations for listed apps. You also must not point a listing at infrastructure you host: externally hosted or self-hosted apps are not eligible for Marketplace listing.</li>
          </ul>

          <h2>7. Pricing, Revenue Share, and Payouts</h2>
          <p>You set the price of your app in credits: a monthly credit subscription, optionally with discount windows or a free tier. Glyphh is the merchant for Marketplace credit subscriptions — we charge the subscribing organization&apos;s credit balance and account to you as follows:</p>
          <ul>
            <li><strong>Earned-credits ledger.</strong> When a user pays your app&apos;s subscription price, your share — the price less the Marketplace&apos;s store cut — accrues to your developer account as earned credits in a payout ledger. The store cut is a percentage set by the Marketplace; we may change it prospectively with reasonable notice.</li>
            <li><strong>Monthly payouts via Stripe Connect.</strong> We pay out accrued earned credits monthly through Stripe Connect, subject to: (a) your balance meeting the payout threshold we disclose; (b) a valid, current payout configuration (a connected Stripe account in good standing); and (c) your compliance with applicable tax requirements, including any tax forms and information we or Stripe require. Balances below the threshold, or held while your payout configuration or tax information is incomplete, roll forward to the next payout.</li>
            <li><strong>Earned is not purchased.</strong> Purchased and granted credits are a limited license to use the Service — they are not money, have no cash value, and are never redeemable for cash, by you or by anyone else. Earned credits are different in exactly one respect: they are the accounting denomination of Marketplace revenue owed to you, payable solely through the payout program described in this Section. Earned credits cannot be spent as service credits, transferred, or redeemed in any way other than a payout under this Section.</li>
            <li><strong>Suspension during investigation.</strong> We may withhold or suspend payouts while we investigate suspected fraud, abuse, or breach of this Agreement, and we may offset amounts you owe us — including reversals and chargebacks of the underlying subscriptions — against your earned balance. Earnings attributable to fraudulent or manipulated activity are forfeited.</li>
            <li><strong>Adjustments.</strong> Payout timing, thresholds, and mechanics may change prospectively; we will provide reasonable notice of material changes.</li>
          </ul>

          <h2>8. Intellectual Property and License to Distribute</h2>
          <p>You retain ownership of your apps. You represent and warrant that you own or have all rights necessary to publish your app and everything in it (code, content, media, marks), and that your app does not infringe any third party&apos;s rights. You grant us a worldwide, non-exclusive, royalty-free license to host, reproduce, review, scan, distribute, display, and promote your app and its listing materials as needed to operate the Marketplace, for as long as your app is listed and as needed to serve existing installs thereafter.</p>

          <h2>9. Takedown and Suspension</h2>
          <p>We may suspend or remove any app, release, or listing at any time, with or without notice, including for policy violations, credible reports of malicious behavior, legal claims, or security risk. Reports of malicious apps are triaged seriously and suspension may be immediate while we investigate. Where practical, we will notify you of the reason and any path to reinstatement, but we are not obligated to reinstate any app.</p>

          <h2>10. Indemnification</h2>
          <p>You will defend, indemnify, and hold harmless Glyphh AI LLC and its officers, employees, and agents from and against any claims, damages, liabilities, and expenses (including reasonable legal fees) arising out of or related to your apps, your listing content, your breach of this Agreement, or your violation of any law or third-party right.</p>

          <h2>11. Termination</h2>
          <p>Either party may terminate this Agreement at any time; you terminate by unpublishing your apps and closing your developer profile, and we may terminate by notice to you. We may also terminate immediately for breach. Upon termination your listings are unlisted and your developer-program participation ends; we may continue serving previously installed releases to existing users for a reasonable wind-down period. Any earned balance remaining at termination is paid out on the normal payout schedule under Section 7, subject to its thresholds, payout-configuration and tax requirements, and its suspension, offset, and forfeiture provisions — where termination results from your fraud or material breach, Section 7 governs what, if anything, is payable. Sections 6, 7 (as to accrued earnings), 8 (to the extent needed for wind-down), 9, and 10 survive termination.</p>

          <h2>12. Contact</h2>
          <p>For questions about this Agreement, contact us at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
