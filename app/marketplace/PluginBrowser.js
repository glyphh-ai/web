'use client';

import { useMemo, useState } from 'react';

// The list, as Claude's own plugin browser shows one: a search box over a grid of cards. Each card is the plugin's
// name, who made it, what it does, what it holds, and its version; the whole card opens the plugin.
export default function PluginBrowser({ plugins }) {
  const [q, setQ] = useState('');
  const needle = q.trim().toLowerCase();
  const shown = useMemo(() => {
    if (!needle) return plugins;
    const words = needle.split(/\s+/);
    return plugins.filter((p) => words.every((w) => p.search.includes(w)));
  }, [plugins, needle]);
  return (
    <>
      <label className="ix-search mp-search">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search plugins"
          aria-label="Search plugins"
          autoComplete="off"
          spellCheck={false}
        />
        <span className="mp-search-count" aria-live="polite">{shown.length} of {plugins.length}</span>
      </label>
      {shown.length === 0 ? (
        <p className="mp-none">Nothing matches &ldquo;{q.trim()}&rdquo;.</p>
      ) : (
        <div className="mp-grid">
          {shown.map((p) => (
            <a key={p.name} href={`/marketplace/${encodeURIComponent(p.name)}`} className="mp-card">
              <div className="mp-card-top">
                <h3>{p.name}</h3>
                {p.version ? <span className="mp-version">v{p.version}</span> : null}
              </div>
              {p.author ? <p className="mp-by">by {p.author}</p> : null}
              {p.description ? <p className="mp-card-desc">{p.description}</p> : null}
              {p.counts.length ? (
                <ul className="mp-chips" aria-label="What it contains">
                  {p.counts.map(([label, n]) => <li key={label} className="mp-chip">{label} <b>{n}</b></li>)}
                </ul>
              ) : null}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
