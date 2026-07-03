import Footer from '../components/Footer';

export const metadata = {
  title: 'Terms of Use — Glyphh',
  description: 'Terms of Use for the Glyphh desktop application and hosted services by Glyphh AI LLC.',
};

export default function TermsPage() {
  return (
    <>
      <div className="policy-page">
        <div className="container">
          <a href="/" className="policy-back">&larr; Back</a>
          <h1 className="policy-title">Terms of Use</h1>

          <p><strong>Effective Date:</strong> July 3, 2026</p>
          <p>These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of Glyphh, including the desktop application, the hosted platform, and the Glyphh relay that connects your own AI tools to your workspace (collectively, the &ldquo;Service&rdquo;), provided by Glyphh AI LLC (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By installing, accessing, or using the Service, you agree to be bound by these Terms.</p>

          <h2>1. Eligibility</h2>
          <p>You must be at least 13 years old to use the Service. If you are under 18, you represent that your parent or legal guardian has reviewed and agreed to these Terms on your behalf.</p>

          <h2>2. Accounts</h2>
          <p>Use of the Service requires a Glyphh account. You are responsible for keeping your credentials confidential and for all activity under your account. Each account is personal and non-transferable. You may activate the desktop application on up to two (2) machines simultaneously. Sharing, selling, leasing, transferring, or otherwise providing your account, credentials, or credits to any third party is prohibited and may result in immediate suspension or termination without refund.</p>

          <h2>3. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Reverse engineer, decompile, or disassemble the Service</li>
            <li>Use the Service to violate any applicable law or regulation</li>
            <li>Attempt to gain unauthorized access to the Service or its related systems</li>
            <li>Use the Service to transmit malware, spam, or any harmful content</li>
            <li>Interfere with the operation of the Service or other users&apos; use of the Service</li>
            <li>Circumvent, disable, or interfere with usage metering, credit limits, rate limits, or any security or access controls</li>
          </ul>

          <h3>3.1 No Resale or Competing Services</h3>
          <p>The Service provides you with a workspace and a relay that connect your own AI tools to your own apps and data. You may not, without our prior written permission:</p>
          <ul>
            <li>Resell, sublicense, rent, lease, redistribute, or otherwise provide the Service, your account, or your credits to any third party</li>
            <li>Use the Service to operate, or to provide to others, a hosted automation, workspace-control, or relay offering that exposes the Service&apos;s capabilities to third parties</li>
            <li>Use the Service, or any output of the Service, to build, train, or improve a product that competes with the Service</li>
            <li>Pool, aggregate, or share a single account or credit balance across multiple end users or organizations to avoid per-seat or per-plan terms</li>
          </ul>

          <h3>3.2 Automation and Relay Use</h3>
          <p>The Service lets your connected AI tools drive your workspace and automate work across your apps. When you connect an AI client or run automations, you additionally agree not to:</p>
          <ul>
            <li>Use the Service to execute denial-of-service attacks, traffic floods, or any unsolicited high-volume requests against any third party or service</li>
            <li>Use the Service to perform credential stuffing, password spraying, brute-force authentication, account takeover, or any unauthorized access against any system</li>
            <li>Use the Service to perform vulnerability scanning, exploitation, lateral movement, privilege escalation, or other security-bypassing activities against systems you do not own or have explicit written authorization to test</li>
            <li>Use the Service to scrape, harvest, or exfiltrate personal information, copyrighted material, or proprietary data at scale, in violation of the source&apos;s terms or applicable law</li>
            <li>Use the Service for cryptocurrency mining, token farming, or any unauthorized resource extraction (&ldquo;cryptojacking&rdquo;)</li>
            <li>Use the Service to mass-impersonate real persons, brands, or institutions, or to operate sock-puppet or coordinated inauthentic accounts</li>
            <li>Use the Service to generate, store, or distribute child sexual abuse material (CSAM), instructions for synthesizing weapons capable of mass harm, or other content prohibited by law</li>
            <li>Direct automations at private, internal, or loopback network addresses, or at the Service&apos;s own infrastructure, without authorization</li>
            <li>Bypass, evade, or attempt to defeat the Service&apos;s injection firewall, capability scoping, rate limits, or any other safety controls</li>
          </ul>
          <p>The Service may refuse, throttle, or revoke connections and accounts that violate these rules. We may also report serious abuse to law enforcement and affected third parties.</p>

          <h2>4. Your AI Tools and Connected Services</h2>
          <p><strong>Bring your own AI.</strong> The Service does not resell, proxy, or mark up access to any artificial-intelligence model. You connect AI clients you already license (for example, Claude, ChatGPT, or Gemini) to the Service over the Model Context Protocol (&ldquo;MCP&rdquo;) relay, or supply your own provider API key for features that call a model directly. All AI inference is performed under your own account and subscription with that provider, and your use of it is governed by that provider&apos;s terms. Your prompts and model responses are not routed through us for the purpose of model inference.</p>
          <p><strong>Provider compliance.</strong> Your use of any AI model or connected service through the Service remains subject to that provider&apos;s usage policies and terms, as they may be updated, and you agree to comply with them. We may filter, throttle, suspend, or terminate requests or accounts to enforce those requirements or our own.</p>
          <p><strong>Connected services and integrations.</strong> The Service lets you connect third-party applications (for example, through integration partners such as Pipedream) so your AI tools can act on your behalf. Those services are operated by third parties we do not control. Their availability, latency, rate limits, capabilities, and pricing may change, be limited, or be interrupted at any time. We are not responsible or liable for the acts, omissions, outages, changes, or content decisions of any third-party provider or integration, and any such event does not entitle you to any refund or credit (see our <a href="/refund">Refund Policy</a>).</p>

          <h2>5. Credits, Plans, and Billing</h2>
          <ul>
            <li><strong>What credits meter.</strong> Credits meter the compute the Service performs on your behalf — driving your workspace, controlling windows, and executing tool and integration calls. One credit corresponds to up to 30 seconds of such compute per billable operation (rounded up, with a one-credit minimum per operation); browsing your workspace and listing your apps, tools, or connections do not consume credits. Credits do <strong>not</strong> pay for AI model usage, which you license separately from your own provider.</li>
            <li><strong>Allowances and top-ups.</strong> Each plan (including free and paid tiers) includes a periodic credit allowance, and additional credits may be purchased as one-time top-ups, including optional automatic top-ups that you enable.</li>
            <li><strong>Nature of credits.</strong> Credits are a prepaid, limited right to use the Service. They are not money, currency, deposits, or stored value, have no cash value, and are non-transferable.</li>
            <li><strong>Allowance vs. purchased credits.</strong> Plan-included credits are granted for the applicable billing period and do not roll over to the next period. Purchased top-up credits carry over until used, subject to any expiration we disclose at purchase.</li>
            <li><strong>Prepaid; no arrears.</strong> The Service operates on a prepaid basis. When your available balance reaches zero, billable operations may be declined until you add credits or your next allowance is granted. We do not extend credit or bill in arrears for usage.</li>
            <li><strong>Non-refundable.</strong> Credits and top-ups are non-refundable once purchased, except as set out in our <a href="/refund">Refund Policy</a> or required by law.</li>
            <li><strong>Transparency.</strong> Each billable operation is recorded with the operation performed and its measured duration, and is itemized in your usage feed.</li>
            <li><strong>Changes.</strong> We may change plans, prices, credit allowances, and the credit cost of metered operations prospectively. We will provide reasonable notice of material changes; continued use after a change takes effect constitutes acceptance.</li>
            <li><strong>Payments and taxes.</strong> Payments are processed by Stripe. You authorize us and Stripe to charge your selected payment method for your plan and for any top-ups or automatic top-ups you enable. Stated prices exclude taxes, which you are responsible for where applicable.</li>
          </ul>

          <h2>6. Intellectual Property</h2>
          <p>The Service, including all software, designs, trademarks, and content, is the intellectual property of Glyphh AI LLC. Your access grants a limited, non-exclusive, non-transferable, revocable right to use the Service for personal or internal business purposes only. As between you and us, outputs you generate through the Service are yours to use, subject to these Terms and to the terms of the applicable model provider.</p>

          <h2>7. User Content and Outputs</h2>
          <p>You retain ownership of all content you create, capture, submit, or process using the Service. We do not claim ownership over your data. You are solely responsible for the content you submit and for ensuring that your use, and any output you rely on, complies with applicable laws and third-party rights. AI outputs may be inaccurate, incomplete, or otherwise unsuitable; you are responsible for reviewing and verifying outputs before relying on them.</p>

          <h2>8. Service Availability</h2>
          <p>We strive to maintain continuous availability but do not guarantee uninterrupted access. The Service may be temporarily unavailable for maintenance, updates, or due to circumstances beyond our control, including outages or changes at the AI clients you connect or at third-party integrations and connected services. We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice. Unavailability, including unavailability caused by a third party, does not entitle you to a refund or credit except as expressly stated in our <a href="/refund">Refund Policy</a>.</p>

          <h2>9. Limitation of Liability</h2>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, GLYPHH AI LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR REVENUE, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE OR THE ACTS OR OMISSIONS OF ANY THIRD-PARTY PROVIDER. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.</p>

          <h2>10. Disclaimer of Warranties</h2>
          <p>THE SERVICE AND ALL AI OUTPUTS ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT, AND WE MAKE NO WARRANTY REGARDING THE AVAILABILITY, ACCURACY, OR CONTINUITY OF ANY AI MODEL OR THIRD-PARTY PROVIDER.</p>

          <h2>11. Termination</h2>
          <p>We may terminate or suspend your access to the Service at any time for violation of these Terms, including for prohibited use under Sections 3 and 4. Upon termination, your right to use the Service is revoked, and any unused credits are forfeited where termination results from your breach. Sections 3.1, 4, 5, 6, 7, 9, 10, and 12 survive termination.</p>

          <h2>12. Governing Law</h2>
          <p>These Terms are governed by the laws of the State of Delaware, without regard to conflict of law principles. Any disputes shall be resolved in the state or federal courts located in Delaware.</p>

          <h2>13. Changes to Terms</h2>
          <p>We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the revised Terms. Material changes will be communicated through the application or via email.</p>

          <h2>14. Contact</h2>
          <p>For questions about these Terms, contact us at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
