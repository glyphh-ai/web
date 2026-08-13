'use client';

import { useState } from 'react';

/**
 * FeatureGrid — the middle of the story compressed into detail cards:
 * zoomed-in crops that open the FULL shot in the shared lightbox on click.
 *
 * 2026-08 messaging pass: the EXECUTION / COMMAND / RROT / APPS story beats
 * live here as cards (their shots are PLACEHOLDERS — swap `src` when the
 * real images land), alongside the kept terminal / agents / skills squares.
 */
const CARDS = [
  {
    id: 'execution',
    title: "Don't just ask AI. Put it to work.",
    line: 'Glyphh connects AI to your files, folders, terminal, browser, web apps, local machine, and cloud environments. Agents can reason, build, execute, inspect, and iterate—while you stay in control.',
    src: '/screen-shots/glyphh-builders.png',
    pos: '50% 20%',
  },
  {
    id: 'command',
    title: 'Control everything from anywhere.',
    line: '.dip changes where you work. .glyphh tells AI what to do. One command can change your entire working environment or put an agent to work right where you are.',
    src: '/screen-shots/glyphh-command-palette.png',
    pos: '50% 40%',
  },
  {
    id: 'apps',
    title: 'Build the tools you wish existed.',
    line: 'Turn connected apps, agents, models, data, and knowledge into powerful custom tools inside Glyphh. Research, automate, build, and operate without leaving your workspace.',
    src: '/screen-shots/glyphh-custom-apps.png',
    pos: '70% 30%',
  },
  {
    id: 'cli',
    title: 'The terminal, same brain',
    line: 'The full agent in your shell — same loops, same memory, headless when you want it.',
    src: '/screen-shots/cli/cli-main.png',
    pos: '15% 15%',
  },
  {
    id: 'agents',
    title: 'Agents that work your way',
    line: 'Name them, give each a role, a loop, and a model team — running around the clock, under your direction.',
    src: '/screen-shots/glyphh-app-home.png',
    pos: '50% 30%',
  },
  {
    id: 'skills',
    title: 'Teach it once — a skill',
    line: 'Turn any repeatable job into a skill your agents run on demand or on a schedule.',
    src: '/screen-shots/glyphh-command-palette.png',
    pos: '50% 40%',
  },
];

export default function FeatureGrid() {
  const [open, setOpen] = useState(null);
  return (
    <section className="fgrid" id="inside">
      <div className="container">
        <h2 className="section-title reveal">One app, every surface of your work.</h2>
        <div className="fgrid-grid reveal">
          {CARDS.map((c) => (
            <button key={c.id} type="button" className="fgrid-card" onClick={() => setOpen(c)}>
              <span className="fgrid-crop">
                <img src={c.src} alt={c.title} loading="lazy" style={{ objectPosition: c.pos }} />
                <span className="shot-expand" aria-hidden="true">⤢</span>
              </span>
              <span className="fgrid-title">{c.title}</span>
              <span className="fgrid-line">{c.line}</span>
            </button>
          ))}
        </div>
      </div>
      {open && (
        <div className="shot-lightbox" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <button className="shot-lightbox-close" aria-label="Close" onClick={() => setOpen(null)}>×</button>
          <img src={open.src} alt={open.title} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
