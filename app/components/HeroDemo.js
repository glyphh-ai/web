'use client';

import { useEffect, useState } from 'react';

/**
 * HeroDemo — the home hero artifact. A terminal that first shows the Glyphh CLI
 * device sign-in screen, then boots into the running agent: a typed prompt, a
 * streamed answer, tool receipts, and a follow-up turn. Purely presentational
 * (aria-hidden); the copy above carries the real message.
 *
 * Phases: signin (device approval) → booting (approved flash) → chat (the demo).
 */

const PROMPT = 'build a landing page, deploy it to prod, then open my browser so i can review';
const TYPE_MS = 28;
const SIGNIN_MS = 4200;
const BOOT_MS = 1100;
const CHAT_HOLD_MS = 7000;

export default function HeroDemo() {
  const [phase, setPhase] = useState('signin'); // signin | booting | chat
  const [n, setN] = useState(0);
  const done = n >= PROMPT.length;

  // phase clock: signin → booting → chat, and chat loops back to signin
  useEffect(() => {
    if (phase === 'signin') {
      const t = setTimeout(() => setPhase('booting'), SIGNIN_MS);
      return () => clearTimeout(t);
    }
    if (phase === 'booting') {
      const t = setTimeout(() => { setN(0); setPhase('chat'); }, BOOT_MS);
      return () => clearTimeout(t);
    }
    if (phase === 'chat' && done) {
      const t = setTimeout(() => setPhase('signin'), CHAT_HOLD_MS);
      return () => clearTimeout(t);
    }
  }, [phase, done]);

  // type the prompt out once we're in chat
  useEffect(() => {
    if (phase !== 'chat' || done) return;
    const t = setTimeout(() => setN((v) => v + 1), TYPE_MS);
    return () => clearTimeout(t);
  }, [phase, n, done]);

  return (
    <div className="cterm hd-term" aria-hidden="true">
      <div className="cterm-bar">
        <span className="cterm-dots"><i /><i /><i /></span>
        <span className="cterm-title">
          glyphh — {phase === 'chat' ? '~/acme-site' : 'sign in'}
        </span>
      </div>

      <div className="cterm-body hd-body">
        {phase === 'signin' && <SignIn />}
        {phase === 'booting' && <Booting />}
        {phase === 'chat' && <Chat n={n} done={done} />}
      </div>

      <div className="cterm-foot">
        <span className="ct-pill ct-pill-mode"><i className="ct-mode-dot" />Auto</span>
        <span className="ct-foot-spacer" />
        <span className="ct-pill"><i className="ct-dot ct-dot-frontier" />Fable 5 <em>Planner</em></span>
        <span className="ct-pill"><i className="ct-dot ct-dot-open" />Mistral <em>Worker</em></span>
        <span className="ct-tok">
          {phase === 'chat' ? '1.2k↑ 340↓' : 'ready'}
        </span>
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
      <div className="hd-signin-wait">
        <span className="hd-wait-dot" />waiting for approval…
      </div>
      <div className="hd-signin-hint">
        <em>enter</em> · open browser <span className="hd-sep">·</span> <em>ctrl+c</em> · quit
      </div>
    </div>
  );
}

function Booting() {
  return (
    <div className="hd-boot">
      <div className="ct-answer"><span className="ct-glyph">●</span> Browser opened — approve in the tab.</div>
      <div className="ct-receipt ct-ok"><span className="ct-fold">▸</span> Device <span className="ct-arg">approved → session started</span></div>
      <div className="ct-answer hd-boot-ok"><span className="ct-glyph">✓</span> Signed in as <span className="ct-link">chris.timmerman@glyphh.ai</span> — Enterprise.</div>
    </div>
  );
}

function Chat({ n, done }) {
  return (
    <>
      <div className="ct-head">
        <span className="ct-braille">⠛⠇⠽⠏⠓⠓</span>
        <span className="ct-head-meta">Glyphh · v1.0.1 · Fable 5</span>
      </div>

      <div className="ct-user"><span className="ct-bar">▌</span>{PROMPT.slice(0, n)}{!done && <span className="ct-caret" />}</div>

      {done && (
        <div className="ct-run">
          <div className="ct-answer"><span className="ct-glyph">●</span> On it — scaffolding the page, wiring the build, deploying, and opening your browser.</div>
          <div className="ct-receipt"><span className="ct-fold">▾</span> Write <span className="ct-arg">index.html</span></div>
          <div className="ct-receipt"><span className="ct-fold">▸</span> Bash <span className="ct-arg">npm run build</span> <span className="ct-secs">· 2.1s</span></div>
          <div className="ct-receipt ct-ok"><span className="ct-fold">▸</span> Bash <span className="ct-arg">deploy → acme-site.glyphh.app</span> <span className="ct-secs">· 3.4s</span></div>
          <div className="ct-receipt"><span className="ct-fold">▸</span> Browser <span className="ct-arg">open → acme-site.glyphh.app</span></div>
          <div className="ct-answer"><span className="ct-glyph">●</span> Live at <span className="ct-link">acme-site.glyphh.app</span> — opened in your browser for review.</div>

          <div className="ct-user ct-user-follow"><span className="ct-bar">▌</span>push to prod<span className="ct-caret ct-caret-idle" /></div>
        </div>
      )}
    </>
  );
}
