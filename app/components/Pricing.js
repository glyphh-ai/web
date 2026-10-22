import PricingCards from './PricingCards';

// The platform, for existing users' Log in.
export const PLATFORM_URL = 'https://platform.glyphh.ai';
// Early access (2026-10-21): no public sign-up until Ada Cloud is ready, so
// every call to action on the site asks sales for access by email.
export const SALES_HREF = 'mailto:sales@glyphh.ai?subject=' + encodeURIComponent('Glyphh early access');
export const EARLY_ACCESS_LABEL = 'Request early access';

// The plans (server docs/pricing.md, 2026-10-19). Never per seat, per model or
// per install. Every plan runs on the customer's own infrastructure: a plan
// sets how many runtime nodes may link, how many precedents each node may hold
// (all its models together) and whether nodes sync. A paid month is a signed
// licence key, checked on the node; with no key a node runs as Free.
const TIERS = [
  {
    tier: 'free',
    name: 'Free',
    priceFigure: '$0',
    priceSub: 'Free, for good. No card.',
    desc: 'Ada on one runtime node of your own.',
    lead: null,
    featureList: [
      '1 runtime node',
      '5,000 precedents per node',
      'Ada, every feature of it',
      'Unlimited members, models and installs',
    ],
    cta: EARLY_ACCESS_LABEL,
  },
  // Basic (Chris, 2026-10-22; server db/seed.py): Ada Cloud's step up from
  // Free. Self-serve, never per seat; no sync, HA, offline or SSO, and no
  // licence key, so a self-hosted node on it runs as Free's.
  {
    tier: 'basic',
    name: 'Basic',
    priceFigure: '$20',
    priceSub: 'A month, flat.',
    desc: 'Ada in Glyphh’s cloud, past Free’s month.',
    lead: 'Everything in Free, plus:',
    featureList: [
      'Ada Cloud: 10,000 precedents',
      '50,000 requests a month, then $1 per 10,000',
      '10 requests a second',
    ],
    cta: EARLY_ACCESS_LABEL,
  },
  {
    tier: 'pro',
    name: 'Pro',
    priceFigure: '$99',
    priceSub: 'A month, flat.',
    desc: 'A small cluster, kept in sync.',
    popular: true,
    lead: 'Everything in Basic, plus:',
    featureList: [
      '3 runtime nodes',
      '50,000 precedents per node',
      'Multi-node sync, with failover by command',
    ],
    cta: EARLY_ACCESS_LABEL,
  },
  {
    tier: 'team',
    name: 'Team',
    priceFigure: '$299',
    priceSub: 'A month, flat.',
    desc: 'More nodes and more precedents for a team in production.',
    lead: 'Everything in Pro, plus:',
    featureList: [
      '10 runtime nodes',
      '500,000 precedents per node',
    ],
    cta: EARLY_ACCESS_LABEL,
  },
  {
    tier: 'enterprise',
    name: 'Enterprise',
    contactSales: true,
    desc: 'For organisations that need high availability, or no network at all.',
    priceSub: 'By contract, from $10k a year.',
    lead: 'Everything in Team, plus:',
    featureList: [
      'Unlimited runtime nodes and precedents',
      'High availability: the cluster elects its head',
      'Air-gapped licence keys',
      'An audit log',
    ],
    cta: EARLY_ACCESS_LABEL,
  },
];

export default function Pricing() {
  return (
    <section className="ix-section" id="pricing">
      <div className="ix-section-head">
        <div>
          <span className="qs-kicker">Plans</span>
          <h2 className="ix-h2">You run it. The plan sets how far it goes.</h2>
          <p className="ix-desc">
            Ada runs in rrotor, on your own infrastructure. A plan sets how many runtime nodes you link, how many
            precedents each node holds, and whether the nodes sync. Glyphh is in early access: these plans apply at
            launch.
          </p>
        </div>
      </div>

      <PricingCards tiers={TIERS} salesHref={SALES_HREF} platformUrl={SALES_HREF} />

      <p className="pp-note">
        Change plan or cancel at any time. See our <a href="/terms">Terms of Use</a>. Prices are in US dollars and
        exclude applicable taxes and duties, including VAT and sales tax.
      </p>
    </section>
  );
}
