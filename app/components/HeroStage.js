'use client';

import { useEffect, useState } from 'react';

// The hero's stage (his order, 2026-09-19): Chat, Work and Code, the three
// product screens, rotating. A label row names the one showing; a click
// jumps to it and holds the rotation for a while.
const FRAMES = [
  { key: 'chat', label: 'Chat', src: '/screen-shots/v2/chat-1.jpg', alt: 'Chat in Glyphh: the agent beside a live browser panel, answering with sources and a map' },
  { key: 'work', label: 'Work', src: '/screen-shots/v2/work-1.jpg', alt: 'Work in Glyphh: the agent beside Gmail and Calendar, acting on both' },
  { key: 'code', label: 'Code', src: '/screen-shots/v2/code-1.jpg', alt: 'Code in Glyphh: files, an editor, a running app, and the agent in one workspace' },
];
const HOLD_MS = 6000;

export default function HeroStage() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % FRAMES.length), HOLD_MS);
    return () => clearInterval(t);
  }, [paused]);

  const pick = (n) => {
    setI(n);
    setPaused(true);
    setTimeout(() => setPaused(false), HOLD_MS * 2);
  };

  return (
    <div className="hs">
      <div className="hs-tabs" role="tablist" aria-label="Chat, Work, Code">
        {FRAMES.map((f, n) => (
          <button key={f.key} type="button" role="tab" aria-selected={n === i} className={`hs-tab ${n === i ? 'active' : ''}`} onClick={() => pick(n)}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="hs-stage">
        {FRAMES.map((f, n) => (
          <img
            key={f.key}
            src={f.src}
            alt={f.alt}
            className={`hs-frame ${n === i ? 'on' : ''}`}
            loading={n === 0 ? 'eager' : 'lazy'}
            decoding="async"
            width="2561"
            height="1440"
          />
        ))}
      </div>
    </div>
  );
}
