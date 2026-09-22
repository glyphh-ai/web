import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import ConnectCatalog from '../../components/ConnectCatalog';

/**
 * /integrations/connect — the Connect catalog as a full page (site refactor
 * 2026-09-22): a curated, filterable slice of the 3,500+ Pipedream Connect
 * services grouped by what they are for, and the door to the full search
 * inside the app.
 */

export const metadata = {
  title: 'Connections — Glyphh Integrations',
  description:
    'The services Glyphh connects to through Pipedream Connect: mail, docs, messaging, developer tools, CRM, projects, and the automation platforms — 3,500+ in all, one sign-in each.',
};

export default function ConnectCatalogPage() {
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/integrations" className="ix-crumb">&larr; Integrations</a>
          <span className="qs-kicker">Every service, one sign-in</span>
          <h1 className="ix-title">Connections</h1>
          <p className="ix-lede">3,500+ services as tools in every loop, every app, every program.</p>
          <p className="ix-sub">
            Pipedream Connect powers the connector framework. Individuals connect their own accounts; admins share
            connections org-wide and govern who can connect to what, and which tools they can call. Browsing and data
            access are free; active tool calls are itemized from the plan&rsquo;s dollar pool.
          </p>
        </section>
        <section className="ix-section">
          <ConnectCatalog />
        </section>
      </main>
      <Footer />
    </div>
  );
}
