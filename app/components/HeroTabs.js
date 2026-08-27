'use client';

import { useEffect, useRef, useState } from 'react';
import ExpandableShot from './ExpandableShot';

/**
 * HeroTabs — the STAGE under the hero: one slide per job, plus the
 * command-center switcher flash between them.
 *
 * The tab BAR lives in Hero.js now, ABOVE the headline — the same selection
 * drives the hero message (app/heroes.js) and this stage, so this component
 * is controlled: pass `activeId` and it plays the switch. The old Home tab
 * is gone; its command-center still IS the switcher overlay, so the beat
 * survives as the transition between any two tabs.
 *
 * Static stills for now. Each tab is a slot for the gif/video that replaces
 * it; ExpandableShot renders video off the file extension, so swapping `src`
 * to an .mp4 is the whole edit.
 */

// The switch animation runs THROUGH a command page — per tab now (his spec,
// 2026-08-27): each mode flashes ITS OWN command screen on the way in
// (chat → command-research, code → command-code, work → command-work; Dream
// cuts straight to the film). Until a tab's capture lands, the shared
// command-center frame stands in via the <img> onError fallback.
const SWITCHER_FALLBACK = '/screen-shots/hero/command-center.png';

// The re-cut payoff frames, all captured at one window geometry so the
// command-center flash lands registered on top of them. Exported so Hero.js
// renders the bar from the same list.
export const TABS = [
  {
    id: 'chat',
    label: 'Chat',
    cmd: '/screen-shots/hero/command-research.png',
    src: '/screen-shots/hero/chat.png',
    alt: 'Chat — the agent comparing vector databases and opening all five vendor sites in the browser panel beside its recommendation',
  },
  {
    id: 'work',
    label: 'Work',
    cmd: '/screen-shots/hero/command-work.png',
    src: '/screen-shots/hero/work.png',
    alt: 'Work — the agent pulling a resume from Drive and emailing it, with Gmail and the interview call open alongside',
  },
  {
    id: 'code',
    label: 'Code',
    cmd: '/screen-shots/hero/command-code.png',
    src: '/screen-shots/hero/code.png',
    alt: 'Code — an app built by the agent, running live beside the conversation that built it',
  },
  {
    id: 'dream',
    label: 'Dream',
    // The home-page dream film (marketing/Glyphh-3.0/home-dream.mp4 —
    // recopy to refresh). The DreamReel (below) is benched: its
    // /screen-shots/hero/dream/* stills were never shot, so the reel
    // flipped through blank frames — restore `kind: 'dream'` when they land.
    src: '/videos/home-dream.mp4',
    alt: 'Dream — the Glyphh dream film: ideas becoming running apps inside the workspace',
  },
];

// The Dream tab is not a still — it is the whole page's payoff. Cloned
// marketplace apps (HeyGen, Lovable, …) flip past, each running on the model
// the user already pays for, and then the reel rests on a blank invitation.
// Drop a screenshot at each `src` to replace its placeholder frame; the last
// card is pure copy, no asset.
const DREAM_APPS = [
  { name: 'HeyGen', kind: 'AI video', src: '/screen-shots/hero/dream/heygen.png' },
  { name: 'Lovable', kind: 'App builder', src: '/screen-shots/hero/dream/lovable.png' },
  { name: 'Perplexity', kind: 'Answers', src: '/screen-shots/hero/dream/perplexity.png' },
];
const DREAM_HOLD = 1500; // ms each clone rests before the reel advances

// The closing frame is an empty Glyphh app shell with the bold invite laid over
// it — after the clones run INSIDE the app, the reel ends on the blank canvas
// that's yours. Drop the shell screenshot here; the copy overlays it.
const DREAM_CTA_SHELL = '/screen-shots/hero/dream/app-shell.png';

// The switch, in milliseconds: switcher in, hold (the swap happens under it),
// switcher out. Roughly the cadence of hitting the palette and picking.
const IN = 170;
const HOLD = 200;
const OUT = 280;

/**
 * DreamReel — the Dream tab's body. When it becomes active it flips through the
 * cloned marketplace apps and then holds on the "What will you build?" invite.
 * Reduced motion skips straight to the invite. Resets whenever the tab is left,
 * so the reel replays on every return.
 */
function DreamReel({ active }) {
  const CTA = DREAM_APPS.length; // the step index of the closing invite
  const [step, setStep] = useState(0);
  const timers = useRef([]);

  useEffect(() => {
    const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
    clear();
    if (!active) { setStep(0); return clear; }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setStep(CTA); return clear; }
    setStep(0);
    for (let n = 1; n <= CTA; n++) {
      timers.current.push(setTimeout(() => setStep(n), DREAM_HOLD * n));
    }
    return clear;
  }, [active, CTA]);

  return (
    <div className="dream-reel" aria-live="polite">
      {DREAM_APPS.map((app, i) => (
        <div
          key={app.name}
          className={`dream-app${step === i ? ' is-on' : ''}`}
          style={app.src ? { backgroundImage: `url(${app.src})` } : undefined}
          aria-hidden={step !== i}
        >
          <span className="dream-app-tag">
            <span className="dream-app-name">{app.name}</span>
            <span className="dream-app-kind">{app.kind} — cloned, on your key</span>
          </span>
        </div>
      ))}
      <div
        className={`dream-cta${step === CTA ? ' is-on' : ''}`}
        style={DREAM_CTA_SHELL ? { backgroundImage: `url(${DREAM_CTA_SHELL})` } : undefined}
        aria-hidden={step !== CTA}
      >
        <div className="dream-cta-copy">
          <span className="dream-cta-kick">Dream big</span>
          <h2 className="dream-cta-lead">What will you build?</h2>
          <p className="dream-cta-sub">Use it. Share it at work — or with the world.</p>
        </div>
      </div>
    </div>
  );
}

// The slide-in description panel per tab: a KICKER (what it's for, one line)
// and a BODY (the concrete things you'd do there). Chat's copy is canon —
// the others follow its shape.
const TAB_INFO = {
  chat: {
    kicker: 'For questions, learning, and everyday help.',
    body: 'Ask anything — the right model answers, with your browser, files, and apps working beside it. Explain concepts, draft messaging, search the web, generate images, compare options, or think through a decision.',
  },
  work: {
    kicker: 'For the tasks that fill your day.',
    body: 'A 24/7 assistant working beside you — consolidating your inbox, prepping you for calls, generating slides and docs. Email, calendar, and comms side by side on one page, the agent triaging, drafting, and acting while you steer.',
  },
  code: {
    kicker: 'For building real software.',
    body: 'Build and ship live beside the conversation — plan features, edit code, run terminals, review diffs, and ship from your repo. Live at <your-app>.glyphh.app in one click.',
  },
  dream: {
    kicker: 'For building how you want to work.',
    body: 'Build user interfaces for the way you work, natively integrated into the workspace — wired to any AI model, your memory, and your connections.',
  },
};

/** TabCaption — the tab's kicker TYPES itself out (human-jittered keystrokes,
 *  blinking caret) once the switcher lifts; the body then fades in under it.
 *  Reduced motion renders both instantly. */
function TabCaption({ tab, switching }) {
  const info = TAB_INFO[tab];
  const [typed, setTyped] = useState('');
  const [bodyOn, setBodyOn] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
    clear();
    setTyped('');
    setBodyOn(false);
    if (!info || switching) return clear;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(info.kicker);
      setBodyOn(true);
      return clear;
    }
    let at = 120; // a breath after the reveal
    for (let k = 1; k <= info.kicker.length; k++) {
      at += Math.round(34 * (0.6 + Math.random() * 0.9)) + (Math.random() < 0.06 ? 90 : 0);
      const slice = info.kicker.slice(0, k);
      timers.current.push(setTimeout(() => setTyped(slice), at));
    }
    timers.current.push(setTimeout(() => setBodyOn(true), at + 240));
    return clear;
  }, [tab, switching, info]);

  if (!info) return null;
  return (
    <div className="htabs-caption" aria-live="polite">
      <p className="htabs-caption-kicker">
        {typed}
        <span className="htabs-caret" aria-hidden="true" />
      </p>
      <p className={`htabs-caption-body${bodyOn ? ' is-on' : ''}`}>{info.body}</p>
    </div>
  );
}

export default function HeroTabs({ activeId = 'work' }) {
  // `shown` trails `activeId` by the switcher flash: the swap happens while
  // the command-center covers the stage, so the change is never seen
  // mid-flight — the reveal is the payoff.
  const [shown, setShown] = useState(activeId);
  const [switching, setSwitching] = useState(false);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  useEffect(() => {
    if (activeId === shown) return;
    // A re-select mid-switch restarts the sequence rather than stacking
    // timers and leaving the switcher stuck on.
    clearTimers();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Dream cuts straight to the film — no command-center flash on the way in.
    if (reduced || activeId === 'dream') { setShown(activeId); setSwitching(false); return; }
    setSwitching(true);
    timers.current.push(setTimeout(() => setShown(activeId), IN + HOLD));
    timers.current.push(setTimeout(() => setSwitching(false), IN + HOLD + 20));
  }, [activeId, shown]);

  // A video slide ALWAYS starts from the top (his rule, 2026-08-27): panels
  // stay mounted while hidden, so the dream film kept rolling backstage and a
  // return landed mid-scene. Entering a video slide rewinds and plays; every
  // other slide's video pauses and resets, so leaving IS the reset.
  useEffect(() => {
    document.querySelectorAll('.htabs-slide video').forEach((v) => {
      const mine = v.closest(`#htabpanel-${shown}`);
      if (mine) {
        try { v.currentTime = 0; } catch { /* not yet seekable — plays from 0 anyway */ }
        v.play().catch(() => {});
      } else if (!v.paused || v.currentTime > 0) {
        v.pause();
        try { v.currentTime = 0; } catch { /* noop */ }
      }
    });
  }, [shown]);

  return (
    <div className="htabs">
      {/* The side caption (TabCaption) is HIDDEN for now — the stage rides
          full-width. The component stays; it likely moves to its own section. */}
      <div className="htabs-panel htabs-panel-full">
        <div className="htabs-viewport">

          <div className="htabs-track">
            {TABS.map((t) => (
              <div
                key={t.id}
                className={`htabs-slide${shown === t.id ? ' is-active' : ''}`}
                role="tabpanel"
                id={`htabpanel-${t.id}`}
                aria-labelledby={`htab-${t.id}`}
                // Inactive panels stay in the DOM (stacked, opacity 0), so
                // they are taken out of the a11y tree and focus order
                // explicitly — otherwise their expand buttons are still
                // tabbable behind the visible one.
                aria-hidden={shown !== t.id}
                inert={shown !== t.id}
              >
                {t.kind === 'dream'
                  ? <DreamReel active={shown === t.id && !switching} />
                  : <ExpandableShot src={t.src} alt={t.alt} eager={t.id === 'work'} />}
              </div>
            ))}
          </div>

          {/* The switcher, over the stage. Decorative — the tab bar in the
              hero is the real control, and this is only the animation
              between states. */}
          <div className={`htabs-switcher${switching ? ' is-on' : ''}`} aria-hidden="true">
            <img
              src={TABS.find((t) => t.id === activeId)?.cmd ?? SWITCHER_FALLBACK}
              alt=""
              onError={(e) => { if (e.currentTarget.src !== new URL(SWITCHER_FALLBACK, window.location.href).href) e.currentTarget.src = SWITCHER_FALLBACK; }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
