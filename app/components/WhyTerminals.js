'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * WhyTerminals — the same question, with and without Glyphh, side by side (his orders, 2026-10-26: "record the
 * actual Claude cli terminals side by side ... One using Claude without ada at all then using ada. Claude would have
 * to load allllllll the data. Ada can answer without Claude in ms with no LLM").
 *
 * Both panes are terminal recordings, made on 2026-10-26 on the same laptop: a pty recorder captured each program's
 * output with its timing (asciicast), and each was drawn frame by frame in xterm.js with the site's JetBrains Mono.
 * Neither is a replay; nothing inside either run is sped up, cut or reordered. One character in the Claude capture
 * (a '─' in a rule, split across two reads by the recorder at the moment of Enter) was decoded as three replacement
 * characters, which threw Claude Code's redraws off by a row; its bytes were joined back before drawing.
 *
 *  - Left (84 x 32): Claude Code v2.1.304 with Claude Fable 5.1, in a folder holding only history.json (the 40 past
 *    expenses), the Read tool alone, no connectors and no Glyphh. The clip starts a second before the question is
 *    typed and runs to the answer in real time; then the view scrolls up to the answer's first line and holds.
 *    Usage, from the session's own transcript, for the two calls that produced the answer:
 *      call 1: 2 input + 7,691 cache-write (1 h) tokens in, 90 out
 *      call 2: 32 input + 4,336 cache-write (1 h) + 7,691 cache-read tokens in, 588 out
 *      total 19,752 in, 678 out; at Claude Fable 5.1 list price ($10 in, $20 1 h cache write, $0.25 cache read,
 *      $50 out, per million) $0.2767. The turn took 13.3 s (13:10:17.861Z to 13:10:31.178Z). Claude Code also made
 *      a session-title call (Claude Haiku, $0.0002) and, after the answer, a prompt-suggestion call ($0.021); neither
 *      is part of answering, so neither is counted.
 *  - Right (67 x 32): bash, then node 24 with the public SDK (@glyphh-ai/glyphh 3.3.0) asking Ada Cloud to decide the
 *    same claim on the model launch-demo-expenses (the same 40 expenses). No language model anywhere. The call's
 *    own clock printed '326 ms': the whole round trip from the laptop, a fresh process's first call, so connection
 *    setup (DNS, TLS) is included. The clip starts with the setup already typed, so that its Enter on the call
 *    lands at the moment Claude's question goes in.
 *
 * The left video is the clock: the meters and the right video follow it. Autoplay starts when the left video is
 * half in view (or half a screen of it); reduced motion skips autoplay but 'Replay both' still plays. With no script, a blocked autoplay or a
 * failed load: both posters (each run's last frame) and the meters finished.
 */

const LEFT = { src: '/media/why-claude-code.mp4', poster: '/media/why-claude-code-poster.jpg', w: 1120, h: 1062 };
const RIGHT = { src: '/media/why-ada.mp4', poster: '/media/why-ada-poster.jpg', w: 902, h: 1062 };

// The clock, in seconds of the left video (the Claude recording's clock less 30.0 s).
const SUBMIT = 7.01;        // Enter on both sides: Claude's call 1 goes out, and so does Ada's decide
const CALL2 = 9.99;         // Claude has read the file; call 2 goes out with it
const DONE = 20.28;         // Claude's answer is on screen
const RUN = 13.3;           // Claude's turn, from the transcript
const ADA_MS = 326;         // Ada's call, as its own clock printed it
const ADA_AT = SUBMIT + 0.329;   // Ada's answer on screen (19.449 s less 19.120 s in its recording)
const END = 27.13;          // the left video's length

const CALL1_IN = 7693, CALL1_IN_COST = 0.00002 + 0.15382;
const CALL1_OUT = 90, CALL1_OUT_COST = 0.0045;
const CALL2_IN = 12059, CALL2_IN_COST = 0.00032 + 0.08672 + 0.00192;
const TOTAL = { tin: 19752, tout: 678, cost: 0.2767 };

const clamp = (u) => Math.max(0, Math.min(1, u));
const fmt = (n) => Math.round(n).toLocaleString('en-US');

function claudeAt(t) {
  if (t < SUBMIT) return { tin: 0, tout: 0, cost: 0 };
  if (t < CALL2) return { tin: CALL1_IN, tout: 0, cost: CALL1_IN_COST };
  if (t < DONE) return { tin: CALL1_IN + CALL2_IN, tout: CALL1_OUT, cost: CALL1_IN_COST + CALL1_OUT_COST + CALL2_IN_COST };
  return TOTAL;
}

export default function WhyTerminals() {
  const left = useRef(null);
  const right = useRef(null);
  const raf = useRef(0);
  const stopped = useRef(false);
  const [t, setT] = useState(END);       // the server and every fallback show both runs finished
  const [playing, setPlaying] = useState(false);

  // Back to the finished state: the meters at their ends, and each video showing its poster again.
  const finish = () => {
    stopped.current = true;
    cancelAnimationFrame(raf.current);
    const a = left.current, b = right.current;
    // play() hides the poster even when it fails, so reload whichever has not finished to bring its poster back.
    for (const v of [a, b]) if (v) { v.pause(); if (!v.ended) v.load(); }
    setPlaying(false);
    setT(END);
  };

  const playBoth = (fromStart) => {
    const a = left.current, b = right.current;
    if (!a || !b) return;
    stopped.current = false;
    if (fromStart) { a.currentTime = 0; b.currentTime = 0; }
    Promise.all([a.play(), b.play()]).then(() => setPlaying(true)).catch(finish);
  };

  useEffect(() => {
    const a = left.current, b = right.current;
    const tick = () => {
      if (stopped.current) return;
      // The right video follows the left one's clock so the two Enters stay together; not while the left one is
      // waiting for data, or the right one would be pulled back over and over.
      if (a.readyState >= 3 && !b.ended && b.duration && a.currentTime < b.duration
        && Math.abs(b.currentTime - a.currentTime) > 0.25) b.currentTime = a.currentTime;
      setT(a.ended ? END : a.currentTime);
      if (!a.paused && !a.ended) raf.current = requestAnimationFrame(tick);
    };
    const onPlay = () => { cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(tick); };
    const onEnd = () => { cancelAnimationFrame(raf.current); setT(END); setPlaying(false); };
    // Paused before the end (the browser or the system stopped it): stop the other one too, and free the button.
    const onPause = () => { if (!a.ended) { b.pause(); setPlaying(false); } };
    a.addEventListener('play', onPlay);
    a.addEventListener('ended', onEnd);
    a.addEventListener('pause', onPause);

    // Start when half of the left video is in view, or half the screen's height of it where it is taller than the
    // screen (stacked on a phone held sideways).
    let io = null;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      io = new IntersectionObserver(([en]) => {
        const room = Math.min(en.boundingClientRect.height, en.rootBounds ? en.rootBounds.height : Infinity);
        if (en.isIntersecting && en.intersectionRect.height >= room * 0.5) { io.disconnect(); playBoth(false); }
      }, { threshold: Array.from({ length: 21 }, (_, i) => i / 20) });
      io.observe(a);
    }
    return () => {
      cancelAnimationFrame(raf.current);
      if (io) io.disconnect();
      a.removeEventListener('play', onPlay);
      a.removeEventListener('ended', onEnd);
      a.removeEventListener('pause', onPause);
    };
  }, []);

  const c = claudeAt(t);
  const elapsed = clamp((t - SUBMIT) / RUN) * RUN;
  const adaDone = t >= ADA_AT;
  const adaMs = adaDone ? ADA_MS : Math.round(clamp((t - SUBMIT) / (ADA_AT - SUBMIT)) * ADA_MS);

  return (
    <div className="wt">
      <div className="wt-pane">
        <div className="wt-bar">
          <span className="wt-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="wt-title"><span className="wt-side">without Glyphh</span> · claude · Claude Fable 5.1</span>
          <span className="wt-time">{elapsed.toFixed(1)} s</span>
        </div>
        <video
          ref={left}
          className="wt-video"
          src={LEFT.src}
          poster={LEFT.poster}
          width={LEFT.w}
          height={LEFT.h}
          muted
          playsInline
          preload="metadata"
          aria-label="Terminal recording: Claude Code reads history.json, the 40 past expenses, and after 13 seconds recommends rejecting the claim"
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
          <span className="wt-title"><span className="wt-side">with Glyphh</span> · node · your code</span>
          <span className="wt-time">{adaMs} ms</span>
        </div>
        <video
          ref={right}
          className="wt-video"
          src={RIGHT.src}
          poster={RIGHT.poster}
          width={RIGHT.w}
          height={RIGHT.h}
          muted
          playsInline
          preload="metadata"
          aria-label="Terminal recording: Node asks Ada Cloud the same claim through the Glyphh SDK and gets reject, 79% sure, in 326 milliseconds"
        />
        <div className="wt-meter">
          <div><b>0</b><span>LLM tokens</span></div>
          <div><b>{adaDone ? 1 : 0}</b><span>Ada read</span></div>
          <div><b>{adaDone ? '$0.0001' : '$0'}</b><span>at most, past your plan</span></div>
          <div><b>{adaMs} ms</b><span>to answer</span></div>
        </div>
      </div>

      <button type="button" className="wt-again" onClick={() => playBoth(true)} disabled={playing}>
        Replay both ↻
      </button>
    </div>
  );
}
