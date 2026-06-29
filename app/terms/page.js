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

          <p><strong>Effective Date:</strong> June 29, 2026</p>
          <p>These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of Glyphh, including the desktop application, the hosted platform, and our managed access to third-party AI models (collectively, the &ldquo;Service&rdquo;), provided by Glyphh AI LLC (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By installing, accessing, or using the Service, you agree to be bound by these Terms.</p>

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
          <p>The Service provides metered access to third-party AI models for your own use. You may not, without our prior written permission:</p>
          <ul>
            <li>Resell, sublicense, rent, lease, redistribute, or otherwise provide the Service, your account, your credits, or access to the AI models made available through the Service to any third party</li>
            <li>Use the Service to operate, or to provide to others, an AI API, inference endpoint, proxy, reseller offering, or any service that exposes model access to third parties</li>
            <li>Use the Service, or any output of the Service, to build, train, or improve a product or model that competes with the Service or with our model providers</li>
            <li>Pool, aggregate, or share a single account or credit balance across multiple end users or organizations to avoid per-seat or per-plan terms</li>
          </ul>

          <h3>3.2 Swarms and Multi-Agent Coordination</h3>
          <p>The Service includes &ldquo;swarms&rdquo; — sessions in which multiple agents coordinate work toward a goal. When you create or run a swarm, you additionally agree not to:</p>
          <ul>
            <li>Use a swarm, or coordinate its agents, to execute denial-of-service attacks, traffic floods, or any unsolicited high-volume requests against any third party or service</li>
            <li>Use a swarm to perform credential stuffing, password spraying, brute-force authentication, account takeover, or any unauthorized access against any system</li>
            <li>Use a swarm to perform vulnerability scanning, exploitation, lateral movement, privilege escalation, or other security-bypassing activities against systems you do not own or have explicit written authorization to test</li>
            <li>Use a swarm to scrape, harvest, or exfiltrate personal information, copyrighted material, or proprietary data at scale, in violation of the source&apos;s terms or applicable law</li>
            <li>Use a swarm&apos;s agents for cryptocurrency mining, token farming, or any unauthorized resource extraction (&ldquo;cryptojacking&rdquo;)</li>
            <li>Use a swarm to mass-impersonate real persons, brands, or institutions, or to operate sock-puppet or coordinated inauthentic accounts</li>
            <li>Use a swarm to generate, store, or distribute child sexual abuse material (CSAM), instructions for synthesizing weapons capable of mass harm, or other content prohibited by law</li>
            <li>Direct a swarm&apos;s agents at private, internal, or loopback network addresses, or at the Service&apos;s own infrastructure, without authorization</li>
            <li>Inject prompts, instructions, or hidden directives into messages or files with the intent to subvert another agent&apos;s instructions, extract its system prompt, or cause it to act outside its assigned role</li>
            <li>Bypass, evade, or attempt to defeat the Service&apos;s sandbox, path-gate, firewall, rate limits, or any other safety controls</li>
          </ul>
          <p>The Service may refuse, throttle, or revoke swarms and accounts that violate these rules. We may also report serious abuse to law enforcement and affected third parties.</p>

          <h2>4. AI Models, Anthropic, and Third-Party Providers</h2>
          <p>The Service provides access to artificial-intelligence models, including Claude models from Anthropic, PBC (&ldquo;Anthropic&rdquo;), and may integrate other providers (e.g., OpenAI, Google AI).</p>
          <p><strong>Managed (proxied) access.</strong> When you use the included Glyphh agent, your requests are routed through our infrastructure to Anthropic using our credentials and are metered in credits as described in Section 5. <strong>Bring-your-own-key (BYOK).</strong> Where the Service lets you supply your own provider API key for other agents, those requests are sent directly from your machine to that provider under your own account, and your use is governed by that provider&apos;s terms.</p>
          <p><strong>Anthropic compliance.</strong> Your use of Claude through the Service is additionally subject to Anthropic&apos;s Usage Policy and Anthropic&apos;s Commercial Terms of Service, as they may be updated. You agree to comply with them, including, without limitation, Anthropic&apos;s prohibited-use restrictions and the restriction against using model outputs to develop, train, or improve any models or products that compete with Anthropic. We may filter, throttle, suspend, or terminate requests or accounts to enforce these requirements or any provider requirement, and Anthropic and our other providers are intended third-party beneficiaries of this Section.</p>
          <p><strong>Dependence on providers.</strong> The Service depends on Anthropic and other providers that we do not control. Their availability, latency, rate limits, model versions and capabilities, content filtering and refusals, and pricing may change, be limited, or be interrupted at any time. We are not responsible or liable for the acts, omissions, outages, changes, deprecations, or content decisions of any third-party provider, and any such event does not entitle you to any refund or credit (see our <a href="/refund">Refund Policy</a>).</p>

          <h2>5. Credits, Plans, and Billing</h2>
          <ul>
            <li><strong>Credit metering.</strong> Access to managed (proxied) models is metered in prepaid credits. Each plan (including free and paid tiers) includes a periodic credit allowance, and additional credits may be purchased as one-time top-ups, including optional automatic top-ups that you enable.</li>
            <li><strong>Nature of credits.</strong> Credits are a prepaid, limited right to access the Service. They are not money, currency, deposits, or stored value, have no cash value, and are non-transferable.</li>
            <li><strong>Allowance vs. purchased credits.</strong> Plan-included credits are granted for the applicable billing period and do not roll over to the next period. Purchased top-up credits carry over until used, subject to any expiration we disclose at purchase.</li>
            <li><strong>Prepaid; no arrears.</strong> The Service operates on a prepaid basis. When your available balance reaches zero, managed requests are declined until you add credits or your next allowance is granted. We do not extend credit or bill in arrears for usage.</li>
            <li><strong>Non-refundable.</strong> Credits and top-ups are non-refundable once purchased, except as set out in our <a href="/refund">Refund Policy</a> or required by law.</li>
            <li><strong>Changes.</strong> We may change plans, prices, credit allowances, and the credit cost of individual models prospectively. We will provide reasonable notice of material changes; continued use after a change takes effect constitutes acceptance.</li>
            <li><strong>Payments and taxes.</strong> Payments are processed by Stripe. You authorize us and Stripe to charge your selected payment method for your plan and for any top-ups or automatic top-ups you enable. Stated prices exclude taxes, which you are responsible for where applicable.</li>
          </ul>

          <h2>6. Intellectual Property</h2>
          <p>The Service, including all software, designs, trademarks, and content, is the intellectual property of Glyphh AI LLC. Your access grants a limited, non-exclusive, non-transferable, revocable right to use the Service for personal or internal business purposes only. As between you and us, outputs you generate through the Service are yours to use, subject to these Terms and to the terms of the applicable model provider.</p>

          <h2>7. User Content and Outputs</h2>
          <p>You retain ownership of all content you create, capture, submit, or process using the Service. We do not claim ownership over your data. You are solely responsible for the content you submit and for ensuring that your use, and any output you rely on, complies with applicable laws and third-party rights. AI outputs may be inaccurate, incomplete, or otherwise unsuitable; you are responsible for reviewing and verifying outputs before relying on them.</p>

          <h2>8. Service Availability</h2>
          <p>We strive to maintain continuous availability but do not guarantee uninterrupted access. The Service may be temporarily unavailable for maintenance, updates, or due to circumstances beyond our control, including outages or changes at our third-party providers (such as Anthropic). We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice. Unavailability, including unavailability caused by a third-party provider, does not entitle you to a refund or credit except as expressly stated in our <a href="/refund">Refund Policy</a>.</p>

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
