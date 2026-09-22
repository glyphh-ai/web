'use client';

import { useEffect, useState } from 'react';

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';

/**
 * QuickStart — the first framed section under the hero (site refactor
 * 2026-09-22): get Glyphh, three ways. A kicker row, then a panel with a tab
 * bar — Desktop · CLI · Web — and the body for the active tab. All three
 * bodies render, stacked in one grid cell, so the panel is always as tall as
 * the tallest and the page never jumps when you switch tabs. The detected
 * OS's card is outlined in the accent. Wears the high-vis frame tokens.
 */

function detectOS() {
  if (typeof navigator === 'undefined') return 'mac';
  const ua = navigator.userAgent || '';
  if (/windows/i.test(ua)) return 'win';
  if (/mac|darwin/i.test(ua)) return 'mac';
  if (/linux|x11|bsd/i.test(ua)) return 'linux';
  return 'mac';
}

const TABS = [
  { id: 'desktop', label: 'Desktop' },
  { id: 'cli', label: 'CLI' },
  { id: 'web', label: 'Web' },
];

export default function QuickStart() {
  const [tab, setTab] = useState('desktop');
  const [os, setOs] = useState('mac');
  useEffect(() => { setOs(detectOS()); }, []);

  const body = (id) => ({
    className: `hv-body${tab === id ? '' : ' hidden'}`,
    role: 'tabpanel',
    'aria-hidden': tab !== id,
  });

  return (
    <section className="qs" id="quick-start">
      <div className="qs-head">
        <span className="qs-kicker">Quick start</span>
        <a href="/products/desktop" className="qs-more">All download options &rarr;</a>
      </div>

      <div className="hv-panel">
        <div className="hv-tabs" role="tablist" aria-label="How to get Glyphh">
          <span className="hv-tabs-label">Get</span>
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              className={`hv-tab${tab === t.id ? ' active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="hv-bodies">
          <div {...body('desktop')}>
            <h3 className="hv-title">Desktop apps</h3>
            <p className="hv-desc">
              The whole operating system in one install &mdash; the shell, the loop, the tools, the
              connections. macOS, Windows, and Linux.
            </p>
            <div className="hv-cards">
              <div className={`hv-card${os === 'mac' ? ' hv-card-here' : ''}`}>
                <h4 className="hv-card-title">macOS</h4>
                <p className="hv-card-meta">macOS 12+ &middot; Apple Silicon or Intel</p>
                <div className="hv-card-actions">
                  <a href="/api/download?platform=mac&arch=arm64" className="os-cta os-cta-primary os-cta-wide">
                    <DownloadIcon /> Apple Silicon
                  </a>
                  <a href="/api/download?platform=mac&arch=x64" className="os-cta os-cta-ghost os-cta-wide">
                    <DownloadIcon /> Intel
                  </a>
                </div>
              </div>
              <div className={`hv-card${os === 'win' ? ' hv-card-here' : ''}`}>
                <h4 className="hv-card-title">Windows</h4>
                <p className="hv-card-meta">Windows 10 / 11 &middot; x64</p>
                <div className="hv-card-actions">
                  <a href="/api/download?platform=win" className="os-cta os-cta-primary os-cta-wide">
                    <DownloadIcon /> Windows x64
                  </a>
                </div>
              </div>
              {/* Linux: the x64 AppImage the build workflow publishes to the releases repo. */}
              <div className={`hv-card${os === 'linux' ? ' hv-card-here' : ''}`}>
                <h4 className="hv-card-title">Linux</h4>
                <p className="hv-card-meta">x64 &middot; AppImage &middot; any distro</p>
                <div className="hv-card-actions">
                  <a href="/api/download?platform=linux" className="os-cta os-cta-primary os-cta-wide">
                    <DownloadIcon /> AppImage
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div {...body('cli')}>
            <h3 className="hv-title">The Glyphh CLI</h3>
            <p className="hv-desc">
              The same loop in your terminal, with one history shared with the desktop. Needs Node.js.
            </p>
            <pre className="hv-code"><code>{`npm i -g @glyphh-ai/cli\nglyphh`}</code></pre>
            <p className="hv-foot-link"><a href="/docs/cli">Read the CLI docs &rarr;</a></p>
          </div>

          <div {...body('web')}>
            <h3 className="hv-title">Glyphh on the web</h3>
            <p className="hv-desc">
              Sign in and work from the browser &mdash; your workspaces, your programs, your org&rsquo;s kernel.
            </p>
            <div className="hv-card-actions">
              <a href={PLATFORM_URL} className="os-cta os-cta-primary os-cta-wide">Open the platform &rarr;</a>
            </div>
          </div>
        </div>
      </div>

      <p className="qs-note">Free forever on your own logins. No trial, no credit card.</p>
    </section>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M4 21h16" />
    </svg>
  );
}
