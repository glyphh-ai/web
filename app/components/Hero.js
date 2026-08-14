'use client';

import { useRef, useState } from 'react';
import HeroTabs, { TABS } from './HeroTabs';
import HeroCTA from './HeroCTA';
import { heroFor } from '../heroes';

/**
 * Hero — the home thesis, set in the desktop product page's own type
 * (.rhero-* verbatim, so home and product can never drift): big white title,
 * the brand gradient on the reveal, the product page's gray for the lede.
 *
 * The Chat / Work / Code / Dream tab bar rides ABOVE the headline and drives
 * BOTH the hero message (app/heroes.js) and the stage below (HeroTabs). The
 * page lands on Work. Campaign paths still pick the opening tab — /code,
 * /work, /chat, /dream via middleware.js → `variant` — so the split test
 * keeps working; bare glyphh.ai opens on Work.
 */
export default function Hero({ variant = 'default' }) {
  const initial = TABS.some((t) => t.id === variant) ? variant : 'work';
  const [tab, setTab] = useState(initial);
  const h = heroFor(tab);
  const btnRefs = useRef([]);
  const index = TABS.findIndex((t) => t.id === tab);

  // A role="tablist" is expected to move with the arrow keys, and only the
  // selected tab stays in the tab order (roving tabindex, below).
  const onKeyDown = (e) => {
    const next =
      e.key === 'ArrowRight' ? (index + 1) % TABS.length :
      e.key === 'ArrowLeft' ? (index - 1 + TABS.length) % TABS.length :
      e.key === 'Home' ? 0 :
      e.key === 'End' ? TABS.length - 1 : -1;
    if (next === -1) return;
    e.preventDefault();
    setTab(TABS[next].id);
    btnRefs.current[next]?.focus();
  };

  return (
    <section className="rhero rhero-product">
      <div className="hh-glow" aria-hidden="true" />
      <div className="rhero-inner container">
        <div className="rhero-copy">
          {/* Announcement pill — newest model, links to the live models table. */}
          <a href={h.pill.href} className="hero-badge hero-badge-link">
            <span className="badge-dot" aria-hidden="true"></span>
            <span className="hero-badge-label">{h.pill.label}</span>
            <span className="hero-badge-cta">{h.pill.cta} &rarr;</span>
          </a>

          {/* The jobs, above the thesis — picking one swaps the message AND
              the stage below. */}
          <div className="htabs-bar rhero-tabbar" role="tablist" aria-label="What Glyphh does" onKeyDown={onKeyDown}>
            {TABS.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => { btnRefs.current[i] = el; }}
                type="button"
                role="tab"
                id={`htab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls={`htabpanel-${t.id}`}
                tabIndex={tab === t.id ? 0 : -1}
                className={`htab${tab === t.id ? ' is-active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <h1 className="rhero-title">
            {h.title.lead}
            <span className="rhero-accent">{h.title.accent}</span>
          </h1>
          <p className="rhero-sub">{h.sub}</p>
          <div className="hero-ctas rhero-ctas">
            {/* ONE funnel: straight into the platform (login-first). The CTA
                tracks by the ACTIVE TAB, so the experiment reads per-message. */}
            <HeroCTA variant={tab} href={h.cta.href} label={h.cta.label} />
          </div>
        </div>
      </div>

      {/* The stage IS the hero's payoff — side caption, a touch wider
          than the standard container. */}
      <div className="rhero-tabs-wrap">
        <HeroTabs activeId={tab} />
      </div>
    </section>
  );
}
