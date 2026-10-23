// Rewritten 2026-10-22 for Ada Cloud (server docs/specs/ada-cloud.md section 8, docs/architecture.md, src/glyphh_ada);
// counsel to review. Backup window: Fly Managed Postgres keeps backups ten days (fly.io/mpg, read 2026-10-22).
import Footer from '../components/Footer';

export const metadata = {
  title: 'Privacy Policy — Glyphh',
  description: 'What Glyphh AI LLC holds to run Ada Cloud, why, where and for how long. Glyphh never uses customer data to train models and never sells it.',
};

export default function PrivacyPage() {
  return (
    <>
      <div className="policy-page">
        <div className="container">
          <a href="/" className="policy-back">&larr; Back</a>
          <h1 className="policy-title">Privacy Policy</h1>

          <div className="policy-note">
            <p>This is a plain-English summary of how Glyphh works today; it will be reviewed by counsel before general availability.</p>
          </div>

          <p><strong>Effective Date:</strong> July 3, 2026</p>
          <p><strong>Last updated 22 October 2026</strong></p>
          <p>This policy explains what Glyphh AI LLC (&ldquo;Glyphh&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) holds when you use Glyphh: the platform at platform.glyphh.ai, the Ada API at ada.glyphh.ai, the account API and Claude connector at api.glyphh.ai, the Glyphh plugin, the SDKs, and the website glyphh.ai. Use of Glyphh is governed by our <a href="/terms">Terms of Use</a>.</p>

          <h2>In short</h2>
          <ul>
            <li><strong>Glyphh never uses your data to train models</strong>, ours or anyone else&apos;s. Your models learn only from your own precedents.</li>
            <li><strong>We never sell your data</strong>, and we never share it except with the subprocessors listed below, only as needed to run the service.</li>
            <li><strong>Ada sends your data to no language model.</strong> It compares cases; it does not call an LLM.</li>
            <li><strong>Your data is yours.</strong> Export it at any time; delete it at any time.</li>
          </ul>

          <h2>1. What We Hold, and Why</h2>
          <p><strong>Your account and organisation.</strong> When you sign in with Google or GitHub we receive your email address, your name and your account id at that provider. We keep your organisation, its members and their roles, the email addresses of people you invite, and the Claude Code installs and connector grants you have signed in. Why: to sign you in and know which organisation a request acts for.</p>
          <p><strong>API keys.</strong> We keep each key&apos;s name, clearance, expiry, when it was last used, and a SHA-256 hash of the key. The key itself is shown to you once and never stored. Why: to check a key on each request and let you revoke it.</p>
          <p><strong>Your models.</strong> Each model&apos;s spec and every version of it, with who made each version and the note given, and what the model has learned (its weights and calibration). Why: a model is its spec and what it learned.</p>
          <p><strong>Your precedents.</strong> The cases you record or import, with their outcomes, times and ids. Ada stores each case as it reads it (for example, a number&apos;s range or a text&apos;s words) together with an encoded form of it. Why: Ada answers from them.</p>
          <p><strong>Jobs, imports and exports.</strong> Each job&apos;s kind, state and result. A file you upload for import is kept only until its import ends; an export&apos;s file only while its one-hour download link works. Why: to run long work in the background and give you the result.</p>
          <p><strong>Requests and usage.</strong> For each write, a record of the request and its answer so a retried write is applied only once. Counts of reads per organisation per month, and calls per second. Why: to meter your plan, enforce its limits and bill reads past the allowance.</p>
          <p><strong>Billing.</strong> Payments are processed by Stripe. We keep your Stripe customer and subscription ids, your plan and its status, and the counts of reads we report to Stripe. We never receive your full card number.</p>
          <p><strong>Logs.</strong> Our service logs record operational facts: which operation, which organisation and model, the status, timing and size. They are not designed to record the contents of your cases or Ada&apos;s answers. Why: to run, secure and fix the service.</p>
          <p><strong>The website.</strong> glyphh.ai uses Google Analytics to understand how the site is used, and a Reddit advertising pixel to measure our ads. If you arrive through a tagged link, a first-party cookie keeps the link&apos;s campaign tags for 90 days, and they are stored with your account if you sign up.</p>

          <h2>2. How We Use It</h2>
          <ul>
            <li>To run the service for you: sign-in, your organisation, your models, answering your requests, imports, exports, learning and backtests</li>
            <li>To meter use against your plan and bill for it</li>
            <li>To keep the service secure and to detect and stop abuse</li>
            <li>To support you when you ask</li>
            <li>To tell you about the service (security notices, billing, material changes)</li>
            <li>To understand and improve the website and our marketing (website data only)</li>
            <li>To meet legal obligations</li>
          </ul>
          <p>We do not use your models, specs or precedents for anything else. <strong>We never use them to train machine-learning or AI models</strong>, never use what one customer&apos;s model learned for another customer, and never sell them. The only shared resources are fixed public word lists (WordNet 3.0 and Moby), which Ada reads but never changes.</p>

          <h2>3. No Language Model in the Path</h2>
          <p>Ada Cloud runs Glyphh&apos;s own Ada engine and nothing else: it encodes and compares cases and votes from the nearest precedents. It does not send your data to any language model or AI provider. If your own application, or Claude through the connector, chooses to call a language model with Ada&apos;s answers, that is your choice and under your agreement with that provider.</p>

          <h2>4. Isolation and Security</h2>
          <ul>
            <li><strong>Isolation per organisation.</strong> Each organisation&apos;s Ada data lives in its own database schema. Every table in it enforces row-level security that fails closed: a database session not set to your organisation sees none of your rows. The organisation a request acts for comes from its key or sign-in, never from the request body. No customer code runs in the service.</li>
            <li><strong>In transit.</strong> The platform, the API and the connector are served over HTTPS only. The database is encrypted in transit by our hosting provider, and our internal traffic runs on its private network.</li>
            <li><strong>At rest.</strong> The database and its backups are encrypted at rest by our hosting provider (Fly.io Managed Postgres). Requests in flight pass through a queue that holds them for seconds, and answers for at most 60 seconds.</li>
            <li><strong>Keys and links.</strong> API keys are stored only as hashes. Upload and download links are signed, single-purpose and expire after one hour.</li>
            <li><strong>Staff access.</strong> Glyphh staff can see account, billing and usage metadata (names, emails, plans, counts and times) to run and support the service. Staff cannot see your precedents, specs, case contents or uploaded files, and every staff access is logged.</li>
          </ul>
          <p>No system is perfectly secure. If we learn of a breach affecting your data, we will tell you without undue delay and as the law requires. Report security issues to <a href="mailto:security@glyphh.ai">security@glyphh.ai</a>.</p>

          <h2>5. Where Your Data Is</h2>
          <p>Ada Cloud runs in the United States, in Fly.io&apos;s Ashburn, Virginia region (<code>iad</code>). If you use Glyphh from outside the United States, your data is transferred to and processed there, and where our subprocessors operate.</p>

          <h2>6. Retention, Deletion and Export</h2>
          <ul>
            <li><strong>Export at any time.</strong> On every plan, any model can be exported as a zip of JSON Lines (its precedents, every spec version and what it learned) or as an Ada SQLite store, from the platform, the API, the SDKs or Claude.</li>
            <li><strong>Deleting a precedent</strong> removes it and its outcomes from the live store at once. What the model learned from it fades at the next learning run.</li>
            <li><strong>Deleting a model</strong> removes its precedents, versions, learned weights, jobs and files from the live store at once, in one transaction. A record that a model of that name existed and was deleted is kept.</li>
            <li><strong>Closing an organisation</strong> (ask us at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>) removes its whole Ada schema from the live store at once.</li>
            <li><strong>Backups.</strong> Deleted data stays in the database&apos;s backups until they age out: within our backup window, at most 10 days.</li>
            <li><strong>Old versions.</strong> When a settings change re-encodes a model, the previous store is kept for 7 days for rollback, then dropped.</li>
            <li><strong>Everything else</strong> (account, organisation and billing records) is kept while your account exists and for a reasonable time after, and as the law requires (for example, payment records).</li>
          </ul>

          <h2>7. Subprocessors</h2>
          <p>We use these providers to run Glyphh. Each processes data only as needed to provide its service to us:</p>
          <ul>
            <li><strong>Fly.io</strong> (United States): hosts the platform, the API, the Ada service, its database (Fly Managed Postgres) and its queue. Holds all Customer Data.</li>
            <li><strong>Stripe</strong>: payments, subscriptions and metered billing. Receives billing details and read counts, never your models or precedents (<a href="https://stripe.com/privacy">Stripe&apos;s Privacy Policy</a>).</li>
            <li><strong>Cloudflare</strong>: DNS for our domains.</li>
            <li><strong>Google</strong>: sign-in, and analytics on the website.</li>
            <li><strong>GitHub</strong>: sign-in.</li>
            <li><strong>Reddit</strong>: measuring our ads on the website only.</li>
          </ul>
          <p>We do not use a third-party email provider for the service today. We will update this list before adding a subprocessor that receives Customer Data.</p>

          <h2>8. Your Rights</h2>
          <p>Depending on where you live, you may have the right to access, correct, delete, restrict or object to the processing of your personal data, and to receive it in a portable form. Your models can be exported at any time (section 6). For anything else, contact <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>

          <h2>9. Children</h2>
          <p>Glyphh is not intended for children under 13, and we do not knowingly collect their personal information. If we learn that we have, we will delete it.</p>

          <h2>10. Changes to This Policy</h2>
          <p>We may update this policy. We will tell you about material changes on the platform or by email before they take effect.</p>

          <h2>11. Contact</h2>
          <p>Privacy questions and requests: <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>. Security: <a href="mailto:security@glyphh.ai">security@glyphh.ai</a>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
