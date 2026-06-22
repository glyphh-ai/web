const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';

const FREE_FEATURES = [
  'The full native workspace — every app as a panel',
  'Built-in agent + multi-agent swarms',
  'Skills + Flows (RPA automation)',
  'Automatic app-level capture & local recall',
  'Bring your own provider keys — no token markup',
];

const FREE_EXCLUDED = [
  'MCP — connect servers & use Glyphh as a server',
  'Pipedream — 3,500+ app connectors',
];

const PRO_FEATURES = [
  'Everything in Free, plus:',
  'MCP — connect any server + expose Glyphh as an MCP server',
  'Pipedream — 3,500+ app connectors',
  'Cloud sync across machines',
  'Bring your own keys — still no token markup',
];

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <h2 className="section-title">Simple, transparent pricing</h2>
        <p className="section-subtitle">
          Free forever — bring your own keys and the whole workspace is yours. Go Pro for MCP and Pipedream. No token markup, ever.
        </p>

        <div className="pricing-grid pricing-grid-two">
          {/* Free */}
          <div className="pricing-card reveal">
            <div className="pricing-header">
              <span className="pricing-plan-name">Free</span>
              <div className="pricing-amount">
                <span className="pricing-dollar">$</span>
                <span className="pricing-number">0</span>
              </div>
              <span className="pricing-period">forever</span>
            </div>
            <p className="pricing-desc">The full workspace with your own keys — no trial, no credit card, no time limit.</p>
            <ul className="pricing-features">
              {FREE_FEATURES.map((f, i) => (
                <li key={i}><span className="check">✓</span> {f}</li>
              ))}
              {FREE_EXCLUDED.map((f, i) => (
                <li key={`x${i}`} className="pricing-excluded"><span className="x">✗</span> {f}</li>
              ))}
            </ul>
            <a href={`${PLATFORM_URL}/auth`} className="btn btn-secondary btn-lg btn-full group">
              <span className="btn-label">Download now</span>
              <span className="btn-fill"></span>
            </a>
          </div>

          {/* Pro */}
          <div className="pricing-card pricing-card-popular reveal">
            <div className="pricing-header">
              <span className="pricing-plan-name">Pro</span>
              <div className="pricing-amount">
                <span className="pricing-dollar">$</span>
                <span className="pricing-number">12</span>
              </div>
              <span className="pricing-period">per month</span>
            </div>
            <p className="pricing-desc">Add the MCP layer — connect & expose servers — and Pipedream’s 3,500+ apps.</p>
            <ul className="pricing-features">
              {PRO_FEATURES.map((f, i) => (
                <li key={i}><span className="check">✓</span> {f}</li>
              ))}
            </ul>
            <a href={`${PLATFORM_URL}/auth`} className="btn btn-primary btn-lg btn-full group">
              <span className="btn-label">Get started</span>
              <span className="btn-fill"></span>
            </a>
          </div>
        </div>

        <p className="pricing-note">Cancel anytime.</p>
        <p className="pricing-tax">Prices are exclusive of applicable taxes and duties, including VAT and applicable sales tax.</p>
        <p className="pricing-enterprise">Need unlimited seats or dedicated support? <a href="mailto:support@glyphh.ai">Contact sales</a></p>
      </div>
    </section>
  );
}
