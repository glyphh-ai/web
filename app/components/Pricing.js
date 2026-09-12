const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';
const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.glyphh.ai';

// Glyphh Desktop is the product and the plans are flat seat prices — no
// credits, no allowances (his order, 2026-09-12). Free is a 14-day trial of
// the app; Basic is the app per month; Teams is the same app at a discounted
// per-seat price once you're buying at scale.
//
// NUMBERS (price, seats) are fed from the server's super-admin plan catalog
// via GET /api/public/pricing; the values below are the offline fallback so
// the page never breaks when the API is unreachable. Copy stays here.
const TIERS = [
  {
    tier: 'free',
    name: 'Free',
    priceUsd: 0,
    seats: 1,
    period: '14-day trial',
    popular: false,
    desc: 'The full desktop app for two weeks — no card, nothing held back.',
    features: () => [
      'Glyphh Desktop — the agent, your apps, saved layouts',
      'Every model in the picker, or bring your own keys',
      'Connected services — 3,500+ apps',
      'Loops built in — plan, work, check',
    ],
    excluded: ['Single seat', 'Ends after 14 days'],
    cta: 'Start your trial',
    btn: 'btn-secondary',
  },
  {
    tier: 'basic',
    name: 'Basic',
    priceUsd: 40,
    seats: 1,
    period: 'per month',
    popular: true,
    desc: 'Glyphh Desktop, yours every month.',
    features: () => [
      'Everything in the trial, without the clock',
      'Every model in the picker, or bring your own keys',
      'Connected services — 3,500+ apps',
      'Loops built in — plan, work, check',
    ],
    excluded: [],
    cta: 'Get started',
    btn: 'btn-primary',
  },
  {
    tier: 'pro',
    name: 'Teams',
    priceUsd: 30,
    seats: 25,
    period: 'per seat / month',
    popular: false,
    desc: 'The same app for your whole team, at a discount that grows with the seat count.',
    features: (s) => [
      'Everything in Basic, for every seat',
      `Up to ${s} seats — discounted at scale`,
      'Shared org connections, skills and agents',
      'Roles — models and tools per team',
    ],
    excluded: [],
    cta: 'Get started',
    btn: 'btn-secondary',
  },
];

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
    const seats = p?.maxSeats ?? t.seats;
    return {
      ...t,
      price: String(Math.round(p ? p.monthlyUsdCents / 100 : t.priceUsd)),
      seatsLine: seats <= 1 ? '1 seat' : `Up to ${seats} seats`,
      featureList: t.features(seats),
    };
  });

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <h2 className="section-title">Simple, transparent pricing</h2>
        <p className="section-subtitle">
          One app, one flat price. Try it free for 14 days, then pay per
          month — or per seat, cheaper, when your team comes along.
        </p>

        <div className="pricing-grid">
          {tiers.map((t) => (
            <div key={t.tier} className={`pricing-card reveal${t.popular ? ' pricing-card-popular' : ''}`}>
              <div className="pricing-header">
                <span className="pricing-plan-name">{t.name}</span>
                <div className="pricing-amount">
                  <span className="pricing-dollar">$</span>
                  <span className="pricing-number">{t.price}</span>
                </div>
                <span className="pricing-period">{t.period}</span>
              </div>
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
              <a href={PLATFORM_URL} className={`btn ${t.btn} btn-lg btn-full group`}>
                <span className="btn-label">{t.cta}</span>
                <span className="btn-fill"></span>
              </a>
            </div>
          ))}
        </div>

        <p className="pricing-note">Cancel anytime. Bring your own keys and your provider bills you directly — never marked up.</p>
        <p className="pricing-tax">Prices are exclusive of applicable taxes and duties, including VAT and applicable sales tax.</p>
      </div>
    </section>
  );
}
