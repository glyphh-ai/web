'use client';

import { useEffect, useState } from 'react';

/**
 * CliHero — the Glyphh CLI hero.
 *
 * Same crafted-scene language as the Desktop hero, but this canvas carries a
 * DEVELOPER gradient (teal → sky → indigo, distinct from Desktop's violet →
 * peach) and the artifact is a real TERMINAL running the Glyphh TUI: a typed
 * prompt, streamed answer, collapsible tool receipts, and the status strip
 * with permission mode, the loop's models, and the live token readout.
 */

const PROMPT = 'build a landing page and deploy it to prod';
const TYPE_MS = 34;
const HOLD_MS = 5200;

const INSTALL = 'npm i -g @glyphh/cli';

export default function CliHero() {
  const [n, setN] = useState(0);
  const [copied, setCopied] = useState(false);
  const done = n >= PROMPT.length;

  useEffect(() => {
    const t = setTimeout(() => setN((v) => (v >= PROMPT.length ? 0 : v + 1)), done ? HOLD_MS : TYPE_MS);
    return () => clearTimeout(t);
  }, [n, done]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard blocked — the command is right there to select */ }
  };

  return (
    <section className="hero hero-stacked">
      <div className="hero-copy hero-copy-center">
        <div className="hero-badge hero-badge-cli">
          <span className="badge-dot" aria-hidden="true"></span>
          Introducing Glyphh CLI · the agent in your terminal
        </div>
        <h1 className="hero-title">The whole agent<span className="dot">.</span> In your terminal<span className="dot">.</span></h1>
        <p className="hero-sub-big">
          The same engine that drives Glyphh Desktop — now a full-screen TUI in
          your shell. Real local tools, your loops and models, permission modes,
          and machine-reach. Scriptable, headless, metered through the gateway.
          No API keys to wrangle.
        </p>

        <button className={`cli-install ${copied ? 'copied' : ''}`} onClick={copy} type="button" aria-label="Copy install command">
          <span className="cli-install-prompt">$</span>
          <code className="cli-install-cmd">{INSTALL}</code>
          <span className="cli-install-copy">
            {copied ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
            )}
          </span>
        </button>

        <div className="hero-ctas">
          <a href="#power" className="btn btn-primary btn-lg group">
            <span className="btn-label">See what it does</span>
            <span className="btn-fill"></span>
          </a>
          <a href="https://github.com/glyphh-ai/cli" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg group">
            <span className="btn-label">View on GitHub</span>
            <span className="btn-fill"></span>
          </a>
        </div>
      </div>

      <div className="hero-stage">
        <div className="cli-canvas" aria-hidden="true">
          <div className="cterm">
            <div className="cterm-bar">
              <span className="cterm-dots"><i /><i /><i /></span>
              <span className="cterm-title">glyphh — ~/acme-site</span>
            </div>
            <div className="cterm-body">
              <div className="ct-head">
                <span className="ct-braille">⠛⠇⠽⠏⠓⠓</span>
                <span className="ct-head-meta">Glyphh · v1.0.1 · Fable 5</span>
              </div>

              <div className="ct-user"><span className="ct-bar">▌</span>{PROMPT.slice(0, n)}{!done && <span className="ct-caret" />}</div>

              {done && (
                <div className="ct-run">
                  <div className="ct-answer"><span className="ct-glyph">●</span> On it — scaffolding the page, wiring the build, and deploying.</div>
                  <div className="ct-receipt"><span className="ct-fold">▾</span> Write <span className="ct-arg">index.html</span></div>
                  <div className="ct-receipt"><span className="ct-fold">▸</span> Bash <span className="ct-arg">npm run build</span> <span className="ct-secs">· 2.1s</span></div>
                  <div className="ct-receipt ct-ok"><span className="ct-fold">▸</span> Bash <span className="ct-arg">deploy → acme-site.glyphh.app</span> <span className="ct-secs">· 3.4s</span></div>
                  <div className="ct-answer"><span className="ct-glyph">●</span> Live at <span className="ct-link">acme-site.glyphh.app</span> — build green, deploy verified.</div>
                  <div className="ct-caret ct-caret-idle" />
                </div>
              )}
            </div>

            <div className="cterm-foot">
              <span className="ct-pill ct-pill-mode"><i className="ct-mode-dot" />Auto</span>
              <span className="ct-foot-spacer" />
              <span className="ct-pill"><i className="ct-dot ct-dot-frontier" />Fable 5 <em>Planner</em></span>
              <span className="ct-pill"><i className="ct-dot ct-dot-open" />Mistral <em>Worker</em></span>
              <span className="ct-pill ct-pill-loop">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-2.6-6.3" /><polyline points="21 3 21 9 15 9" /></svg>
                Plan &amp; Build
              </span>
              <span className="ct-tok">1.2k&#8593; 340&#8595;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
