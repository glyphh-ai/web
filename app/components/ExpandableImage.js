'use client';

import { useEffect, useState } from 'react';

/**
 * ExpandableImage — a screenshot that opens to a full-screen lightbox on click.
 *
 * Until the real asset is dropped in (public/screen-shots/cli/*.png), a missing
 * src degrades to a branded placeholder rather than a broken-image icon, so the
 * "spot" is visible and intentional. Esc or a backdrop click closes the lightbox.
 */
export default function ExpandableImage({ src, alt, caption, className = '', ratio = '16 / 10' }) {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`xpimg ${className}`}
        style={{ aspectRatio: ratio }}
        onClick={() => { if (!failed) setOpen(true); }}
        aria-label={failed ? `${alt} — screenshot coming` : `Expand screenshot: ${alt}`}
      >
        {failed ? (
          <span className="xpimg-ph" aria-hidden="true">
            <span className="xpimg-ph-mark">⠛⠇⠽</span>
            <span className="xpimg-ph-label">{alt}</span>
          </span>
        ) : (
          <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
        )}
        {!failed && (
          <span className="xpimg-zoom" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
          </span>
        )}
      </button>

      {open && (
        <div className="xpimg-lb" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label={alt}>
          <button className="xpimg-lb-close" type="button" onClick={() => setOpen(false)} aria-label="Close">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
          </button>
          <img src={src} alt={alt} className="xpimg-lb-img" onClick={(e) => e.stopPropagation()} />
          {caption && <p className="xpimg-lb-cap" onClick={(e) => e.stopPropagation()}>{caption}</p>}
        </div>
      )}
    </>
  );
}
