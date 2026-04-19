import dynamic from 'next/dynamic';

const SupernovaCanvas = dynamic(() => import('./SupernovaCanvas'), { ssr: false });

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <SupernovaCanvas />
      <div className="container">
        <h2 className="section-title">Simple, transparent pricing</h2>
        <p className="section-subtitle">Try everything free for 14 days. No credit card required.</p>

        <div className="pricing-grid pricing-grid-two">
          {/* Pro */}
          <div className="pricing-card pricing-card-popular reveal">
            <div className="pricing-badge">14-Day Free Trial</div>
            <div className="pricing-header">
              <span className="pricing-plan-name">Pro</span>
              <div className="pricing-amount">
                <span className="pricing-dollar">$</span>
                <span className="pricing-number">18</span>
              </div>
              <span className="pricing-period">/seat/month</span>
            </div>
            <p className="pricing-desc">Full access to everything. Up to 10 seats.</p>
            <ul className="pricing-features">
              <li><span className="check">&#10003;</span> Up to 10 seats</li>
              <li><span className="check">&#10003;</span> Unlimited apps &amp; skills</li>
              <li><span className="check">&#10003;</span> Custom layouts</li>
              <li><span className="check">&#10003;</span> Cloud sync across devices</li>
              <li><span className="check">&#10003;</span> All commands (.yo .dip .drip .sup)</li>
              <li><span className="check">&#10003;</span> Priority Discord support</li>
            </ul>
            <a href="/auth" className="btn btn-primary btn-lg btn-full group">
              <span className="btn-label">Start Free Trial</span>
              <span className="btn-fill"></span>
            </a>
          </div>

          {/* Enterprise */}
          <div className="pricing-card reveal">
            <div className="pricing-header">
              <span className="pricing-plan-name">Enterprise</span>
              <div className="pricing-amount">
                <span className="pricing-number pricing-custom">Custom</span>
              </div>
              <span className="pricing-period">tailored to your org</span>
            </div>
            <p className="pricing-desc">For organizations that need scale, security, and dedicated support.</p>
            <ul className="pricing-features">
              <li><span className="check">&#10003;</span> Unlimited seats</li>
              <li><span className="check">&#10003;</span> Everything in Pro</li>
              <li><span className="check">&#10003;</span> SSO &amp; SAML</li>
              <li><span className="check">&#10003;</span> Audit logs</li>
              <li><span className="check">&#10003;</span> Custom integrations</li>
              <li><span className="check">&#10003;</span> Dedicated support (email &amp; Slack)</li>
            </ul>
            <a href="mailto:sales@yosup.dev" className="btn btn-secondary btn-lg btn-full">
              Contact Sales
            </a>
          </div>
        </div>
        <p className="pricing-note">Cancel anytime. 14-day money-back guarantee.</p>
      </div>
    </section>
  );
}
