'use client';

import { useState, useEffect, useRef } from 'react';

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';
const GITHUB_URL = 'https://github.com/glyphh-ai';

const PRODUCTS = [
  {
    href: '/products/apps',
    name: 'Glyphh Apps',
    desc: 'The workspace your AI drives',
  },
  {
    href: '/products/code',
    name: 'Glyphh Code',
    desc: 'Agentic coding on the Glyphh runtime',
  },
  {
    href: '/pricing',
    name: 'Pricing',
    desc: 'One credit system, every product',
  },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const ddRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    setLoggedIn(document.cookie.includes('yo_logged_in=1'));
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the dropdown on outside click / Escape
  useEffect(() => {
    if (!ddOpen) return;
    const onDown = (e) => {
      if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setDdOpen(false); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [ddOpen]);

  const loginHref = `${PLATFORM_URL}/auth/login`;
  const signupHref = `${PLATFORM_URL}/auth`;
  const dashHref = `${PLATFORM_URL}/dashboard`;

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <a href="/" className="nav-logo" aria-label="Glyphh">
            <img src="/glyphh-logo-black.png" alt="Glyphh" />
          </a>
          <div className="nav-links">
            <a href="/research">Research</a>
            <div
              className={`nav-dd ${ddOpen ? 'open' : ''}`}
              ref={ddRef}
              onMouseEnter={() => setDdOpen(true)}
              onMouseLeave={() => setDdOpen(false)}
            >
              <button
                className="nav-dd-trigger"
                aria-expanded={ddOpen}
                aria-haspopup="true"
                onClick={() => setDdOpen(!ddOpen)}
              >
                Products
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div className="nav-dd-panel" role="menu">
                {PRODUCTS.map((p) => (
                  <a key={p.href} href={p.href} className="nav-dd-item" role="menuitem">
                    <span className="nav-dd-name">{p.name}</span>
                    <span className="nav-dd-desc">{p.desc}</span>
                  </a>
                ))}
              </div>
            </div>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          <div className="nav-cta">
            {loggedIn ? (
              <a href={dashHref} className="btn btn-primary btn-sm group">
                <span className="btn-label">Dashboard</span>
                <span className="btn-fill"></span>
              </a>
            ) : (
              <>
                <a href={loginHref} className="btn btn-secondary btn-sm group">
                  <span className="btn-label">Log in</span>
                  <span className="btn-fill"></span>
                </a>
                <a href={signupHref} className="btn btn-primary btn-sm group">
                  <span className="btn-label">Sign up</span>
                  <span className="btn-fill"></span>
                </a>
              </>
            )}
          </div>
          <button
            className={`nav-mobile-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a href="/research" onClick={() => setMenuOpen(false)}>Research</a>
        <span className="mobile-menu-group">Products</span>
        {PRODUCTS.map((p) => (
          <a key={p.href} href={p.href} className="mobile-menu-sub" onClick={() => setMenuOpen(false)}>
            {p.name}
          </a>
        ))}
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>GitHub</a>
        {loggedIn ? (
          <a href={dashHref} className="btn btn-primary btn-sm group" onClick={() => setMenuOpen(false)}>
            <span className="btn-label">Dashboard</span>
            <span className="btn-fill"></span>
          </a>
        ) : (
          <>
            <a href={loginHref} className="btn btn-secondary btn-sm group" onClick={() => setMenuOpen(false)}>
              <span className="btn-label">Log in</span>
              <span className="btn-fill"></span>
            </a>
            <a href={signupHref} className="btn btn-primary btn-sm group" onClick={() => setMenuOpen(false)}>
              <span className="btn-label">Sign up</span>
              <span className="btn-fill"></span>
            </a>
          </>
        )}
      </div>
    </>
  );
}
