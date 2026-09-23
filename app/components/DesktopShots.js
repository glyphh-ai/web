'use client';

import { useEffect, useState } from 'react';

/**
 * DesktopShots — the home page's "Glyphh Desktop" section (his order,
 * 2026-09-23): the home screenshots he provided (public/screen-shots/home,
 * glyphh-home-1…15, from his Desktop the same day), run in a cycle inside the
 * white-ruled frame the video used to sit in. One image at a time, a
 * crossfade between them, a caption row naming the screen, and a dot per
 * shot to jump. The cycle pauses while the pointer is over the frame.
 */

const SHOTS = [
  ['/screen-shots/home/glyphh-home-1.png', 'Code', 'Glyphh Desktop — the code panel, an agent at work'],
  ['/screen-shots/home/glyphh-home-2.png', 'Research', 'Glyphh Desktop — research, a live map beside the chat'],
  ['/screen-shots/home/glyphh-home-3.png', 'Design', 'Glyphh Desktop — design, a brand across artboards'],
  ['/screen-shots/home/glyphh-home-4.png', 'Design · board', 'Glyphh Desktop — design, one board full-frame'],
  ['/screen-shots/home/glyphh-home-5.png', 'Connections', 'Glyphh Desktop — the connections grid'],
  ['/screen-shots/home/glyphh-home-6.png', 'Work', 'Glyphh Desktop — work, apps tiled beside the chat'],
  ['/screen-shots/home/glyphh-home-7.png', 'Settings · Connections', 'Glyphh Desktop — settings, connections'],
  ['/screen-shots/home/glyphh-home-8.png', 'Settings · Connection', 'Glyphh Desktop — settings, a connection and its tools'],
  ['/screen-shots/home/glyphh-home-9.png', 'Settings · Skills', 'Glyphh Desktop — settings, skills'],
  ['/screen-shots/home/glyphh-home-10.png', 'Settings · Skill', 'Glyphh Desktop — settings, a skill'],
  ['/screen-shots/home/glyphh-home-11.png', 'Settings · Workspaces', 'Glyphh Desktop — settings, workspaces'],
  ['/screen-shots/home/glyphh-home-12.png', 'Settings · Skill editor', 'Glyphh Desktop — settings, editing a skill'],
  ['/screen-shots/home/glyphh-home-13.png', 'Settings · Accounts', 'Glyphh Desktop — settings, connected accounts'],
  ['/screen-shots/home/glyphh-home-14.png', 'Work · inbox', 'Glyphh Desktop — work, mail, calendar and chat tiled'],
  ['/screen-shots/home/glyphh-home-15.png', 'Work · agent', 'Glyphh Desktop — work, the agent beside the tiles'],
];
const HOLD_MS = 3800;

export default function DesktopShots() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % SHOTS.length), HOLD_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div className="ds" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="dv-shot ds-frame" role="group" aria-roledescription="carousel" aria-label="Glyphh Desktop screenshots">
        {SHOTS.map(([src, , alt], k) => (
          <img
            key={src}
            src={src}
            alt={alt}
            className={`ds-img${k === i ? ' on' : ''}`}
            aria-hidden={k !== i}
            {...(k === 0 ? { fetchPriority: 'high' } : { loading: 'lazy' })}
          />
        ))}
      </div>
      <div className="ds-bar">
        <span className="ds-cap">{SHOTS[i][1]}</span>
        <span className="ds-dots" role="tablist" aria-label="Pick a screen">
          {SHOTS.map(([src, label], k) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={k === i}
              aria-label={label}
              className={`ds-dot${k === i ? ' on' : ''}`}
              onClick={() => setI(k)}
            />
          ))}
        </span>
        <span className="ds-count">{String(i + 1).padStart(2, '0')} / {String(SHOTS.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
}
