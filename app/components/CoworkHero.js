'use client';

import { useEffect, useState } from 'react';
import HeroParticles from './HeroParticles';

/**
 * CoworkHero — the Glyphh Desktop hero.
 *
 * One big crafted scene: an ultra-modern gradient canvas (bottom-left violet →
 * top-right peach), the OUTPUT — an abstract slides app, deck already built —
 * and the ask floating clear on top as a white bubble, typing itself with the
 * connected apps as inline chips. The loop line sits quietly under the ask.
 */

const favicon = (d) => `https://www.google.com/s2/favicons?domain=${d}&sz=64`;

// The ask, as segments: plain text types; app chips pop in whole.
const SEGMENTS = [
  { t: 'Read the ' },
  { chip: 'Q3 folder', d: 'drive.google.com', c: '#4285f4' },
  { t: ' and build a ' },
  { chip: 'slide deck', d: 'docs.google.com', c: '#f4b400' },
  { t: ' on our corporate template for the 2pm call' },
];

const TYPE_MS = 30;
const HOLD_MS = 5200;

/** Flatten segments into typed "units": characters, or a whole chip. */
const UNITS = SEGMENTS.flatMap((s, i) =>
  s.chip ? [{ chip: s, key: `c${i}` }] : s.t.split('').map((ch, j) => ({ ch, key: `t${i}-${j}` })),
);

export default function CoworkHero() {
  const [n, setN] = useState(0);
  const done = n >= UNITS.length;

  useEffect(() => {
    const t = setTimeout(() => setN((v) => (v >= UNITS.length ? 0 : v + 1)),
      done ? HOLD_MS : (UNITS[n]?.chip ? TYPE_MS * 6 : TYPE_MS));
    return () => clearTimeout(t);
  }, [n, done]);

  return (
    <section className="hero hero-stacked">
      <HeroParticles />
      <div className="hero-copy hero-copy-center">
        <div className="hero-badge">
          <span className="badge-dot" aria-hidden="true"></span>
          Native desktop app · Mac &amp; Windows
        </div>
        <h1 className="hero-title">The team agent for real work.</h1>
        <p className="hero-sub-big">
          Glyphh Desktop plans it, does it, and delivers it — and you decide
          which models think, what it can touch, and how far it goes.
        </p>
        <div className="hero-ctas">
          <a href="#download" className="btn btn-primary btn-lg group">
            <span className="btn-label">Download Now</span>
            <span className="btn-fill"></span>
          </a>
          <a href="#loops" className="btn btn-ghost btn-lg group">
            <span className="btn-label">See How It Works</span>
            <span className="btn-fill"></span>
          </a>
        </div>
      </div>

      <div className="hero-stage">
        <div className="hs-canvas" aria-hidden="true">
          {/* The OUTPUT: an abstract slides app, deck already built. */}
          <div className="hs-slides">
            <div className="hs-rail">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div className="hs-thumb" key={i}>
                  <span className="hs-thumb-n">{i}</span>
                  <span className={`hs-thumb-body${i === 1 ? ' hs-thumb-hero' : ''}`}>
                    {i !== 1 && <><i className="hs-thumb-line" style={{ width: `${58 - (i * 6) % 22}%` }} /><i className="hs-thumb-line hs-thumb-line-2" /></>}
                  </span>
                </div>
              ))}
            </div>
            <div className="hs-slide">
              <div className="hs-slide-art">
                <span className="hs-slide-art-glyph">⣿</span>
              </div>
              <div className="hs-slide-title">Q3 Review</div>
              <div className="hs-slide-sub" />
              <div className="hs-slide-row">
                <div className="hs-slide-chart">
                  {[38, 62, 50, 84].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
                </div>
                <div className="hs-slide-notes">
                  <i style={{ width: '92%' }} />
                  <i style={{ width: '74%' }} />
                  <i style={{ width: '58%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* The ASK, floating clear over the output. */}
          <div className="hs-ask">
            <div className="hs-ask-text">
              {UNITS.slice(0, n).map((u) =>
                u.chip ? (
                  <span className="hs-chip" key={u.key} style={{ color: u.chip.c }}>
                    <img src={favicon(u.chip.d)} alt="" />{u.chip.chip}
                  </span>
                ) : (
                  <span key={u.key}>{u.ch}</span>
                ),
              )}
              <span className="hs-caret" />
            </div>
            {/* The bar, exactly like the app's: permission left; models,
                loop, and the context meter on the right. */}
            <div className="hs-bar">
              <span className="hs-pill hs-pill-mode"><i className="hs-mode-dot" />Auto</span>
              <span className="hs-bar-spacer" />
              <span className="hs-pill"><i className="ch-dot ch-dot-frontier" />Fable 5 <em>Planner</em></span>
              <span className="hs-pill"><i className="ch-dot ch-dot-open" />Mistral Small 3.2 <em>Worker</em></span>
              <span className="hs-pill hs-pill-loop">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-2.6-6.3" /><polyline points="21 3 21 9 15 9" /></svg>
                Plan &amp; Build
              </span>
              <span className="hs-meter"><i className="hs-meter-fill" /><i className="hs-meter-tick" /></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
