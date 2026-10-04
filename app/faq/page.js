import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { FaqList } from '../components/FaqSection';
import { FAQ_GROUPS } from './faq-data';
import { APP_URL } from '../components/downloads';

/**
 * /faq — the full list (his order, 2026-10-04), in the frame: a head like
 * the pricing page, then one section per group, each a High Vis panel of
 * questions. The answers live in ./faq-data.js; the home page shows a short
 * cut of the same list.
 */

export const metadata = {
  title: 'FAQ — Glyphh',
  description:
    'Glyphh Desktop and app.glyphh.ai, local and cloud sessions, the CLIs that ride along, models and plans, apps, connections, memory, the platform console, and where your data lives.',
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
            What Glyphh is and what it does today: the desktop and the browser, where sessions and files live,
            the CLIs and models, your org, and your data.
          </p>
          <div className="ix-actions">
            <a href={APP_URL} className="os-cta os-cta-primary">Get started</a>
            <a href="/#download" className="os-cta os-cta-ghost">Download the desktop</a>
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
