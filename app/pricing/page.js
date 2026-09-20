import Nav from '../components/Nav';
import Reveal from '../components/Reveal';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Pricing — Glyphh',
  description:
    'One monthly budget across every Glyphh product, in dollars. A plan’s price is its budget, dollar for dollar. Your AI on your own keys, never marked up.',
};

// Live plan numbers on every request.
export const dynamic = 'force-dynamic';

const RULES = [
  {
    title: 'Dollar for dollar',
    desc: 'A plan’s price is its monthly budget. $40 a seat buys $40 of budget a seat, every month. Free includes $1. Add funds any time at the same rate.',
  },
  {
    title: 'Browsing is free',
    desc: 'Listing tools, browsing apps, and reading your own data never costs a cent. You pay when Glyphh runs a connector call for you, metered on the tokens it sends and returns at a published per-token price.',
  },
  {
    title: 'Prepaid, itemized',
    desc: 'Funds are prepaid, never billed in arrears. Purchased funds never expire. Every charge is itemized per call in your usage feed.',
  },
];


export default async function PricingPage() {
  return (
    <div className="pricing-page">
      <Reveal />
      <Nav />
      <header className="page-hero page-hero-tight">
        <div className="pricing-glow" aria-hidden="true" />
        <div className="container">
          <div className="hero-badge">
            <span className="badge-dot" aria-hidden="true"></span>
            PRICING
          </div>
          <h1 className="page-hero-title">
            One budget<span className="dot">.</span>{' '}
            <span className="hero-accent">Every product.</span>
          </h1>
          <p className="page-hero-sub">
            Glyphh Desktop, and everything we ship next, draws from the same
            monthly budget in dollars. It pays for what Glyphh does for you.
            Your AI runs on your own keys at your vendor&rsquo;s price.
          </p>
          <div className="usage-rules">
            {RULES.map((r) => (
              <div key={r.title} className="usage-rule reveal">
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <Pricing />

      {/* The model catalog lives on /products/router (his order, 2026-09-11). */}

      <Footer />
    </div>
  );
}
