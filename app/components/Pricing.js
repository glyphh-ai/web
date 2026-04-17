// v1.1.2
import dynamic from 'next/dynamic';

const SupernovaCanvas = dynamic(() => import('./SupernovaCanvas'), { ssr: false });

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001';

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <SupernovaCanvas />
      <div className="container">
        <h2 className="section-title">Simple, transparent pricing</h2>
        <p className="section-subtitle">The app is free forever. Upgrade to Pro for unlimited everything. Need more? Contact us for Enterprise.</p>

        <div className="pricing-grid">
          {/* Free card */}
          <div className="pricing-card pricing-card-free reveal">
            <div className="pricing-header">
              <span className="pricing-plan-name">Free</span>
              <div className="pricing-amount">
                <span className="pricing-dollar">$</span>
                <span className="pricing-number">0</span>
              </div>
              <span className="pricing-period">forever</span>
            </div>
            <p className="pricing-desc">All the essentials, forever free. Bring your own API key.</p>
            <ul className="pricing-features">
              <li><span className="check">&#10003;</span> 20 apps</li>
              <li><span className="check">&#10003;</span> 10 skills</li>
              <li><span className="check">&#10003;</span> 5 layouts</li>
              <li><span className="check">&#10003;</span> All commands (.yo .dip .drip .sup)</li>
              <li><span className="check">&#10003;</span> BYOK — use your own API key</li>
              <li className="excluded"><span className="x">&times;</span> Cloud sync</li>
              <li className="excluded"><span className="x">&times;</span> Voice input</li>
              <li className="excluded"><span className="x">&times;</span> Custom layouts</li>
            </ul>
            <a href="#download" className="btn btn-ghost-green btn-lg btn-full group">
              <span className="btn-label">Download Free</span>
              <span className="btn-fill"></span>
            </a>
          </div>

          {/* Pro card */}
          <div className="pricing-card pricing-card-popular reveal">
            <div className="pricing-badge">Recommended</div>
            <div className="pricing-header">
              <span className="pricing-plan-name">Pro</span>
              <div className="pricing-amount">
                <span className="pricing-dollar">$</span>
                <span className="pricing-number">18</span>
              </div>
              <span className="pricing-period">/month</span>
            </div>
            <p className="pricing-desc">Unlimited everything. Voice, custom layouts, cloud sync.</p>
            <ul className="pricing-features">
              <li><span className="check">&#10003;</span> Unlimited apps</li>
              <li><span className="check">&#10003;</span> Unlimited skills</li>
              <li><span className="check">&#10003;</span> Unlimited layouts</li>
              <li><span className="check">&#10003;</span> Cloud sync across devices</li>
              <li><span className="check">&#10003;</span> All commands (.yo .dip .drip .sup)</li>
              <li><span className="check">&#10003;</span> Voice input</li>
              <li><span className="check">&#10003;</span> Custom layouts</li>
            </ul>
            <a href={`${SERVER_URL}/api/checkout?plan=pro`} className="btn btn-primary btn-lg btn-full group">
              <span className="btn-label">Start Pro</span>
              <span className="btn-fill"></span>
            </a>
          </div>
          {/* Enterprise card */}
          <div className="pricing-card pricing-card-enterprise reveal">
            <div className="pricing-header">
              <span className="pricing-plan-name">Enterprise</span>
              <div className="pricing-amount pricing-amount-custom">
                <span className="pricing-custom-label">Custom</span>
              </div>
              <span className="pricing-period">pricing</span>
            </div>
            <p className="pricing-desc">For teams that need custom deployments, SSO, and dedicated support.</p>
            <ul className="pricing-features">
              <li><span className="check">&#10003;</span> Everything in Pro</li>
              <li><span className="check">&#10003;</span> Team management</li>
              <li><span className="check">&#10003;</span> SSO / SAML</li>
              <li><span className="check">&#10003;</span> Custom integrations</li>
              <li><span className="check">&#10003;</span> Dedicated support</li>
              <li><span className="check">&#10003;</span> SLA guarantee</li>
              <li><span className="check">&#10003;</span> Custom deployment</li>
            </ul>
            <a href="mailto:sales@glyphh.ai" className="btn btn-ghost-green btn-lg btn-full group">
              <span className="btn-label">Contact Sales</span>
              <span className="btn-fill"></span>
            </a>
          </div>
        </div>
        <p className="pricing-note">Cancel anytime. No questions asked.</p>
      </div>
    </section>
  );
}
