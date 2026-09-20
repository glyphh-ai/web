'use client';

import { useEffect, useRef } from 'react';
import UsageBand from './UsageBand';

/**
 * HomeClose — the pricing strip and the final CTA. The primary download
 * CTA repeats the hero's; the muted CLI one-liner under it replaces the
 * old "Two ways to run it" section.
 */

export default function HomeClose() {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => card.classList.toggle('expanded', entry.isIntersecting));
    }, { threshold: 0.4 });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="final-cta home-close" id="get-started">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">PRICING</span> {'}'}</div>
        <UsageBand />

        <div className="cta-card" ref={cardRef}>
          <h2>Ask for the work<span className="dot">.</span> Set the rules<span className="dot">.</span> Get it done<span className="dot">.</span></h2>
          <div className="cta-buttons">
            <a href="/products/desktop#download" className="btn btn-white btn-lg group">
              <span className="btn-label">Download free &mdash; Mac &amp; Windows</span>
              <span className="btn-fill btn-fill-dark"></span>
            </a>
          </div>
          <p className="home-close-cli">
            Prefer the terminal? <a href="/products/cli">Glyphh CLI</a> is the same agent, headless.
          </p>
        </div>
      </div>
    </section>
  );
}
