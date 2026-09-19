import Nav from '../components/Nav';
import Reveal from '../components/Reveal';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Pricing — Glyphh',
  description:
    'One credit system across every Glyphh product. 1 credit = 30 seconds of compute — no token markup, ever.',
};

// Live plan numbers on every request.
export const dynamic = 'force-dynamic';

const RULES = [
  {
    title: '1 credit = 30 seconds',
    desc: 'Every product meters the same way: 30 seconds of compute per credit, rounded up, 1-credit minimum per call.',
  },
  {
    title: 'Browsing is free',
    desc: 'Listing tools, browsing apps, and reading your own data never costs a credit. You pay when Glyphh computes for you.',
  },
  {
    title: 'Prepaid, itemized',
    desc: 'Credits are prepaid — never billed in arrears — and every charge is itemized per call in your usage feed.',
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
            One credit system<span className="dot">.</span>{' '}
            <span className="hero-accent">Every model.</span>
          </h1>
          <p className="page-hero-sub">
            Glyphh Desktop — and everything we ship next — draws from the same
            pool of credits. Each product spends them differently; the meter
            never changes.
          </p>
          <div className="credit-rules">
            {RULES.map((r) => (
              <div key={r.title} className="credit-rule reveal">
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
