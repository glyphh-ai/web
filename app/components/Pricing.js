import PricingCards from './PricingCards';

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';
const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.glyphh.ai';

// Dollars, always whole where they are whole: "$40", "$1", "$0.50".
const usd = (n) => `$${Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

// Plans = dollars per month, dollar for dollar. Every product draws on one
// monthly budget in dollars that Glyphh spends on the customer's behalf
// (today: calls through Glyphh, metered per token). A paid plan includes its
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
    popular: false,
    desc: 'The whole desktop and the agent, on the house. No card.',
    priceTitle: 'One seat',
    priceSub: 'Free for everyone.',
    lead: null,
    features: () => [
      'Glyphh Desktop: the agent, your apps, saved layouts',
      'Every loop: Claude Code, Codex, Gemini, Copilot, Cursor',
      'Glyphh Gateway, a 14-day trial on your own keys',
      'Connected services, 3,500+ apps',
      'Memory across every session',
    ],
    cta: 'Download now',
    btn: 'btn-secondary',
  },
  {
    tier: 'basic',
    name: 'Basic',
    priceUsd: 40,
    budgetUsd: 40,
    seats: 25,
    popular: true,
    desc: 'The full gateway and real automation for a team.',
    priceTitle: 'Standard seat',
    priceSub: 'Per seat / month.',
    lead: 'Everything in Free, plus:',
    features: (s) => [
      'Glyphh Gateway in full: every provider, your own keys, never marked up',
      'Glyphh Router: burn down or reserve your vendor plans',
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
    desc: 'For teams that govern: roles, budgets, and the highest limits.',
    priceTitle: 'Premium seat',
    priceSub: 'Per seat / month.',
    lead: 'Everything in Basic, plus:',
    features: (s) => [
      'Role governance: models, budgets and keys per team',
      'The org Library: tasks, agents and skills, reviewed and role-gated',
      'Org default model and auto-only routing',
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
    const { features, ...plain } = t;
    return {
      ...plain,
      priceFigure: t.priceFigure ?? usd(price),
      featureList: features(seats),
    };
  });

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <h2 className="section-title">Simple, transparent pricing</h2>
        <p className="section-subtitle">
          A plan&rsquo;s price is its monthly budget, dollar for dollar. That
          budget is your usage limit for what Glyphh runs for you. Your AI runs
          on your own keys at your vendor&rsquo;s price, and every charge is
          itemized in your usage feed.
        </p>

        <PricingCards tiers={tiers} salesEmail={SALES_EMAIL} platformUrl={PLATFORM_URL} />

        <p className="pricing-footnote reveal">
          Each plan&rsquo;s budget is its monthly limit. Spend it and calls through Glyphh pause until you add
          funds or the month turns. Plan budget resets every month; funds you add never expire. Cancel
          anytime. See our <a href="/terms">Terms of Use</a>.
        </p>
        <p className="pricing-tax">Prices are exclusive of applicable taxes and duties, including VAT and applicable sales tax.</p>
      </div>
    </section>
  );
}
