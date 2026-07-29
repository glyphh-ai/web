'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * ExpandableShot — a borderless 16:9 product shot that blows up into the
 * same lightbox the screenshots section uses. Shared by the hero and the
 * builders section. An .mp4/.webm src renders as an autoplaying, muted,
 * looping video (poster = the old still, so the frame paints instantly);
 * the lightbox copy gets controls.
 */
export default function ExpandableShot({ src, alt, eager = false, poster }) {
  const [open, setOpen] = useState(false);
  const isVideo = /\.(mp4|webm)(\?|$)/i.test(src);
  // Native `loop` covers the normal path, but Safari won't wrap (or even end)
  // when the file host lacks byte-range support — so a timeupdate watchdog
  // wraps to the start just before the final frame, in every browser.
  const restart = (e) => { const el = e.currentTarget; el.currentTime = 0; el.play().catch(() => {}); };
  const wrap = (e) => {
    const el = e.currentTarget;
    if (el.duration && el.currentTime > el.duration - 0.35) restart(e);
  };

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
          {isVideo ? (
            <video src={src} poster={poster} autoPlay muted loop playsInline aria-label={alt} onEnded={restart} onTimeUpdate={wrap} />
          ) : (
            <img src={src} alt={alt} {...(eager ? { fetchPriority: 'high' } : { loading: 'lazy' })} />
          )}
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
          {isVideo ? (
            <video src={src} poster={poster} controls autoPlay loop playsInline aria-label={alt} onClick={(e) => e.stopPropagation()} />
          ) : (
            <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
          )}
        </div>,
        document.body,
      )}
    </>
  );
}
