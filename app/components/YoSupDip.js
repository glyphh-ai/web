'use client';

import { useState, useEffect } from 'react';

export default function YoSupDip() {
  const [lightboxSrc, setLightboxSrc] = useState(null);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e) => { if (e.key === 'Escape') setLightboxSrc(null); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxSrc]);

  return (
    <section className="yosupdip-section">
      <div className="container">
        <div className="command-section" style={{ padding: 0 }}>
          <h2 className="command-hero-title reveal">
            <span className="dot dot-hidden" data-dot-anchor id="cmd-ysd">.</span>Yo <span className="dot">.</span>Sup <span className="dot">.</span>Dip
          </h2>
          <p className="command-hero-tagline reveal" style={{ marginBottom: 0 }}>The command layer under every agent, every cypher, every panel.</p>
        </div>
        <div className="command-detail reveal" style={{ maxWidth: '600px', margin: '1rem auto 2.5rem', textAlign: 'center' }}>
          <p className="command-desc">
            <span className="dot">.</span>yo to speak. <span className="dot">.</span>sup when the panel responds.
            {' '}<span className="dot">.</span>dip to move — your context follows.
          </p>
        </div>
        <div className="yosupdip-video reveal">
          <button
            type="button"
            className="command-video-button"
            onClick={() => setLightboxSrc('/hero-v1-yosup.mp4')}
            aria-label="Expand workspace video"
          >
            <video
              className="command-video-player"
              src="/hero-v1-yosup.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <span className="command-video-expand" aria-hidden="true">⤢</span>
          </button>
        </div>
      </div>

      {lightboxSrc && (
        <div className="video-lightbox" role="dialog" aria-modal="true" onClick={() => setLightboxSrc(null)}>
          <button type="button" className="video-lightbox-close" aria-label="Close video" onClick={(e) => { e.stopPropagation(); setLightboxSrc(null); }}>×</button>
          <video className="video-lightbox-player" src={lightboxSrc} autoPlay loop controls playsInline onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
