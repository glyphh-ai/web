const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.yosup.dev';

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <h2 className="section-title">Simple, transparent pricing</h2>
        <p className="section-subtitle">
          Free 14-day trial. After that, $9/mo for the network &mdash; you bring your own provider keys, so there's no token spread.
        </p>

        <div className="pricing-grid pricing-grid-two">
          {/* Free trial */}
          <div className="pricing-card reveal">
            <div className="pricing-header">
              <span className="pricing-plan-name">YO FREE</span>
              <div className="pricing-amount">
                <span className="pricing-dollar">$</span>
                <span className="pricing-number">0</span>
              </div>
              <span className="pricing-period">14-day trial</span>
            </div>
            <p className="pricing-desc">Full access — run swarms, MCP, skills, and vibes. Every feature.</p>
            <a href={`${PLATFORM_URL}/auth`} className="btn btn-secondary btn-lg btn-full group">
              <span className="btn-label">Download now</span>
              <span className="btn-fill"></span>
            </a>
          </div>

          {/* Pro */}
          <div className="pricing-card pricing-card-popular reveal">
            <div className="pricing-header">
              <span className="pricing-plan-name">YO PRO</span>
              <div className="pricing-amount">
                <span className="pricing-dollar">$</span>
                <span className="pricing-number">9</span>
              </div>
              <span className="pricing-period">per month</span>
            </div>
            <p className="pricing-desc">The full workspace — swarms, MCP, skills, vibes. Bring your own keys for inference — yo takes no markup on tokens.</p>
            <a href={`${PLATFORM_URL}/auth`} className="btn btn-primary btn-lg btn-full group">
              <span className="btn-label">Get started</span>
              <span className="btn-fill"></span>
            </a>
          </div>
        </div>

        <p className="pricing-note">Cancel anytime.</p>
        <p className="pricing-tax">Prices are exclusive of applicable taxes and duties, including VAT and applicable sales tax.</p>
        <p className="pricing-enterprise">Need unlimited seats or dedicated support? <a href="mailto:sales@yosup.dev">Contact sales</a></p>
      </div>
    </section>
  );
}
