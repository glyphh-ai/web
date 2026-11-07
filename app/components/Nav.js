'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';
// Log in and Sign up land on the platform, which signs you in first.

export default function Nav() {
  const pathname = usePathname() || '/';
  // The section the visitor is in lights up in the accent (OpenClaw's
  // `.active` link). Products covers every /products/* page.
  const active = (prefix) => (pathname.startsWith(prefix) ? ' active' : '');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const ddRef = useRef(null);
  const ddCloseTimer = useRef(null);

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

  const [ucOpen, setUcOpen] = useState(false);
  const ucCloseTimer = useRef(null);
  const ucEnter = () => {
    clearTimeout(ucCloseTimer.current);
    setUcOpen(true);
  };
  const ucLeave = () => {
    clearTimeout(ucCloseTimer.current);
    ucCloseTimer.current = setTimeout(() => setUcOpen(false), 260);
  };
  useEffect(() => () => clearTimeout(ucCloseTimer.current), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();   // a page restored mid-scroll gets the bar at once
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

  const loginHref = PLATFORM_URL;
  const signupHref = PLATFORM_URL;
  const dashHref = PLATFORM_URL;

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <a href="/" className="nav-logo" aria-label="Glyphh">
            {/* The wordmark alone (his order, 2026-10-25): the cat is the mascot, not the logo. */}
            <img className="logo-dark" src="/glyphh-logo-text-white.png" alt="Glyphh" />
            <img className="logo-light" src="/glyphh-logo-text-black.png" alt="" />
          </a>
          <div className="nav-links">
            <div className="nav-dd">
              <a href="/" className={`nav-dd-trigger${pathname === '/' ? ' active' : ''}`}>Home</a>
            </div>
            <div
                className={`nav-dd ${ucOpen ? 'open' : ''}`}
                onMouseEnter={ucEnter}
                onMouseLeave={ucLeave}
              >
                <a href="/use-cases" className={`nav-dd-trigger${active('/use-cases')}`}>
                  Use cases
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </a>
                <div className="nav-dd-panel">
                  <a href="/use-cases/support-routing" className="nav-dd-item">
                    <span className="nav-dd-name">Support routing</span>
                    <span className="nav-dd-desc">Each ticket to the team that owns it.</span>
                  </a>
                  <a href="/use-cases/loan-decisions" className="nav-dd-item">
                    <span className="nav-dd-name">Loan decisions</span>
                    <span className="nav-dd-desc">Approve or refuse from your past decisions.</span>
                  </a>
                  <a href="/use-cases/claude-bots" className="nav-dd-item">
                    <span className="nav-dd-name">Claude bots</span>
                    <span className="nav-dd-desc">A Claude agent that learns its job.</span>
                  </a>
                </div>
              </div>
            <div
              className={`nav-dd ${ddOpen ? 'open' : ''}`}
              ref={ddRef}
              onMouseEnter={ddEnter}
              onMouseLeave={ddLeave}
            >
              <a href="/blog" className={`nav-dd-trigger${active('/blog')}`}>Blog</a>
            </div>
            <div className="nav-dd">
              <a href="https://demo.glyphh.ai" className="nav-dd-trigger">Demos</a>
            </div>
            <div className="nav-dd">
              <a href="/pricing" className={`nav-dd-trigger${active('/pricing')}`}>Pricing</a>
            </div>
            <div className="nav-dd">
              <a href="https://docs.glyphh.ai" className={`nav-dd-trigger${active('/docs')}`}>Docs</a>
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
        <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
        <span className="mobile-menu-group">Use cases</span>
        <a href="/use-cases/support-routing" className="mobile-menu-sub" onClick={() => setMenuOpen(false)}>Support routing</a>
        <a href="/use-cases/loan-decisions" className="mobile-menu-sub" onClick={() => setMenuOpen(false)}>Loan decisions</a>
        <a href="/use-cases/claude-bots" className="mobile-menu-sub" onClick={() => setMenuOpen(false)}>Claude bots</a>
        <a href="/blog" onClick={() => setMenuOpen(false)}>Blog</a>
        <a href="https://demo.glyphh.ai" onClick={() => setMenuOpen(false)}>Demos</a>
        <a href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
        <a href="https://docs.glyphh.ai" onClick={() => setMenuOpen(false)}>Docs</a>
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
