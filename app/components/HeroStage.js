'use client';

import { useEffect, useState } from 'react';

// The hero's stage (his order, 2026-09-19): Chat, Work and Code, the three
// product screens, rotating. A label row names the one showing; a click
// jumps to it and holds the rotation for a while.
const FRAMES = [
  { group: 'chat', src: '/screen-shots/v2/chat-1.jpg', alt: 'Chat in Glyphh: the agent beside a live browser panel, answering with sources and a map' },
  { group: 'work', src: '/screen-shots/v2/work-1.jpg', alt: 'Work in Glyphh: the agent beside Gmail and Calendar, acting on both' },
  { group: 'code', src: '/screen-shots/v2/code-1.jpg', alt: 'Code in Glyphh: files, an editor, a running app, and the agent in one workspace' },
  { group: 'code', src: '/screen-shots/v2/code-1.5.jpg', alt: 'Code in Glyphh: the agent reading Gmail beside the code it is writing' },
  { group: 'code', src: '/screen-shots/v2/code-2.jpg', alt: 'Code in Glyphh: the editor, the terminal, and Claude Code running in it' },
];
const GROUPS = [
  { key: 'chat', label: 'Chat' },
  { key: 'work', label: 'Work' },
  { key: 'code', label: 'Code' },
];
const HOLD_MS = 6000;

export default function HeroStage() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  // Every frame gets its turn: Chat, Work, then the three Code screens.
  useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % FRAMES.length), HOLD_MS);
    return () => clearInterval(t);
  }, [paused]);

  const pick = (group) => {
    setI(FRAMES.findIndex((f) => f.group === group));
    setPaused(true);
    setTimeout(() => setPaused(false), HOLD_MS * 2);
  };
  const activeGroup = FRAMES[i].group;

  return (
    <div className="hs">
      <div className="hs-tabs" role="tablist" aria-label="Chat, Work, Code">
        {GROUPS.map((g) => (
          <button key={g.key} type="button" role="tab" aria-selected={g.key === activeGroup} className={`hs-tab ${g.key === activeGroup ? 'active' : ''}`} onClick={() => pick(g.key)}>
            {g.label}
          </button>
        ))}
      </div>
      <div className="hs-stage">
        {FRAMES.map((f, n) => (
          <img
            key={f.src}
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
