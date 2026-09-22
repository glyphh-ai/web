import Nav from '../components/Nav';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

/**
 * /pricing — trust, in the frame (site.md §8; restyled 2026-09-22). Kill the
 * "where's the catch" objection with the no-markup story, then let the tiers
 * sell themselves. The plan numbers are live (Pricing.js); the copy is the
 * blueprint's.
 */

export const metadata = {
  title: 'Pricing — Glyphh',
  description:
    'Dollar for dollar. Your AI runs on your own keys at your vendor’s price. A plan’s price is its monthly usage pool — itemized per call, nothing marked up, nothing on by default.',
};

// Live plan numbers on every request.
export const dynamic = 'force-dynamic';

const SALES = 'mailto:sales@glyphh.ai?subject=' + encodeURIComponent('Glyphh Enterprise');

const RULES = [
  {
    title: 'Dollar for dollar',
    desc: 'A plan’s price is its monthly budget. $40 a seat buys $40 of budget a seat, every month. Free includes $1. Add funds any time at the same rate.',
  },
  {
    title: 'Browsing is free',
    desc: 'Listing tools, browsing apps, and reading your own data never costs a cent. You pay for what runs through Glyphh, connector tools and the models Glyphh provides, metered on the tokens it sends and returns at a published per-token price.',
  },
  {
    title: 'Prepaid, itemized',
    desc: 'Funds are prepaid, never billed in arrears. Purchased funds never expire. Every charge is itemized per call in your usage feed.',
  },
];

// Objection handling (site.md §8.6).
const FAQ = [
  ['Do you mark up model usage?', 'No. The vendor bills you at their price.'],
  ['Do you store our prompts?', 'No. Usage telemetry, never transcripts.'],
  ['Can we use the subscriptions we already pay for?', 'Yes — that’s the point. Burn-down routing exhausts them first.'],
  ['Who owns the programs we build?', 'You do. No vendor, no seat license, no renewal.'],
  ['Why open-weight models?', 'Accuracy, efficiency, and scale at runtime — the kernel routes the volume there so frontier credits go to build time.'],
  ['What happens when the pool runs out?', 'Hard stop or top-up — your admin decides. Nothing is on by default.'],
];

export default async function PricingPage() {
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/" className="ix-crumb">&larr; Home</a>
          <span className="qs-kicker">Pricing</span>
          <h1 className="ix-title">Dollar for dollar.</h1>
          <p className="ix-lede">
            Your AI runs on your own keys at your vendor&rsquo;s price. A plan&rsquo;s price is its monthly usage
            pool &mdash; itemized per call, nothing marked up, nothing on by default.
          </p>
          <div className="ix-actions">
            <a href="/#quick-start" className="os-cta os-cta-primary">Start free</a>
            <a href={SALES} className="os-cta os-cta-ghost">Talk to us</a>
          </div>
        </section>

        <section className="ix-section" id="how">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">How the dollars work</span>
              <h2 className="ix-h2">When you can see every dollar, you don&rsquo;t need to trust us.</h2>
            </div>
            <a href="/integrations/models" className="qs-more">Model prices &rarr;</a>
          </div>
          <div className="ix-grid ix-grid-3">
            {RULES.map((r) => (
              <div key={r.title} className="ix-card ix-card-tall">
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Pricing />

        <section className="ix-section" id="faq">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">Questions</span>
              <h2 className="ix-h2">The catch, looked for.</h2>
            </div>
          </div>
          <dl className="pp-faq">
            {FAQ.map(([q, a]) => (
              <div key={q} className="pp-faq-row">
                <dt>{q}</dt>
                <dd>{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="ix-section">
          <div className="ix-cta pp-close">
            <div>
              <span className="qs-kicker">Start free</span>
              <h3>Build your first program.</h3>
              <p>Free forever on your own logins. No trial, no card. Team plans from $40 a seat, dollar for dollar.</p>
            </div>
            <div className="ix-actions">
              <a href="/#quick-start" className="os-cta os-cta-primary">Quick Start</a>
              <a href={SALES} className="os-cta os-cta-ghost">Talk to us</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
