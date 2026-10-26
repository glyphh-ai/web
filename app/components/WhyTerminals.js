'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * WhyTerminals — the same question, with and without Glyphh, side by side (his orders, 2026-10-26: "record the
 * actual Claude cli terminals side by side ... One using Claude without ada at all then using ada. Claude would have
 * to load allllllll the data. Ada can answer without Claude in ms with no LLM").
 *
 *  - Left: a screen recording, not a replay. Claude Code v2.1.304 with Claude Fable 5.1, run in a folder holding
 *    only history.json (the 40 past expenses), with the Read tool alone, no connectors and no Glyphh, recorded from
 *    a real terminal (84 x 32) on 2026-10-26 and rendered frame by frame from the recording. The video starts a
 *    second before the question is typed and runs in real time to the answer; at the end the view scrolls up to the
 *    answer's first line, as a reader would. Nothing is sped up, cut or reordered inside the run.
 *    Its usage, from the session's own transcript (two API calls):
 *      call 1: 2 input + 7,691 cache-write (1 h) tokens in, 90 out
 *      call 2: 32 input + 4,336 cache-write (1 h) + 7,691 cache-read tokens in, 588 out
 *      total 19,752 in, 678 out; at Claude Fable 5.1 list price ($10 in, $20 1 h cache write, $0.25 cache read,
 *      $50 out, per million) $0.2767. The turn took 13.3 s (13:10:17.861Z to 13:10:31.178Z).
 *  - Right: Ada Cloud's answer to the same claim on the model launch-demo-expenses (the same 40 expenses), asked the
 *    same day and asked again before this was published, with the same result. No language model is called. Ada
 *    Cloud answers in 54 to 170 ms (the launch post's figure); this call's own time was not recorded, so none is
 *    claimed. Its question goes in at the moment Claude's does.
 *
 * The meters follow the video's clock. Reduced motion, no script, or a blocked autoplay: both runs shown finished.
 */

const VIDEO = '/media/why-claude-code.mp4';
const POSTER = '/media/why-claude-code-poster.jpg';

// The video's clock, in seconds (the recording's clock less 30.0 s).
const TYPE_FROM = 1.04;     // the question starts to be typed
const TYPE_TO = 4.7;
const SUBMIT = 7.01;        // Enter: call 1 goes out
const CALL2 = 9.99;         // the file is read; call 2 goes out with it
const DONE = 20.28;         // the answer is on screen
const RUN = 13.3;           // the turn, from the transcript
const END = 27.13;          // the video's length

const CALL1 = { tin: 7693, tout: 90, cost: 0.15384 + 0.0045 };
const CALL2_IN = 12059, CALL2_IN_COST = 0.00032 + 0.08672 + 0.00192;
const TOTAL = { tin: 19752, tout: 678, cost: 0.2767 };

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

const ADA_AT = SUBMIT + 0.12;

const clamp = (u) => Math.max(0, Math.min(1, u));
const fmt = (n) => Math.round(n).toLocaleString('en-US');

function claudeAt(t) {
  if (t < SUBMIT) return { tin: 0, tout: 0, cost: 0 };
  if (t < CALL2) return { tin: CALL1.tin, tout: 0, cost: CALL1.cost - 0.0045 };
  if (t < DONE) return { tin: CALL1.tin + CALL2_IN, tout: CALL1.tout, cost: CALL1.cost + CALL2_IN_COST };
  return TOTAL;
}

export default function WhyTerminals() {
  const ref = useRef(null);
  const video = useRef(null);
  const [t, setT] = useState(END);       // the server, reduced motion and a blocked autoplay show both runs finished
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = video.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().then(() => setPlaying(true)).catch(() => { setPlaying(false); setT(END); });
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const v = video.current;
    let raf = 0, seen = false;
    const tick = () => {
      setT(v.ended ? END : v.currentTime);
      if (!v.paused && !v.ended) raf = requestAnimationFrame(tick);
    };
    const onPlay = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); };
    const onEnd = () => { setT(END); setPlaying(false); };
    v.addEventListener('play', onPlay);
    v.addEventListener('ended', onEnd);
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !seen) { seen = true; play(); }
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => { cancelAnimationFrame(raf); io.disconnect(); v.removeEventListener('play', onPlay); v.removeEventListener('ended', onEnd); };
  }, []);

  const c = claudeAt(t);
  const elapsed = clamp((t - SUBMIT) / RUN) * RUN;
  const typedR = CALL.slice(0, Math.floor(CALL.length * clamp((t - TYPE_FROM) / (TYPE_TO - TYPE_FROM))));

  return (
    <div className="wt" ref={ref}>
      <div className="wt-pane">
        <div className="wt-bar">
          <span className="wt-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="wt-title">claude · Claude Fable 5.1 · without Glyphh</span>
          <span className="wt-time">{elapsed.toFixed(1)} s</span>
        </div>
        <video
          ref={video}
          className="wt-video"
          src={VIDEO}
          poster={POSTER}
          muted
          playsInline
          preload="metadata"
          width={1120}
          height={1062}
          aria-label="Screen recording: Claude Code reads history.json, the 40 past expenses, and after 13 seconds recommends rejecting the claim"
        />
        <div className="wt-meter">
          <div><b>{fmt(c.tin)}</b><span>tokens in</span></div>
          <div><b>{fmt(c.tout)}</b><span>tokens out</span></div>
          <div><b>${c.cost.toFixed(2)}</b><span>at list price</span></div>
          <div><b>{elapsed.toFixed(1)} s</b><span>to answer</span></div>
        </div>
      </div>

      <div className="wt-pane wt-ours">
        <div className="wt-bar">
          <span className="wt-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="wt-title">node · your app · with Glyphh</span>
          <span className="wt-time">{t >= ADA_AT ? 'answered' : ''}</span>
        </div>
        <pre className="wt-screen wt-code" aria-label="Your software asks Ada the same question">
          <span className="wt-dim">$ node</span>{'\n'}
          {typedR}
          {t >= ADA_AT ? <>{'\n'}<span className="wt-hi">{ADA_ANSWER}</span></> : null}
        </pre>
        <div className="wt-meter">
          <div><b>0</b><span>LLM tokens</span></div>
          <div><b>1</b><span>Ada read</span></div>
          <div><b>$0.0001</b><span>at most, past your plan</span></div>
          <div><b>54–170 ms</b><span>in Ada Cloud</span></div>
        </div>
      </div>

      <button type="button" className="wt-again" onClick={play} disabled={playing}>
        Run both again ↻
      </button>
    </div>
  );
}
