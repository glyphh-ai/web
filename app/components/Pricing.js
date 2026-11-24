import PricingCards from './PricingCards';

// Start in the platform: the one door.
export const PLATFORM_URL = 'https://platform.glyphh.ai';
export const SALES_HREF = 'mailto:support@glyphh.ai?subject=' + encodeURIComponent('Glyphh Enterprise');

// The plans of Ada Cloud (live 2026-10-22; the docs' Plans and limits). Never
// per seat, per model or per install. A plan sets the precedents the
// organisation holds (all its models together) and the reads a month; Basic,
// Pro and Team go on past the month at $1 per 10,000 reads, Free is refused
// until the month turns.
const TIERS = [
  {
    tier: 'free',
    name: 'Free',
    priceFigure: '$0',
    priceSub: 'Free, for good. No card.',
    desc: 'Ada in Glyphh’s cloud, to start.',
    lead: null,
    featureList: [
      '1,000 precedents',
      '5,000 reads a month',
      'Ada, every feature of it',
      'Unlimited members, models and keys',
    ],
    cta: 'Start free',
  },
  // Basic (Chris, 2026-10-22; server db/seed.py): Ada Cloud's step up from
  // Free. Self-serve, never per seat.
  {
    tier: 'basic',
    name: 'Basic',
    priceFigure: '$20',
    priceSub: 'A month, flat.',
    desc: 'Past Free’s month, for a first model in production.',
    lead: 'Everything in Free, plus:',
    featureList: [
      '10,000 precedents',
      '50,000 reads a month, then $1 per 10,000',
      '10 calls a second',
    ],
    cta: 'Get started',
  },
  {
    tier: 'pro',
    name: 'Pro',
    priceFigure: '$99',
    priceSub: 'A month, flat.',
    desc: 'More precedents and reads for models your product runs on.',
    popular: true,
    lead: 'Everything in Basic, plus:',
    featureList: [
      '100,000 precedents',
      '1,000,000 reads a month, then $1 per 10,000',
      '50 calls a second',
    ],
    cta: 'Get started',
  },
  {
    tier: 'team',
    name: 'Team',
    priceFigure: '$299',
    priceSub: 'A month, flat.',
    desc: 'For a team with many models in production.',
    lead: 'Everything in Pro, plus:',
    featureList: [
      '1,000,000 precedents',
      '5,000,000 reads a month, then $1 per 10,000',
      '200 calls a second',
    ],
    cta: 'Get started',
  },
  {
    tier: 'enterprise',
    name: 'Enterprise',
    contactSales: true,
    desc: 'For organisations that need more than Team, on terms of their own.',
    priceSub: 'By contract.',
    lead: 'Everything in Team, plus:',
    featureList: [
      'Precedents, reads and calls a second by contract',
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
          <h2 className="ix-h2">We run it. The plan sets how far it goes.</h2>
          <p className="ix-desc">
            Ada runs in Glyphh’s cloud, isolated per organisation. A plan sets how many precedents you hold and how
            many reads you make a month.
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
