'use client';

import { useEffect } from 'react';

// Mount once per page to drive the .reveal scroll-in animation. Extracted
// from the old home page so every route (home, research, products, pricing)
// shares the same observer + bfcache handling.
export default function Reveal() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    function observeAll() {
      document.querySelectorAll('.reveal').forEach(el => {
        // Re-add revealed if already in viewport (back-nav / bfcache)
        el.classList.remove('revealed');
        observer.observe(el);
      });
    }

    observeAll();

    // Handle bfcache restore (browser back/forward)
    const onPageShow = (e) => {
      if (e.persisted) observeAll();
    };
    window.addEventListener('pageshow', onPageShow);

    return () => {
      observer.disconnect();
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []);

  return null;
}
