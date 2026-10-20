// Rewritten 2026-10-20 to match the product; counsel to review.
import Footer from '../components/Footer';

export const metadata = {
  title: 'Privacy Policy — Glyphh',
  description: 'What Glyphh AI LLC collects, and what it never sees: your models, their inputs and their results stay in the runtime you run.',
};

export default function PrivacyPage() {
  return (
    <>
      <div className="policy-page">
        <div className="container">
          <a href="/" className="policy-back">&larr; Back</a>
          <h1 className="policy-title">Privacy Policy</h1>

          <p><strong>Effective Date:</strong> July 3, 2026</p>
          <p><strong>Last Updated:</strong> October 20, 2026</p>
          <p>This Privacy Policy describes how Glyphh AI LLC (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses and protects information when you use Glyphh: the platform at platform.glyphh.ai, the API at api.glyphh.ai, the website glyphh.ai, and the software you run yourself (the rrotor runtime and the Glyphh plugin for Claude Code). Use of Glyphh is governed by our <a href="/terms">Terms of Use</a>.</p>
          <p><strong>In short:</strong> you run Ada in your own runtime, on infrastructure you control. Calls to your models go straight to it. We see your account, your plan and your licence keys, and a little about each runtime node that links to us; never a model&apos;s inputs or results, and never the addresses of the people or software calling your runtime.</p>

          <h2>1. Information We Collect</h2>
          <p><strong>Account and organisation.</strong> When you sign in with Google or GitHub, we receive your email address, your name and your account identifier at that provider. We keep your organisation, its members and their roles, and the email addresses of people you invite.</p>
          <p><strong>Billing.</strong> Payments are processed by Stripe. We keep your Stripe customer and subscription identifiers, your plan and its status. We do not receive or store your full payment card details.</p>
          <p><strong>Licence keys.</strong> We keep the licence keys we issue to your organisation, their terms (plan, limits and dates) and whether they are live or revoked.</p>
          <p><strong>Runtime nodes.</strong> For each runtime you register, we keep the name and address you give it. When a node links to us or sends its daily heartbeat, we keep: a node identifier, its cluster identifier and role, the software version, its precedent count, the number of runs in progress, a one-way hash of its machine identifier, and when it last checked in. Through the link we also keep, so the platform can show them: the models deployed to it (their names, repositories, commits and versions), a record of each run&apos;s status and duration, and, for each runtime key, a one-way hash of the key, how many calls it made and when it was last used.</p>
          <p><strong>Plugin installs.</strong> When you sign in from the Glyphh plugin, we record that install (its name and when it signed in) so you can see and sign it out.</p>
          <p><strong>Server-side logs, if you turn them on.</strong> Off by default. If you turn on server-side logging, your runtime sends us its log records, metrics, traces and audit events so the platform can show them. We keep them for seven (7) days and then delete them. They do not include a model&apos;s inputs or results.</p>
          <p><strong>The website.</strong> glyphh.ai uses Google Analytics to understand how the site is used, and a Reddit advertising pixel to measure our ads. If you arrive through a tagged link, a first-party cookie keeps the link&apos;s campaign tags for 90 days, and they are stored with your account if you sign up.</p>

          <h2>2. What We Never Receive</h2>
          <ul>
            <li>The inputs you send to your models, or their results</li>
            <li>Your cases and precedents, and the code of your models, which stay in your runtime and your own repositories</li>
            <li>The IP addresses of the people or software calling your runtime; we do not keep the address a heartbeat comes from</li>
            <li>Your runtime keys themselves, only their one-way hashes</li>
          </ul>
          <p>We do not sell your personal information or share it with third parties for their advertising.</p>

          <h2>3. How We Use Information</h2>
          <ul>
            <li>To provide the Service: sign-in, your organisation, the platform, and your runtimes&apos; links</li>
            <li>To issue, deliver and revoke licence keys, and to count runtime nodes and precedents against your plan</li>
            <li>To process payments and manage your subscription</li>
            <li>To detect, prevent and respond to abuse, fraud and security incidents</li>
            <li>To communicate with you about the Service (updates, security notices, billing)</li>
            <li>To understand and improve the website and our marketing</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>4. Service Providers</h2>
          <p>We use the following providers to run Glyphh. Each processes information only as needed to provide its service to us:</p>
          <ul>
            <li><strong>Stripe</strong>: payments and subscriptions (<a href="https://stripe.com/privacy">Stripe&apos;s Privacy Policy</a>)</li>
            <li><strong>Fly.io</strong>: hosts our platform, API and website</li>
            <li><strong>Cloudflare</strong>: DNS and network services for our domains</li>
            <li><strong>Google</strong>: sign-in, and analytics on the website</li>
            <li><strong>GitHub</strong>: sign-in, and access to the repositories you choose to connect</li>
          </ul>

          <h2>5. Data Security</h2>
          <p>We use industry-standard measures, including encryption in transit (TLS) and at rest. Licence keys are signed so that a node can check them without contacting us. No method of transmission or storage is 100% secure, and we cannot guarantee absolute security. The security of your own runtimes is in your hands.</p>

          <h2>6. Data Retention</h2>
          <p>We keep account, organisation, billing, licence and runtime records for as long as your account exists and for a reasonable period after, and as required by law (for example, payment records). Server-side logs are deleted after seven (7) days. You may ask us to delete your account at any time.</p>

          <h2>7. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Data portability</li>
          </ul>
          <p>To exercise these rights, contact us at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>

          <h2>8. Children&apos;s Privacy</h2>
          <p>Glyphh is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have, we will delete it.</p>

          <h2>9. International Transfers</h2>
          <p>If you use Glyphh from outside the United States, information we collect may be transferred to and processed in the United States and in the locations where our providers operate. By using Glyphh, you consent to such transfer.</p>

          <h2>10. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of material changes through the platform or by email. Continued use of Glyphh after changes constitutes acceptance.</p>

          <h2>11. Contact</h2>
          <p>For privacy questions or requests, contact us at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
