import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import ConnectCatalog from '../../components/ConnectCatalog';
import { FALLBACK_APPS, FALLBACK_CATEGORIES } from '../../components/connect-fallback';

/**
 * /integrations/connect — the whole Pipedream Connect directory, searchable
 * (his order, 2026-09-22). The server's anonymous /api/public/connect/directory
 * serves the same cached index the desktop's picker reads; this page fetches
 * it on the server, revalidated hourly, and hands it to the client catalog.
 * If the directory is empty or unreachable the curated list stands in and the
 * page says so.
 */

const API_BASE = process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.glyphh.ai';

export const metadata = {
  title: 'Connections — Glyphh Integrations',
  description:
    'Every service Glyphh connects to through Pipedream Connect — 3,500+ apps, searchable: mail, docs, messaging, developer tools, CRM, projects, and the automation platforms. One sign-in each.',
};

async function loadDirectory() {
  try {
    const res = await fetch(`${API_BASE}/api/public/connect/directory`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    const data = json?.data ?? json ?? {};
    return Array.isArray(data.apps) && data.apps.length ? data : null;
  } catch {
    return null;
  }
}

export default async function ConnectCatalogPage() {
  const dir = await loadDirectory();
  const live = Boolean(dir);
  const apps = live ? dir.apps : FALLBACK_APPS;
  const categories = live ? dir.categories || [] : FALLBACK_CATEGORIES;
  const total = live ? dir.total : apps.length;
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/integrations" className="ix-crumb">&larr; Integrations</a>
          <span className="qs-kicker">Every service, one sign-in</span>
          <h1 className="ix-title">Connections</h1>
          <p className="ix-lede">
            {live ? <><strong>{total.toLocaleString('en-US')} services</strong> as tools in every loop, every app, every program.</> : <>3,500+ services as tools in every loop, every app, every program.</>}
          </p>
          <p className="ix-sub">
            Pipedream Connect powers the connector framework. Individuals connect their own accounts; admins share
            connections org-wide and govern who can connect to what, and which tools they can call. Browsing and data
            access are free; active tool calls are itemized from the plan&rsquo;s dollar pool.
          </p>
        </section>
        <section className="ix-section">
          <ConnectCatalog apps={apps} categories={categories} live={live} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
