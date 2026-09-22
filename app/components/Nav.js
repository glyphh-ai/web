'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';

export default function Nav() {
  const pathname = usePathname() || '/';
  // The section the visitor is in lights up in the accent (OpenClaw's
  // `.active` link). Products covers every /products/* page.
  const active = (prefix) => (pathname.startsWith(prefix) ? ' active' : '');
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
            <div className="nav-dd">
              <a href="/" className={`nav-dd-trigger${pathname === '/' ? ' active' : ''}`}>Product</a>
            </div>
            {/* The Products dropdown came off (his order, 2026-09-22): Product is the home page. Hidden, not deleted. */}
            {false && (
              <div
                className={`nav-dd ${prodOpen ? 'open' : ''}`}
                ref={prodRef}
                onMouseEnter={prodEnter}
                onMouseLeave={prodLeave}
              >
                <a href="/products/router" className={`nav-dd-trigger${active('/products')}`}>
                  Product
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </a>
                <div className="nav-dd-panel">
                  <a href="/products/code" className="nav-dd-item">
                    <span className="nav-dd-name">Glyphh Code</span>
                    <span className="nav-dd-desc">The coding agent and CLI. Your subscription or the router, one switch.</span>
                  </a>
                  <a href="/products/desktop" className="nav-dd-item">
                    <span className="nav-dd-name">Glyphh Desktop</span>
                    <span className="nav-dd-desc">The open desktop client for frontier AI. Every loop, every model, one app.</span>
                  </a>
                  <a href="/products/router" className="nav-dd-item">
                    <span className="nav-dd-name">Glyphh Router</span>
                    <span className="nav-dd-desc">One endpoint, two ways to route. Roles and budgets.</span>
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
                    <span className="nav-dd-name">Glyphh Semantic Apps</span>
                    <span className="nav-dd-desc">Apps that know your context, governed by the org.</span>
                  </a>
                </div>
              </div>
              )}
            <div className="nav-dd">
              <a href="/integrations" className={`nav-dd-trigger${active('/integrations')}`}>Integrations</a>
            </div>
            <div
              className={`nav-dd ${ddOpen ? 'open' : ''}`}
              ref={ddRef}
              onMouseEnter={ddEnter}
              onMouseLeave={ddLeave}
            >
              <a href="/research" className={`nav-dd-trigger${active('/research')}`}>Research</a>
            </div>
            <div className="nav-dd">
              <a href="/pricing" className={`nav-dd-trigger${active('/pricing')}`}>Pricing</a>
            </div>
            <div className="nav-dd">
              <a href="/docs" className={`nav-dd-trigger${active('/docs')}`}>Docs</a>
            </div>
          </div>
          {/* No buttons in the bar (the reference has none): the account links
              are two more mono links, set off by a hairline. */}
          <div className="nav-cta">
            {loggedIn ? (
              <a href={dashHref} className="nav-auth-link nav-auth-primary">Dashboard</a>
            ) : (
              <>
                <a href={loginHref} className="nav-auth-link">Log in</a>
                <a href={signupHref} className="nav-auth-link nav-auth-primary">Sign up</a>
              </>
            )}
            <ThemeToggle />
          </div>
          <button
            className={`nav-mobile-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle main navigation"
            aria-expanded={menuOpen}
          >
            <span className="nav-burger" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a href="/" onClick={() => setMenuOpen(false)}>Product</a>
        {false && (
          <>
            <span className="mobile-menu-group">Product</span>
            <a href="/products/code" className="mobile-menu-sub" onClick={() => setMenuOpen(false)}>Glyphh Code</a>
            <a href="/products/desktop" className="mobile-menu-sub" onClick={() => setMenuOpen(false)}>Glyphh Desktop</a>
            <a href="/products/router" className="mobile-menu-sub" onClick={() => setMenuOpen(false)}>Glyphh Router</a>
            <a href="/products/connect" className="mobile-menu-sub" onClick={() => setMenuOpen(false)}>Glyphh Connect</a>
            <a href="/products/skills" className="mobile-menu-sub" onClick={() => setMenuOpen(false)}>Glyphh Skills</a>
            <a href="/products/semantic-apps" className="mobile-menu-sub" onClick={() => setMenuOpen(false)}>Glyphh Semantic Apps</a>
              </>
        )}
        <a href="/integrations" onClick={() => setMenuOpen(false)}>Integrations</a>
        <a href="/research" onClick={() => setMenuOpen(false)}>Research</a>
        <a href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
        <a href="/docs" onClick={() => setMenuOpen(false)}>Docs</a>
        {loggedIn ? (
          <a href={dashHref} className="os-cta os-cta-primary os-cta-sm" onClick={() => setMenuOpen(false)}>Dashboard</a>
        ) : (
          <>
            <a href={loginHref} className="os-cta os-cta-ghost os-cta-sm" onClick={() => setMenuOpen(false)}>Log in</a>
            <a href={signupHref} className="os-cta os-cta-primary os-cta-sm" onClick={() => setMenuOpen(false)}>Sign up</a>
          </>
        )}
      </div>
    </>
  );
}
