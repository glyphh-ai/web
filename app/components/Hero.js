'use client';

import { heroes } from '../heroes';
import HeroCTA from './HeroCTA';
import ExpandableShot from './ExpandableShot';

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
/* Cut from the 3.0 pitch master (marketing/Glyphh-3.0/pitch-master-v1.0.0.mp4)
   — eight product moments, ~25s, muted and looping. It opens AND closes on the
   command center, so the loop point is invisible. The poster is its first
   frame, so nothing flashes while the file loads. */
const HERO_SHOT = '/videos/home-hero.mp4';
const HERO_POSTER = '/videos/home-hero-poster.jpg';
const HERO_ALT =
  'Glyphh in use — the command center, an agent beside code, design boards, music, and media panels';

export default function Hero({ variant = 'default' }) {
  const h = heroes[variant] || heroes.default;

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

          <h1 className="rhero-title">
            {h.title.lead}
            <span className="rhero-accent">{h.title.accent}</span>
          </h1>
          <p className="rhero-sub">{h.sub}</p>
          <div className="hero-ctas rhero-ctas">
            {/* ONE funnel: straight into the platform (login-first). */}
            <HeroCTA variant={variant} href={h.cta.href} label={h.cta.label} />
          </div>
        </div>
      </div>

      {/* The stage IS the hero's payoff — a touch wider than the container. */}
      <div className="rhero-tabs-wrap">
        <ExpandableShot src={HERO_SHOT} poster={HERO_POSTER} alt={HERO_ALT} eager />
      </div>
    </section>
  );
}
