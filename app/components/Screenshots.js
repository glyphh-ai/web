'use client';

import { useState } from 'react';

const SHOTS = [
  {
    img: 'glyphh-custom-apps.png',
    title: 'Build apps with any agent',
    text: 'Point any agent at what you need and it builds a Glyphh app — UI, tools, storage — and publishes it to your org, where anyone can install it or call it over the relay.',
  },
  {
    img: 'glyphh-workflow.png',
    title: 'Connect 3,500+ apps once',
    text: 'One-click OAuth to Gmail, Slack, Notion, Salesforce, GitHub and 3,500+ more. Every connected account becomes tools every LLM you use can call — send the message, file the ticket, update the record.',
  },
  {
    img: 'glyphh-command-palette.png',
    title: 'The command palette',
    text: 'Everything you’ve connected and built, a hotkey away — open an app, run a skill, or snap a layout without leaving the keyboard.',
  },
  {
    img: 'glyphh-layouts.png',
    title: 'Layouts, when you want them',
    text: 'Save a layout per project and switch with one command — real OS windows tiled across your screen, on Mac and Windows.',
  },
];

export default function Screenshots() {
  const [open, setOpen] = useState(null);

  return (
    <section className="shots" id="screenshots">
      <div className="container">
        <div className="section-label reveal">{'{'}
          <span className="accent">SEE IT IN ACTION</span>
          {'}'}</div>
        <h2 className="section-title reveal">One connection, every way you build</h2>

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
