import { notFound } from 'next/navigation';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import CopyLine from '../CopyLine';
import Markdown from '../Markdown';
import { getMarketplace, getPlugin, counts, fileUrl, ADD_COMMAND, REPO, REPO_URL } from '../../lib/marketplace';
import '../marketplace.css';

// One plugin of the Marketplace, as Claude's plugin browser shows one: who made it and what it is, how to install
// it in Claude, then everything it holds (skills, commands, agents, connectors) and its own README. All of it is
// read from github.com/glyphh-ai/plugins (app/lib/marketplace.js), and every item links back to its file there.

export const revalidate = 600;

export async function generateStaticParams() {
  const { plugins } = await getMarketplace();
  return plugins.map((p) => ({ plugin: p.name }));
}

const nameOf = async (params) => {
  const { plugin } = await params;
  try {
    return decodeURIComponent(plugin);
  } catch {
    return plugin;
  }
};

export async function generateMetadata({ params }) {
  const name = await nameOf(params);
  const found = await getPlugin(name);
  if (found.state !== 'ok') return { title: 'Marketplace — Glyphh' };
  return {
    title: `${found.plugin.name} — Glyphh Marketplace`,
    description: found.plugin.description || `The ${found.plugin.name} plugin for Claude, from the Glyphh Marketplace.`,
    alternates: { canonical: `/marketplace/${encodeURIComponent(found.plugin.name)}` },
  };
}

function Shell({ children }) {
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">{children}</main>
      <Footer />
    </div>
  );
}

function Section({ id, title, count, children }) {
  return (
    <section className="ix-section" id={id}>
      <div className="ix-section-head">
        <h2 className="ix-h2 mp-h2">{title}{count ? <span className="mp-count">{count}</span> : null}</h2>
      </div>
      {children}
    </section>
  );
}

const Out = ({ href, children, className }) => (
  <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>
);

export default async function PluginPage({ params }) {
  const name = await nameOf(params);
  const found = await getPlugin(name);
  if (found.state === 'missing') notFound();
  if (found.state !== 'ok') {
    return (
      <Shell>
        <section className="ix-head">
          <a href="/marketplace" className="ix-crumb">&larr; Marketplace</a>
          <span className="qs-kicker">Plugin</span>
          <h1 className="ix-title">{name}</h1>
          <div className="mp-state">
            <h3>This plugin could not be loaded just now.</h3>
            <p><Out href={REPO_URL}>Open the marketplace on GitHub</Out>, or try this page again in a few minutes.</p>
          </div>
        </section>
      </Shell>
    );
  }

  const { plugin, marketplace } = found;
  const install = `/plugin install ${plugin.name}@${marketplace.name}`;
  const holds = counts(plugin);
  const facts = [
    plugin.author.name ? <>by {plugin.author.url ? <Out href={plugin.author.url}>{plugin.author.name}</Out> : plugin.author.name}</> : null,
    plugin.version ? `v${plugin.version}` : null,
    plugin.license || null,
    plugin.homepage ? <Out href={plugin.homepage}>Homepage</Out> : null,
  ].filter(Boolean);

  return (
    <Shell>
      <section className="ix-head">
        <a href="/marketplace" className="ix-crumb">&larr; Marketplace</a>
        <span className="qs-kicker">{plugin.category || 'Plugin'}</span>
        <h1 className="ix-title">{plugin.name}</h1>
        {facts.length ? (
          <p className="mp-facts">{facts.map((f, i) => <span key={i}>{f}</span>)}</p>
        ) : null}
        {plugin.description ? <p className="ix-lede">{plugin.description}</p> : null}
        {plugin.keywords.length ? (
          <ul className="mp-chips mp-keywords" aria-label="Keywords">
            {plugin.keywords.map((k) => <li key={k} className="mp-chip">{k}</li>)}
          </ul>
        ) : null}
        {holds.length ? (
          <ul className="mp-chips" aria-label="What it contains">
            {holds.map(([label, n]) => <li key={label} className="mp-chip">{label} <b>{n}</b></li>)}
          </ul>
        ) : null}
      </section>

      <section className="ix-section" id="install">
        <div className="mp-install">
          <div className="mp-install-head">
            <h2 className="ix-h2">Install in Claude</h2>
            <Out href={plugin.url} className="os-cta os-cta-ghost os-cta-sm">View on GitHub</Out>
          </div>
          <ol className="mp-steps">
            <li>
              <span>Add the marketplace, once.</span>
              <CopyLine text={ADD_COMMAND} />
            </li>
            <li>
              <span>Install the plugin.</span>
              <CopyLine text={install} />
            </li>
          </ol>
          <p className="mp-add-note">
            In the Claude desktop app, the marketplace is added under Customize → Plugins → Add marketplace →{' '}
            <code>{REPO}</code>.
          </p>
        </div>
      </section>

      {plugin.skills.length ? (
        <Section id="skills" title="Skills" count={plugin.skills.length}>
          <div className="mp-items">
            {plugin.skills.map((s) => (
              <details key={s.path} className="mp-item mp-skill">
                <summary>
                  <span className="mp-item-name">{s.name}</span>
                  {s.description ? <span className="mp-item-desc">{s.description}</span> : null}
                  <span className="mp-item-more" aria-hidden="true">Read the skill</span>
                </summary>
                <div className="mp-item-body">
                  {s.body ? <Markdown source={s.body} path={s.path} shift={2} /> : null}
                  <Out href={s.url} className="mp-item-link">SKILL.md on GitHub &rarr;</Out>
                </div>
              </details>
            ))}
          </div>
        </Section>
      ) : null}

      {plugin.commands.length ? (
        <Section id="commands" title="Commands" count={plugin.commands.length}>
          <div className="mp-items">
            {plugin.commands.map((c) => (
              <Out key={c.path} href={c.url} className="mp-item mp-row">
                <span className="mp-item-name mp-mono">/{c.name}</span>
                {c.description ? <span className="mp-item-desc">{c.description}</span> : null}
              </Out>
            ))}
          </div>
        </Section>
      ) : null}

      {plugin.agents.length ? (
        <Section id="agents" title="Agents" count={plugin.agents.length}>
          <div className="mp-items">
            {plugin.agents.map((a) => (
              <Out key={a.path} href={a.url} className="mp-item mp-row">
                <span className="mp-item-name">{a.name}</span>
                {a.description ? <span className="mp-item-desc">{a.description}</span> : null}
              </Out>
            ))}
          </div>
        </Section>
      ) : null}

      {plugin.hooks.length ? (
        <Section id="hooks" title="Hooks" count={plugin.hooks.reduce((n, h) => n + h.count, 0)}>
          <div className="mp-items">
            {plugin.hooks.map((h) => (
              <Out key={h.name} href={h.url} className="mp-item mp-row">
                <span className="mp-item-name mp-mono">{h.name}</span>
                <span className="mp-item-desc">{h.count === 1 ? '1 hook' : `${h.count} hooks`} on this event.</span>
              </Out>
            ))}
          </div>
        </Section>
      ) : null}

      {plugin.connectors.length ? (
        <Section id="connectors" title="Connectors" count={plugin.connectors.length}>
          <div className="mp-items">
            {plugin.connectors.map((c) => (
              <Out key={c.name} href={c.url} className="mp-item mp-row">
                <span className="mp-item-name mp-mono">{c.name}</span>
                <span className="mp-item-desc">
                  {c.kind === 'local' || c.kind === 'stdio' ? 'Runs on your computer, started by Claude.' : 'A service Claude connects to.'}
                </span>
              </Out>
            ))}
          </div>
        </Section>
      ) : null}

      <Section id="about" title="About">
        {plugin.readme ? (
          <>
            <Markdown source={plugin.readme} path={plugin.readmePath} shift={2} className="mp-readme" />
            <Out href={fileUrl(plugin.readmePath)} className="mp-item-link">README on GitHub &rarr;</Out>
          </>
        ) : (
          <p className="ix-desc">
            {plugin.local ? 'This plugin has no README yet. ' : 'This plugin is kept in its own repository. '}
            <Out href={plugin.url}>See it on GitHub</Out>.
          </p>
        )}
      </Section>
    </Shell>
  );
}
