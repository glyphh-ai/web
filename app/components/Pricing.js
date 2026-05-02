import dynamic from 'next/dynamic';

const SupernovaCanvas = dynamic(() => import('./SupernovaCanvas'), { ssr: false });

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.yosup.dev';

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <SupernovaCanvas />
      <div className="container">
        <h2 className="section-title">Simple, transparent pricing</h2>
        <p className="section-subtitle">Start free, upgrade when you need more.</p>

        <div className="pricing-grid pricing-grid-four">
          {/* Free */}
          <div className="pricing-card reveal">
            <div className="pricing-header">
              <span className="pricing-plan-name">YO FREE</span>
              <div className="pricing-amount">
                <span className="pricing-dollar">$</span>
                <span className="pricing-number">0</span>
              </div>
              <span className="pricing-period">per month</span>
            </div>
            <p className="pricing-desc">1,000 yos</p>
            <a href={`${PLATFORM_URL}/auth`} className="btn btn-secondary btn-lg btn-full group">
              <span className="btn-label">Download now</span>
              <span className="btn-fill"></span>
            </a>
          </div>

          {/* Starter */}
          <div className="pricing-card reveal">
            <div className="pricing-header">
              <span className="pricing-plan-name">YO STARTER</span>
              <div className="pricing-amount">
                <span className="pricing-dollar">$</span>
                <span className="pricing-number">20</span>
              </div>
              <span className="pricing-period">per month</span>
            </div>
            <p className="pricing-desc">2,000 yos</p>
            <p className="pricing-overage">Pay-per-use overage ($0.02/yo)</p>
            <a href={`${PLATFORM_URL}/auth`} className="btn btn-primary btn-lg btn-full group">
              <span className="btn-label">Get started</span>
              <span className="btn-fill"></span>
            </a>
          </div>

          {/* Pro */}
          <div className="pricing-card pricing-card-popular reveal">
            <div className="pricing-badge">Most Popular</div>
            <div className="pricing-header">
              <span className="pricing-plan-name">YO PRO</span>
              <div className="pricing-amount">
                <span className="pricing-dollar">$</span>
                <span className="pricing-number">40</span>
              </div>
              <span className="pricing-period">per month</span>
            </div>
            <p className="pricing-desc">5,000 yos</p>
            <p className="pricing-overage">Pay-per-use overage ($0.02/yo)</p>
            <a href={`${PLATFORM_URL}/auth`} className="btn btn-primary btn-lg btn-full group">
              <span className="btn-label">Get started</span>
              <span className="btn-fill"></span>
            </a>
          </div>

          {/* Power */}
          <div className="pricing-card reveal">
            <div className="pricing-header">
              <span className="pricing-plan-name">YO POWER</span>
              <div className="pricing-amount">
                <span className="pricing-dollar">$</span>
                <span className="pricing-number">100</span>
              </div>
              <span className="pricing-period">per month</span>
            </div>
            <p className="pricing-desc">15,000 yos</p>
            <p className="pricing-overage">Pay-per-use overage ($0.02/yo)</p>
            <a href={`${PLATFORM_URL}/auth`} className="btn btn-primary btn-lg btn-full group">
              <span className="btn-label">Get started</span>
              <span className="btn-fill"></span>
            </a>
          </div>
        </div>

        <p className="pricing-note">Cancel anytime.</p>
        <p className="pricing-enterprise">Need unlimited seats or dedicated support? <a href="mailto:sales@yosup.dev">Contact sales</a></p>
      </div>
    </section>
  );
}
