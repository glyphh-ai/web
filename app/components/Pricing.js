const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';
const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.glyphh.ai';

const fmt = (n) => Number(n).toLocaleString('en-US');

// Credit billing: one currency for everything Glyphh does — model calls,
// tools, compute. Each tier bundles a monthly allowance; open-weight models
// cost a fraction of frontier ones. Prepaid; never billed in arrears.
//
// NUMBERS (price, credits, seats) are fed from the server's super-admin plan
// catalog via GET /api/public/pricing; the values below are the offline
// fallback so the page never breaks when the API is unreachable. The
// marketing bullets are template functions over those numbers, so copy stays
// here and figures stay server-truth.
const TIERS = [
  {
    tier: 'free',
    name: 'Free',
    priceUsd: 0,
    credits: 15,
    seats: 1,
    period: 'forever',
    popular: false,
    desc: 'The full workspace and the agent, on the house — no card.',
    features: (c) => [
      'Glyphh Desktop — the agent, your apps, saved layouts',
      'Glyphh Gateway — 14-day trial, your own keys',
      `Connected services — ${fmt(c)} credits a month to spend\u00A0*`,
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
    credits: 2000,
    seats: 10,
    period: 'per seat / month',
    popular: true,
    desc: 'The full gateway and real automation, every month.',
    features: (c, s) => [
      'Everything in Free, plus:',
      'Glyphh Gateway — full, no trial, every provider',
      `${fmt(c)} compute credits per seat, every month`,
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
    credits: 10000,
    seats: 25,
    period: 'per seat / month',
    popular: false,
    desc: 'For teams that govern — roles, budgets, and the highest limits.',
    features: (c, s) => [
      'Everything in Basic, plus:',
      'Role governance — models, budgets, keys per team',
      `${fmt(c)} compute credits per seat, every month`,
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
    const credits = p?.monthlyCredits ?? t.credits;
    const seats = p?.maxSeats ?? t.seats;
    return {
      ...t,
      price: String(Math.round(p ? p.monthlyUsdCents / 100 : t.priceUsd)),
      creditsLine: t.creditsLine ?? `${fmt(credits)} credits / month`,
      seatsLine: t.contactSales
        ? `${seats}+ seats`
        : seats <= 1 ? '1 seat' : `Up to ${seats} seats`,
      featureList: t.features(credits, seats),
    };
  });

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <h2 className="section-title">Simple, transparent pricing</h2>
        <p className="section-subtitle">
          One credit system for everything — model calls, tools, and compute.
          Open-weight models cost a fraction of frontier ones, and every
          charge is itemized in your usage feed.
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
              <p className="pricing-credits">{t.creditsLine}</p>
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
          * The full Free allowance requires a verified sign-in (Google or
          Apple). Accounts created with email alone start with a reduced
          allowance until an identity is verified. Free credits spend on the
          Free tier&apos;s included models; frontier models are available on
          paid plans. Allowances, included models, and limits may change —
          see our <a href="/terms">Terms of Use</a>.
        </p>

        {/* Enterprise / custom — a compact band under the tiers instead of a
            fourth "Custom" card (mirrors the home page's one-pricing band). */}
        <div className="prods-pricing reveal pricing-enterprise-band">
          <div className="prods-pricing-copy">
            <h3>Need SSO, SCIM, or volume credits?</h3>
            <p>
              Enterprise adds single sign-on and SCIM through your IdP (Okta,
              Entra, …), one shared org for your whole company, volume credits,
              and priority support. Custom pricing — talk to us.
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

        <p className="pricing-note">Cancel anytime. Out of credits? Top up — prepaid, never billed in arrears. Every charge is itemized per tool call in your usage feed.</p>
        <p className="pricing-tax">Prices are exclusive of applicable taxes and duties, including VAT and applicable sales tax.</p>
      </div>
    </section>
  );
}
