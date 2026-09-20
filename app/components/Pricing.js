const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';
const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.glyphh.ai';

// Dollars, always whole where they are whole: "$40", "$1", "$0.50".
const usd = (n) => `$${Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

// Plans = dollars per month, dollar for dollar. Every product draws on one
// monthly budget in dollars that Glyphh spends on the customer's behalf
// (today: connector calls, metered per token). A paid plan includes its
// price as budget per seat per month; Free includes $1. Model calls run on
// the customer's own keys at the vendor's price and never touch the budget.
// Prepaid; never billed in arrears.
//
// NUMBERS (price, budget, seats) are fed from the server's super-admin plan
// catalog via GET /api/public/pricing (`monthlyUsdCents`, `poolUsdPerMonth`,
// `maxSeats`); the values below are the offline fallback so the page never
// breaks when the API is unreachable. The marketing bullets are template
// functions over those numbers, so copy stays here and figures stay
// server-truth.
const TIERS = [
  {
    tier: 'free',
    name: 'Free',
    priceUsd: 0,
    budgetUsd: 1,
    seats: 1,
    period: 'forever',
    popular: false,
    desc: 'The full workspace and the agent, on the house — no card.',
    features: (b) => [
      'Glyphh Desktop — the agent, your apps, saved layouts',
      'Glyphh Gateway — 14-day trial, your own keys',
      `Connected services — ${usd(b)} of budget a month\u00A0*`,
      'Loops built in — plan, work, check',
    ],
    excluded: ['Team members — Free is single-seat', 'Lower rate limits'],
    cta: 'Download now',
    btn: 'btn-secondary',
  },
  {
    tier: 'basic',
    name: 'Basic',
    priceUsd: 40,
    budgetUsd: 40,
    seats: 25,
    period: 'per seat / month',
    popular: true,
    desc: 'The full gateway and real automation, every month.',
    features: (b, s) => [
      'Everything in Free, plus:',
      'Glyphh Gateway — full, no trial, every provider',
      `${usd(b)} of budget per seat, every month`,
      `Invite your team — up to ${s} seats`,
      'Connected services — 3,500+ apps',
    ],
    excluded: [],
    cta: 'Get started',
    btn: 'btn-primary',
  },
  {
    tier: 'pro',
    name: 'Pro',
    priceUsd: 150,
    budgetUsd: 150,
    seats: 100,
    period: 'per seat / month',
    popular: false,
    desc: 'For teams that govern — roles, budgets, and the highest limits.',
    features: (b, s) => [
      'Everything in Basic, plus:',
      'Role governance — models, budgets, keys per team',
      'The org Library — publish tasks, agents & skills to your team, reviewed and role-gated',
      `${usd(b)} of budget per seat, every month`,
      `Up to ${s} seats`,
      'Highest rate limits',
    ],
    excluded: [],
    cta: 'Get started',
    btn: 'btn-secondary',
  },
];

const SALES_EMAIL = 'sales@glyphh.ai';

/** The server's public plan catalog — numbers curated by the super admin.
 *  Null on any failure: the static fallbacks above render instead. */
async function fetchCatalog() {
  try {
    // Hard 1.5s budget: a marketing page must NEVER hang on the API — a
    // stalled server (mid-restart, unreachable) renders the fallbacks
    // instead of spinning the whole SSR response.
    const res = await fetch(`${API_URL}/api/public/pricing`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return null;
    const body = await res.json();
    return Array.isArray(body.plans) && body.plans.length ? body.plans : null;
  } catch {
    return null;
  }
}

export default async function Pricing() {
  const catalog = await fetchCatalog();

  const tiers = TIERS.map((t) => {
    const p = catalog?.find((x) => x.tier === t.tier);
    const budget = p?.poolUsdPerMonth ?? t.budgetUsd;
    const seats = p?.maxSeats ?? t.seats;
    return {
      ...t,
      price: String(Math.round(p ? p.monthlyUsdCents / 100 : t.priceUsd)),
      budgetLine: seats <= 1
        ? `${usd(budget)} of budget a month`
        : `${usd(budget)} of budget per seat / month`,
      seatsLine: t.contactSales
        ? `${seats}+ seats`
        : seats <= 1 ? '1 seat' : `Up to ${seats} seats`,
      featureList: t.features(budget, seats),
    };
  });

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <h2 className="section-title">Simple, transparent pricing</h2>
        <p className="section-subtitle">
          One budget for everything Glyphh does for you, in dollars. A
          plan&rsquo;s price is its monthly budget, dollar for dollar. Your AI
          runs on your own keys at your vendor&rsquo;s price, and every charge
          is itemized in your usage feed.
        </p>

        <div className="pricing-grid">
          {tiers.map((t) => (
            <div key={t.tier} className={`pricing-card reveal${t.popular ? ' pricing-card-popular' : ''}`}>
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
              <p className="pricing-usage">{t.budgetLine}</p>
              <p className="pricing-seats">{t.seatsLine}</p>
              <p className="pricing-desc">{t.desc}</p>
              <ul className="pricing-features">
                {t.featureList.map((f, i) => (
                  <li key={i}><span className="check">✓</span> {f}</li>
                ))}
                {t.excluded.map((f, i) => (
                  <li key={`x${i}`} className="pricing-excluded"><span className="x">✗</span> {f}</li>
                ))}
              </ul>
              <a
                href={t.contactSales ? `mailto:${SALES_EMAIL}?subject=${encodeURIComponent('Glyphh Enterprise')}` : PLATFORM_URL}
                className={`btn ${t.btn} btn-lg btn-full group`}
              >
                <span className="btn-label">{t.cta}</span>
                <span className="btn-fill"></span>
              </a>
            </div>
          ))}
        </div>

        {/* Disclosures the free tier's abuse gates require (2026-09-01):
            reduced grant for unverified sign-ins + the model allow-list. */}
        <p className="pricing-footnote reveal">
          * The full Free budget requires a verified sign-in (Google or
          Apple). Accounts created with email alone start with a reduced
          budget until an identity is verified. Plan-included budget resets
          every month; funds you add never expire. Budgets, included features,
          and limits may change. See our <a href="/terms">Terms of Use</a>.
        </p>

        {/* Enterprise / custom — a compact band under the tiers instead of a
            fourth "Custom" card (mirrors the home page's one-pricing band). */}
        <div className="prods-pricing reveal pricing-enterprise-band">
          <div className="prods-pricing-copy">
            <h3>Need SSO, SCIM, or a bigger budget?</h3>
            <p>
              Enterprise adds single sign-on and SCIM through your IdP (Okta,
              Entra, …), one shared org for your whole company, a custom
              budget, and priority support. Custom pricing — talk to us.
            </p>
          </div>
          <a
            href={`mailto:${SALES_EMAIL}?subject=${encodeURIComponent('Glyphh Enterprise')}`}
            className="btn btn-secondary btn-lg group"
          >
            <span className="btn-label">Contact sales</span>
            <span className="btn-fill"></span>
          </a>
        </div>

        <p className="pricing-note">Cancel anytime. Budget spent? Add funds, dollar for dollar, prepaid, never billed in arrears. Every charge is itemized per tool call in your usage feed.</p>
        <p className="pricing-tax">Prices are exclusive of applicable taxes and duties, including VAT and applicable sales tax.</p>
      </div>
    </section>
  );
}
