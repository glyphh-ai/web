import Footer from '../components/Footer';

export const metadata = {
  title: 'Terms of Use — .Yo',
  description: 'Terms of Use for the .Yo desktop application by Glyphh AI LLC.',
};

export default function TermsPage() {
  return (
    <>
      <div className="policy-page">
        <div className="container">
          <a href="/" className="policy-back">&larr; Back</a>
          <h1 className="policy-title">Terms of Use</h1>

          <p><strong>Effective Date:</strong> January 1, 2026</p>
          <p>These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of .Yo, a desktop application and related services (&ldquo;Service&rdquo;) provided by Glyphh AI LLC (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By installing, accessing, or using the Service, you agree to be bound by these Terms.</p>

          <h2>1. Eligibility</h2>
          <p>You must be at least 13 years old to use the Service. If you are under 18, you represent that your parent or legal guardian has reviewed and agreed to these Terms on your behalf.</p>

          <h2>2. Account and License</h2>
          <p>Use of the Service requires a valid license key. You are responsible for keeping your license key confidential. Each license is personal and non-transferable. You may activate your license on up to two (2) machines simultaneously. Sharing, reselling, or distributing your license key is prohibited and may result in immediate revocation.</p>

          <h2>3. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Reverse engineer, decompile, or disassemble the Service</li>
            <li>Use the Service to violate any applicable law or regulation</li>
            <li>Attempt to gain unauthorized access to the Service or its related systems</li>
            <li>Use the Service to transmit malware, spam, or any harmful content</li>
            <li>Interfere with the operation of the Service or other users&apos; use of the Service</li>
            <li>Resell, sublicense, or redistribute the Service without written permission</li>
          </ul>

          <h3>3.1 Swarms and Multi-Agent Coordination</h3>
          <p>The Service includes &ldquo;swarms&rdquo; — local sessions in which multiple agents coordinate work toward a goal. When you create or run a swarm, you additionally agree not to:</p>
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

          <h2>4. Intellectual Property</h2>
          <p>The Service, including all software, designs, trademarks, and content, is the intellectual property of Glyphh AI LLC. Your license grants a limited, non-exclusive, non-transferable, revocable right to use the Service for personal or internal business purposes only.</p>

          <h2>5. Third-Party Services</h2>
          <p>.Yo integrates with third-party AI services (e.g., Anthropic, OpenAI, Google AI). Your use of those services is governed by their respective terms and privacy policies. You are responsible for providing your own API keys and complying with third-party terms. Glyphh AI LLC is not responsible for the availability, accuracy, or conduct of third-party services.</p>

          <h2>6. User Content</h2>
          <p>You retain ownership of all content you create, capture, or process using the Service. We do not claim any ownership over your data. You are solely responsible for the content you process through the Service and for ensuring that your use complies with applicable laws and third-party rights.</p>

          <h2>7. Service Availability</h2>
          <p>We strive to maintain continuous availability but do not guarantee uninterrupted access. The Service may be temporarily unavailable for maintenance, updates, or due to circumstances beyond our control. We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice.</p>

          <h2>8. Limitation of Liability</h2>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, GLYPHH AI LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR REVENUE, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.</p>

          <h2>9. Disclaimer of Warranties</h2>
          <p>THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>

          <h2>10. Termination</h2>
          <p>We may terminate or suspend your access to the Service at any time for violation of these Terms. Upon termination, your license is revoked and you must cease all use of the Service. Sections 4, 6, 8, 9, and 11 survive termination.</p>

          <h2>11. Governing Law</h2>
          <p>These Terms are governed by the laws of the State of Delaware, without regard to conflict of law principles. Any disputes shall be resolved in the state or federal courts located in Delaware.</p>

          <h2>12. Changes to Terms</h2>
          <p>We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the revised Terms. Material changes will be communicated through the application or via email.</p>

          <h2>13. Contact</h2>
          <p>For questions about these Terms, contact us at <a href="mailto:support@dotyo.dev">support@dotyo.dev</a>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
