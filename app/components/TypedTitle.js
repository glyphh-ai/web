'use client';

import { useEffect, useState } from 'react';

/**
 * TypedTitle — the hero thesis, typed live.
 * Types "A new way of working." → backspaces the word → "thinking…" →
 * backspaces → rests on "doing…" with the caret blinking.
 *
 * A hidden ghost of the longest frame reserves the box, so the typing never
 * shifts the layout under it. Reduced-motion users get the static line.
 */

const PREFIX = 'A new way of ';
const WORDS = ['working.', 'thinking.', 'doing.'];
const GHOST = PREFIX + WORDS[1]; // longest frame

const TYPE_MS = 95;
const ERASE_MS = 70;
const HOLD_MS = 1500;
const REST_MS = 550; // the beat between erasing a word and typing the next

// Human keystrokes aren't a metronome: each delay wanders around the base,
// with an occasional hesitation, and a breath after finishing a word.
const typeDelay = (ch) =>
  Math.round(TYPE_MS * (0.6 + Math.random() * 0.9)) +
  (Math.random() < 0.08 ? 160 : 0) +
  (ch === ' ' ? 60 : 0);
const eraseDelay = () => Math.round(ERASE_MS * (0.8 + Math.random() * 0.4));

function buildFrames() {
  const frames = [];
  const full = PREFIX + WORDS[0];
  // Type the whole first line, then hold.
  for (let k = 1; k <= full.length; k++) {
    frames.push([full.slice(0, k), typeDelay(full[k - 1])]);
  }
  frames.push([full, HOLD_MS]);
  // working. → thinking. → doing.: erase the word, rest, type the next.
  for (let w = 1; w < WORDS.length; w++) {
    for (let k = WORDS[w - 1].length - 1; k >= 0; k--) {
      frames.push([PREFIX + WORDS[w - 1].slice(0, k), eraseDelay()]);
    }
    frames.push([PREFIX, REST_MS]);
    for (let k = 1; k <= WORDS[w].length; k++) {
      frames.push([PREFIX + WORDS[w].slice(0, k), typeDelay(WORDS[w][k - 1])]);
    }
    frames.push([PREFIX + WORDS[w], HOLD_MS]);
  }
  return frames;
}

export default function TypedTitle() {
  // SSR/no-JS renders the full first line; the effect takes over on mount.
  const [text, setText] = useState(PREFIX + WORDS[0]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const frames = buildFrames();
    let i = 0;
    let timer = 0;
    const step = () => {
      const [t, delay] = frames[i];
      setText(t);
      i += 1;
      if (i < frames.length) timer = window.setTimeout(step, delay);
    };
    timer = window.setTimeout(step, 700);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <h1 className="fh-title fh-typed">
      {/* The box shrinks to the ghost's (fixed) width and the live text is
          left-anchored inside it — so erasing never re-centers the line. */}
      <span className="fh-box">
        <span className="fh-ghost" aria-hidden="true">{GHOST}</span>
        <span className="fh-live" aria-label="A new way of doing.">
          {text}
          <span className="fh-caret" aria-hidden="true" />
        </span>
      </span>
    </h1>
  );
}
