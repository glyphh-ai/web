'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { YOUTUBE_URL } from '../lib/site';

// The studio's navigation (the brand brief, 2026-11-25): Home, Projects, Journal, Labs, About, Work With Me, and
// YouTube. No sign-in: there is no account on glyphh.ai any more.
const LINKS = [
  ['Home', '/'],
  ['Projects', '/projects'],
  ['Journal', '/journal'],
  ['Labs', '/labs'],
  ['About', '/about'],
  ['Work With Me', '/work-with-me'],
];

export default function Nav() {
  const pathname = usePathname() || '/';
  const active = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href)) ? ' active' : '';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <a href="/" className="nav-logo" aria-label="Glyphh">
            <img className="logo-dark" src="/glyphh-logo-text-white.png" alt="Glyphh" />
            <img className="logo-light" src="/glyphh-logo-text-black.png" alt="" />
          </a>
          <div className="nav-links">
            {LINKS.map(([label, href]) => (
              <div key={href} className="nav-dd">
                <a href={href} className={`nav-dd-trigger${active(href)}`}>{label}</a>
              </div>
            ))}
          </div>
          <div className="nav-cta">
            <a href={YOUTUBE_URL} className="nav-auth-link nav-yt" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>
              YouTube
            </a>
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
        {LINKS.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>YouTube</a>
      </div>
    </>
  );
}
