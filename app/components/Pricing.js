// v1.1.3
import dynamic from 'next/dynamic';

const SupernovaCanvas = dynamic(() => import('./SupernovaCanvas'), { ssr: false });

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001';

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <SupernovaCanvas />
      <div className="container">
        <h2 className="section-title">Simple, transparent pricing</h2>
        <p className="section-subtitle">Start with a 14-day free trial. No credit card required. Cancel anytime.</p>

        <div className="pricing-grid pricing-grid-single">
          {/* Pro card */}
          <div className="pricing-card pricing-card-popular reveal">
            <div className="pricing-badge">Pro</div>
            <div className="pricing-header">
              <span className="pricing-plan-name">Pro</span>
              <div className="pricing-amount">
                <span className="pricing-dollar">$</span>
                <span className="pricing-number">18</span>
              </div>
              <span className="pricing-period">/month</span>
            </div>
            <p className="pricing-desc">Everything unlocked. 14-day free trial, then $18/month.</p>
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
              <span className="btn-label">Start 14-Day Free Trial</span>
              <span className="btn-fill"></span>
            </a>
          </div>
        </div>
        <p className="pricing-note">Cancel anytime. No questions asked.</p>
      </div>
    </section>
  );
}
