'use client';

import { useState, useEffect } from 'react';

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    setLoggedIn(document.cookie.includes('yo_logged_in=1'));
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The platform (app-web) serves its login AT THE ROOT — no /auth path.
  const loginHref = PLATFORM_URL;
  const signupHref = PLATFORM_URL;
  const dashHref = `${PLATFORM_URL}/dashboard`;

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <a href="/" className="nav-logo" aria-label="Glyphh">
            <img src="/glyphh-logo-black.png" alt="Glyphh" />
          </a>
          {/* Products + Pricing menus removed (his order, 2026-09-12): the
              Gateway page is gone and pricing lives on the home page. */}
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
