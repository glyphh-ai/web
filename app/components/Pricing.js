import PricingCards from './PricingCards';

// Start in the platform: the one door (the pricing contract, 2026-10-18).
export const PLATFORM_URL = 'https://platform.glyphh.ai';
export const SALES_HREF = 'mailto:sales@glyphh.ai?subject=' + encodeURIComponent('Glyphh Enterprise');

// The plans, one version each (the pricing contract, 2026-10-18). Never per
// seat, per model or per install: members, installs and self-hosted runtimes
// are unlimited on every plan and Ada is in every plan. What a plan sells is
// the managed precedent bucket (precedents on a hosted runtime), hosted
// machines and sync across instances. Local and self-hosted precedents are
// unlimited everywhere. Enterprise is by contract, through sales.
const TIERS = [
  {
    tier: 'free',
    name: 'Free',
    priceFigure: '$0',
    priceSub: 'Free, for good. No card.',
    desc: 'Ada on your own machines, as far as you want to take her.',
    lead: null,
    featureList: [
      'Unlimited local and self-hosted runtimes',
      'Unlimited precedents on your own machines',
      'Ada, included',
      'Unlimited members and installs',
    ],
    cta: 'Start free',
  },
  {
    tier: 'pro',
    name: 'Pro',
    priceFigure: '$99',
    priceSub: 'A month, flat.',
    desc: 'Hosted by us, synced across your instances.',
    popular: true,
    lead: 'Everything in Free, plus:',
    featureList: [
      '100,000 managed precedents',
      'Up to 3 hosted machines, billed per second',
      'Sync across instances',
    ],
    cta: 'Get started',
  },
  {
    tier: 'team',
    name: 'Team',
    priceFigure: '$299',
    priceSub: 'A month, flat.',
    desc: 'More precedents and more machines for a team in production.',
    lead: 'Everything in Pro, plus:',
    featureList: [
      '1,000,000 managed precedents',
      'Up to 10 hosted machines, billed per second',
    ],
    cta: 'Get started',
  },
  {
    tier: 'enterprise',
    name: 'Enterprise',
    contactSales: true,
    desc: 'For organisations that run Ada in their own cloud, or with no network at all.',
    priceSub: 'From $10k a year, flat, by contract.',
    lead: 'Everything in Team, plus:',
    featureList: [
      'Unlimited managed precedents and hosted machines',
      'Your own cloud (BYOC), or air-gapped with offline licences',
      'High availability',
      'Single sign-on with SAML',
      'Role-based access control',
      'Audit logs',
      'An SLA',
      'Lower hosted machine rates',
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
          <h2 className="ix-h2">Free on your own machines. Pay when we run them.</h2>
          <p className="ix-desc">
            Run Ada locally or on your own infrastructure for nothing, with no limit. The paid plans add managed
            precedents, hosted machines and sync across instances, at a flat monthly price.
          </p>
        </div>
      </div>

      <PricingCards tiers={TIERS} salesHref={SALES_HREF} platformUrl={PLATFORM_URL} />

      <p className="pp-note">
        Hosted machines are billed per second on top of the plan, at the <a href="#rates">rates below</a>. Change plan
        or cancel at any time. See our <a href="/terms">Terms of Use</a>. Prices are in US dollars and exclude
        applicable taxes and duties, including VAT and sales tax.
      </p>
    </section>
  );
}
