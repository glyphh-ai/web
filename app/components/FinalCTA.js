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
    <section className="final-cta" id="get-started">
      <div className="container">
        <div className="cta-card" ref={cardRef}>
          {/* The home page owns "Ask for the work. Set the rules. Get it
              done." — this close is about the install decision instead. */}
          <h2>One harness<span className="dot">.</span> Every vendor<span className="dot">.</span> Your desktop<span className="dot">.</span></h2>
          <p>Download <span className="compose-cmd">Glyphh</span> free. Frontier AI when you need it, open-weight models when you don&rsquo;t, 3,500+ connections either way.</p>
          <div className="cta-buttons">
            <a href="#download" className="btn btn-white btn-lg group">
              <span className="btn-label">Download for Mac — Free</span>
              <span className="btn-fill btn-fill-dark"></span>
            </a>
            <a href="#pricing" className="btn btn-ghost-white btn-lg group">
              <span className="btn-label">See Pricing</span>
              <span className="btn-fill"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
