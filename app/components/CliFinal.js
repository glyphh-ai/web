'use client';

import { useEffect, useRef, useState } from 'react';

const INSTALL = 'npm i -g @glyphh-ai/cli';

export default function CliFinal() {
  const cardRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => card.classList.toggle('expanded', entry.isIntersecting));
    }, { threshold: 0.4 });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* command is visible to select */ }
  };

  return (
    <section className="final-cta final-cta-cli" id="install">
      <div className="container">
        <div className="cta-card cta-card-cli" ref={cardRef}>
          <h2>Install it<span className="dot">.</span> Point it at a repo<span className="dot">.</span> Watch it work<span className="dot">.</span></h2>
          <p>Node 18+. One command, and <span className="compose-cmd">glyphh</span> is in your PATH.</p>
          <button className={`cli-install cli-install-lg ${copied ? 'copied' : ''}`} onClick={copy} type="button" aria-label="Copy install command">
            <span className="cli-install-prompt">$</span>
            <code className="cli-install-cmd">{INSTALL}</code>
            <span className="cli-install-copy">
              {copied ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
              )}
            </span>
          </button>
          <div className="cta-buttons">
            <a href="https://github.com/glyphh-ai/cli" target="_blank" rel="noopener noreferrer" className="btn btn-white btn-lg group">
              <span className="btn-label">Read the docs</span>
              <span className="btn-fill btn-fill-dark"></span>
            </a>
            <a href="/products/desktop" className="btn btn-ghost-white btn-lg group">
              <span className="btn-label">Prefer the desktop?</span>
              <span className="btn-fill"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
