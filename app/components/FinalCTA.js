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
          <h2>Your context<span className="dot">.</span> Every panel<span className="dot">.</span> Every conversation<span className="dot">.</span></h2>
          <p>Download <span className="compose-cmd">Glyphh</span> and start working across every AI today.</p>
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
          <p className="cta-version">Mac &amp; Windows</p>
        </div>
      </div>
    </section>
  );
}
