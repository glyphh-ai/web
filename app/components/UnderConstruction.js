'use client';

import { useEffect, useRef } from 'react';

// UNDER CONSTRUCTION (his order, 2026-10-10: "use the new super power modal the
// center piece of that modal with our font under saying. We are re-tooling and
// will be back soon!"): the desktop's New super power hero (app
// help/super-power-new.ts) — Glyphh in a glowing ring, the slow conic turn,
// the comet with its dust, the blink and the little hop — over one line in
// the display face.

// The regular cat (bot-avatar.ts, variant 1, idle): the sticker border in
// white, the body in Glyphh ink, the ringed eye that blinks.
const INK = '#0b0a0f';
const BODY = 'M40 62 L135 13 L123 57 C140 70 144 104 128 121 L112 133 L112 150 C126 152 136 151 145 149 C137 158 130 164 124 169 L128 179 L35 180 L44 131 C18 118 20 80 40 62 Z';
const EAR = 'M28 15 L62 42 L39 54 Z';
const RING = 'M45 104 C43 89 70 66 96 64 C116 62 124 80 121 97 C118 116 100 126 86 122 C70 118 47 112 45 104 Z';

function Cat() {
  return (
    <svg className="uc-cat" viewBox="0 0 165 200" width="112" height="112" role="img" aria-label="Glyphh">
      <g fill="#fff" stroke="#fff" strokeWidth="16" strokeLinejoin="round">
        <path d={BODY} />
        <path d={EAR} />
      </g>
      <path d={BODY} fill={INK} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d={EAR} fill={INK} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M61 138 L99 150 L100 172 L51 171 Z" fill="#fff" />
      <path d={RING} fill="none" stroke="#fff" strokeWidth="8" />
      <g className="uc-eye">
        <circle cx="92" cy="94" r="12" fill="#fff" />
        <circle cx="96.2" cy="89.8" r="3.6" fill={INK} />
      </g>
    </svg>
  );
}

// The super powers that orbit into Glyphh (his order, 2026-10-11: "What if
// you could combine every ai super power into one?").
const POWERS = ['Claude Code', 'Codex', 'Gmail', 'Slack', '3,900 models', 'Browser', 'Schedules', 'Voice', 'Salesforce', 'Your folders', 'GitHub', 'Notion'];
const SALES_URL = 'https://sales.glyphh.ai';

const COMET_MS = 1500;
const DUST = 96;

export default function UnderConstruction() {
  const heroRef = useRef(null);
  const cometRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const comet = cometRef.current;
    const ring = ringRef.current;
    if (!hero || !comet || !ring) return undefined;
    let alive = true;
    let cometTimer = 0;
    let hopTimer = 0;
    const dustTimers = new Set();

    // The comet: at a random moment a bright head sweeps once round the ring,
    // white or the accent, shedding dust that drifts outward.
    const launchComet = () => {
      if (!alive) return;
      hero.style.setProperty('--comet', Math.random() < 0.5 ? '#ffffff' : 'var(--accent)');
      const start = Math.floor(Math.random() * 360);
      hero.style.setProperty('--comet-from', `${start}deg`);
      comet.classList.remove('go');
      void comet.offsetWidth;
      comet.classList.add('go');
      for (let i = 0; i < DUST; i++) {
        const spark = i % 3 === 0;
        const p = document.createElement('span');
        p.className = spark ? 'uc-dust spark' : 'uc-dust';
        const t = (i / DUST) * COMET_MS;
        p.style.setProperty('--a', `${start + (i / DUST) * 360 + (Math.random() - 0.5) * 6}deg`);
        p.style.setProperty('--d', `${t}ms`);
        p.style.setProperty('--out', `${spark ? 18 + Math.random() * 34 : 6 + Math.random() * 26}px`);
        p.style.setProperty('--drift', `${(Math.random() - 0.5) * 40}deg`);
        p.style.setProperty('--s', `${1.5 + Math.random() * 2.5}px`);
        hero.appendChild(p);
        const id = window.setTimeout(() => { p.remove(); dustTimers.delete(id); }, t + 1200);
        dustTimers.add(id);
      }
      cometTimer = window.setTimeout(launchComet, 3500 + Math.random() * 5000);
    };
    cometTimer = window.setTimeout(launchComet, 900 + Math.random() * 1500);

    // A tiny random hop every 4-9s.
    const hop = () => {
      hopTimer = window.setTimeout(() => {
        if (!alive) return;
        ring.classList.remove('uc-hop');
        void ring.offsetWidth;
        ring.classList.add('uc-hop');
        hop();
      }, 4000 + Math.random() * 5000);
    };
    hop();

    return () => {
      alive = false;
      clearTimeout(cometTimer);
      clearTimeout(hopTimer);
      for (const id of dustTimers) clearTimeout(id);
    };
  }, []);

  return (
    <main className="uc-page">
      <div className="uc-glow" aria-hidden="true" />
      <div className="uc-grid" aria-hidden="true" />
      <div className="uc-stage">
      <div className="uc-orbit" aria-hidden="true">
        {POWERS.map((name, i) => (
          <span key={name} className="uc-chip" style={{ '--a': `${(i * 360) / POWERS.length}deg`, '--d': `${i * -0.9}s` }}>
            <span className="uc-chip-in">{name}</span>
          </span>
        ))}
      </div>
      <div className="uc-hero" ref={heroRef}>
        <div className="uc-comet" ref={cometRef}>
          <span className="uc-comet-light" />
          <span className="uc-comet-head" />
          {Array.from({ length: 7 }, (_, i) => (
            <span key={i} className="uc-comet-trail" style={{ '--i': i + 1 }} />
          ))}
        </div>
        <div className="uc-ring" ref={ringRef}>
          <div className="uc-face"><Cat /></div>
        </div>
      </div>
      </div>
      <div className="uc-copy">
        <p className="uc-pill"><span className="uc-dot" />Private beta</p>
        <h1 className="uc-line">What if you could combine every AI super power into <span className="uc-one">one</span>?</h1>
        <p className="uc-sub">Every model, every connection, every agent, working as one.</p>
        <a className="uc-cta" href={SALES_URL}>Sign up for the beta<span className="uc-arrow" aria-hidden="true">→</span></a>
      </div>
    </main>
  );
}
