import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { FaqList } from '../components/FaqSection';
import { FAQ_GROUPS } from './faq-data';

// /faq: a head like the pricing page, then one High Vis panel of questions
// per group. The answers live in ./faq-data.js.

export const metadata = {
  title: 'FAQ — Glyphh',
  description:
    'Glyphh and Ada, the runtime you run yourself, plans, and where your data goes.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/" className="ix-crumb">&larr; Home</a>
          <span className="qs-kicker">FAQ</span>
          <h1 className="ix-title">Questions, answered.</h1>
          <p className="ix-lede">
            What Glyphh and Ada are, where your models run, what it costs, and where your data goes.
          </p>
          <div className="ix-actions">
            <a href="https://platform.glyphh.ai" className="os-cta os-cta-primary">Get started</a>
            <a href="https://docs.glyphh.ai/run-rrotor" className="os-cta os-cta-ghost">Run rrotor</a>
          </div>
        </section>

        {FAQ_GROUPS.map((g) => (
          <section key={g.title} className="ix-section fq" id={g.title.toLowerCase().replace(/[^a-z]+/g, '-')}>
            <div className="ix-section-head">
              <div>
                <span className="qs-kicker">{g.title}</span>
              </div>
            </div>
            <div className="hv-panel fq-panel">
              <FaqList items={g.items} />
            </div>
          </section>
        ))}

        <section className="ix-section">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">Still asking?</span>
              <h2 className="ix-h2">Write to us, or read the docs.</h2>
            </div>
            <a href="https://docs.glyphh.ai" className="qs-more">docs.glyphh.ai &rarr;</a>
          </div>
          <div className="ix-actions">
            <a href="mailto:support@glyphh.ai" className="os-cta os-cta-ghost">support@glyphh.ai</a>
            <a href="/pricing" className="os-cta os-cta-ghost">Pricing</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
