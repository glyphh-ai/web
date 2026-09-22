'use client';

import { heroes } from '../heroes';
import HeroCTA from './HeroCTA';
import HeroStage from './HeroStage';

/**
 * Hero — the thesis and ONE payoff frame beneath it.
 *
 * The tab bar is GONE (his order, 2026-08-28): no switching, no rotation,
 * no gimmicks. One message, one stage. The campaign paths (glyphh.ai/code,
 * /work — see ../middleware.js) still swap the message via `variant`; bare
 * glyphh.ai reads `default`.
 *
 * The stage is a single slot. ExpandableShot renders a video off the file
 * extension, so pointing HERO_SHOT at an .mp4 (with the still as its poster,
 * which paints instantly while the file loads) is the whole edit.
 */

/**
 * `side` (his order, 2026-09-21): a node for the hero's right-hand column,
 * the Router marketecture on the home page. With a side the copy is
 * left-aligned in a two-column grid; without one it stays centered.
 */
/* The split layout, INLINE (his order, 2026-09-21): text left, mockup right.
   Inline so it rides with the component and never waits on a stylesheet.
   auto-fit wraps to one column under ~900px without a media query. */
const SPLIT = {
  inner: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 'clamp(3rem, 6vw, 7rem)', alignItems: 'center', width: '100%', maxWidth: 'min(1500px, 94vw)' },
  copy: { textAlign: 'left', alignItems: 'flex-start', maxWidth: 'none' },
  title: { maxWidth: 'none', margin: '0 0 1.4rem' },
  sub: { textAlign: 'left', margin: '0 0 2.2rem', maxWidth: '56ch' },
  ctas: { justifyContent: 'flex-start' },
  side: { minWidth: 0, display: 'flex', justifyContent: 'flex-end' },
};

export default function Hero({ variant = 'default', stage = false, side = null }) {
  const h = heroes[variant] || heroes.default;

  return (
    <section className="rhero rhero-product">
      <div className="hh-glow" aria-hidden="true" />
      <div className={`rhero-inner container ${side ? 'rhero-split' : ''}`} style={side ? SPLIT.inner : undefined}>
        <div className="rhero-copy" style={side ? SPLIT.copy : undefined}>
          {/* Announcement pill — newest model, links to the live models table. */}
          <a href={h.pill.href} className="hero-badge hero-badge-link">
            <span className="badge-dot" aria-hidden="true"></span>
            <span className="hero-badge-label">{h.pill.label}</span>
            <span className="hero-badge-cta">{h.pill.cta} &rarr;</span>
          </a>

          <h1 className="rhero-title" style={side ? SPLIT.title : undefined}>
            {h.title.lead}
            <span className="rhero-accent">{h.title.accent}</span>
          </h1>
          <p className="rhero-sub" style={side ? SPLIT.sub : undefined}>{h.sub}</p>
          <div className="hero-ctas rhero-ctas" style={side ? SPLIT.ctas : undefined}>
            {/* ONE funnel: straight into the platform (login-first). */}
            <HeroCTA variant={variant} href={h.cta.href} label={h.cta.label} />
          </div>
        </div>
        {side ? <div className="rhero-side" style={SPLIT.side}>{side}</div> : null}
      </div>

      {/* The stage — Chat, Work and Code, rotating (his order, 2026-09-19) — is
          the DESKTOP hero's payoff. The home hero is the Router (2026-09-21)
          and the marketecture beneath it is its picture, so home passes no
          stage; /products/desktop does. */}
      {stage ? (
        <div className="rhero-tabs-wrap">
          <HeroStage />
        </div>
      ) : null}
    </section>
  );
}
