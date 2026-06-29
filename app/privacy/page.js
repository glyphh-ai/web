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

          <p><strong>Effective Date:</strong> June 29, 2026</p>
          <p>This Privacy Policy describes how Glyphh AI LLC (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, and protects your information when you use Glyphh (the &ldquo;Service&rdquo;), including the desktop application, the hosted platform, and our managed access to third-party AI models.</p>

          <h2>1. Information We Collect</h2>
          <p><strong>Account Information:</strong> When you register or subscribe, we collect your email address, name, organization name (if provided), and an encrypted (hashed) password. Payment information is processed by Stripe; we do not store your full payment card details.</p>
          <p><strong>Billing and Usage Metadata:</strong> When you use the managed (proxied) Glyphh agent, we record metadata about each request — the model used, token counts (input, output, and cache), the credits charged, a request identifier, status, and a timestamp — so we can meter credits, show your usage, and prevent abuse. This metadata does not include the content of your prompts or the models&apos; responses.</p>
          <p><strong>Usage Data:</strong> We may collect anonymized, aggregated product analytics (e.g., feature usage, error reports) to improve the Service.</p>
          <p><strong>Device Information:</strong> For activation and validation, we may generate a machine fingerprint (a one-way hash of hardware identifiers). This hash cannot be used to identify your specific hardware.</p>

          <h2>2. AI Requests and the Glyphh Proxy</h2>
          <p><strong>Managed (proxied) requests.</strong> When you use the included Glyphh agent, the prompts, messages, and any files or context you include are transmitted from your device through our servers to Anthropic in order to generate a response, using our credentials. We process this content transiently to route and meter the request. <strong>We do not retain or store the content of your prompts or the models&apos; responses</strong> — only the billing and usage metadata described in Section 1.</p>
          <p><strong>Anthropic&apos;s handling.</strong> Anthropic processes these requests under its commercial terms. Under those terms, Anthropic does not use inputs or outputs submitted through its API to train its models, and applies only limited retention for trust-and-safety purposes. Your use is also subject to Anthropic&apos;s policies, as described in our <a href="/terms">Terms of Use</a>.</p>
          <p><strong>Bring-your-own-key (BYOK) requests.</strong> When you configure your own provider API key for other agents, those requests are sent directly from your machine to the provider under your own account. We do not proxy, intercept, see, or store the content of those requests, and your use is governed by that provider&apos;s privacy policy.</p>

          <h2>3. Information We Do Not Collect</h2>
          <ul>
            <li>We do not store the content of your AI prompts or the models&apos; responses</li>
            <li>We do not collect API keys you supply for your own agents (these are stored locally on your machine)</li>
            <li>We do not collect your locally captured context, library items, or skills, except where you enable Cloud Sync (see Section 4)</li>
            <li>We do not track your browsing activity within the Service&apos;s embedded panels</li>
            <li>We do not sell your personal information, or share it with third parties for advertising</li>
          </ul>

          <h2>4. Local-First Architecture and Cloud Sync</h2>
          <p>Glyphh stores your library data — including captured context, skills, layouts, and preferences — locally on your machine in the <code>~/yo/</code> directory. Managed AI requests are the exception: they are transmitted through our servers as described in Section 2. If you enable Cloud Sync, your library data is encrypted and synced to our servers; you can disable Cloud Sync at any time and request deletion of cloud-stored data.</p>

          <h2>5. How We Use Information</h2>
          <ul>
            <li>To provide, maintain, and improve the Service</li>
            <li>To route managed AI requests and meter credit usage</li>
            <li>To process payments and manage your subscription and credit balance</li>
            <li>To detect, prevent, and respond to abuse, fraud, and policy violations</li>
            <li>To communicate with you about the Service (updates, security alerts)</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>6. Third-Party Services</h2>
          <p>We rely on Anthropic to provide the AI models behind the managed Glyphh agent; managed requests are processed as described in Section 2. We use Stripe for payment processing; Stripe&apos;s handling of your payment information is governed by <a href="https://stripe.com/privacy">Stripe&apos;s Privacy Policy</a>. Where you use BYOK agents, the applicable provider&apos;s privacy policy governs those requests.</p>

          <h2>7. Data Security</h2>
          <p>We implement industry-standard security measures, including encryption in transit (TLS) and at rest. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>

          <h2>8. Data Retention</h2>
          <p>We retain account, billing, and usage-metadata records for the duration of your account plus a reasonable period thereafter, and as required by law (for example, payment records). We do not retain the content of managed AI requests beyond what is necessary to transmit them. You may request deletion of your account data at any time by contacting us.</p>

          <h2>9. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Data portability</li>
          </ul>
          <p>To exercise these rights, contact us at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>

          <h2>10. Children&apos;s Privacy</h2>
          <p>The Service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.</p>

          <h2>11. International Transfers</h2>
          <p>If you are accessing the Service from outside the United States, your information may be transferred to and processed in the United States and in the locations where our providers operate. By using the Service, you consent to such transfer.</p>

          <h2>12. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of material changes through the application or via email. Continued use of the Service after changes constitutes acceptance.</p>

          <h2>13. Contact</h2>
          <p>For privacy-related questions or requests, contact us at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
