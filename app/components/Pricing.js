const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';

// Proxy-billing model: frontier models are built in and metered as prepaid
// credits — no API key needed to start. Each tier bundles a monthly credit
// allowance + the integration moat (MCP + Pipedream). BYOK stays available,
// unbilled, for power users.
const TIERS = [
  {
    name: 'Free',
    price: '0',
    period: 'forever',
    credits: '50 credits / month',
    popular: false,
    desc: 'The full workspace with frontier models built in — no key, no card.',
    features: [
      'The full native workspace — every app as a panel',
      'Frontier models built in (Haiku) — no API key',
      'Agent + multi-agent swarms, Skills + Flows',
      'Bring your own key for any model — unbilled',
    ],
    excluded: ['MCP + Pipedream integrations'],
    cta: 'Download now',
    btn: 'btn-secondary',
  },
  {
    name: 'Basic',
    price: '20',
    period: 'per month',
    credits: '1,000 credits / month',
    popular: true,
    desc: 'All frontier models on credits, plus the MCP + Pipedream integration layer.',
    features: [
      'Everything in Free, plus:',
      'All frontier models on credits (Sonnet, Opus)',
      'MCP — connect & expose servers',
      'Pipedream — 3,500+ app connectors',
      'Cloud sync across machines',
    ],
    excluded: [],
    cta: 'Get started',
    btn: 'btn-primary',
  },
  {
    name: 'Pro',
    price: '50',
    period: 'per month',
    credits: '3,500 credits / month',
    popular: false,
    desc: 'For heavier agentic use — 3.5× the monthly credits and higher limits.',
    features: ['Everything in Basic, plus:', '3.5× the monthly credits', 'Higher rate limits'],
    excluded: [],
    cta: 'Get started',
    btn: 'btn-secondary',
  },
  {
    name: 'Advanced',
    price: '200',
    period: 'per month',
    credits: '16,000 credits / month',
    popular: false,
    desc: 'Maximum allowance and caps for power users and teams.',
    features: ['Everything in Pro, plus:', '16,000 monthly credits', 'Highest caps + priority'],
    excluded: [],
    cta: 'Get started',
    btn: 'btn-secondary',
  },
];

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <h2 className="section-title">Simple, transparent pricing</h2>
        <p className="section-subtitle">
          Frontier models are built in and metered as prepaid credits — start free, no API key. Every plan includes the integration layer. Prefer your own key? Run it unbilled.
        </p>

        <div className="pricing-grid pricing-grid-four">
          {TIERS.map((t) => (
            <div key={t.name} className={`pricing-card reveal${t.popular ? ' pricing-card-popular' : ''}`}>
              <div className="pricing-header">
                <span className="pricing-plan-name">{t.name}</span>
                <div className="pricing-amount">
                  <span className="pricing-dollar">$</span>
                  <span className="pricing-number">{t.price}</span>
                </div>
                <span className="pricing-period">{t.period}</span>
              </div>
              <p className="pricing-credits">{t.credits}</p>
              <p className="pricing-desc">{t.desc}</p>
              <ul className="pricing-features">
                {t.features.map((f, i) => (
                  <li key={i}><span className="check">✓</span> {f}</li>
                ))}
                {t.excluded.map((f, i) => (
                  <li key={`x${i}`} className="pricing-excluded"><span className="x">✗</span> {f}</li>
                ))}
              </ul>
              <a href={`${PLATFORM_URL}/auth`} className={`btn ${t.btn} btn-lg btn-full group`}>
                <span className="btn-label">{t.cta}</span>
                <span className="btn-fill"></span>
              </a>
            </div>
          ))}
        </div>

        <p className="pricing-note">Cancel anytime. Out of credits? Buy more — never billed in arrears.</p>
        <p className="pricing-tax">Prices are exclusive of applicable taxes and duties, including VAT and applicable sales tax.</p>
        <p className="pricing-enterprise">Need unlimited seats or dedicated support? <a href="mailto:support@glyphh.ai">Contact sales</a></p>
      </div>
    </section>
  );
}
