'use client';

import { useState } from 'react';
import HeroFlow from './HeroFlow';

/**
 * CliHero — the dev-flavored translation of the one-workspace pitch. The
 * primary CTA is the install command itself (copy-to-clipboard), not a
 * button; the terminal demo has its own section below.
 *
 * Backdrop: the home hero's stream effect in its CLI orientation — streams
 * CASCADING top-down like terminal output, tinted teal/emerald with a
 * thread of the brand purple.
 */

const INSTALL = 'npm i -g @glyphh-ai/cli';

const CLI_FLOW = ['94, 234, 212', '52, 211, 153', '179, 107, 251']; // teal / emerald / brand purple

export default function CliHero() {
  const [copied, setCopied] = useState(false);

  // The async Clipboard API needs a secure context and transient activation;
  // fall back to a hidden-textarea copy so the success state is never a lie.
  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(INSTALL);
      ok = true;
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = INSTALL;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:-1000px;opacity:0;';
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand('copy');
        ta.remove();
      } catch { ok = false; }
    }
    if (!ok) return; // command stays on screen to select by hand
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
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
            The whole agent, in your terminal &middot; Mac, Windows, Linux
          </div>
          <h1 className="rhero-title">The whole agent, <span className="rhero-accent">in your terminal.</span></h1>
          <p className="rhero-sub">
            The same agents, loops, and governance as Desktop. The plan from
            Claude, the architecture from GPT, the grunt work from Mistral
            &mdash; full-screen TUI, or headless in your pipe.
          </p>

          <button className={`cli-install ${copied ? 'copied' : ''}`} onClick={copy} type="button" aria-label="Copy install command">
            <span className="cli-install-prompt">$</span>
            <code className="cli-install-cmd">{INSTALL}</code>
            <span className="cli-install-copy">
              {copied ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <span className="cli-install-copied">Copied</span>
                </>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
              )}
            </span>
            <span className="sr-only" role="status" aria-live="polite">{copied ? 'Copied to clipboard' : ''}</span>
          </button>

          <div className="hero-ctas rhero-ctas">
            <a href="https://github.com/glyphh-ai" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg group">
              <span className="btn-label">View on GitHub</span>
              <span className="btn-fill"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
