'use client';

import { useEffect, useState } from 'react';

const SHOTS = [
  {
    img: 'glyphh-workflow.png',
    title: 'Ask, and it works',
    text: 'One request in plain words — the agent plans it, works across your connected tools, and hands back the finished thing.',
  },
  {
    img: 'glyphh-layouts.png',
    title: 'Your workspace, saved',
    text: 'Apps open beside the agent, arranged how you left them — one workspace per project, recalled in a word.',
  },
  {
    img: 'glyphh-custom-apps.png',
    title: 'It builds, too',
    text: 'Ask for a little app or a repeatable skill and it appears in your library — shareable with your whole team.',
  },
  {
    img: 'glyphh-command-palette.png',
    title: 'Everything a keystroke away',
    text: 'Open a tool, run a skill, switch a workspace — without leaving the keyboard.',
  },
];

export default function Screenshots() {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <section className="shots" id="screenshots">
      <div className="container">
        <div className="section-label reveal">{'{'}
          <span className="accent">SEE IT IN ACTION</span>
          {'}'}</div>
        <h2 className="section-title reveal">A quick look around</h2>

        <div className="shots-list">
          {SHOTS.map((s, i) => (
            <div key={i} className={`shot-row${i % 2 ? ' shot-row-rev' : ''} reveal`}>
              <button className="shot-frame" onClick={() => setOpen(i)} aria-label={`Expand ${s.title}`}>
                <span className="shot-inner">
                  <img src={`/screen-shots/${s.img}`} alt={s.title} loading="lazy" />
                </span>
                <span className="shot-expand" aria-hidden="true">⤢</span>
              </button>
              <div className="shot-copy">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {open !== null && (
        <div className="shot-lightbox" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <button className="shot-lightbox-close" aria-label="Close" onClick={() => setOpen(null)}>×</button>
          <img
            src={`/screen-shots/${SHOTS[open].img}`}
            alt={SHOTS[open].title}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
