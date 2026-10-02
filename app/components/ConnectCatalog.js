'use client';

import { useEffect, useMemo, useState } from 'react';

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';
const PAGE = 96;

/**
 * ConnectCatalog — the Pipedream Connect app directory, searchable on the
 * public site (his order, 2026-09-22). `apps` is the whole directory from the
 * server's anonymous /api/public/connect/directory (the same cached index the
 * desktop's picker reads); when that is empty the page passes the curated
 * fallback instead and says so. Search, a category filter, Pipedream's own
 * icons, and "show more" paging so 3,500 cards never land at once.
 */

export default function ConnectCatalog({ apps, categories = [], live = true }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [limit, setLimit] = useState(PAGE);
  const needle = q.trim().toLowerCase();

  const shown = useMemo(
    () => apps.filter((a) =>
      (!cat || (a.categories || []).includes(cat)) &&
      (!needle || a.name.toLowerCase().includes(needle) || (a.description || '').toLowerCase().includes(needle) || (a.categories || []).some((c) => c.toLowerCase().includes(needle)))),
    [apps, needle, cat],
  );
  useEffect(() => { setLimit(PAGE); }, [needle, cat]);

  return (
    <>
      <div className="mc-filters cx-filters">
        <label className="ix-search mc-search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${apps.length.toLocaleString('en-US')} services`}
            aria-label="Search services"
            autoComplete="off"
            spellCheck={false}
          />
        </label>
        {categories.length ? (
          <select className="mc-select" value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Category">
            <option value="">All categories</option>
            {categories.map((c) => <option key={c.name} value={c.name}>{c.name} ({c.count})</option>)}
          </select>
        ) : null}
      </div>
      <p className="mc-count">
        {shown.length.toLocaleString('en-US')} services
        {!live ? ' · curated list — the live directory was not reachable' : ''}
      </p>

      <div className="ix-grid ix-grid-4 cx-grid">
        {shown.slice(0, limit).map((a) => (
          <div key={a.id} className="ix-card cx-card">
            <div className="cx-card-head">
              {a.icon ? (
                <img className="ix-icon cx-icon" src={a.icon} alt="" width={28} height={28} loading="lazy" referrerPolicy="no-referrer" />
              ) : (
                <span className="ix-icon ix-icon-blank" />
              )}
              <h3>{a.name}</h3>
            </div>
            {a.description ? <p>{a.description}</p> : null}
            {a.categories?.length ? (
              <span className="cx-cats">{a.categories.slice(0, 2).join(' · ')}</span>
            ) : null}
          </div>
        ))}
      </div>
      {!shown.length && <p className="ix-empty">Nothing matches &ldquo;{q.trim()}&rdquo;.</p>}
      {shown.length > limit ? (
        <div className="mc-more">
          <button type="button" className="os-cta os-cta-ghost" onClick={() => setLimit(limit + PAGE * 2)}>
            Show more ({(shown.length - limit).toLocaleString('en-US')} left)
          </button>
        </div>
      ) : null}

      <div className="ix-cta">
        <div>
          <span className="qs-kicker">Connect one</span>
          <h3>Sign in once. Then it is a tool everywhere.</h3>
          <p>Every service here connects from Settings &rarr; Connections in the desktop or the platform. One sign-in per service; every loop, app, and program can call it.</p>
        </div>
        <div className="ix-actions">
          <a href={PLATFORM_URL} className="os-cta os-cta-primary">Open the platform &rarr;</a>
          <a href="https://docs.glyphh.ai/connections" className="os-cta os-cta-ghost">How connections work</a>
        </div>
      </div>
    </>
  );
}
