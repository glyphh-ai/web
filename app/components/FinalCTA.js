'use client';

import { useEffect, useRef } from 'react';

export default function FinalCTA() {
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
    <section className="final-cta" id="download">
      <div className="container">
        <div className="cta-card" ref={cardRef}>
          <h2>Stop losing your best AI conversations<span className="dot">.</span></h2>
          <p>Download .Yo and start building your context library today.</p>
          <div className="cta-buttons">
            <a href="#" className="btn btn-white btn-lg group">
              <span className="btn-label">Download for macOS</span>
              <span className="btn-fill btn-fill-dark"></span>
            </a>
            <a href="#" className="btn btn-ghost-white btn-lg group">
              <span className="btn-label">Download for Windows</span>
              <span className="btn-fill"></span>
            </a>
          </div>
          <p className="cta-version">v0.1.2 &middot; macOS 12+ &middot; Windows 10+</p>
        </div>
      </div>
    </section>
  );
}
