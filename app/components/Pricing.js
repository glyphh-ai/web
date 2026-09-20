import PricingTabs from './PricingTabs';

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
    group: 'individual',
    name: 'Free',
    priceUsd: 0,
    budgetUsd: 1,
    seats: 1,
    popular: false,
    desc: 'The whole desktop and the agent, on the house. No card.',
    priceTitle: 'One seat',
    priceSub: 'Free for everyone. Sign in and you are working.',
    budgetSub: 'A dollar of connector calls a month, on us. *',
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
    group: 'team',
    name: 'Basic',
    priceUsd: 40,
    budgetUsd: 40,
    seats: 25,
    popular: true,
    desc: 'The full gateway and real automation for a team.',
    priceTitle: 'Standard seat',
    priceSub: 'Per seat / month, billed monthly. Cancel anytime.',
    budgetSub: 'Per seat, every month. The plan price, dollar for dollar.',
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
    group: 'team',
    name: 'Pro',
    priceUsd: 150,
    budgetUsd: 150,
    seats: 100,
    popular: false,
    desc: 'For teams that govern: roles, budgets, and the highest limits.',
    priceTitle: 'Premium seat',
    priceSub: 'Per seat / month, billed monthly. Cancel anytime.',
    budgetSub: 'Per seat, every month. Nearly four times Basic.',
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
    group: 'team',
    name: 'Enterprise',
    priceUsd: 0,
    budgetUsd: 0,
    seats: 0,
    popular: false,
    contactSales: true,
    desc: 'For large organizations running at scale.',
    priceTitle: 'Seat price + usage',
    priceFigure: 'Custom',
    priceSub: 'Seats and budget sized to you, on one invoice.',
    budgetFigure: 'Custom',
    budgetSub: 'A budget sized to your connector volume, at our published per-token rates.',
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

const GROUPS = [
  { key: 'individual', label: 'Individual' },
  { key: 'team', label: 'Team & Enterprise' },
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
    const price = p ? p.monthlyUsdCents / 100 : t.priceUsd;
    const { features, ...plain } = t;
    return {
      ...plain,
      priceFigure: t.priceFigure ?? usd(price),
      budgetFigure: t.budgetFigure ?? `${usd(budget)}${seats > 1 ? ' / seat' : ''}`,
      featureList: features(seats),
    };
  });

  const groups = GROUPS.map((g) => ({ ...g, tiers: tiers.filter((t) => t.group === g.key) }));

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

        <PricingTabs groups={groups} salesEmail={SALES_EMAIL} platformUrl={PLATFORM_URL} />

        {/* Disclosures the free tier's abuse gates require (2026-09-01):
            reduced grant for unverified sign-ins. */}
        <p className="pricing-footnote reveal">
          * The full Free budget requires a verified sign-in (Google or
          Apple). Accounts created with email alone start with a reduced
          budget until an identity is verified.
        </p>
        <p className="pricing-footnote reveal">
          <a href="/docs/budgets">Usage limits</a> apply: each plan&rsquo;s budget is its monthly limit for
          connector calls. When it is spent, those calls pause until you add funds or the month turns.
          Plan-included budget resets every month; funds you add never expire. Admins set their own spend
          limits, in dollars, on their own keys. Budgets, included features and limits may change. See our{' '}
          <a href="/terms">Terms of Use</a>.
        </p>

        <p className="pricing-note">Cancel anytime. Budget spent? Add funds, dollar for dollar, prepaid, never billed in arrears.</p>
        <p className="pricing-tax">Prices are exclusive of applicable taxes and duties, including VAT and applicable sales tax.</p>
      </div>
    </section>
  );
}
