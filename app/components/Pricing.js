import PricingCards from './PricingCards';

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';
const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.glyphh.ai';

// Dollars, always whole where they are whole: "$40", "$1", "$0.50".
const usd = (n) => `$${Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

// Plans = dollars per month, dollar for dollar (his orders, 2026-09-29: no BYOK;
// "Solo: 40%, Basic: 30%, Pro: 20%. Solo is going to be 20.00 per month…
// Enterprise is per customer"). A paid plan's price is its monthly budget; every
// paid plan runs every model at its own rate, and the bigger the plan, the
// better the rate. Free (his order, 2026-09-30) is $0 with $1 a month for
// connections: the desktop, your own CLI and connected services, and no Glyphh
// models or memory. Prepaid; never billed in arrears.
//
// NUMBERS (price, budget, seats) are fed from the server's super-admin plan
// catalog via GET /api/public/pricing (`monthlyUsdCents`, `poolUsdPerMonth`,
// `maxSeats`); the values below are the offline fallback so the page never
// breaks when the API is unreachable. The marketing bullets are template
// functions over those numbers, so copy stays here and figures stay
// server-truth. Each model's rate per plan is ModelCatalog's, from the server.
const TIERS = [
  {
    tier: 'free',
    name: 'Free',
    priceUsd: 0,
    budgetUsd: 1,
    seats: 1,
    popular: false,
    desc: 'The desktop and your own CLI. No card required.',
    priceTitle: 'One seat',
    priceSub: 'Free for everyone.',
    lead: null,
    features: (_s, budget) => [
      'Glyphh Desktop and the workspace',
      'Your own CLI: Claude Code, Codex, Gemini, Copilot, Cursor, Glyphh CLI',
      `Connected services, 3,500+ apps, with ${usd(budget)} a month included`,
    ],
    cta: 'Download now',
    href: '/#download',
    btn: 'btn-secondary',
  },
  {
    tier: 'solo',
    name: 'Solo',
    priceUsd: 20,
    budgetUsd: 20,
    seats: 1,
    popular: false,
    desc: 'One person, every model.',
    priceTitle: 'One seat',
    priceSub: 'Per month.',
    lead: 'Everything in Free, plus:',
    features: () => [
      'The Glyphh agent, your apps, saved layouts',
      'Every model we run, at the Solo rate',
      'Memory across every session',
      'Add funds any time',
    ],
    cta: 'Get started',
    btn: 'btn-secondary',
  },
  {
    tier: 'basic',
    name: 'Basic',
    priceUsd: 40,
    budgetUsd: 40,
    seats: 25,
    popular: true,
    desc: 'Every model and real automation for a team.',
    priceTitle: 'Standard seat',
    priceSub: 'Per seat / month.',
    lead: 'Everything in Solo, plus:',
    features: (s) => [
      'A better rate on every model',
      `Invite your team, up to ${s} seats`,
      'Team budgets and rate limits in dollars',
      'Logging, alerts and a daily spend report',
      'Usage itemized per call, in dollars',
    ],
    cta: 'Get started',
    btn: 'btn-primary',
  },
  {
    tier: 'pro',
    name: 'Pro',
    priceUsd: 150,
    budgetUsd: 150,
    seats: 100,
    popular: false,
    desc: 'For teams that govern: roles, budgets, and the best rates.',
    priceTitle: 'Premium seat',
    priceSub: 'Per seat / month.',
    lead: 'Everything in Basic, plus:',
    features: (s) => [
      'Our best self-serve rate on every model',
      'Role governance: models, budgets and keys per team',
      'The org Library: tasks, agents and skills, reviewed and role-gated',
      'Org default model and auto-routers',
      'Memory policy for the whole org',
      `Up to ${s} seats`,
      'Highest rate limits',
    ],
    cta: 'Get started',
    btn: 'btn-secondary',
  },
  {
    tier: 'enterprise',
    name: 'Enterprise',
    priceUsd: 0,
    budgetUsd: 0,
    seats: 0,
    popular: false,
    contactSales: true,
    desc: 'For large organizations running at scale.',
    priceTitle: 'Seat price + usage',
    priceFigure: 'Custom',
    priceSub: 'Sized to you, on one invoice.',
    lead: 'Everything in Pro, plus:',
    features: () => [
      'Rates set for you',
      'Single sign-on and SCIM through your IdP',
      'One shared organization for the whole company',
      'Admins set org, team and member spend limits',
      'Audit log of every change',
      'Priority support',
    ],
    cta: 'Contact sales',
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
    const seats = p?.maxSeats ?? t.seats;
    const price = p ? p.monthlyUsdCents / 100 : t.priceUsd;
    const budget = p?.poolUsdPerMonth ?? t.budgetUsd;
    const { features, ...plain } = t;
    return {
      ...plain,
      priceFigure: t.priceFigure ?? usd(price),
      featureList: features(seats, budget),
    };
  });

  return (
    <section className="ix-section" id="pricing">
      <div className="ix-section-head">
        <div>
          <span className="qs-kicker">Plans</span>
          <h2 className="ix-h2">A plan&rsquo;s price is its monthly budget.</h2>
          <p className="ix-desc">
            Start free with your own CLI and connections. Every paid plan runs every model, your budget is spent at
            your plan&rsquo;s rate, the bigger the plan the better the rate, and every charge is itemized in your usage
            feed.
          </p>
        </div>
      </div>

      <PricingCards tiers={tiers} salesEmail={SALES_EMAIL} platformUrl={PLATFORM_URL} />

      <p className="pp-note">
        Each plan&rsquo;s budget is its monthly limit. Spend it and calls pause until you add funds or the month
        turns. Plan budget resets every month; funds you add never expire. Cancel anytime. See our{' '}
        <a href="/terms">Terms of Use</a>. Prices are exclusive of applicable taxes and duties, including VAT and
        applicable sales tax.
      </p>
    </section>
  );
}
