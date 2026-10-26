'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * WhyTerminals — the same question, with and without Glyphh, side by side (his order, 2026-10-26: "a side by side
 * real terminal view running a question through glyphh vs without it in Claude and showing tokens").
 *
 * Both panes replay real runs, measured on 2026-10-26, word for word:
 *  - Left: Claude Fable 5.1 in Claude Code (`claude -p`, stream-json), given only the Read tool, the same short
 *    system prompt and this question. It read history.json (the 40 past expenses) and answered. Its usage, from
 *    the run: 34 input + 3,390 cache-read + 7,757 cache-write tokens in, 187 out, $0.1657 at list price, 6,468 ms.
 *  - Right: Ada Cloud's answer to the same claim on the model launch-demo-expenses (the same 40 expenses),
 *    asked through the Glyphh connector the same day. No language model is called. Ada Cloud answers in 54 to 170
 *    ms (the launch post's figure); this call's own time was not recorded, so none is claimed.
 *
 * The left pane plays in real time: the 6.5 s are the run's. Reduced motion, or no script: both finished.
 */

const PROMPT =
  'Should we approve this expense? Sofia Alvarez, marketing, airfare, $2,400, receipt attached, over the limit and ' +
  'not pre-approved: "Business class to London for a conference". Our past expense decisions are in history.json ' +
  'in this folder.';

const CLAUDE_ANSWER =
  "Reject, ~95% sure: every over-limit, not-pre-approved claim in history was rejected, including Ethan Clarke's " +
  "near-identical business-class flight (E-2056) and Sofia's own Four Seasons stay (E-2058), so without " +
  "pre-approval this doesn't pass.";

const CALL = [
  "> const { Ada } = await import('@glyphh-ai/glyphh')",
  "> await new Ada().decide('launch-demo-expenses', {",
  '    expense: { claim: {',
  "      department: 'marketing', category: 'airfare',",
  "      amount: 2400, receipt: 'yes',",
  "      policy: 'over limit, not pre-approved',",
  "      description: 'Business class to London for a conference',",
  '    } } })',
].join('\n');

const ADA_ANSWER = [
  '{',
  "  outcome: 'reject',",
  '  probabilities: { reject: 0.7896, approve: 0.2104 },',
  '  ask: false,',
  '  receipts: [',
  "    { id: 'e8a049c108fb', sim: 0.7808, outcome: 'reject' },",
  "    { id: '0fe7cd2add09', sim: 0.5779, outcome: 'reject' },",
  "    { id: '83a145a23772', sim: 0.5696, outcome: 'reject' },",
  '    … 12 more',
  '  ]',
  '}',
  '// e8a049c108fb: E-2056, business class to New York, rejected',
].join('\n');

// The timeline, in seconds from the start. Typing takes T0; the runs start there.
const T0 = 1.3;
const RUN = 6.468;                      // the measured run, from the result's duration_ms
const READ_AT = T0 + 1.0;               // the Read tool call
const DONE_LEFT = T0 + RUN;
const DONE_RIGHT = T0 + 0.15;
const END = DONE_LEFT + 0.2;
const TOKENS_IN = 11181, TOKENS_OUT = 187, COST = 0.1657;

const clamp = (u) => Math.max(0, Math.min(1, u));
const fmt = (n) => Math.round(n).toLocaleString('en-US');

export default function WhyTerminals() {
  const ref = useRef(null);
  const [t, setT] = useState(END);       // the server and reduced motion show both runs finished
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    let raf = 0, started = 0, seen = false;
    const tick = (now) => {
      if (!started) started = now;
      const s = (now - started) / 1000;
      setT(Math.min(END, s));
      if (s < END) raf = requestAnimationFrame(tick);
    };
    setT(0);
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !seen) { seen = true; raf = requestAnimationFrame(tick); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [run]);

  // left
  const typedL = PROMPT.slice(0, Math.floor(PROMPT.length * clamp(t / T0)));
  const elapsedL = clamp((t - T0) / RUN) * RUN;
  const inNow = t < T0 ? 0 : t >= DONE_LEFT ? TOKENS_IN : 3390 + (TOKENS_IN - 3390) * clamp((t - READ_AT) / (DONE_LEFT - READ_AT)) * (t >= READ_AT ? 1 : 0);
  const outNow = t >= DONE_LEFT ? TOKENS_OUT : t >= READ_AT ? 2 : 0;
  const costNow = t >= DONE_LEFT ? COST : (inNow / TOKENS_IN) * COST * 0.9;
  // right
  const typedR = CALL.slice(0, Math.floor(CALL.length * clamp(t / T0)));

  return (
    <div className="wt" ref={ref}>
      <div className="wt-pane">
        <div className="wt-bar">
          <span className="wt-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="wt-title">claude · Claude Fable 5.1 · without Glyphh</span>
          <span className="wt-time">{elapsedL.toFixed(1)} s</span>
        </div>
        <pre className="wt-screen" aria-label="Claude reads the 40 past decisions and answers">
          <span className="wt-dim">{'> '}</span>{typedL}
          {t >= T0 ? '\n\n' : null}
          {t >= READ_AT ? (
            <>
              <span className="wt-hi">⏺ Read</span>(history.json){'\n'}
              <span className="wt-dim">  ⎿  Read 42 lines</span>{'\n\n'}
            </>
          ) : null}
          {t >= T0 && t < DONE_LEFT ? (
            <span className="wt-dim">✻ {t < READ_AT ? 'Thinking' : 'Reading 40 past decisions'}… ({Math.floor(elapsedL)}s · ↑ {fmt(inNow)} tokens)</span>
          ) : null}
          {t >= DONE_LEFT ? <><span className="wt-hi">⏺ </span>{CLAUDE_ANSWER}</> : null}
        </pre>
        <div className="wt-meter">
          <div><b>{fmt(inNow)}</b><span>tokens in</span></div>
          <div><b>{fmt(outNow)}</b><span>tokens out</span></div>
          <div><b>${costNow.toFixed(2)}</b><span>at list price</span></div>
          <div><b>{elapsedL.toFixed(1)} s</b><span>to answer</span></div>
        </div>
      </div>

      <div className="wt-pane wt-ours">
        <div className="wt-bar">
          <span className="wt-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="wt-title">node · your app · with Glyphh</span>
          <span className="wt-time">{t >= DONE_RIGHT ? 'answered' : ''}</span>
        </div>
        <pre className="wt-screen wt-code" aria-label="Your software asks Ada the same question">
          <span className="wt-dim">$ node</span>{'\n'}
          {typedR}
          {t >= DONE_RIGHT ? <>{'\n'}<span className="wt-hi">{ADA_ANSWER}</span></> : null}
        </pre>
        <div className="wt-meter">
          <div><b>0</b><span>LLM tokens</span></div>
          <div><b>1</b><span>Ada read</span></div>
          <div><b>$0.0001</b><span>at most, past your plan</span></div>
          <div><b>54–170 ms</b><span>in Ada Cloud</span></div>
        </div>
      </div>

      <button type="button" className="wt-again" onClick={() => setRun((n) => n + 1)} disabled={t < END}>
        Run both again ↻
      </button>
    </div>
  );
}
