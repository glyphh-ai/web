'use client';

import { useEffect, useState } from 'react';

/**
 * Cowork — "Where you work." The Glyphh desktop on the gradient canvas,
 * playing the real sequence: the command overlay opens (the app's launcher),
 * a tile gets clicked, the workspace loads — Slack; then the Email layout
 * (Gmail + Calendar); then Asana — with the agent always on their left.
 */

const favicon = (d) => `https://www.google.com/s2/favicons?domain=${d}&sz=64`;

const TILES = [
  { name: 'Slack', d: 'app.slack.com' },
  { name: 'Gmail', d: 'mail.google.com' },
  { name: 'Asana', d: 'asana.com' },
  { name: 'Drive', d: 'drive.google.com' },
  { name: 'Notion', d: 'notion.so' },
  { name: 'Figma', d: 'figma.com' },
];

// The three scenes: what's highlighted in the overlay, what loads after.
const SCENES = [
  { pick: 'Slack', layout: false, panels: ['slack'] },
  { pick: 'Email', layout: true, panels: ['gmail', 'calendar'] },
  { pick: 'Asana', layout: false, panels: ['asana'] },
];

const OVERLAY_MS = 2600;
const LOADED_MS = 3400;

const Lines = ({ n, seed = 0, w = 40 }) => (
  <div className="cw-lines">
    {Array.from({ length: n }).map((_, i) => (
      <span key={i} className="cw-line" style={{ width: `${w + (((i + seed) * 31) % 42)}%` }} />
    ))}
  </div>
);

function AppPanel({ kind }) {
  if (kind === 'slack') {
    return (
      <div className="cw-app">
        <div className="cw-app-head"><img src={favicon('app.slack.com')} alt="" />Slack</div>
        <div className="cw-slack">
          <div className="cw-slack-side"><Lines n={6} seed={2} w={50} /></div>
          <div className="cw-slack-main">
            {[0, 1, 2].map((i) => (
              <div className="cw-msg" key={i}>
                <i className="cw-avatar" style={{ background: ['#8c3bf2', '#ec4899', '#34d399'][i] }} />
                <Lines n={2} seed={i * 3} w={44} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (kind === 'gmail') {
    return (
      <div className="cw-app">
        <div className="cw-app-head"><img src={favicon('mail.google.com')} alt="" />Gmail</div>
        {[0, 1, 2, 3].map((i) => (
          <div className="cw-mailrow" key={i}>
            <i className="cw-avatar" style={{ background: ['#4285f4', '#ea4335', '#f4b400', '#34a853'][i] }} />
            <span className="cw-line" style={{ width: `${52 + (i * 23) % 34}%` }} />
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'calendar') {
    return (
      <div className="cw-app">
        <div className="cw-app-head"><img src={favicon('calendar.google.com')} alt="" />Calendar</div>
        <div className="cw-cal">
          {Array.from({ length: 21 }).map((_, i) => (
            <i key={i} className={`cw-cal-cell${i === 9 ? ' cw-cal-ev' : ''}${i === 13 ? ' cw-cal-ev2' : ''}`} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="cw-app">
      <div className="cw-app-head"><img src={favicon('asana.com')} alt="" />Asana</div>
      <div className="cw-asana">
        {[0, 1, 2].map((c) => (
          <div className="cw-asana-col" key={c}>
            {Array.from({ length: 2 + (c % 2) }).map((_, i) => (
              <div className="cw-asana-card" key={i}><span className="cw-line" style={{ width: `${60 + ((i + c) * 17) % 28}%` }} /></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Cowork() {
  const [tick, setTick] = useState(0);
  const scene = SCENES[Math.floor(tick / 2) % SCENES.length];
  const overlayOpen = tick % 2 === 0;

  useEffect(() => {
    const t = setTimeout(() => setTick((v) => v + 1), overlayOpen ? OVERLAY_MS : LOADED_MS);
    return () => clearTimeout(t);
  }, [tick, overlayOpen]);

  // While the overlay is up, the PREVIOUS scene's panels sit behind it.
  const shown = overlayOpen
    ? SCENES[(Math.floor(tick / 2) + SCENES.length - 1) % SCENES.length].panels
    : scene.panels;

  return (
    <section className="cowork" id="workspace">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">WORKSPACE</span> {'}'}</div>
        <h2 className="section-title reveal">Where you work.</h2>
        <p className="cw-sub reveal">
          One click builds the workspace — the agent always at your side.
        </p>

        <div className="hs-canvas cw-canvas reveal" aria-hidden="true">
          <div className="cw-frame">
            {/* The agent — ALWAYS the leftmost panel. */}
            <div className="cw-agent">
              <div className="cw-agent-head">⣿ Glyphh</div>
              <div className="cw-bubble cw-bubble-user"><Lines n={1} seed={1} w={58} /></div>
              <div className="cw-bubble"><Lines n={3} seed={4} w={46} /></div>
            </div>
            {/* The workspace: whatever was launched, beside the agent. */}
            <div className="cw-stage" key={shown.join('-')}>
              {shown.map((k) => <AppPanel kind={k} key={k} />)}
            </div>

            {/* The command overlay — the app's launcher, mid-click. */}
            {overlayOpen && (
              <div className="cw-cc">
                <div className="cw-cc-panel">
                  <div className="cw-cc-search" />
                  <div className="cw-cc-grid">
                    {TILES.map((tile) => (
                      <div className={`cw-cc-tile${!scene.layout && scene.pick === tile.name ? ' cw-cc-hot' : ''}`} key={tile.name}>
                        <span className="cw-cc-shot"><img src={favicon(tile.d)} alt="" /></span>
                        <span className="cw-cc-name">{tile.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="cw-cc-lay-label">Layouts</div>
                  <div className="cw-cc-lays">
                    <div className={`cw-cc-tile${scene.layout && scene.pick === 'Email' ? ' cw-cc-hot' : ''}`}>
                      <span className="cw-cc-shot cw-cc-mini">
                        <i><img src={favicon('mail.google.com')} alt="" /></i>
                        <i><img src={favicon('calendar.google.com')} alt="" /></i>
                      </span>
                      <span className="cw-cc-name">Email</span>
                    </div>
                    <div className="cw-cc-tile">
                      <span className="cw-cc-shot cw-cc-mini">
                        <i><img src={favicon('github.com')} alt="" /></i>
                        <i><img src={favicon('linear.app')} alt="" /></i>
                      </span>
                      <span className="cw-cc-name">Dev</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
