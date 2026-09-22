import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import ModelCatalog from '../../components/ModelCatalog';
import catalog from '../../../public/data/model-catalog.json';

/**
 * /integrations/models — the whole model catalog as a full page (site
 * refactor 2026-09-22), the way models.litellm.ai shows it, in our theme:
 * every model the Router can serve, with pricing, limits, features, and a
 * Router snippet per row. The data is the fork's LiteLLM table, compacted
 * by scripts/build-model-catalog.mjs.
 */

const n = (v) => v.toLocaleString('en-US');

export const metadata = {
  title: 'Model catalog — Glyphh Integrations',
  description: `Every model the Glyphh Router serves: ${n(catalog.stats.models)} models across ${n(catalog.stats.providers)} providers, with context windows, prices, and features. Powered by LiteLLM.`,
};

export default function ModelCatalogPage() {
  const { stats } = catalog;
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/integrations" className="ix-crumb">&larr; Integrations</a>
          <span className="qs-kicker">Cloud, subscription, router, or local</span>
          <h1 className="ix-title">The model catalog</h1>
          <p className="ix-lede">
            Compare context windows, prices, and features for <strong>{n(stats.models)} models</strong> across{' '}
            <strong>{n(stats.providers)} providers</strong> &mdash; everything the Glyphh Router can serve.
          </p>
          <p className="ix-sub">
            Built on LiteLLM&rsquo;s open-source model database. One OpenAI-compatible endpoint in front of all of it;
            your vendor&rsquo;s list price on your own keys, never marked up. Roles, budgets, and allow-lists decide
            who gets which model.
          </p>
          <div className="ix-actions">
            <a href="/docs/router" className="os-cta os-cta-primary">Read the docs</a>
            <a href="/products/router" className="os-cta os-cta-ghost">The Router &rarr;</a>
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
