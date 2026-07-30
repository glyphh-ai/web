'use client';

import { useState } from 'react';
import HeroDemo from './HeroDemo';
import HeroFlow from './HeroFlow';

/**
 * CliHero — the Glyphh CLI hero.
 *
 * The artifact is a real TERMINAL: the device sign-in screen booting into the
 * running Glyphh TUI — a typed prompt, streamed answer, tool receipts, and the
 * status strip (permission mode, the loop's models, the live token readout).
 * The two-phase mockup itself lives in <HeroDemo />.
 *
 * Backdrop: the home hero's stream effect in its CLI orientation — streams
 * CASCADING top-down like terminal output, tinted teal/emerald with a thread
 * of the brand purple.
 */

const INSTALL = 'npm i -g @glyphh-ai/cli';

const CLI_FLOW = ['94, 234, 212', '52, 211, 153', '179, 107, 251']; // teal / emerald / brand purple

export default function CliHero() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard blocked — the command is right there to select */ }
  };

  return (
    <section className="rhero rhero-product">
      <HeroFlow mode="fall" colors={CLI_FLOW} pulseRGB="190, 242, 255" seed={4242} />
      <div className="rhero-inner container">
        <div className="rhero-copy">
        <img
          src="/glyphh-mascot-square.png"
          alt=""
          className="rhero-mascot"
          width="88"
          height="88"
        />
        <div className="hero-badge hero-badge-cli">
          <span className="badge-dot" aria-hidden="true"></span>
          Introducing Glyphh CLI · the agent in your terminal
        </div>
        <h1 className="rhero-title">The whole agent<span className="dot">.</span> <span className="rhero-accent">In your terminal<span className="dot">.</span></span></h1>
        <p className="rhero-sub">
          The same engine as Glyphh Desktop, full-screen in your shell. Real
          tools, your loops and models, your governance — scriptable, headless,
          and no API keys to wrangle.
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

        <div className="hero-ctas rhero-ctas">
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
      </div>

      <div className="hero-stage">
        <div className="cli-canvas" aria-hidden="true">
          <HeroDemo />
        </div>
      </div>
    </section>
  );
}
