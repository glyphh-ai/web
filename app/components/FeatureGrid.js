'use client';

import { useState } from 'react';

/**
 * FeatureGrid — the middle of the story compressed into detail cards:
 * zoomed-in crops that open the FULL shot in the shared lightbox on click.
 * Replaces the full-width Workspace / Loops / Build sections on home (those
 * components still serve the product page until it dies).
 */
const CARDS = [
  {
    id: 'workspace',
    title: 'Your apps, beside the agent',
    line: 'Gmail, Slack, dashboards — anything with a page opens as a panel next to Glyphh.',
    src: '/screen-shots/glyphh-workspace.png',
    pos: '20% 12%',
  },
  {
    id: 'loops',
    title: 'The right models, every task',
    line: 'A small team of AIs in a circuit — swap any seat, see exactly who did what.',
    src: '/screen-shots/glyphh-custom-apps.png',
    pos: '70% 30%',
  },
  {
    id: 'build',
    title: 'A full dev workspace',
    line: 'Files, editor, diff, terminal, and a coding agent — one keystroke away.',
    src: '/screen-shots/glyphh-builders.png',
    pos: '50% 20%',
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
        <div className="section-label reveal">{'{'} <span className="accent">INSIDE</span> {'}'}</div>
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
