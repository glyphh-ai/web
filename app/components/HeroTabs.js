'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ExpandableShot from './ExpandableShot';

/**
 * HeroTabs — the three jobs from the headline, and the command center that
 * moves between them.
 *
 * Command center is not a fourth tab; in the product it is the surface you
 * hit to switch layouts and apps. So it plays as the TRANSITION: click a tab
 * and the switcher flashes over the stage, the view is replaced in place
 * underneath it, and the new one is revealed as it dismisses — the same beat
 * as the real app.
 *
 * Static stills for now. Each tab is a slot for the gif/video that replaces
 * it; ExpandableShot renders video off the file extension, so swapping `src`
 * to an .mp4 is the whole edit.
 */

const SWITCHER = '/screen-shots/hero/command-center.png';

// The re-cut payoff frames, all captured at one window geometry so the
// command-center flash lands registered on top of them. The hero/<tab>/step-*
// sequences are the same states in progress, kept for the animated version.
const TABS = [
  {
    id: 'home',
    label: 'Home',
    src: '/screen-shots/hero/command-center.png',
    alt: 'Home — the command center: every app, layout, and session on one wall',
  },
  {
    id: 'chat',
    label: 'Chat',
    src: '/screen-shots/hero/chat.png',
    alt: 'Chat — the agent comparing vector databases and opening all five vendor sites in the browser panel beside its recommendation',
  },
  {
    id: 'work',
    label: 'Work',
    src: '/screen-shots/hero/work.png',
    alt: 'Work — the agent pulling a resume from Drive and emailing it, with Gmail and the interview call open alongside',
  },
  {
    id: 'code',
    label: 'Code',
    src: '/screen-shots/hero/code.png',
    alt: 'Code — an app built by the agent, running live beside the conversation that built it',
  },
  {
    id: 'dream',
    label: 'Dream',
    kind: 'dream',
    alt: 'Dream — marketplace apps like HeyGen and Lovable, cloned into Glyphh and running on the AI subscription you already pay for',
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

// The slide-in description panel per tab: a LABEL (the { … } eyebrow — the
// tab's name, except Home, which reads as the workspace itself), a KICKER
// (what it's for, one line) and a BODY (the concrete things you'd do there).
// Chat's copy is canon — the others follow its shape.
const TAB_INFO = {
  home: {
    label: 'THE WORKSPACE',
    kicker: 'For getting anywhere in one keystroke.',
    body: 'The command center is home — your apps, layouts, and sessions on one wall. Open something, switch jobs, or start fresh, from anywhere in the app.',
  },
  chat: {
    label: 'CHAT',
    kicker: 'For questions, learning, and everyday help.',
    body: 'Ask anything — the right model answers, with your browser, files, and apps working beside it. Explain concepts, draft messaging, search the web, generate images, compare options, or think through a decision.',
  },
  work: {
    label: 'WORK',
    kicker: 'For the tasks that fill your day.',
    body: 'A 24/7 assistant working beside you — consolidating your inbox, prepping you for calls, generating slides and docs. Email, calendar, and comms side by side on one page, the agent triaging, drafting, and acting while you steer.',
  },
  code: {
    label: 'CODE',
    kicker: 'For building real software.',
    body: 'Build and ship live beside the conversation — plan features, edit code, run terminals, review diffs, and ship from your repo. Live at <your-app>.glyphh.app in one click.',
  },
  dream: {
    label: 'DREAM',
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

export default function HeroTabs() {
  const [index, setIndex] = useState(0);
  const [switching, setSwitching] = useState(false);
  const btnRefs = useRef([]);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const goTo = useCallback((next) => {
    if (next === index) return;
    // A second click mid-switch restarts the sequence rather than stacking
    // timers and leaving the switcher stuck on.
    clearTimers();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // HOME IS the command center — leaving it (or landing on it) needs no
    // command-center flash; the beat only plays between two non-home tabs.
    const touchesHome = TABS[index].id === 'home' || TABS[next].id === 'home';
    if (reduced || touchesHome) { setIndex(next); setSwitching(false); return; }

    setSwitching(true);
    // The swap happens while the switcher covers the stage, so the change is
    // never seen mid-flight — the reveal is the payoff.
    timers.current.push(setTimeout(() => setIndex(next), IN + HOLD));
    timers.current.push(setTimeout(() => setSwitching(false), IN + HOLD + 20));
  }, [index]);

  // The hero lede's "Chat, Work & Code" words aim the stage: hovering one
  // switches to its tab through the same goTo beat as a click.
  useEffect(() => {
    const onAim = (e) => {
      const i = TABS.findIndex((t) => t.id === e.detail);
      if (i >= 0) goTo(i);
    };
    window.addEventListener('glyphh:hero-triad', onAim);
    return () => window.removeEventListener('glyphh:hero-triad', onAim);
  }, [goTo]);

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
    goTo(next);
    btnRefs.current[next]?.focus();
  };

  return (
    <div className="htabs">
      <div className="htabs-bar" role="tablist" aria-label="What Glyphh does" onKeyDown={onKeyDown}>
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { btnRefs.current[i] = el; }}
            type="button"
            role="tab"
            id={`htab-${t.id}`}
            aria-selected={index === i}
            aria-controls={`htabpanel-${t.id}`}
            tabIndex={index === i ? 0 : -1}
            className={`htab${index === i ? ' is-active' : ''}`}
            onClick={() => goTo(i)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="htabs-panel">
        <div className="htabs-side">
          <TabCaption tab={TABS[index].id} switching={switching} />
        </div>
        <div className="htabs-viewport">

          <div className="htabs-track">
            {TABS.map((t, i) => (
              <div
                key={t.id}
                className={`htabs-slide${index === i ? ' is-active' : ''}`}
                role="tabpanel"
                id={`htabpanel-${t.id}`}
                aria-labelledby={`htab-${t.id}`}
                // Inactive panels stay in the DOM (stacked, opacity 0), so
                // they are taken out of the a11y tree and focus order
                // explicitly — otherwise their expand buttons are still
                // tabbable behind the visible one.
                aria-hidden={index !== i}
                inert={index !== i}
              >
                {t.kind === 'dream'
                  ? <DreamReel active={index === i && !switching} />
                  : <ExpandableShot src={t.src} alt={t.alt} eager={i === 0} />}
              </div>
            ))}
          </div>

          {/* The switcher, over the stage. Decorative — the tab bar above is
              the real control, and this is only the animation between states. */}
          <div className={`htabs-switcher${switching ? ' is-on' : ''}`} aria-hidden="true">
            <img src={SWITCHER} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
