'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// The docs sidebar: grouped links, the current page marked, collapsible on
// phones behind a "Contents" button.
export default function DocsSidebar({ groups }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [path]);
  return (
    <aside className={`dx-side ${open ? 'open' : ''}`}>
      <div className="dx-side-brand">
        <a href="/docs" className="dx-side-logo" aria-label="Glyphh Docs">
          <img src="/glyphh-logo-black.png" alt="Glyphh" />
          <span>Docs</span>
        </a>
        <a href="/" className="dx-side-home-link">&larr; glyphh.ai</a>
      </div>
      <button type="button" className="dx-side-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10" /></svg>
        Contents
      </button>
      <nav className="dx-side-nav" aria-label="Docs">
        <a href="/docs" className={`dx-side-home ${path === '/docs' ? 'active' : ''}`}>Overview</a>
        {groups.map((g) => (
          <div key={g.title} className="dx-side-group">
            <div className="dx-side-title">{g.title}</div>
            {g.pages.map((p) => {
              const href = `/docs/${p.slug}`;
              return (
                <a key={p.slug} href={href} className={`dx-side-link ${path === href ? 'active' : ''}`}>
                  {p.title}
                </a>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
