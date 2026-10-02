'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const hrefOf = (p) => (p.slug === 'introduction' ? '/docs' : `/docs/${p.slug}`);

// The rail: a way back to the site, the logo, a search over every page, then
// the grouped links with the current page marked. Collapsible on phones.
export default function DocsSidebar({ groups }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const box = useRef(null);
  useEffect(() => { setOpen(false); setQ(''); }, [path]);
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); box.current?.focus(); box.current?.select(); }
      if (e.key === 'Escape' && document.activeElement === box.current) { setQ(''); box.current?.blur(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const needle = q.trim().toLowerCase();
  const shown = useMemo(() => {
    if (!needle) return groups;
    const hit = (p) => `${p.title} ${p.lede || ''}`.toLowerCase().includes(needle);
    return groups.map((g) => ({ ...g, pages: g.pages.filter(hit) })).filter((g) => g.pages.length);
  }, [groups, needle]);
  const count = shown.reduce((n, g) => n + g.pages.length, 0);
  const flip = () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('glyphh-theme', next); } catch {}
  };
  return (
    <aside className={`dx-side ${open ? 'open' : ''}`}>
      <div className="dx-side-brand">
        <a href="/" className="dx-side-home-link">&larr; glyphh.ai</a>
        <a href="/docs" className="dx-side-logo" aria-label="Glyphh Docs">
          <img className="logo-dark" src="/glyphh-logo-black.png" alt="Glyphh" />
          <img className="logo-light" src="/glyphh-logo-white.png" alt="Glyphh" />
        </a>
        <label className="dx-side-search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input
            ref={box}
            type="search"
            value={q}
            onChange={(e) => { setQ(e.target.value); setOpen(true); }}
            placeholder="Search the docs"
            aria-label="Search the docs"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd>&#8984;K</kbd>
        </label>
      </div>
      <button type="button" className="dx-side-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10" /></svg>
        Contents
      </button>
      <nav className="dx-side-nav" aria-label="Docs">
        {needle && count === 0 && <div className="dx-side-empty">Nothing matches &ldquo;{q.trim()}&rdquo;</div>}
        {shown.map((g) => (
          <div key={g.title} className="dx-side-group">
            <div className="dx-side-title">{g.title}</div>
            {g.pages.map((p) => {
              const href = hrefOf(p);
              return (
                <a key={p.slug} href={href} className={`dx-side-link ${path === href ? 'active' : ''}`}>
                  {p.title}
                </a>
              );
            })}
          </div>
        ))}
        <button type="button" className="dx-side-theme" onClick={flip}>Light / dark</button>
      </nav>
    </aside>
  );
}
