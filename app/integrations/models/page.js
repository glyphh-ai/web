import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import ModelCatalog from '../../components/ModelCatalog';

/**
 * /integrations/models — the models Glyphh runs, full page (his order,
 * 2026-09-29: "we just list the models we currently support"), each with its
 * rate on every plan. The list is the server's (/api/models).
 */

export const metadata = {
  title: 'Models — Glyphh Integrations',
  description: 'Every model Glyphh runs, with its context window and its rate on every plan. Every plan runs every model; the bigger the plan, the better the rate.',
};

export default function ModelCatalogPage() {
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/integrations" className="ix-crumb">&larr; Integrations</a>
          <span className="qs-kicker">Every plan, every model</span>
          <h1 className="ix-title">The models</h1>
          <p className="ix-lede">
            The models Glyphh runs today, with context windows and the rate you pay for each on every plan.
          </p>
          <p className="ix-sub">
            One OpenAI-compatible endpoint in front of all of them. Every plan runs every model and pays per token out of
            its monthly budget; the bigger the plan, the better the rate. Your admin turns models on or off for your
            organization.
          </p>
          <div className="ix-actions">
            <a href="/pricing" className="os-cta os-cta-primary">See the plans</a>
            <a href="/docs/router" className="os-cta os-cta-ghost">Read the docs &rarr;</a>
          </div>
        </section>
        <section className="ix-section">
          <ModelCatalog />
        </section>
      </main>
      <Footer />
    </div>
  );
}
