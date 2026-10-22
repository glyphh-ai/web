import Nav from '../components/Nav';
import Pricing, { PLATFORM_URL, SALES_HREF } from '../components/Pricing';
import Footer from '../components/Footer';

/**
 * /pricing — Free, Pro, Team and Enterprise (server docs/pricing.md,
 * 2026-10-19); never per seat, per model or per install. Glyphh does not
 * host: every plan runs in rrotor on the customer's own infrastructure, and a
 * plan sets runtime nodes, precedents per node and sync.
 */

export const metadata = {
  title: 'Pricing — Glyphh',
  description:
    'Glyphh Ada runs on your own infrastructure, at a flat monthly price by the runtime node. Free $0: 1 node, 5,000 precedents per node. Pro $99 a month: 3 nodes, 50,000 per node, sync. Team $299 a month: 10 nodes, 500,000 per node, sync. Enterprise by contract. Never per seat, model or install.',
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
    desc: 'Install the plugin and the SDKs on every machine you have. A plan counts runtime nodes, nothing else.',
  },
];

const FAQ = [
  ['What is a runtime node?', 'One rrotor, the runtime Ada runs in, linked to your Glyphh account. You run it yourself, with Docker Compose, Helm or Terraform. Glyphh does not host it.'],
  ['What counts as a precedent?', 'A case recorded with its outcome. The limit is per node, across all the models on it: 5,000 on Free, 50,000 on Pro, 500,000 on Team, unlimited on Enterprise.'],
  ['How is a plan enforced?', 'With a licence key, signed by Glyphh and checked on the node itself, with no call home. A new key comes with each paid month. With no key, a node runs as Free.'],
  ['What happens if I cancel?', 'Your plan runs to the end of the month you paid for. No new key follows, so your nodes return to Free’s limits; your models and precedents stay on your own machines.'],
  ['What does sync do?', 'It keeps the nodes of a cluster in step: one node is the head, the rest follow it. On Pro and Team you move the head by command; on Enterprise the cluster elects a new head on its own.'],
  ['Do you charge per seat?', 'No. Members and installs are unlimited on every plan.'],
  ['Can we run Ada with no network at all?', 'Yes, on Enterprise, with an air-gapped licence key. Talk to us.'],
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
            Ada runs on your own infrastructure on every plan, with unlimited members and models. Start free on one
            node; upgrade for more nodes, more precedents and sync.
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
              <h3>Start free, on a node of your own.</h3>
              <p>Pro $99 a month. Team $299 a month. Enterprise by contract.</p>
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
