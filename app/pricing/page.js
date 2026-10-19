import Nav from '../components/Nav';
import Pricing, { PLATFORM_URL, SALES_HREF } from '../components/Pricing';
import HostingRates from '../components/HostingRates';
import Footer from '../components/Footer';

/**
 * /pricing — the open-core plans (the pricing contract, 2026-10-18): Free,
 * Pro, Team and Enterprise; never per seat, per model or per install. The
 * plans sell managed precedents and hosted machines; running Ada on
 * your own machines is free and unlimited. The hosted machine rates per plan
 * are read from the server (HostingRates.js, app/lib/rates.js).
 */

export const metadata = {
  title: 'Pricing — Glyphh',
  description:
    'Never per seat, per model or per install. Free on your own machines, without limit. Pro $99 a month, Team $299 a month, Enterprise from $10k a year.',
};

// The rates are read from the server at most once an hour.
export const revalidate = 3600;

// The promise (the contract's rules): what Glyphh never charges for.
const RULES = [
  {
    title: 'Never per seat',
    desc: 'Ada runs in your code, not behind human logins. Every plan has unlimited members.',
  },
  {
    title: 'Never per model',
    desc: 'Ada is in every plan, with no add-on. Build as many typed models with her as you like.',
  },
  {
    title: 'Never per install',
    desc: 'Install on every developer machine you have. Local and self-hosted runtimes are unlimited on every plan.',
  },
];

const FAQ = [
  ['What do the paid plans charge for?', 'Two things we run for you: managed precedents (the ones Ada keeps on a hosted runtime) and hosted machines. A plan is a flat monthly price; hosted machines are billed per second on top, at the published rates.'],
  ['Is Free really unlimited?', 'Yes, on your own machines. Precedents on a local or self-hosted runtime have no limit on any plan.'],
  ['What is a managed precedent?', 'A precedent Ada keeps on a runtime we host. Pro includes 100,000, Team 1,000,000, Enterprise has no limit.'],
  ['How are hosted machines billed?', 'By the second while a machine is started, and its disk by the GB-month whether it is started or stopped. The rates for Pro and Team are on this page; Enterprise rates are set in your contract.'],
  ['Do you charge per seat?', 'No. Members and installs are unlimited on every plan.'],
  ['Can we run Ada with no network at all?', 'Yes, on Enterprise: air-gapped, with an offline licence, or in your own cloud. Talk to us.'],
  ['Can we change plan?', 'Any time, from the platform. Changes are prorated. To move to Free, delete your hosted machines first.'],
];

export default function PricingPage() {
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/" className="ix-crumb">&larr; Home</a>
          <span className="qs-kicker">Pricing</span>
          <h1 className="ix-title">Never per seat, per model or per install.</h1>
          <p className="ix-lede">
            Run Ada on your own machines for free, without limit. Pay a flat monthly price when you want us to keep
            your precedents and host your machines.
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
              <h2 className="ix-h2">You pay for what we run, nothing else.</h2>
            </div>
            <a href="#rates" className="qs-more">Machine rates &rarr;</a>
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
              <span className="qs-kicker">Hosted machines</span>
              <h2 className="ix-h2">Per second, at a published rate.</h2>
              <p className="ix-desc">What each hosted machine costs on Pro and Team, by the month and by the second. On Enterprise, rates are set in your contract.</p>
            </div>
          </div>
          <HostingRates />
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
              <h3>Start free, on your own machines.</h3>
              <p>Pro $99 a month. Team $299 a month. Enterprise from $10k a year. Never per seat, per model or per install.</p>
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
