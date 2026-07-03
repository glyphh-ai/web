const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';

// Compute-credit billing: you bring your own AI (never marked up), and each
// tier bundles a monthly allowance of compute credits — 1 credit = 30 seconds
// of tool compute (ceiling, 1-credit minimum per call). Browsing and listing
// are always free. Prepaid; never billed in arrears.
const TIERS = [
  {
    name: 'Free',
    price: '0',
    period: 'forever',
    credits: '15 credits / month',
    popular: false,
    desc: 'The full workspace, driven by the AI you already have — no card.',
    features: [
      'The full native workspace — apps, layouts, command palette',
      'Connect your own AI over the MCP relay',
      'Native window control on Mac + Windows',
      'Bring your own LLM — no token markup, ever',
    ],
    excluded: ['Connected services (3,500+ apps)'],
    cta: 'Download now',
    btn: 'btn-secondary',
  },
  {
    name: 'Basic',
    price: '20',
    period: 'per month',
    credits: '1,000 credits / month',
    popular: true,
    desc: 'Real automation across your connected services, every month.',
    features: [
      'Everything in Free, plus:',
      '1,000 compute credits every month',
      'Connected services — 3,500+ apps via the relay',
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
    popular: false,
    desc: 'For daily drivers — double the credits and higher limits.',
    features: ['Everything in Basic, plus:', '2,000 monthly compute credits', 'Higher rate limits'],
    excluded: [],
    cta: 'Get started',
    btn: 'btn-secondary',
  },
  {
    name: 'Advanced',
    price: '200',
    period: 'per month',
    credits: '10,000 credits / month',
    popular: false,
    desc: 'Maximum allowance and caps for power users and teams.',
    features: ['Everything in Pro, plus:', '10,000 monthly compute credits', 'Highest caps + priority support'],
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
          Bring your own AI — Glyphh never resells tokens. Plans meter only the
          compute Glyphh does for you: 1 credit = 30 seconds of tool work, and
          browsing or listing your tools is always free.
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

        <p className="pricing-note">Cancel anytime. Out of credits? Top up — prepaid, never billed in arrears. Every charge is itemized per tool call in your usage feed.</p>
        <p className="pricing-tax">Prices are exclusive of applicable taxes and duties, including VAT and applicable sales tax.</p>
        <p className="pricing-enterprise">Need unlimited seats or dedicated support? <a href="mailto:support@glyphh.ai">Contact sales</a></p>
      </div>
    </section>
  );
}
