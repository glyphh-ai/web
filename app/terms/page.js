// Rewritten 2026-10-22 for Ada Cloud (server docs/specs/ada-cloud.md, docs/pricing.md); counsel to review.
// Updated 2026-11-10 for Glyphh-hosted language models and token billing (the hosted-model token contract); counsel to review.
import Footer from '../components/Footer';

export const metadata = {
  title: 'Terms of Use — Glyphh',
  description: 'Terms of Use for Glyphh: Ada Cloud, Glyphh-hosted language models, the platform, the APIs, the Claude connector, the plugin and the SDKs, by Glyphh AI LLC.',
};

export default function TermsPage() {
  return (
    <>
      <div className="policy-page">
        <div className="container">
          <a href="/" className="policy-back">&larr; Back</a>
          <h1 className="policy-title">Terms of Use</h1>

          <div className="policy-note">
            <p>This is a plain-English summary of how Glyphh works today; it will be reviewed by counsel before general availability.</p>
          </div>

          <p><strong>Effective Date:</strong> July 3, 2026</p>
          <p><strong>Last updated 10 November 2026</strong></p>
          <p>These Terms of Use (&ldquo;Terms&rdquo;) govern your use of Glyphh, provided by Glyphh AI LLC (&ldquo;Glyphh&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). Glyphh is a cloud service that we run (the &ldquo;Service&rdquo;). It is made of: the platform at platform.glyphh.ai; the Ada API at ada.glyphh.ai; the account API and the Claude connector at api.glyphh.ai; Glyphh-hosted language models, reached through an OpenAI-compatible chat API (&ldquo;Hosted Models&rdquo;); the Glyphh plugin for Claude Code; and the open-source SDKs. By creating an account or using the Service you agree to these Terms. If you accept them for an organisation, you confirm you may bind it. How we handle data is in our <a href="/privacy">Privacy Policy</a>. If you have a signed agreement with us (for example, an Enterprise contract), it governs where it conflicts with these Terms.</p>

          <h2>1. Eligibility</h2>
          <p>You must be at least 13 years old to use Glyphh. If you are under 18, you confirm that a parent or legal guardian has agreed to these Terms for you.</p>

          <h2>2. Accounts, Organisations and API Keys</h2>
          <p>You sign in with a Google or GitHub account. Your account belongs to an organisation, which may have several members; plans are never priced per member. You are responsible for activity under your account and your organisation, including every call made with your API keys. Keep your keys secret: anyone holding one can act in your organisation with that key&apos;s access. Revoke a key on the platform if you think it has leaked, and tell us at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a> if you believe your account has been compromised.</p>

          <h2>3. What the Service Does</h2>
          <p>Ada answers new cases from the past cases you give it (&ldquo;precedents&rdquo;). You describe a model as a specification (a &ldquo;spec&rdquo;), load your precedents, and ask. Ada runs no code of yours and no language model: it compares cases and reports the outcome the precedents support, its probabilities, its expected cost, whether a person should decide instead, and the precedents it relied on.</p>
          <p>An answer is an estimate from your own cases, and it may be wrong. You decide what to do with it. Where a decision has legal or similarly significant effects on a person, you must keep a person able to review it (Ada&apos;s <code>ask</code> answer is there for this).</p>
          <p>Separately from Ada, Glyphh runs language models of its own on infrastructure we operate, starting with adaL 34B 1.0 (<code>adal-34b-1-0</code>). Ada never calls them; they answer only the requests you send them. Section 5 covers them.</p>

          <h2>4. Your Data</h2>
          <p><strong>You own it.</strong> Your specs, precedents, outcomes, imported files, the prompts you send to Hosted Models and everything else you send to the Service (&ldquo;Customer Data&rdquo;) remain yours. As between you and Glyphh, and to the extent the law allows, you also own the completions Hosted Models return to you (&ldquo;Outputs&rdquo;), and we assign to you any rights we have in them. Similar Outputs may be given to other customers who send similar prompts; your ownership does not extend to those.</p>
          <p><strong>Our licence is narrow.</strong> You grant us a limited, non-exclusive licence to store, copy and process Customer Data only as needed to run the Service for you: to keep it, answer your requests, run Hosted Models on your prompts, learn and calibrate your models from it, import and export it, back it up, keep it secure, and support you when you ask. This licence ends when the data is deleted.</p>
          {/* TODO Chris: confirm retention (hosted-model prompts and completions: no training without opt-in) */}
          <p><strong>We never train on it.</strong> Glyphh never uses Customer Data to train machine-learning or AI models, ours or anyone else&apos;s. This includes your prompts and Outputs: we do not use them to train or improve any model unless your organisation opts in. A model in your organisation learns only from your organisation&apos;s own precedents, and nothing learned from one customer is used for another. We never sell Customer Data, and we never share it except with the subprocessors we need to run the Service, listed in our <a href="/privacy">Privacy Policy</a>.</p>
          <p><strong>Export and deletion.</strong> You can export any model at any time, on every plan, and delete any model or precedent at any time. Section 7 of the Privacy Policy explains how deletion and backups work.</p>
          <p><strong>Your responsibilities.</strong> You must have the right to send us the data you send, and to use it as you do. Do not send special categories of personal data (such as health data, or data about racial or ethnic origin, religion, or sexual orientation) or payment card numbers unless we have agreed it with you in writing.</p>

          <h2>5. Hosted Models</h2>
          <p><strong>What they are.</strong> Hosted Models are language models that Glyphh runs on infrastructure we operate. You reach them through an OpenAI-compatible chat API with an API key from the platform, under the same keys and rate limits as the rest of the Service. The models on offer, their status (beta, stable or deprecated), their context size and their rates are listed on the platform and at <code>GET /v1/llm/models</code>.</p>
          <p><strong>Outputs may be wrong.</strong> A language model predicts text. Its Outputs may be inaccurate, incomplete, out of date, offensive or similar to someone else&apos;s work, and may state wrong things with confidence. You are responsible for how you use Outputs: check them before you rely on them, and do not present them as a person&apos;s work, or as fact, where that would mislead.</p>
          <p><strong>Uses that need a person.</strong> Do not use Hosted Models, without a qualified person reviewing each result before it takes effect, for medical, legal, financial, employment, housing, credit, insurance or education decisions about people, or in any setting where an error could cause death, injury or serious harm (such as operating vehicles, machinery, weapons or critical infrastructure).</p>
          <p><strong>Model versions.</strong> We may release new models and new versions, and may deprecate and later retire older ones. We will mark a version deprecated on the platform and give reasonable notice before we retire it, except where we must retire it sooner for legal, security or safety reasons. A request to a retired version is refused.</p>
          <p><strong>No service level.</strong> Hosted Models carry no service-level commitment, on any plan, unless a signed agreement with us sets one. Beta models may change or be withdrawn at any time.</p>

          <h2>6. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use Glyphh to break any law or regulation, or anyone&apos;s rights</li>
            <li>Use Ada to make decisions with legal or similarly significant effects on people without a person able to review them</li>
            <li>Try to reach another customer&apos;s data, or the Service&apos;s systems, without permission</li>
            <li>Send malware, or use Glyphh to attack, probe or overload any system</li>
            <li>Get around plan limits, rate limits, security or access controls</li>
            <li>Resell the Service or offer it to others as your own hosted service without our written agreement</li>
            <li>Reverse engineer the Service, except where the law allows it despite this term</li>
            <li>Use Hosted Models to create or spread illegal content, including child sexual abuse material, or content that infringes others&apos; rights</li>
            <li>Use Hosted Models to harass, threaten, defraud, impersonate or deceive people, to spread spam or malware, or to help with weapons capable of mass harm</li>
            <li>Try to extract, copy or reconstruct a Hosted Model&apos;s weights, parameters or architecture, or get around its safety measures</li>
            <li>Use Outputs to develop or train a model that competes with Glyphh&apos;s models</li>
            <li>Use Hosted Models for the uses in Section 5 that need a person, without that review</li>
          </ul>
          <p>We may suspend access that breaks these rules, and may report serious abuse to the authorities. Where we can, we will tell you first and give you a chance to fix it.</p>

          <h2>7. Plans, Limits and Metering</h2>
          <p>Each plan sets how many precedents your organisation may hold across all its models, how many reads it may make each calendar month (UTC), and how many calls a second it may make:</p>
          <ul>
            <li><strong>Free:</strong> $0. 1,000 precedents, 5,000 reads a month, 5 calls a second.</li>
            <li><strong>Basic:</strong> $20 a month. 10,000 precedents, 50,000 reads a month, 10 calls a second.</li>
            <li><strong>Pro:</strong> $99 a month. 100,000 precedents, 1,000,000 reads a month, 50 calls a second.</li>
            <li><strong>Team:</strong> $299 a month. 1,000,000 precedents, 5,000,000 reads a month, 200 calls a second.</li>
            <li><strong>Enterprise:</strong> by written contract.</li>
          </ul>
          <p><strong>What counts as a read.</strong> A read is one <code>decide</code>, <code>query</code>, <code>probabilities</code> or <code>facts</code> request; a <code>decide</code> over several outputs counts once per output. A read is counted when it is received, including a read of a model that does not exist. Writes, imports, exports, learning and backtests are not counted as reads; they are bounded by the precedent limit and the rate limit.</p>
          <p><strong>Past the limits.</strong> On Basic, Pro and Team, reads past the month&apos;s allowance carry on and are billed at $1 per 10,000 reads. On Free, reads past the allowance are refused until the next calendar month. On every plan, a write or import that would take your organisation past its precedent limit is refused (an import may ask to record up to the limit and refuse the rest), and calls past the rate limit are refused and may be retried after the time the Service gives.</p>
          <p><strong>Tokens.</strong> Each plan also includes a monthly allowance of Hosted Model tokens, shown on our <a href="/pricing">pricing page</a> and on the platform, and reset each calendar month (UTC). Input tokens (what you send, including any earlier conversation you include) and output tokens (what the model returns) both count. Tokens past the allowance are charged against your prepaid balance (Section 8).</p>
          <p><strong>Our metering is authoritative.</strong> The token counts, read counts and charges recorded by the Service are the basis for your allowance and your bill. If you believe a count is wrong, tell us at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a> within 30 days and we will look into it in good faith.</p>
          <p>Plans are never priced per seat, per Ada model or per key. Your current use is on the platform&apos;s Usage page and at <code>GET /v1/usage</code>.</p>

          <h2>8. Hosted Model Tokens and the Prepaid Balance</h2>
          <ul>
            <li><strong>Rates.</strong> Tokens past your plan&apos;s allowance are charged in US dollars at the model&apos;s rate per million input tokens and per million output tokens, as listed on the platform when the request is made. The price shown is the price charged.</li>
            <li><strong>Prepaid balance.</strong> Usage past the allowance is paid from a prepaid balance that you top up in US dollars, from $10 to $1,000 at a time, through Stripe Checkout. A top-up is added to your balance once Stripe confirms the payment. Prices exclude taxes, which you pay where they apply.</li>
            <li><strong>Charging and refusal.</strong> Each request is charged after its reply, from the tokens it actually used. A request may therefore take your balance slightly below zero; that amount is owed to us and is taken from your next top-up. When your allowance is used up and your balance is zero or less, Hosted Model requests are refused until you top up or the next month begins.</li>
            <li><strong>Nature of the balance.</strong> Your balance is a prepayment for Glyphh services only. It is not money, a deposit, a bank account or stored value; it earns no interest; it cannot be transferred, sold or exchanged for cash; and it can be used only by the organisation that bought it. It does not expire while your organisation&apos;s account is open.</li>
            <li><strong>Refunds.</strong> Top-ups are non-refundable, except where the law requires a refund or we choose, at our discretion, to give one. Balances we grant you (for example, as a promotion) have no cash value and may be withdrawn.</li>
            <li><strong>Closing your account.</strong> If your organisation is closed, by you or by us, any unused balance is forfeited unless the law requires otherwise, and any negative balance remains owed.</li>
            <li><strong>Changes to rates and allowances.</strong> We may change model rates and token allowances for the future. We will give reasonable notice of increases and of reduced allowances by email or on the platform, at least 14 days before they take effect, except for new models or versions, whose rates apply from their release.</li>
          </ul>

          <h2>9. Billing and Cancellation</h2>
          <ul>
            <li><strong>Subscriptions.</strong> Basic, Pro and Team are monthly subscriptions, billed in advance in US dollars. Reads past the allowance are billed in arrears, on a later invoice. Payments are processed by Stripe; you authorise us and Stripe to charge your payment method until you cancel. Prices exclude taxes, which you pay where they apply.</li>
            <li><strong>Cancellation.</strong> You can cancel from the platform at any time. Your plan continues to the end of the period you paid for, then your organisation moves to Free. Reads past the allowance already made are still billed, and your prepaid balance stays with your organisation. Refunds of subscriptions are covered by our <a href="/refund">Refund Policy</a>; prepaid balances by Section 8.</li>
            <li><strong>Non-payment.</strong> If a payment fails or an amount you owe (including a negative balance) goes unpaid, we may suspend paid features, Hosted Models included, until it is paid. We will tell you first where we can. Suspension does not delete your data.</li>
            <li><strong>Moving to a smaller plan.</strong> Your precedents are kept. If you hold more than the new plan allows, new writes are refused until you are under its limit; nothing is deleted for you.</li>
            <li><strong>Changes.</strong> We may change plans, limits and prices for the future. We will give reasonable notice of material changes by email or on the platform.</li>
          </ul>

          <h2>10. The Plugin, the Connector and the SDKs</h2>
          <p><strong>The Glyphh plugin</strong> for Claude Code and the Claude connector are provided by Glyphh under these Terms.</p>
          <p><strong>Claude</strong> is provided by Anthropic under its own terms. When you use Ada through Claude, what you type and what the connector returns pass through Claude under your agreement with Anthropic; Anthropic is not our subprocessor, and we are not responsible for it.</p>
          <p><strong>The SDKs</strong> (<code>glyphh</code> on PyPI and <code>@glyphh-ai/glyphh</code> on npm) and the API contract they share are open source under the MIT License, which governs your use of them.</p>

          <h2>11. Intellectual Property</h2>
          <p>The Service, including Ada, its software, designs and trademarks, belongs to Glyphh AI LLC and its licensors. Apart from the rights these Terms grant, and the open-source licences of the SDKs, no rights pass to you. If you send us feedback, we may use it without obligation to you. Customer Data and Outputs stay yours (Section 4). Hosted Models and their weights belong to Glyphh.</p>

          <h2>12. Service Availability</h2>
          <p>We work to keep the Service available but do not promise uninterrupted access. There is no service-level commitment on Free; Basic, Pro and Team are best effort; Enterprise service levels are set in its contract. Hosted Models carry no service-level commitment unless a signed agreement sets one (Section 5). We may change or retire parts of the Service with reasonable notice, and will give you the chance to export your data before we retire anything that holds it.</p>

          <h2>13. Limitation of Liability</h2>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, GLYPHH AI LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR REVENUE, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE, ANY DECISION MADE USING ITS OUTPUT, OR THE ACTS OR OMISSIONS OF ANY THIRD PARTY. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS BEFORE THE CLAIM.</p>

          <h2>14. Disclaimer of Warranties</h2>
          <p>THE SERVICE AND ALL OUTPUTS ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT ANY OUTPUT IS ACCURATE OR COMPLETE.</p>

          <h2>15. Termination</h2>
          <p>You may stop using Glyphh at any time, and may ask us to close your organisation at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>. We may suspend or end your access if you seriously or repeatedly breach these Terms, or for non-payment (Section 9). Unless the breach makes it unlawful or unsafe, we will give you time to export your data first. When an organisation is closed, its Customer Data is deleted as the Privacy Policy describes. Sections 4, 8, 11, 13, 14 and 16 survive termination.</p>

          <h2>16. Governing Law</h2>
          <p>These Terms are governed by the laws of the State of Delaware, without regard to conflict-of-law rules. Disputes will be resolved in the state or federal courts located in Delaware.</p>

          <h2>17. Changes to These Terms</h2>
          <p>We may update these Terms. We will tell you about material changes on the platform or by email before they take effect. Continuing to use Glyphh after that means you accept them.</p>

          <h2>18. Third-Party Notices</h2>
          <p>Ada reads words through WordNet 3.0 (Princeton University) and the Moby word lists, used under their licences. Sign-in uses Google and GitHub, and payments and top-ups use Stripe, each also under its own terms.</p>

          <h2>19. Contact</h2>
          <p>Questions about these Terms, and security reports: <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
