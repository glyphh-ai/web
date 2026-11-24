import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CopyLine from './CopyLine';
import PluginBrowser from './PluginBrowser';
import { getMarketplace, counts, ADD_COMMAND, REPO, REPO_URL } from '../lib/marketplace';
import './marketplace.css';

// The Marketplace (his ruling, 2026-11-24): a page that only SHOWS what is in github.com/glyphh-ai/plugins, the
// way Claude's own plugin browser shows plugins. Read from GitHub on the server and kept for ten minutes
// (app/lib/marketplace.js); a repo with nothing in it, or GitHub out of reach, is a quiet state, never an error.

export const revalidate = 600;

export const metadata = {
  title: 'Marketplace — Glyphh',
  description:
    'Plugins and skills for Claude that decide with your own Ada models. Everything here is in the public repo github.com/glyphh-ai/plugins; add it to Claude with one line.',
  alternates: { canonical: '/marketplace' },
};

function AddToClaude() {
  return (
    <div className="mp-add">
      <CopyLine text={ADD_COMMAND} />
      <p className="mp-add-note">
        In the Claude desktop app: Customize → Plugins → Add marketplace → <code>{REPO}</code>.
      </p>
    </div>
  );
}

export default async function MarketplacePage() {
  const { state, plugins } = await getMarketplace();
  const cards = plugins.map((p) => ({
    name: p.name,
    author: p.author.name,
    description: p.description,
    version: p.version,
    counts: counts(p),
    search: [p.name, p.author.name, p.description, p.category, ...p.keywords].join(' ').toLowerCase(),
  }));
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/" className="ix-crumb">&larr; Home</a>
          <span className="qs-kicker">Marketplace</span>
          <h1 className="ix-title">Plugins for Claude that decide with Ada.</h1>
          <p className="ix-lede">
            Skills and plugins you add to Claude, each one deciding with your own Ada models. Everything here is in
            the public repo <a href={REPO_URL} target="_blank" rel="noopener noreferrer">github.com/{REPO}</a>.
          </p>
        </section>

        <section className="ix-section" id="add">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">Add it to Claude</span>
              <h2 className="ix-h2">One line in Claude Code.</h2>
              <p className="ix-desc">Then install its plugins from Claude’s own plugin list.</p>
            </div>
          </div>
          <AddToClaude />
        </section>

        <section className="ix-section" id="plugins">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">Plugins</span>
              <h2 className="ix-h2">Browse the marketplace.</h2>
            </div>
            <a href={REPO_URL} className="qs-more" target="_blank" rel="noopener noreferrer">View on GitHub &rarr;</a>
          </div>
          {state === 'ok' ? <PluginBrowser plugins={cards} /> : null}
          {state === 'empty' ? (
            <div className="mp-state">
              <h3>The marketplace is being stocked.</h3>
              <p>
                Its plugins are published in{' '}
                <a href={REPO_URL} target="_blank" rel="noopener noreferrer">github.com/{REPO}</a>. Add it to Claude
                with the line above, and each plugin shows in Claude as it lands.
              </p>
            </div>
          ) : null}
          {state === 'error' ? (
            <div className="mp-state">
              <h3>The marketplace could not be loaded just now.</h3>
              <p>
                <a href={REPO_URL} target="_blank" rel="noopener noreferrer">Open it on GitHub</a>, or try this page
                again in a few minutes.
              </p>
            </div>
          ) : null}
        </section>
      </main>
      <Footer />
    </div>
  );
}
