'use client';

import { useEffect } from 'react';
import Script from 'next/script';

/**
 * The ad platforms' pixels (his order, 2026-10-02). Each loads only when its
 * id is set below; the ids are public, like the Analytics id in layout.js.
 * Every page reports a visit, and a click on a link to the console (Create an
 * account, Sign up, Log in) reports a lead. The sign-up itself is counted by
 * the server (glyphh_auth/attribution.py), not here.
 */
export const REDDIT_PIXEL_ID = 'a2_ipk9ezvxinmg';
export const META_PIXEL_ID = '';

const PLATFORM_HOST = 'platform.glyphh.ai';

export default function AdPixels() {
  useEffect(() => {
    if (!REDDIT_PIXEL_ID && !META_PIXEL_ID) return undefined;
    const onClick = (e) => {
      const link = e.target instanceof Element ? e.target.closest('a[href]') : null;
      if (!link || !link.href.includes(PLATFORM_HOST)) return;
      if (REDDIT_PIXEL_ID && window.rdt) window.rdt('track', 'Lead');
      if (META_PIXEL_ID && window.fbq) window.fbq('track', 'Lead');
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return (
    <>
      {REDDIT_PIXEL_ID && (
        <Script id="reddit-pixel" strategy="afterInteractive">
          {`!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js?pixel_id=${REDDIT_PIXEL_ID}",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','${REDDIT_PIXEL_ID}');rdt('track','PageVisit');`}
        </Script>
      )}
      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
