import Nav from '../components/Nav';
import Pricing from '../components/Pricing';
import ModelCatalog from '../components/ModelCatalog';
import Footer from '../components/Footer';

/**
 * /pricing — trust, in the frame (site.md §8; restyled 2026-09-22). Every plan
 * runs every model; a plan's price is its monthly budget; each model's rate on
 * each plan is published right here (his order, 2026-09-29: "The plans on the
 * web show our rates per model based on tiers by plan"). The plan numbers and
 * the rates are live (Pricing.js, ModelCatalog.js).
 */

export const metadata = {
  title: 'Pricing — Glyphh',
  description:
    'Dollar for dollar. A plan’s price is its monthly budget, spent on any model at your plan’s published rate. The bigger the plan, the better the rate. Solo from $20 a month.',
};

// Live plan numbers on every request.
export const dynamic = 'force-dynamic';

const SALES = 'mailto:sales@glyphh.ai?subject=' + encodeURIComponent('Glyphh Enterprise');

const RULES = [
  {
    title: 'Dollar for dollar',
    desc: 'A plan’s price is its monthly budget. Solo’s $20 buys $20 of usage; $40 a seat buys $40 a seat, every month. Add funds any time.',
  },
  {
    title: 'Browsing is free',
    desc: 'Installing, setting up, listing tools, browsing apps, and reading your own data never cost a cent. You pay for what runs: model calls at your plan’s rate and connector tools at their published price, metered on the tokens sent and returned.',
  },
  {
    title: 'Prepaid, itemized',
    desc: 'Funds are prepaid, never billed in arrears. Purchased funds never expire. Every charge is itemized per call in your usage feed.',
  },
];

// Objection handling (site.md §8.6).
const FAQ = [
  ['What does a model cost?', 'Each model has a published rate on each plan, per million tokens in and out. The bigger the plan, the better the rate. Every rate is on this page.'],
  ['Is there a free plan?', 'No. Solo is $20 a month and includes $20 of usage. Install and set up without one; you choose a plan when you make your first model call.'],
  ['Can we bring our own API keys?', 'No. Every call runs on Glyphh and is paid from your plan’s budget: one bill, one set of rates, one place to see it.'],
  ['Do you store our prompts?', 'No. Usage telemetry, never transcripts.'],
  ['Who owns the programs we build?', 'You do. No vendor, no seat license, no renewal.'],
  ['Why open-weight models?', 'Accuracy, efficiency, and scale at runtime — the kernel routes the volume there so frontier credits go to build time.'],
  ['What happens when the budget runs out?', 'Hard stop or top-up — your admin decides. Nothing is on by default.'],
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
            A plan&rsquo;s price is its monthly budget, spent on any model at your plan&rsquo;s published rate &mdash;
            itemized per call, nothing on by default. The bigger the plan, the better the rate.
          </p>
          <div className="ix-actions">
            <a href="/#quick-start" className="os-cta os-cta-primary">Get started</a>
            <a href={SALES} className="os-cta os-cta-ghost">Talk to us</a>
          </div>
        </section>

        <section className="ix-section" id="how">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">How the dollars work</span>
              <h2 className="ix-h2">When you can see every dollar, you don&rsquo;t need to trust us.</h2>
            </div>
            <a href="#rates" className="qs-more">Model rates &rarr;</a>
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

        <section className="ix-section" id="rates">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">Rates</span>
              <h2 className="ix-h2">Every model, on every plan.</h2>
              <p className="ix-desc">Per million tokens, input and output. Enterprise rates are set per customer.</p>
            </div>
          </div>
          <ModelCatalog compact />
        </section>

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
              <span className="qs-kicker">Get started</span>
              <h3>Build your first program.</h3>
              <p>Solo from $20 a month. Team plans from $40 a seat. Dollar for dollar, every model on every plan.</p>
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
