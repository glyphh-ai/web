'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * HeroDemo — the CLI hero artifact. A terminal that runs the whole story:
 *   signin  → device approval screen
 *   booting → "approved" flash
 *   chat    → welcome builds in, the prompt types, then the run STREAMS one
 *             line at a time; when the agent opens the site, an abstract app
 *             window renders behind the terminal; it holds, then restarts.
 * Purely presentational (aria-hidden).
 */

const PROMPT = 'build a landing page, deploy it to prod, then open my browser so i can review';
const TYPE_MS = 28;
const SIGNIN_MS = 4200;
const BOOT_MS = 1200;

const WELCOME = [
  'The Glyphh agent — the same engine as the desktop, in your terminal.',
  'Answers stream live; tool calls land as receipts.',
  '/help for commands · shift-tab cycles the permission mode',
];

// the chat timeline — each step reveals, holds `after` ms, then the next reveals.
const SEQ = [
  { k: 'welcome', after: 900 },
  { k: 'type', text: PROMPT, after: 550 },
  { k: 'answer', text: 'On it — scaffolding the page, wiring the build, deploying, and opening your browser.', after: 600 },
  { k: 'receipt', tool: 'Write', arg: 'index.html', after: 650 },
  { k: 'receipt', tool: 'Bash', arg: 'npm run build', secs: '2.1s', after: 750 },
  { k: 'receipt', tool: 'Bash', ok: true, arg: 'deploy → acme-site.glyphh.app', secs: '3.4s', after: 800 },
  { k: 'open', tool: 'Browser', arg: 'open → acme-site.glyphh.app', after: 1500 },
  { k: 'answer', text: 'Live at acme-site.glyphh.app — opened in your browser for review.', after: 800 },
  { k: 'type', text: 'push to prod', follow: true, after: 400 },
  { k: 'hold', after: 4600 },
];
const OPEN_INDEX = SEQ.findIndex((s) => s.k === 'open');

export default function HeroDemo() {
  const [phase, setPhase] = useState('signin'); // signin | booting | chat
  const [i, setI] = useState(0);                 // current step in SEQ
  const [typed, setTyped] = useState(0);         // chars typed for a 'type' step
  const bodyRef = useRef(null);

  // keep the newest line in view — the terminal scrolls, it doesn't grow.
  useEffect(() => {
    const el = bodyRef.current;
    if (el && phase === 'chat') el.scrollTop = el.scrollHeight;
  }, [phase, i, typed]);

  // phase + step clock
  useEffect(() => {
    if (phase === 'signin') {
      const t = setTimeout(() => setPhase('booting'), SIGNIN_MS);
      return () => clearTimeout(t);
    }
    if (phase === 'booting') {
      const t = setTimeout(() => { setI(0); setTyped(0); setPhase('chat'); }, BOOT_MS);
      return () => clearTimeout(t);
    }
    // chat
    const item = SEQ[i];
    if (!item) return;
    if (item.k === 'type' && typed < item.text.length) {
      const t = setTimeout(() => setTyped((v) => v + 1), TYPE_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (i >= SEQ.length - 1) { setPhase('signin'); }   // loop
      else { setTyped(0); setI((v) => v + 1); }
    }, item.after);
    return () => clearTimeout(t);
  }, [phase, i, typed]);

  const appOpen = phase === 'chat' && i >= OPEN_INDEX;

  return (
    <div className="hd-wrap" aria-hidden="true">
      <AppWindow open={appOpen} />

      <div className="cterm hd-term">
        <div className="cterm-bar">
          <span className="cterm-dots"><i /><i /><i /></span>
          <span className="cterm-title">glyphh — {phase === 'chat' ? '~/acme-site' : 'sign in'}</span>
        </div>

        <div className="cterm-body hd-body" ref={bodyRef}>
          {phase === 'signin' && <SignIn />}
          {phase === 'booting' && <Booting />}
          {phase === 'chat' && <Chat i={i} typed={typed} />}
        </div>

        <div className="cterm-foot">
          <span className="ct-pill ct-pill-mode"><i className="ct-mode-dot" />Auto</span>
          <span className="ct-foot-spacer" />
          <span className="ct-pill"><i className="ct-dot ct-dot-frontier" />Fable 5 <em>Planner</em></span>
          <span className="ct-pill"><i className="ct-dot ct-dot-open" />Mistral <em>Worker</em></span>
          <span className="ct-tok">{phase === 'chat' ? '1.2k↑ 340↓' : 'ready'}</span>
        </div>
      </div>
    </div>
  );
}

function SignIn() {
  return (
    <div className="hd-signin">
      <img src="/glyphh-mascot-square.png" alt="" className="hd-signin-mark" width="72" height="72" />
      <div className="hd-signin-title">Sign in to Glyphh</div>
      <div className="hd-signin-lead">
        Press enter to open your browser — sign in with Google or email to approve.
      </div>
      <div className="hd-signin-url">http://127.0.0.1:3002/auth/device</div>
      <div className="hd-code">
        <span className="hd-code-label">confirm this code matches</span>
        <span className="hd-code-val">S G B D — P F T D</span>
      </div>
      <div className="hd-signin-wait"><span className="hd-wait-dot" />waiting for approval…</div>
      <div className="hd-signin-hint"><em>enter</em> · open browser <span className="hd-sep">·</span> <em>ctrl+c</em> · quit</div>
    </div>
  );
}

function Booting() {
  return (
    <div className="hd-boot">
      <div className="ct-answer"><span className="ct-glyph">●</span> Browser opened — approve in the tab.</div>
      <div className="ct-receipt ct-ok"><span className="ct-fold">▸</span> Device <span className="ct-arg">approved → session started</span></div>
      <div className="ct-answer hd-boot-ok"><span className="ct-glyph">✓</span> Signed in as <span className="ct-link">tom.tommerson@glyphh.ai</span> — Enterprise.</div>
    </div>
  );
}

function Chat({ i, typed }) {
  return (
    <>
      <div className="ct-head">
        <span className="ct-braille">Glyphh</span>
        <span className="ct-head-meta">v1.0.1 · Fable 5</span>
      </div>

      {i >= 0 && (
        <div className="hd-welcome hd-in">
          {WELCOME.map((line, k) => <div key={k}>{line}</div>)}
        </div>
      )}

      {SEQ.map((item, idx) => {
        if (idx === 0 || idx > i || item.k === 'hold') return null;

        if (item.k === 'type') {
          const typing = idx === i;
          const txt = typing ? item.text.slice(0, typed) : item.text;
          const caret = typing && typed < item.text.length;
          return (
            <div key={idx} className={`ct-user hd-in ${item.follow ? 'ct-user-follow' : ''}`}>
              <span className="ct-bar">▌</span>{txt}
              {caret && <span className="ct-caret" />}
              {!caret && item.follow && <span className="ct-caret ct-caret-idle" />}
            </div>
          );
        }
        if (item.k === 'answer') {
          return <div key={idx} className="ct-answer hd-in"><span className="ct-glyph">●</span> {item.text}</div>;
        }
        // receipt | open
        return (
          <div key={idx} className={`ct-receipt hd-in ${item.ok ? 'ct-ok' : ''}`}>
            <span className="ct-fold">▸</span> {item.tool} <span className="ct-arg">{item.arg}</span>
            {item.secs && <span className="ct-secs"> · {item.secs}</span>}
          </div>
        );
      })}
    </>
  );
}

/** An abstract "opened app" — a browser window with a built landing page,
 *  rendered behind the terminal when the agent opens the site. */
function AppWindow({ open }) {
  return (
    <div className={`hd-app ${open ? 'open' : ''}`}>
      <div className="hd-app-bar">
        <span className="hd-app-dots"><i /><i /><i /></span>
        <span className="hd-app-url">acme-site.glyphh.app</span>
      </div>
      <div className="hd-app-body">
        <div className="hd-app-nav">
          <span className="hd-app-logo" />
          <span className="hd-app-navlinks"><i /><i /><i /></span>
          <span className="hd-app-cta" />
        </div>
        <div className="hd-app-hero">
          <div className="hd-app-hcopy">
            <span className="hd-app-h1" />
            <span className="hd-app-h1 short" />
            <span className="hd-app-sub" />
            <span className="hd-app-sub short" />
            <span className="hd-app-btn" />
          </div>
          <div className="hd-app-art" />
        </div>
        <div className="hd-app-cards"><span /><span /><span /></div>
      </div>
    </div>
  );
}
