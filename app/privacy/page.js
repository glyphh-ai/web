import Footer from '../components/Footer';

export const metadata = {
  title: 'Privacy Policy — Glyphh',
  description: 'Privacy Policy for the Glyphh desktop application and hosted services by Glyphh AI LLC.',
};

export default function PrivacyPage() {
  return (
    <>
      <div className="policy-page">
        <div className="container">
          <a href="/" className="policy-back">&larr; Back</a>
          <h1 className="policy-title">Privacy Policy</h1>

          <p><strong>Effective Date:</strong> July 3, 2026</p>
          <p><strong>Last Updated:</strong> August 17, 2026</p>
          <p>This Privacy Policy describes how Glyphh AI LLC (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, and protects your information when you use Glyphh (the &ldquo;Service&rdquo;), including the desktop application, the hosted platform, the Glyphh relay that connects your own AI tools to your workspace, and the Glyphh Marketplace. Use of the Service is governed by our <a href="/terms">Terms of Use</a>; the Marketplace is additionally governed by our <a href="/marketplace-terms">Marketplace Terms</a>, <a href="/code-of-conduct">Code of Conduct</a>, and, for developers, the <a href="/developer-agreement">Developer Agreement</a>.</p>

          <h2>1. Information We Collect</h2>
          <p><strong>Account Information:</strong> When you register or subscribe, we collect your email address, name, organization name (if provided), and an encrypted (hashed) password. Payment information is processed by Stripe; we do not store your full payment card details.</p>
          <p><strong>Billing and Usage Metadata:</strong> When the Service performs a billable operation for you — driving your workspace, controlling windows, or executing a tool or integration call — we record metadata about that operation so we can meter credits, show your usage, and prevent abuse: the operation performed, the app or tool involved, whether it ran on your machine or through an integration, its measured duration, the credits charged, a request identifier, status, and a timestamp. This metadata does not include the content of your AI prompts or the models&apos; responses.</p>
          <p><strong>Usage Data:</strong> We may collect anonymized, aggregated product analytics (e.g., feature usage, error reports) to improve the Service.</p>
          <p><strong>Device Information:</strong> For activation and validation, we may generate a machine fingerprint (a one-way hash of hardware identifiers). This hash cannot be used to identify your specific hardware.</p>

          <h2>2. AI Tools and the Glyphh Relay</h2>
          <p><strong>Your AI runs under your own account.</strong> Glyphh does not resell, proxy, or run AI models. You connect AI clients you already license (for example, Claude, ChatGPT, or Gemini) to the Service, and all model inference happens between you and that provider under your own account and its privacy policy. Your prompts and the models&apos; responses are not routed through us for the purpose of inference, and we do not retain or store them.</p>
          <p><strong>What the relay carries.</strong> When a connected AI client asks the Service to perform an action — open an app, arrange your windows, run a skill, or call a connected service — that request and its result pass through the relay so we can deliver it to your workspace. We process this transiently to route the request and screen it for abuse (an injection firewall), and we retain only the usage metadata described in Section 1, not the content of the underlying work. You may also run the Service&apos;s local server mode, in which these requests never leave your machine.</p>
          <p><strong>Provider API keys.</strong> Where a feature calls a model directly, you may supply your own provider API key. If you store a key with us, it is encrypted at rest and used only to make requests you initiate to that provider; we never use it for our own purposes and never expose it back to any connected client.</p>

          <h2>3. Information We Do Not Collect</h2>
          <ul>
            <li>We do not store the content of your AI prompts or the models&apos; responses</li>
            <li>We do not resell or proxy AI model access, and we do not see your model usage with your provider</li>
            <li>We do not collect the content of the work your AI performs through the relay — only the usage metadata in Section 1</li>
            <li>We do not track your browsing activity within the Service&apos;s embedded panels</li>
            <li>We do not sell your personal information, or share it with third parties for advertising</li>
          </ul>

          <h2>4. Data Storage and Cloud Sync</h2>
          <p>Your workspace library — apps, layouts, skills, and preferences — is stored in your organization&apos;s account so it can sync across your machines; sign in anywhere and it travels with you. Provider API keys you choose to store are encrypted at rest. Connections to third-party services are held by our integration partner (see Section 6) so your AI can act on them; you can disconnect any service at any time.</p>

          <h2>5. How We Use Information</h2>
          <ul>
            <li>To provide, maintain, and improve the Service</li>
            <li>To route relayed requests to your workspace and meter credit usage</li>
            <li>To process payments and manage your subscription and credit balance</li>
            <li>To detect, prevent, and respond to abuse, fraud, and policy violations</li>
            <li>To communicate with you about the Service (updates, security alerts)</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>6. Third-Party Services</h2>
          <p>We use an integration partner (Pipedream) to connect third-party applications so your AI tools can act on them; connecting an app authorizes that partner to hold the resulting access on your behalf, subject to its privacy policy. We use Stripe for payment processing; Stripe&apos;s handling of your payment information is governed by <a href="https://stripe.com/privacy">Stripe&apos;s Privacy Policy</a>. AI model providers you connect process your prompts under their own privacy policies, not ours.</p>

          <h2>7. Marketplace Data</h2>
          <p><strong>Developer profiles are public by choice.</strong> If you create a developer profile on the Glyphh Marketplace, the information you put on it — handle, name, avatar, bio, links, and support contact — is published publicly with your listings. Publishing a profile is optional; do not include information you do not want public.</p>
          <p><strong>Reviews, ratings, and comments are public and attributed.</strong> Ratings, reviews, and comments you post on apps or developers are displayed publicly and attributed to your account or organization. They remain visible until you edit or delete them or we remove them under our <a href="/code-of-conduct">Code of Conduct</a>.</p>
          <p><strong>Usage data shared with developers in aggregate only.</strong> We share app-usage and install data with an app&apos;s developer only in aggregate form (for example, install counts and usage totals). We do not share your identity, your individual activity within an app, or your personal information with developers unless you provide it to them yourself.</p>
          <p><strong>Reports.</strong> If you report an app, developer, review, or comment, we retain the report and related records for trust and safety purposes — to triage the report, enforce our policies, and maintain an audit trail — for as long as reasonably necessary for those purposes.</p>

          <h2>8. Data Security</h2>
          <p>We implement industry-standard security measures, including encryption in transit (TLS) and at rest. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>

          <h2>9. Data Retention</h2>
          <p>We retain account, billing, and usage-metadata records for the duration of your account plus a reasonable period thereafter, and as required by law (for example, payment records). We do not retain the content of relayed requests beyond what is necessary to route them to your workspace. You may request deletion of your account data at any time by contacting us.</p>

          <h2>10. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Data portability</li>
          </ul>
          <p>To exercise these rights, contact us at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>

          <h2>11. Children&apos;s Privacy</h2>
          <p>The Service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.</p>

          <h2>12. International Transfers</h2>
          <p>If you are accessing the Service from outside the United States, your information may be transferred to and processed in the United States and in the locations where our providers operate. By using the Service, you consent to such transfer.</p>

          <h2>13. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of material changes through the application or via email. Continued use of the Service after changes constitutes acceptance.</p>

          <h2>14. Contact</h2>
          <p>For privacy-related questions or requests, contact us at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
