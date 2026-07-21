const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';

// Credit billing: one currency for everything Glyphh does — model calls,
// tools, compute. Each tier bundles a monthly allowance; open-weight models
// cost a fraction of frontier ones. Prepaid; never billed in arrears.
const TIERS = [
  {
    name: 'Free',
    price: '0',
    period: 'forever',
    credits: '15 credits / month',
    seats: '1 seat',
    popular: false,
    desc: 'The full workspace and the agent, on the house — no card.',
    features: [
      'The full workspace — the agent, your apps, saved layouts',
      'Frontier and open-weight models in one picker',
      'Loops built in — plan, work, check',
      '15 credits to spend on any model',
    ],
    excluded: ['Connected services (3,500+ apps)', 'Team members — Free is single-seat'],
    cta: 'Download now',
    btn: 'btn-secondary',
  },
  {
    name: 'Basic',
    price: '20',
    period: 'per month',
    credits: '1,000 credits / month',
    seats: 'Up to 5 seats',
    popular: true,
    desc: 'Real automation across your connected services, every month.',
    features: [
      'Everything in Free, plus:',
      '1,000 compute credits every month',
      'Invite your team — up to 5 seats',
      'Connected services — 3,500+ apps',
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
    credits: '2,000 credits / month',
    seats: 'Up to 10 seats',
    popular: false,
    desc: 'For daily drivers — double the credits and higher limits.',
    features: ['Everything in Basic, plus:', '2,000 monthly compute credits', 'Up to 10 seats', 'Higher rate limits'],
    excluded: [],
    cta: 'Get started',
    btn: 'btn-secondary',
  },
  {
    name: 'Enterprise',
    contactSales: true,
    priceLabel: 'Custom',
    period: 'contact sales',
    credits: 'Volume credits',
    seats: '25+ seats',
    popular: false,
    desc: 'SSO, SCIM, and a shared workspace for your whole company.',
    features: ['Everything in Pro, plus:', 'SSO & SCIM through your IdP (Okta, Entra, …)', 'One shared org for your whole team', 'Volume credits + priority support'],
    excluded: [],
    cta: 'Contact sales',
    btn: 'btn-secondary',
  },
];

const SALES_EMAIL = 'sales@glyphh.ai';

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <h2 className="section-title">Simple, transparent pricing</h2>
        <p className="section-subtitle">
          One credit system for everything — model calls, tools, and compute.
          Open-weight models cost a fraction of frontier ones, and every
          charge is itemized in your usage feed.
        </p>

        <div className="pricing-grid pricing-grid-four">
          {TIERS.map((t) => (
            <div key={t.name} className={`pricing-card reveal${t.popular ? ' pricing-card-popular' : ''}`}>
              <div className="pricing-header">
                <span className="pricing-plan-name">{t.name}</span>
                <div className="pricing-amount">
                  {t.contactSales ? (
                    <span className="pricing-number">{t.priceLabel}</span>
                  ) : (
                    <>
                      <span className="pricing-dollar">$</span>
                      <span className="pricing-number">{t.price}</span>
                    </>
                  )}
                </div>
                <span className="pricing-period">{t.period}</span>
              </div>
              <p className="pricing-credits">{t.credits}</p>
              <p className="pricing-seats">{t.seats}</p>
              <p className="pricing-desc">{t.desc}</p>
              <ul className="pricing-features">
                {t.features.map((f, i) => (
                  <li key={i}><span className="check">✓</span> {f}</li>
                ))}
                {t.excluded.map((f, i) => (
                  <li key={`x${i}`} className="pricing-excluded"><span className="x">✗</span> {f}</li>
                ))}
              </ul>
              <a
                href={t.contactSales ? `mailto:${SALES_EMAIL}?subject=${encodeURIComponent('Glyphh Enterprise')}` : `${PLATFORM_URL}/auth`}
                className={`btn ${t.btn} btn-lg btn-full group`}
              >
                <span className="btn-label">{t.cta}</span>
                <span className="btn-fill"></span>
              </a>
            </div>
          ))}
        </div>

        <p className="pricing-note">Cancel anytime. Out of credits? Top up — prepaid, never billed in arrears. Every charge is itemized per tool call in your usage feed.</p>
        <p className="pricing-tax">Prices are exclusive of applicable taxes and duties, including VAT and applicable sales tax.</p>
        <p className="pricing-enterprise">Need unlimited seats or dedicated support? <a href="mailto:support@glyphh.ai">Contact sales</a></p>
      </div>
    </section>
  );
}
