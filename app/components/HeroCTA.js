'use client';

import { useEffect } from 'react';

// The hero experiment beacon. gtag is loaded in app/layout.js (GA4
// G-YZ78CLMRWY); this fires the two events the message test is measured on:
//
//   hero_viewed     — once on mount, tagged with the active variant
//   hero_cta_click  — on the primary CTA click (the conversion)
//
// Conversion rate per variant = hero_cta_click / hero_viewed, broken down by
// `hero_variant` in a GA4 exploration. The variant is set by the path
// (/, /code, /work) via middleware.js + page.js. gtag is guarded so a blocked
// or not-yet-loaded analytics script never breaks the button.
function track(event, variant) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, { hero_variant: variant });
  }
}

export default function HeroCTA({ variant = 'default', href, label, className }) {
  // A custom className renders a plain link — no wipe layer — for heroes that
  // bring their own button style (OsHero). The beacon fires either way.
  const plain = Boolean(className);

  useEffect(() => {
    track('hero_viewed', variant);
  }, [variant]);

  return (
    <a
      href={href}
      className={className || 'btn btn-primary btn-lg group'}
      onClick={() => track('hero_cta_click', variant)}
    >
      {plain ? label : (
        <>
          <span className="btn-label">{label}</span>
          <span className="btn-fill"></span>
        </>
      )}
    </a>
  );
}
