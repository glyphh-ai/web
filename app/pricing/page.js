import Nav from '../components/Nav';
import Pricing, { PLATFORM_URL, SALES_HREF } from '../components/Pricing';
import Footer from '../components/Footer';

/**
 * /pricing — Free, Basic, Pro, Team and Enterprise of Ada Cloud (live
 * 2026-10-22); never per seat, per model or per install. A plan sets the
 * precedents an organisation holds and its reads a month.
 */

export const metadata = {
  title: 'Pricing — Glyphh',
  description:
    'Glyphh Ada Cloud at a flat monthly price. Free $0: 1,000 precedents, 5,000 reads a month. Basic $20 a month: 10,000 precedents, 50,000 reads. Pro $99 a month: 100,000 precedents, 1,000,000 reads. Team $299 a month: 1,000,000 precedents, 5,000,000 reads. Reads past the month $1 per 10,000. Enterprise by contract. Never per seat, model or install.',
};

// The promise: what Glyphh never charges for.
const RULES = [
  {
    title: 'Never per seat',
    desc: 'Ada runs in your code, not behind human logins. Every plan has unlimited members.',
  },
  {
    title: 'Never per model',
    desc: 'Ada is in every plan, with no add-on. Build as many typed models as you like.',
  },
  {
    title: 'Never per install',
    desc: 'Install the plugin and the SDKs on every machine you have, with as many API keys as you need. A plan counts precedents and reads, nothing else.',
  },
];

const FAQ = [
  ['What counts as a precedent?', 'A case recorded with its outcome, across all your organisation’s models: 1,000 on Free, 10,000 on Basic, 100,000 on Pro, 1,000,000 on Team. A write past the limit is refused; nothing is deleted for you.'],
  ['What counts as a read?', 'Each decide, query, probabilities or facts call. Writes, imports, exports, learning and backtests are not reads. The month is the calendar month, UTC.'],
  ['What happens past the month’s reads?', 'On Basic, Pro and Team, reads go on and the ones past the allowance are billed at $1 per 10,000 on a later invoice. On Free they are refused until the month turns.'],
  ['What happens if I cancel?', 'Your plan runs to the end of the month you paid for, then your organisation moves to Free. Your models and precedents are kept, and you can export them at any time.'],
  ['Do you train on our data?', 'No. Your models run in Glyphh’s cloud, isolated per organisation, and we never train on your data or sell it.'],
  ['Do you charge per seat?', 'No. Members, models and keys are unlimited on every plan.'],
  ['Can we change plan?', 'Any time, from the platform.'],
];

export default function PricingPage() {
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/" className="ix-crumb">&larr; Home</a>
          <span className="qs-kicker">Pricing</span>
          <h1 className="ix-title">Pricing you can trust.</h1>
          <p className="ix-lede">
            Ada runs in Glyphh’s cloud on every plan, with unlimited members and models. Start free; upgrade for
            more precedents and more reads.
          </p>
          <div className="ix-actions">
            <a href={PLATFORM_URL} className="os-cta os-cta-primary">Start free</a>
            <a href={SALES_HREF} className="os-cta os-cta-ghost">Talk to us</a>
          </div>
        </section>

        <section className="ix-section" id="promise">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">The promise</span>
              <h2 className="ix-h2">A flat price, and nothing counted per head.</h2>
            </div>
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
              <span className="qs-kicker">Get started</span>
              <h3>Start free, with 1,000 precedents.</h3>
              <p>Basic $20 a month. Pro $99 a month. Team $299 a month. Enterprise by contract.</p>
            </div>
            <div className="ix-actions">
              <a href={PLATFORM_URL} className="os-cta os-cta-primary">Start free</a>
              <a href={SALES_HREF} className="os-cta os-cta-ghost">Talk to us</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
