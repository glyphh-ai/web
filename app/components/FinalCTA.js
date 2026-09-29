'use client';

import { useEffect, useRef } from 'react';

/** The home page's close, reused by every product page so the purple card is
 *  one component (his order, 2026-09-19). Props override the copy; the home
 *  page passes nothing. */
export default function FinalCTA({ title, text, primary, secondary, id = 'get-started' } = {}) {
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

  const p = primary || { href: '/#download', label: 'Download for Mac' };
  const s = secondary === null ? null : (secondary || { href: '/pricing', label: 'See Pricing' });

  return (
    <section className="final-cta" id={id}>
      <div className="container">
        <div className="cta-card" ref={cardRef}>
          {/* The home page owns "Ask for the work. Set the rules. Get it
              done." — this close is about the install decision instead. */}
          {title || (
            <h2>One harness<span className="dot">.</span> Every vendor<span className="dot">.</span> Your desktop<span className="dot">.</span></h2>
          )}
          {text || (
            <p>Download <span className="compose-cmd">Glyphh</span> free. Frontier AI when you need it, open-weight models when you don&rsquo;t, 3,500+ connections either way.</p>
          )}
          <div className="cta-buttons">
            <a href={p.href} className="btn btn-white btn-lg group">
              <span className="btn-label">{p.label}</span>
              <span className="btn-fill btn-fill-dark"></span>
            </a>
            {s ? (
              <a href={s.href} className="btn btn-ghost-white btn-lg group">
                <span className="btn-label">{s.label}</span>
                <span className="btn-fill"></span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
