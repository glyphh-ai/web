'use client';

import { useState, useEffect, useRef } from 'react';

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const ddRef = useRef(null);
  const ddCloseTimer = useRef(null);
  const prodRef = useRef(null);
  const prodCloseTimer = useRef(null);

  // Hover open/close with a grace period: closing instantly on mouseleave
  // makes the panel vanish while the pointer travels from the trigger to a
  // menu item, so the links are unclickable. The delay absorbs that.
  const ddEnter = () => {
    clearTimeout(ddCloseTimer.current);
    setDdOpen(true);
  };
  const ddLeave = () => {
    clearTimeout(ddCloseTimer.current);
    ddCloseTimer.current = setTimeout(() => setDdOpen(false), 260);
  };
  useEffect(() => () => clearTimeout(ddCloseTimer.current), []);

  const prodEnter = () => {
    clearTimeout(prodCloseTimer.current);
    setProdOpen(true);
  };
  const prodLeave = () => {
    clearTimeout(prodCloseTimer.current);
    prodCloseTimer.current = setTimeout(() => setProdOpen(false), 260);
  };
  useEffect(() => () => clearTimeout(prodCloseTimer.current), []);

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
          <div className="nav-links">
            <div
              className={`nav-dd ${prodOpen ? 'open' : ''}`}
              ref={prodRef}
              onMouseEnter={prodEnter}
              onMouseLeave={prodLeave}
            >
              <a href="/products/router" className="nav-dd-trigger">
                Products
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </a>
              <div className="nav-dd-panel">
                <a href="/products/router" className="nav-dd-item">
                  <span className="nav-dd-name">Glyphh Router</span>
                  <span className="nav-dd-desc">Frontier on your credits, open-weight direct. Roles and budgets.</span>
                </a>
                <a href="/products/connect" className="nav-dd-item">
                  <span className="nav-dd-name">Glyphh Connect</span>
                  <span className="nav-dd-desc">3,500+ services as tools for any loop.</span>
                </a>
                <a href="/products/skills" className="nav-dd-item">
                  <span className="nav-dd-name">Glyphh Skills</span>
                  <span className="nav-dd-desc">Write it once. Apps, tasks, agents, every vendor.</span>
                </a>
                <a href="/products/semantic-apps" className="nav-dd-item">
                  <span className="nav-dd-name">Semantic Apps</span>
                  <span className="nav-dd-desc">Apps that know your context, governed by the org.</span>
                </a>
              </div>
            </div>
            <div
              className={`nav-dd ${ddOpen ? 'open' : ''}`}
              ref={ddRef}
              onMouseEnter={ddEnter}
              onMouseLeave={ddLeave}
            >
              <a href="/pricing" className="nav-dd-trigger">Pricing</a>
            </div>
            <div className="nav-dd">
              <a href="/docs" className="nav-dd-trigger">Docs</a>
            </div>
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
        <span className="mobile-menu-group">Products</span>
        <a href="/products/router" className="mobile-menu-sub" onClick={() => setMenuOpen(false)}>Glyphh Router</a>
        <a href="/products/connect" className="mobile-menu-sub" onClick={() => setMenuOpen(false)}>Glyphh Connect</a>
        <a href="/products/skills" className="mobile-menu-sub" onClick={() => setMenuOpen(false)}>Glyphh Skills</a>
        <a href="/products/semantic-apps" className="mobile-menu-sub" onClick={() => setMenuOpen(false)}>Semantic Apps</a>
        <a href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
        <a href="/docs" onClick={() => setMenuOpen(false)}>Docs</a>
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
