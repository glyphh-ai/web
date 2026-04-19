import dynamic from 'next/dynamic';

const SupernovaCanvas = dynamic(() => import('./SupernovaCanvas'), { ssr: false });

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <SupernovaCanvas />
      <div className="container">
        <h2 className="section-title">Simple, transparent pricing</h2>
        <p className="section-subtitle">Try everything free for 14 days. No credit card required.</p>

        <div className="pricing-grid pricing-grid-single">
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
              <li><span className="check">&#10003;</span> Custom layouts &amp; vibes</li>
              <li><span className="check">&#10003;</span> All commands (.yo .dip .drip .sup)</li>
              <li><span className="check">&#10003;</span> Priority Discord support</li>
            </ul>
            <a href="/auth" className="btn btn-primary btn-lg btn-full group">
              <span className="btn-label">Start Free Trial</span>
              <span className="btn-fill"></span>
            </a>
          </div>
        </div>

        <p className="pricing-note">Cancel anytime. 14-day money-back guarantee.</p>
        <p className="pricing-enterprise">Need unlimited seats or dedicated support? <a href="mailto:sales@yosup.dev">Contact sales</a></p>
      </div>
    </section>
  );
}
