'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * ExpandableShot — a borderless 16:9 product shot that blows up into the
 * same lightbox the screenshots section uses. Shared by the hero and the
 * builders section.
 */
export default function ExpandableShot({ src, alt, eager = false }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button className="dv-shot" onClick={() => setOpen(true)} aria-label={`Expand: ${alt}`}>
        <span className="dv-shot-inner">
          <img src={src} alt={alt} {...(eager ? { fetchPriority: 'high' } : { loading: 'lazy' })} />
        </span>
        <span className="shot-expand" aria-hidden="true">⤢</span>
      </button>
      {open && createPortal(
        // PORTALED to <body>: the hero/builders sections sit inside .reveal
        // wrappers whose transform makes them the containing block for
        // position:fixed — rendered in place, the lightbox (and its close
        // disc) anchored to the SECTION, not the viewport.
        <div className="shot-lightbox" onClick={() => setOpen(false)} role="dialog" aria-modal="true">
          <button className="shot-lightbox-close" aria-label="Close" onClick={() => setOpen(false)}>×</button>
          <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
        </div>,
        document.body,
      )}
    </>
  );
}
