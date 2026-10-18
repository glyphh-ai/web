'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Glyphh Code page mocks (his order, 2026-09-21; the lanes went with BYOK and
 * the CLI bridge, 2026-09-29). Same rules as the Router
 * page: every mock is CLICKABLE and demonstrates the flow beside it, following
 * the app cleanly but not faithfully. Studios wear the od-studio window chrome
 * with gwm-* internals; the terminal and the two screenshot stand-ins wear
 * gcx-* (globals.css, "GLYPHH CODE product page"). No data leaves the page.
 *
 * The two *Shot components are PLACEHOLDERS for real screenshots. When the
 * images land, swap each for <ExpandableShot src="/screen-shots/v2/…" /> in
 * page.js and delete the stand-in here.
 */

/* ── Screenshot stand-in 1: the agent inside the Glyphh desktop ── */
export function DesktopShot() {
  return (
    <div className="gcx-shot" aria-hidden="true">
      <span className="gcx-shot-tag">mockup</span>
      <div className="gcx-desk">
        <div className="gcx-rail"><i className="on" /><i /><i /><i /><i /></div>
        <div className="gcx-pane">
          <div className="gcx-pane-bar">
            <b>Agent</b> Code · ~/work/api
            <span className="gcx-pill">via the router</span>
          </div>
          <div className="gcx-lines">
            <span className="gcx-line me" style={{ '--w': '58%' }} />
            <span className="gcx-tool">read src/routes/upload.ts</span>
            <span className="gcx-tool">read src/lib/limits.ts</span>
            <span className="gcx-tool edit">edit src/routes/upload.ts · +31 −4</span>
            <span className="gcx-tool">npm test · 42 passed</span>
            <span className="gcx-line" style={{ '--w': '86%' }} />
            <span className="gcx-line" style={{ '--w': '72%' }} />
            <span className="gcx-line" style={{ '--w': '40%' }} />
          </div>
          <div className="gcx-composer">
            <span>Ask for the work…</span>
            <b>claude-sonnet-5</b>
          </div>
        </div>
        <div className="gcx-pane">
          <div className="gcx-pane-bar">
            <b>upload.ts</b> src/routes
            <span className="gcx-pill dim">Terminal · Gmail · Browser</span>
          </div>
          <div className="gcx-lines">
            <span className="gcx-line code k" style={{ '--w': '46%' }} />
            <span className="gcx-line code" style={{ '--w': '82%' }} />
            <span className="gcx-line code" style={{ '--w': '68%' }} />
            <span className="gcx-line code k" style={{ '--w': '30%' }} />
            <span className="gcx-line code" style={{ '--w': '90%' }} />
            <span className="gcx-line code" style={{ '--w': '76%' }} />
            <span className="gcx-line code" style={{ '--w': '54%' }} />
            <span className="gcx-line code k" style={{ '--w': '38%' }} />
            <span className="gcx-line code" style={{ '--w': '84%' }} />
            <span className="gcx-line code" style={{ '--w': '62%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Screenshot stand-in 2: the glyphh CLI in a plain terminal ── */
export function TerminalShot() {
  return (
    <div className="gcx-shot gcx-shot-term" aria-hidden="true">
      <span className="gcx-shot-tag">mockup</span>
      <div className="gcx-term-bar"><i /><i /><i /><span>~/work/api — glyphh</span></div>
      <div className="gcx-term-body gcx-term-body-shot">
        <div className="gcx-t-logo">GLYPHH <span className="gcx-t-dim">1.0 · loop glyphh · chris@acme</span></div>
        <div className="gcx-t-dim">~/work/api — the Glyphh loop can read, edit and run what is here.</div>
        <div className="gcx-t-you">add a rate limiter to the upload route and cover it with a test</div>
        <div className="gcx-t-tool ok">read src/routes/upload.ts</div>
        <div className="gcx-t-tool edit">edit src/routes/upload.ts (+31 −4)</div>
        <div className="gcx-t-tool edit">create test/upload.limit.test.ts</div>
        <div className="gcx-t-tool run">npm test · 43 passed</div>
        <div className="gcx-t-ai">Limiter is on the route at 30 req/min per key, backed by the existing store. The new test covers the ceiling and the reset.</div>
        <div className="gcx-t-you gcx-t-cursor"></div>
      </div>
      <div className="gcx-term-foot">
        <span>◈ default <span className="faint">(shift+tab to cycle)</span></span>
        <span><span className="model">claude-sonnet-5</span> <span className="faint">·</span> loop <span className="model">glyphh</span></span>
      </div>
    </div>
  );
}

/* ── The Glyphh loop, in the terminal — cycle the mode, pick the model ── */
const MODES = [
  { key: 'default', label: '◈ default' },
  { key: 'acceptEdits', label: '✎ accept edits on' },
  { key: 'plan', label: '⏸ plan mode on' },
  { key: 'bypass', label: '⏵⏵ bypass permissions on' },
];
const ROUTER_MODELS = [
  { id: 'claude-sonnet-5', why: 'org default' },
  { id: 'claude-fable-5-1', why: 'the heavy one' },
  { id: 'gpt-5.2', why: 'your team allows it' },
  { id: 'qwen3-coder', why: 'open weights' },
  { id: 'a2a/reviewer', why: 'org agent' },
];

export function TerminalMock() {
  const [mode, setMode] = useState(0);
  const [model, setModel] = useState(ROUTER_MODELS[0].id);
  const [picker, setPicker] = useState(false);
  const m = MODES[mode];
  return (
    <div className="gcx-term" aria-hidden="true">
      <div className="gcx-term-bar"><i /><i /><i /><span>~/work/api — glyphh</span></div>
      <div className="gcx-term-body">
        <div className="gcx-t-logo">GLYPHH <span className="gcx-t-dim">the loop, in your terminal</span></div>
        <div className="gcx-t-you">why is the nightly job double-billing on retries</div>
        <div className="gcx-t-tool ok">read src/jobs/nightly.ts</div>
        <div className="gcx-t-tool ok">glyphh_connections · stripe ready</div>
        <div className="gcx-t-tool ok">stripe.charges.list · last 24h</div>
        <div className="gcx-t-ai">The retry path re-enters <code>charge()</code> without the idempotency key. Two charges, one invoice. Want me to thread the key through and add the regression test?</div>
        {picker ? (
          <div className="gcx-picker">
            <div className="gcx-t-dim">/model · the org's roster</div>
            {ROUTER_MODELS.map((g) => (
              <button key={g.id} className={g.id === model ? 'active' : ''} onClick={() => { setModel(g.id); setPicker(false); }}>
                <span>{g.id}</span><em>{g.why}</em>
              </button>
            ))}
          </div>
        ) : (
          <div className="gcx-t-you gcx-t-cursor"></div>
        )}
      </div>
      <div className="gcx-term-foot">
        <button className={`mode ${m.key}`} onClick={() => setMode((i) => (i + 1) % MODES.length)}>
          {m.label} <span className="faint">(click to cycle)</span>
        </button>
        <span>
          <button className="model" onClick={() => setPicker(!picker)}>{model}</button>
          <span className="faint"> · </span>loop <span className="model">glyphh</span>
        </span>
      </div>
    </div>
  );
}

/* ── Routing strategies — pick a strategy and a prompt, see where it lands ── */
const PROMPTS = [
  { id: 'rename', text: 'rename `usr` to `user` across the module', kind: 'mechanical' },
  { id: 'tests', text: 'write tests for the retry path', kind: 'generate' },
  { id: 'design', text: 'design the migration to per-tenant schemas', kind: 'reason' },
];
const STRATEGIES = {
  semantic: {
    label: 'semantic',
    route: { rename: ['qwen3-coder', 'mechanical edit · cheapest model that passes'], tests: ['claude-sonnet-5', 'generation · the org\'s default'], design: ['claude-fable-5-1', 'reasoning · the heavy model, only here'] },
    foot: 'the router reads the request, not the model name',
  },
  auto: {
    label: 'auto',
    route: { rename: ['claude-haiku-4-5', 'auto · light'], tests: ['claude-sonnet-5', 'auto · mid'], design: ['claude-fable-5-1', 'auto · heavy'] },
    foot: 'the org\'s auto-router picks per request. members pick nothing',
  },
  pinned: {
    label: 'your pick',
    route: { rename: ['claude-sonnet-5', 'the model you picked, every turn'], tests: ['claude-sonnet-5', 'the model you picked, every turn'], design: ['claude-sonnet-5', 'the model you picked, every turn'] },
    foot: 'no router: every turn on the model in your picker, at your plan\'s rate',
  },
};

export function StrategyMock() {
  const [strategy, setStrategy] = useState('semantic');
  const [prompt, setPrompt] = useState('design');
  const s = STRATEGIES[strategy];
  const [model, why] = s.route[prompt];
  return (
    <div className="od-studio gwm" aria-hidden="true">
      <div className="od-studio-bar">
        <span className="od-studio-back">‹ Router</span>
        <span className="od-studio-name">Strategy</span>
        <span className="gwm-winrow">
          {Object.entries(STRATEGIES).map(([k, v]) => (
            <button key={k} className={`gwm-tab ${strategy === k ? 'active' : ''}`} onClick={() => setStrategy(k)}>{v.label}</button>
          ))}
        </span>
      </div>
      <div className="gwm-body">
        <div className="gwm-sec">THE PROMPT · click one</div>
        <div className="gcx-prompts">
          {PROMPTS.map((p) => (
            <button key={p.id} className={`gwm-row ${prompt === p.id ? 'gcx-on' : ''}`} onClick={() => setPrompt(p.id)}>
              <span className="gwm-mono">{p.text}</span>
              <span className="gwm-dim">{p.kind}</span>
            </button>
          ))}
        </div>
        <div className="gwm-sec">LANDS ON</div>
        <div className="gcx-route" key={strategy + prompt}>
          <span className="arrow">→</span><b>{model}</b>
        </div>
        <div className="gcx-why">{why}</div>
        <div className="gwm-foot">{s.foot}</div>
      </div>
    </div>
  );
}

/* ── Install — the same loop, three doors in ── */
const DOORS = {
  desktop: `# The agent panel. Open a Code session in a folder.
# Same engine as the CLI, with the panels around it.
Glyphh Desktop → Agent → Code → pick a folder`,
  terminal: `# The CLI. Signs in to your org, runs the loop in-process.
npm i -g @glyphh-ai/cli
glyphh                 # in any folder
glyphh --continue      # pick up the last chat here`,
  'claude code': `# Or point Claude Code at the router, on your org's key.
export ANTHROPIC_BASE_URL="https://api.glyphh.ai"
export ANTHROPIC_AUTH_TOKEN="sk-…"   # a virtual key
claude`,
};

export function InstallTabs() {
  const [door, setDoor] = useState('terminal');
  return (
    <div className="od-contract" aria-hidden="true">
      <div className="od-contract-tab gwm-tabrow">
        {Object.keys(DOORS).map((d) => (
          <button key={d} className={`gwm-tab ${door === d ? 'active' : ''}`} onClick={() => setDoor(d)}>{d}</button>
        ))}
      </div>
      <pre className="od-contract-code">{DOORS[door]}</pre>
    </div>
  );
}

/* ── The relay — your machine, driven from the web. Send a turn, watch it stream. ── */
const RELAY_FRAMES = [
  ['platform', 'run · "fix the flaky upload test"'],
  ['relay', 'dispatch → MacBook Pro · attached'],
  ['desktop', 'loop glyphh · ~/work/api'],
  ['desktop', '✓ read test/upload.test.ts'],
  ['desktop', '✎ edit test/upload.test.ts (+6 −2)'],
  ['desktop', '$ npm test · 43 passed'],
  ['platform', 'done · 14s · streamed back'],
];

export function RelayMock() {
  const [frames, setFrames] = useState([]);
  const [running, setRunning] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const send = () => {
    if (running) return;
    setRunning(true);
    setFrames([]);
    let i = 0;
    const step = () => {
      setFrames((f) => [...f, RELAY_FRAMES[i]]);
      i += 1;
      if (i < RELAY_FRAMES.length) timer.current = setTimeout(step, 520);
      else setRunning(false);
    };
    step();
  };
  return (
    <div className="od-studio gwm" aria-hidden="true">
      <div className="od-studio-bar">
        <span className="od-studio-back">‹ Platform</span>
        <span className="od-studio-name">Connected devices</span>
        <span className="od-studio-saved">outbound only</span>
      </div>
      <div className="gwm-body">
        <div className="gwm-sec">YOUR MACHINES</div>
        <div className="gwm-row gwm-static">
          <span className="gcx-dev"><i className="gcx-dot" /><span className="gwm-mono">MacBook Pro <em>Glyphh Desktop · ~/work/api</em></span></span>
          <span className="gwm-dim">attached</span>
        </div>
        <div className="gwm-row gwm-static">
          <span className="gcx-dev"><i className="gcx-dot off" /><span className="gwm-mono">studio-mini <em>glyphh --host</em></span></span>
          <span className="gwm-dim">last seen 2h</span>
        </div>
        <div className="gwm-sec">A TURN FROM THE BROWSER</div>
        <div className="gcx-frames">
          {frames.length === 0 && <div className="gwm-dim">nothing dials in. the desktop dialed out, and the turn rides that socket back.</div>}
          {frames.map(([who, text], i) => (
            <div key={i} className="gcx-frame"><b>{who}</b> · {text}</div>
          ))}
        </div>
        <button className="gwm-btn primary" onClick={send} disabled={running}>
          {running ? 'running on your machine…' : frames.length ? 'Send it again' : 'Send a turn from the web'}
        </button>
      </div>
    </div>
  );
}

/* ── The pillars — click one, see the one line that proves it ── */
const PILLAR_DETAIL = {
  'your folder': 'write ../secrets.env → refused: outside this session\'s folder · the shell writes only here',
  'every model': 'claude-fable-5-1 · on your org’s key, in your logs',
  'semantic routing': 'strategy: semantic · "design the migration" → claude-fable-5-1 · "rename usr" → qwen3-coder',
};

export function PillarCard({ tag, title, desc }) {
  const [open, setOpen] = useState(false);
  return (
    <button className={`od-extract-card reveal gwm-way ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
      <span className="od-extract-tag">{tag}</span>
      <h3>{title}</h3>
      <p>{desc}</p>
      {open && <span className="gwm-way-detail gwm-mono">{PILLAR_DETAIL[tag]}</span>}
      <span className="gwm-way-hint">{open ? '· click to close' : '· click to see it'}</span>
    </button>
  );
}
