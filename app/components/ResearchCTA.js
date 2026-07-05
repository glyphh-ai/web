'use client';

import { useEffect, useRef } from 'react';

export default function ResearchCTA() {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        card.classList.toggle('expanded', entry.isIntersecting);
      });
    }, { threshold: 0.4 });

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="final-cta">
      <div className="container">
        <div className="cta-card" ref={cardRef}>
          <h2>Follow the work<span className="dot">.</span></h2>
          <p>
            New projects, models, and releases land on GitHub first.
            Star the org, read the research, or run the products.
          </p>
          <div className="cta-buttons">
            <a href="https://github.com/glyphh-ai" target="_blank" rel="noopener noreferrer" className="btn btn-white btn-lg group">
              <span className="btn-label">github.com/glyphh-ai</span>
              <span className="btn-fill btn-fill-dark"></span>
            </a>
            <a href="/research" className="btn btn-ghost-white btn-lg group">
              <span className="btn-label">The research</span>
              <span className="btn-fill"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
