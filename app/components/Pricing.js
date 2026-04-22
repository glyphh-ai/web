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

        <div className="pricing-grid pricing-grid-three">
          {/* Free */}
          <div className="pricing-card reveal">
            <div className="pricing-header">
              <span className="pricing-plan-name">Free</span>
              <div className="pricing-amount">
                <span className="pricing-dollar">$</span>
                <span className="pricing-number">0</span>
              </div>
              <span className="pricing-period">/month</span>
            </div>
            <p className="pricing-desc">Get started with the basics.</p>
            <ul className="pricing-features">
              <li><span className="check">&#10003;</span> 10 apps</li>
              <li><span className="check">&#10003;</span> 5 skills</li>
              <li><span className="check">&#10003;</span> 5 layouts</li>
              <li><span className="check">&#10003;</span> All commands (.yo .sup .dip .drip)</li>
              <li className="pricing-excluded"><span className="x">&#10007;</span> No MCP servers</li>
              <li className="pricing-excluded"><span className="x">&#10007;</span> No cloud sync</li>
              <li className="pricing-excluded"><span className="x">&#10007;</span> No custom drips</li>
            </ul>
            <a href={`${PLATFORM_URL}/auth`} className="btn btn-secondary btn-lg btn-full group">
              <span className="btn-label">Get Started</span>
              <span className="btn-fill"></span>
            </a>
          </div>

          {/* Basic */}
          <div className="pricing-card reveal">
            <div className="pricing-header">
              <span className="pricing-plan-name">Basic</span>
              <div className="pricing-amount">
                <span className="pricing-dollar">$</span>
                <span className="pricing-number">8</span>
              </div>
              <span className="pricing-period">/seat/month</span>
            </div>
            <p className="pricing-desc">Unlimited everything for individuals and small teams.</p>
            <ul className="pricing-features">
              <li><span className="check">&#10003;</span> Unlimited apps</li>
              <li><span className="check">&#10003;</span> Unlimited skills / layouts</li>
              <li><span className="check">&#10003;</span> Custom layouts</li>
              <li><span className="check">&#10003;</span> Custom drips</li>
              <li><span className="check">&#10003;</span> Up to 5 seats</li>
              <li className="pricing-excluded"><span className="x">&#10007;</span> No MCP servers</li>
              <li className="pricing-excluded"><span className="x">&#10007;</span> No cloud sync</li>
            </ul>
            <a href={`${PLATFORM_URL}/auth`} className="btn btn-primary btn-lg btn-full group">
              <span className="btn-label">Start with Basic</span>
              <span className="btn-fill"></span>
            </a>
          </div>

          {/* Advanced */}
          <div className="pricing-card pricing-card-popular reveal">
            <div className="pricing-badge">Most Popular</div>
            <div className="pricing-header">
              <span className="pricing-plan-name">Advanced</span>
              <div className="pricing-amount">
                <span className="pricing-dollar">$</span>
                <span className="pricing-number">24</span>
              </div>
              <span className="pricing-period">/seat/month</span>
            </div>
            <p className="pricing-desc">Full power with MCP servers and connections.</p>
            <ul className="pricing-features">
              <li><span className="check">&#10003;</span> Everything in Basic</li>
              <li><span className="check">&#10003;</span> MCP servers</li>
              <li><span className="check">&#10003;</span> Cloud sync</li>
              <li><span className="check">&#10003;</span> Voice</li>
              <li><span className="check">&#10003;</span> Up to 10 seats</li>
              <li><span className="check">&#10003;</span> Priority support</li>
            </ul>
            <a href={`${PLATFORM_URL}/auth`} className="btn btn-primary btn-lg btn-full group">
              <span className="btn-label">Start with Advanced</span>
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
