import Footer from '../components/Footer';

export const metadata = {
  title: 'Privacy Policy — Glyphh',
  description: 'Privacy Policy for the Glyphh desktop application by Glyphh AI LLC.',
};

export default function PrivacyPage() {
  return (
    <>
      <div className="policy-page">
        <div className="container">
          <a href="/" className="policy-back">&larr; Back</a>
          <h1 className="policy-title">Privacy Policy</h1>

          <p><strong>Effective Date:</strong> January 1, 2026</p>
          <p>This Privacy Policy describes how Glyphh AI LLC (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, and protects your information when you use Glyphh (&ldquo;Service&rdquo;).</p>

          <h2>1. Information We Collect</h2>
          <p><strong>Account Information:</strong> When you register or purchase a license, we collect your email address, license key, and payment information (processed by Stripe). We do not store your full payment card details.</p>
          <p><strong>Usage Data:</strong> We may collect anonymized, aggregated data about how the Service is used (e.g., feature usage, error reports) to improve the product. This data cannot be used to identify you personally.</p>
          <p><strong>Device Information:</strong> For license activation and validation, we generate a machine fingerprint (a one-way hash of hardware identifiers). This hash cannot be used to identify your specific hardware.</p>

          <h2>2. Information We Do NOT Collect</h2>
          <ul>
            <li>We do not collect, transmit, or store the content of your AI conversations</li>
            <li>We do not collect your API keys (these are stored locally on your machine)</li>
            <li>We do not collect your captured context, library items, or skills</li>
            <li>We do not track your browsing activity within the Service&apos;s embedded panels</li>
            <li>We do not sell or share your personal information with third parties for advertising</li>
          </ul>

          <h2>3. Local-First Architecture</h2>
          <p>Glyphh is designed with a local-first architecture. Your data &mdash; including captured context, skills, layouts, preferences, and API keys &mdash; is stored exclusively on your local machine in the <code>~/yo/</code> directory. If you enable Cloud Sync (Basic or Advanced plan), your library data is encrypted and synced to our servers. You can disable Cloud Sync at any time, and request deletion of cloud-stored data.</p>

          <h2>4. How We Use Information</h2>
          <ul>
            <li>To provide, maintain, and improve the Service</li>
            <li>To process payments and manage your subscription</li>
            <li>To validate your license and prevent unauthorized use</li>
            <li>To communicate with you about the Service (updates, security alerts)</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>5. Third-Party Services</h2>
          <p>When you use Glyphh with third-party AI providers (Anthropic, OpenAI, Google AI, etc.), your prompts and data are sent directly from your machine to those providers using your own API keys. We do not proxy, intercept, or store this data. Please review the privacy policies of those providers.</p>
          <p>We use Stripe for payment processing. Stripe&apos;s handling of your payment information is governed by <a href="https://stripe.com/privacy">Stripe&apos;s Privacy Policy</a>.</p>

          <h2>6. Data Security</h2>
          <p>We implement industry-standard security measures to protect the information we collect, including encryption in transit (TLS) and at rest. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>

          <h2>7. Data Retention</h2>
          <p>We retain account and license information for the duration of your subscription plus 90 days. Payment records are retained as required by law. You may request deletion of your account data at any time by contacting us.</p>

          <h2>8. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Data portability</li>
          </ul>
          <p>To exercise these rights, contact us at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>

          <h2>9. Children&apos;s Privacy</h2>
          <p>The Service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.</p>

          <h2>10. International Transfers</h2>
          <p>If you are accessing the Service from outside the United States, your information may be transferred to and processed in the United States. By using the Service, you consent to such transfer.</p>

          <h2>11. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of material changes through the application or via email. Continued use of the Service after changes constitutes acceptance.</p>

          <h2>12. Contact</h2>
          <p>For privacy-related questions or requests, contact us at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
