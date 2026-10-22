import PricingCards from './PricingCards';

// Start in the platform: the one door.
export const PLATFORM_URL = 'https://platform.glyphh.ai';
export const SALES_HREF = 'mailto:sales@glyphh.ai?subject=' + encodeURIComponent('Glyphh Enterprise');

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
    cta: 'Start free',
  },
  {
    tier: 'pro',
    name: 'Pro',
    priceFigure: '$99',
    priceSub: 'A month, flat.',
    desc: 'A small cluster, kept in sync.',
    popular: true,
    lead: 'Everything in Free, plus:',
    featureList: [
      '3 runtime nodes',
      '50,000 precedents per node',
      'Multi-node sync, with failover by command',
    ],
    cta: 'Get started',
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
    cta: 'Get started',
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
    cta: 'Talk to us',
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
            precedents each node holds, and whether the nodes sync.
          </p>
        </div>
      </div>

      <PricingCards tiers={TIERS} salesHref={SALES_HREF} platformUrl={PLATFORM_URL} />

      <p className="pp-note">
        Change plan or cancel at any time. See our <a href="/terms">Terms of Use</a>. Prices are in US dollars and
        exclude applicable taxes and duties, including VAT and sales tax.
      </p>
    </section>
  );
}
