import Footer from '../components/Footer';

export const metadata = {
  title: 'Code of Conduct — Glyphh',
  description: 'Code of Conduct for reviews, comments, and apps on the Glyphh Marketplace, by Glyphh AI LLC.',
};

export default function CodeOfConductPage() {
  return (
    <>
      <div className="policy-page">
        <div className="container">
          <a href="/" className="policy-back">&larr; Back</a>
          <h1 className="policy-title">Code of Conduct</h1>

          <p><strong>Effective Date:</strong> August 17, 2026</p>
          <p><strong>Last Updated:</strong> August 17, 2026</p>
          <p>This Code of Conduct applies to everything published on the Glyphh Marketplace — reviews, ratings, comments, developer profiles, listings, and the apps themselves. It supplements our <a href="/terms">Terms of Use</a>, <a href="/marketplace-terms">Marketplace Terms</a>, <a href="/privacy">Privacy Policy</a>, and, for developers, the <a href="/developer-agreement">Developer Agreement</a>.</p>

          <h2>1. Rules for Reviews and Comments</h2>
          <p>Reviews and comments are public and attributed. Do not post:</p>
          <ul>
            <li>Harassment, threats, or personal attacks against any person or organization</li>
            <li>Hate speech or content that demeans people on the basis of protected characteristics</li>
            <li>Spam, advertising, or off-topic content</li>
            <li>Other people&apos;s personal information (doxxing)</li>
            <li>Content that is unlawful or that infringes third-party rights</li>
          </ul>

          <h2>2. No Rating Manipulation</h2>
          <p>Ratings must reflect genuine experience with an app or developer. The following are prohibited for users and developers alike:</p>
          <ul>
            <li>Fake, purchased, or incentivized reviews or ratings</li>
            <li>Brigading — coordinated campaigns to inflate or sink an app&apos;s or developer&apos;s rating</li>
            <li>Reviewing your own apps, or those of competitors, under false identities</li>
            <li>Pressuring or rewarding users to change or remove reviews</li>
          </ul>

          <h2>3. Rules for Apps</h2>
          <p>Apps must not:</p>
          <ul>
            <li>Contain malware or any hidden or undisclosed functionality</li>
            <li>Deceive users about what the app does, who made it, or what it costs</li>
            <li>Collect data beyond what the app discloses</li>
            <li>Violate the acceptable-use rules of the <a href="/terms">Terms of Use</a> or the prohibited-app rules of the <a href="/developer-agreement">Developer Agreement</a></li>
          </ul>

          <h2>4. Enforcement</h2>
          <p>Enforcement follows an escalating ladder, applied in proportion to the violation:</p>
          <ul>
            <li><strong>Content removal.</strong> Violating reviews, comments, or listing content are removed or hidden.</li>
            <li><strong>Account restriction.</strong> Repeat or serious violations restrict an account&apos;s ability to post, publish, or participate in the Marketplace.</li>
            <li><strong>Developer termination.</strong> Severe or persistent violations end developer status and delist the developer&apos;s apps, under the <a href="/developer-agreement">Developer Agreement</a>.</li>
          </ul>
          <p>We may skip steps for severe violations — malware, threats, and unlawful content warrant immediate action.</p>

          <h2>5. Reports and Moderation</h2>
          <p>Every listing and piece of content has a report tool, and reports are taken seriously: they enter a triage queue and are reviewed against this Code. Moderation may be automated — reviews and comments are screened against this Code by automated systems — with escalation to human review for enforcement decisions and disputed cases. We keep an audit trail of moderation actions. To report something you cannot flag in the product, contact <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>

          <h2>6. Changes</h2>
          <p>We may update this Code of Conduct from time to time. Material changes will be communicated through the application or via email; continued participation in the Marketplace after changes constitutes acceptance.</p>

          <h2>7. Contact</h2>
          <p>For questions about this Code of Conduct, contact us at <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
