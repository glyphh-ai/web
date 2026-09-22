'use client';

/**
 * AppMarquee — the favicon wall as a slim two-row band directly under the
 * home hero (his order, 2026-09-21: between the hero and the callout). Continuous scroll, paused on
 * hover; a static wrap-grid under prefers-reduced-motion (the duplicate
 * set used for the seamless loop is hidden there).
 *
 * Row 1 leads with Gmail, Slack, Salesforce — the three named in the hero
 * subline.
 */

import { APPS_ROW1, APPS_ROW2, APPS_ROW3 } from './apps-data';

function MarqueeRow({ apps, direction }) {
  const sets = [apps, apps];
  return (
    <div className="scroll-track-wrap">
      <div className={`scroll-track ${direction}`}>
        {sets.map((set, s) =>
          set.map((app) => (
            <div
              key={`${app.domain}-${app.name}-${s}`}
              className={`scroll-app${s === 1 ? ' scroll-app-dup' : ''}`}
              aria-hidden={s === 1 || undefined}
              aria-label={s === 0 ? app.name : undefined}
            >
              {/* NOT loading="lazy": the track scrolls by CSS transform, so
                  items that start off-screen horizontally never re-trigger a
                  deferred fetch and would animate in as blank pills. Low
                  fetch priority keeps them behind the hero instead; the
                  duplicate set reuses the cache, and width/height are fixed
                  so nothing shifts. */}
              <img
                src={`https://www.google.com/s2/favicons?domain=${app.domain}&sz=64`}
                alt={app.name}
                width={32}
                height={32}
                decoding="async"
                fetchPriority="low"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling?.classList.add('visible'); }}
              />
              <span className="scroll-app-fallback" aria-hidden="true">{app.name.charAt(0)}</span>
              <span>{app.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function AppMarquee() {
  return (
    <section className="marquee" id="apps">
      <div className="scroll-rows marquee-rows">
        <MarqueeRow apps={APPS_ROW1} direction="scroll-left" />
        <MarqueeRow apps={APPS_ROW2} direction="scroll-right" />
        <MarqueeRow apps={APPS_ROW3} direction="scroll-left" />
      </div>
      {/* His copy, 2026-09-21: the scroller sits between the hero and the callout. */}
      <p className="marquee-cap">
        3,500+ connected services &mdash; and your integration platforms, from Zapier and Make
        to n8n, Boomi, and Workato, over MCP. Shared with your team, governed by your admins.
      </p>
    </section>
  );
}
