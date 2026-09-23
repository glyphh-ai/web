'use client';

import { useEffect, useState } from 'react';

/**
 * DesktopShots — the home page's "Glyphh Desktop" section (his order,
 * 2026-09-23): the v2 screenshots he provided, run in a cycle inside the
 * white-ruled frame the video used to sit in. One image at a time, a
 * crossfade between them, a caption row naming the screen, and a dot per
 * shot to jump. The cycle pauses while the pointer is over the frame.
 */

const SHOTS = [
  ['/screen-shots/v2/chat-1.jpg', 'Chat', 'Glyphh Desktop — chat'],
  ['/screen-shots/v2/code-1.jpg', 'Code', 'Glyphh Desktop — code'],
  ['/screen-shots/v2/code-1.5.jpg', 'Code · agent', 'Glyphh Desktop — code, the agent at work'],
  ['/screen-shots/v2/code-2.jpg', 'Code · review', 'Glyphh Desktop — code, reviewing'],
  ['/screen-shots/v2/work-1.jpg', 'Work', 'Glyphh Desktop — work'],
  ['/screen-shots/v2/settings-connections-1.jpg', 'Connections', 'Glyphh Desktop — settings, connections'],
  ['/screen-shots/v2/settings-connections-2.jpg', 'Connections · detail', 'Glyphh Desktop — settings, a connection'],
  ['/screen-shots/v2/settings-skill-1.jpg', 'Skill', 'Glyphh Desktop — settings, a skill'],
  ['/screen-shots/v2/settings-skills-2.jpg', 'Skills', 'Glyphh Desktop — settings, skills'],
  ['/screen-shots/v2/settings-skills-3.jpg', 'Skills · install', 'Glyphh Desktop — settings, installing a skill'],
  ['/screen-shots/v2/settings-artifacts.jpg', 'Artifacts', 'Glyphh Desktop — settings, artifacts'],
  ['/screen-shots/v2/settings-tabs.jpg', 'Tabs', 'Glyphh Desktop — settings, tabs'],
  ['/screen-shots/v2/settings-workspaces-1.jpg', 'Workspaces', 'Glyphh Desktop — settings, workspaces'],
  ['/screen-shots/v2/settings-workspaces-2.jpg', 'Workspaces · detail', 'Glyphh Desktop — settings, a workspace'],
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
