// Rewritten 2026-10-20 to match the product; counsel to review.
import Footer from '../components/Footer';

export const metadata = {
  title: 'Terms of Use — Glyphh',
  description: 'Terms of Use for Glyphh: the platform, the rrotor runtime you run yourself, the Glyphh plugin and the SDKs, by Glyphh AI LLC.',
};

export default function TermsPage() {
  return (
    <>
      <div className="policy-page">
        <div className="container">
          <a href="/" className="policy-back">&larr; Back</a>
          <h1 className="policy-title">Terms of Use</h1>

          <p><strong>Effective Date:</strong> July 3, 2026</p>
          <p><strong>Last Updated:</strong> October 20, 2026</p>
          <p>These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of Glyphh, provided by Glyphh AI LLC (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). Glyphh consists of (a) the hosted platform at platform.glyphh.ai and the API at api.glyphh.ai, which hold your account, your plan and your licence keys (the &ldquo;Service&rdquo;); and (b) software you install and run yourself: the rrotor runtime, in which Ada runs, and the Glyphh plugin for Claude Code (the &ldquo;Software&rdquo;). The SDKs are open source and governed by their own licence (Section 4.3). By creating an account, installing or running the Software, or otherwise using Glyphh, you agree to these Terms. If you accept them for an organisation, you confirm you may bind it. Data handling is described in our <a href="/privacy">Privacy Policy</a>. If you have a signed agreement with us (for example, an Enterprise order form), that agreement governs where it conflicts with these Terms.</p>

          <h2>1. Eligibility</h2>
          <p>You must be at least 13 years old to use Glyphh. If you are under 18, you represent that your parent or legal guardian has reviewed and agreed to these Terms on your behalf.</p>

          <h2>2. Accounts and Organisations</h2>
          <p>You sign in with a Google or GitHub account. Your account belongs to an organisation, which may have several members; plans are never priced per member. You are responsible for all activity under your account and your organisation, and for keeping confidential the runtime keys and licence keys issued to you. Tell us promptly at <a href="mailto:security@glyphh.ai">security@glyphh.ai</a> if you believe a key or your account has been compromised.</p>

          <h2>3. The Software You Run</h2>
          <p><strong>Licence to rrotor.</strong> Subject to these Terms and your payment of any applicable fees, we grant you a limited, non-exclusive, non-transferable, non-sublicensable, revocable licence to install and run the rrotor runtime on infrastructure you control, for your own internal business purposes, within the limits of your plan.</p>
          <p><strong>Plans and limits.</strong> Each plan sets the number of runtime nodes you may run, the number of precedents each node may hold, and whether nodes may synchronise, as published on our <a href="/pricing">pricing page</a> or in your order form. A node with no valid licence key runs at the limits of the Free plan.</p>
          <p><strong>Licence keys.</strong> For each paid month we issue a licence key, signed by us, which the runtime checks on the node itself. A key expires at the end of the month it was issued for, and a new key is issued when the next month is paid. If your subscription is cancelled or not paid, we revoke your licence and issue no further keys; your nodes return to the Free plan&apos;s limits once the current key and any grace period built into the Software have expired. Enterprise keys, including air-gapped keys, run for the term set in your order form.</p>
          <p><strong>You operate it.</strong> Glyphh does not host or operate your runtimes and has no access to them. You are responsible for the infrastructure the Software runs on, for its security, configuration, updates and backups, and for the models, cases and precedents you keep in it.</p>
          <p><strong>Restrictions.</strong> You may not, and may not allow anyone else to: (a) circumvent, disable or interfere with licence-key verification or plan limits; (b) copy, modify, or create derivative works of the Software, except as these Terms or its licence allow; (c) reverse engineer, decompile or disassemble the Software, except to the extent applicable law expressly permits despite this restriction; (d) sell, resell, sublicense, distribute or rent the Software, or provide it to third parties as a hosted or managed service, without our written agreement; or (e) remove any proprietary notices.</p>

          <h2>4. The Plugin and the SDKs</h2>
          <p><strong>4.1 The Glyphh plugin.</strong> The Glyphh plugin for Claude Code is provided by Glyphh. It is licensed to you for use under these Terms; you may not copy, modify, redistribute or resell it without our written permission.</p>
          <p><strong>4.2 Claude.</strong> The plugin runs inside Claude Code, and you may connect your runtime to Claude as a connector. Claude is provided by Anthropic under its own terms; we are not its provider, and your use of it is governed by your agreement with Anthropic.</p>
          <p><strong>4.3 The SDKs.</strong> The SDKs (<code>glyphh</code> on PyPI and <code>@glyphh-ai/glyphh</code> on npm) and the contract they share are open source under the MIT License, in the same repository. The MIT License, not Section 3, governs your use of them.</p>

          <h2>5. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use Glyphh to violate any applicable law or regulation, or the rights of others</li>
            <li>Attempt to gain unauthorised access to the Service, to other customers&apos; accounts, or to our systems</li>
            <li>Use Glyphh to transmit malware, or to attack, probe or overload any system</li>
            <li>Interfere with the operation of the Service, or circumvent its rate limits, security or access controls</li>
            <li>Share, sell or transfer licence keys outside your organisation</li>
          </ul>
          <p>We may suspend or revoke access, accounts and licence keys that break these rules, and may report serious abuse to the relevant authorities.</p>

          <h2>6. Your Models and Data</h2>
          <p>You own your models, your cases, your precedents and everything else you keep in your runtime or your repositories. They stay on infrastructure you control; the Service does not receive a model&apos;s inputs or results. What the Service does receive is described in our <a href="/privacy">Privacy Policy</a>.</p>
          <p>Ada answers from the precedents you record: an answer is an estimate based on your cases, and may be wrong. You are responsible for the decisions you make with it, and for reviewing answers before relying on them where the stakes call for it.</p>
          <p><strong>Server-side logging.</strong> Your runtime keeps its logs. If you turn on server-side logging, it sends logs, metrics, traces and audit events to the Service so the platform can show them; we keep them for seven (7) days and then delete them. It is off unless you turn it on, and you can turn it off at any time.</p>

          <h2>7. Plans, Billing and Cancellation</h2>
          <ul>
            <li><strong>Plans.</strong> The Free plan costs nothing. Pro and Team are flat monthly subscriptions, billed in advance in US dollars. Enterprise is sold by written agreement. Plans are never priced per seat, per model or per install.</li>
            <li><strong>Payment.</strong> Payments are processed by Stripe. You authorise us and Stripe to charge your payment method each month until you cancel. Stated prices exclude taxes and duties, which you are responsible for where applicable.</li>
            <li><strong>Cancellation.</strong> You may cancel at any time from the platform. Your plan continues to the end of the month you have paid for, and no further licence keys are issued after it. Refunds are covered by our <a href="/refund">Refund Policy</a>.</li>
            <li><strong>Changes.</strong> We may change plans, their limits and their prices prospectively. We will give reasonable notice of material changes; continued use after a change takes effect constitutes acceptance.</li>
          </ul>

          <h2>8. Intellectual Property</h2>
          <p>The Service and the Software, including all designs, trademarks and content, are the intellectual property of Glyphh AI LLC and its licensors. Except for the licences expressly granted in these Terms, and the open-source licences that govern the SDKs and any open-source components, no rights are granted to you.</p>

          <h2>9. Service Availability</h2>
          <p>We strive to keep the Service available but do not guarantee uninterrupted access. When the Service is unavailable, your runtimes keep running on the licence key they hold. We may modify, suspend or discontinue any part of the Service with reasonable notice.</p>

          <h2>10. Limitation of Liability</h2>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, GLYPHH AI LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR REVENUE, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE OR THE SOFTWARE, ANY DECISION MADE USING THEIR OUTPUT, OR THE ACTS OR OMISSIONS OF ANY THIRD PARTY. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.</p>

          <h2>11. Disclaimer of Warranties</h2>
          <p>THE SERVICE, THE SOFTWARE AND ALL OUTPUTS ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT, AND WE MAKE NO WARRANTY THAT ANY OUTPUT IS ACCURATE OR COMPLETE.</p>

          <h2>12. Termination</h2>
          <p>You may stop using Glyphh at any time. We may suspend or terminate your access, and revoke your licence keys, if you breach these Terms. On termination for breach, your licence to the Software ends and you must stop running it. Sections 3 (Restrictions), 6, 8, 10, 11 and 13 survive termination.</p>

          <h2>13. Governing Law</h2>
          <p>These Terms are governed by the laws of the State of Delaware, without regard to conflict of law principles. Any disputes shall be resolved in the state or federal courts located in Delaware.</p>

          <h2>14. Changes to Terms</h2>
          <p>We may update these Terms from time to time. Continued use of Glyphh after changes constitutes acceptance of the revised Terms. Material changes will be communicated through the platform or by email.</p>

          <h2>15. Third-Party Software and Services</h2>
          <p>The Software includes open-source components, each provided under its own licence, which applies to that component. Sign-in is provided through Google and GitHub, and payments are processed by Stripe; your use of those services is also subject to their terms. Except as stated, no third party named here sponsors or endorses Glyphh.</p>

          <h2>16. Contact</h2>
          <p>For questions about these Terms, contact us at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
