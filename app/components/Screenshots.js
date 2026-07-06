'use client';

import { useState } from 'react';

const SHOTS = [
  {
    img: 'glyphh-layouts.png',
    title: 'A workspace that fits the work',
    text: 'Save a layout per project and switch with one command — real OS windows tiled across your screen, apps launched into their cells, on Mac and Windows.',
  },
  {
    img: 'glyphh-custom-apps.png',
    title: 'Bring your apps — or build new ones',
    text: 'Add ChatGPT, Gmail, Slack, GitHub or any internal tool to your library — or point any agent at what you need and it builds a brand-new Glyphh app and publishes it to your org.',
  },
  {
    img: 'glyphh-workflow.png',
    title: 'Connect 3,500+ apps',
    text: 'One-click OAuth to Gmail, Slack, Notion, Salesforce, GitHub and 3,500+ more. Every connected account becomes tools your AI can call — send the message, file the ticket, update the record.',
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
        <h2 className="section-title reveal">One workspace, every way you work</h2>

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
