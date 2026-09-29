'use client';

import { useState } from 'react';

/**
 * Router page mocks — CLICKABLE (his order, 2026-09-11): each section's
 * mock demonstrates the flow it describes, following the app cleanly but
 * not faithfully. All wear the od-studio window chrome (Design's mock
 * grammar) with gwm-* internals; no data leaves the page — every mock is
 * a tiny local state machine.
 */

/* ── The contract, in your language — tabs swap the client ── */
const SNIPPETS = {
  python: `# Anything that speaks OpenAI speaks Glyphh.
client = OpenAI(
    base_url = "https://router.glyphh.ai",
    api_key  = "sk-…"   # minted against a role
)`,
  node: `// Same endpoint, any stack.
const client = new OpenAI({
  baseURL: "https://router.glyphh.ai",
  apiKey:  "sk-…"   // minted against a role
});`,
  curl: `# Or bare curl — it's just the OpenAI API.
curl https://router.glyphh.ai/v1/chat/completions \\
  -H "Authorization: Bearer sk-…" \\
  -d '{ "model": "claude-sonnet-5", … }'`,
};

export function ContractTabs() {
  const [lang, setLang] = useState('python');
  return (
    <div className="od-contract" aria-hidden="true">
      <div className="od-contract-tab gwm-tabrow">
        {Object.keys(SNIPPETS).map((l) => (
          <button key={l} className={`gwm-tab ${lang === l ? 'active' : ''}`} onClick={() => setLang(l)}>{l}</button>
        ))}
      </div>
      <pre className="od-contract-code">{SNIPPETS[lang]}{`

# The key carries its governance with it:
#   models      the role's supported set
#   rpm / tpm   the role's rate limits
#   max_budget  the role's hard budget`}</pre>
    </div>
  );
}

/* ── Roles — toggle a model, flip the hard limit, watch the role change ── */
const ROLE_MODELS = [
  { id: 'claude-sonnet-5', on: true },
  { id: 'claude-haiku-4-5', on: true },
  { id: 'gpt-5.2', on: false },
  { id: 'mistral-large-3', on: false },
];

export function RolesMock() {
  const [models, setModels] = useState(ROLE_MODELS);
  const [hard, setHard] = useState(true);
  const flip = (id) => setModels((m) => m.map((x) => (x.id === id ? { ...x, on: !x.on } : x)));
  const on = models.filter((m) => m.on).length;
  return (
    <div className="od-studio gwm" aria-hidden="true">
      <div className="od-studio-bar">
        <span className="od-studio-back">‹ Roles</span>
        <span className="od-studio-name">Engineering</span>
        <span className="od-studio-saved">Saved</span>
      </div>
      <div className="gwm-body">
        <div className="gwm-sec">MODELS · {on} allowed</div>
        {models.map((m) => (
          <button key={m.id} className="gwm-row" onClick={() => flip(m.id)}>
            <span className="gwm-mono">{m.id}</span>
            <i className={`gwm-toggle ${m.on ? 'on' : ''}`} />
          </button>
        ))}
        <div className="gwm-sec">BUDGET</div>
        <button className="gwm-row" onClick={() => setHard(!hard)}>
          <span className="gwm-mono">$50 / weekly · <em className={hard ? 'gwm-hard' : 'gwm-soft'}>{hard ? 'hard stop' : 'advisory'}</em></span>
          <i className={`gwm-toggle ${hard ? 'on' : ''}`} />
        </button>
        <div className="gwm-foot">rate limit 120/min · every key this role mints inherits all of it</div>
      </div>
    </div>
  );
}

/* ── Keys — mint one (shown once), revoke one (metrics live on) ── */
export function KeysMock() {
  const [phase, setPhase] = useState('list'); // list | minted
  const [minted, setMinted] = useState(false);
  const [revoked, setRevoked] = useState(false);
  return (
    <div className="od-studio gwm" aria-hidden="true">
      <div className="od-studio-bar">
        <span className="od-studio-back">‹ Router</span>
        <span className="od-studio-name">API Keys</span>
        <span className="od-studio-saved">{minted ? '2 keys' : '1 key'}</span>
      </div>
      <div className="gwm-body">
        {phase === 'minted' ? (
          <div className="gwm-token">
            <div className="gwm-sec">KEY CREATED — CI PIPELINE</div>
            <div className="gwm-token-warn">Copy it now — it won&rsquo;t be shown again.</div>
            <div className="gwm-token-row"><span className="gwm-mono">sk-gy-4f19…c2ae</span><span className="gwm-chip">Copy</span></div>
            <button className="gwm-btn" onClick={() => setPhase('list')}>Done</button>
          </div>
        ) : (
          <>
            <div className="gwm-row gwm-static">
              <span className="gwm-mono">deploy-bot <em>sk-…9f2</em></span>
              {revoked
                ? <span className="gwm-dim">Revoked · metrics live on</span>
                : <button className="gwm-chip danger" onClick={() => setRevoked(true)}>Revoke</button>}
            </div>
            {minted && (
              <div className="gwm-row gwm-static">
                <span className="gwm-mono">ci-pipeline <em>sk-…c2ae</em></span>
                <span className="gwm-dim">Expires in 30 days</span>
              </div>
            )}
            <button className="gwm-btn primary" onClick={() => { setMinted(true); setPhase('minted'); }}>
              + Mint key · Engineering
            </button>
            <div className="gwm-foot">a key reaches its role&rsquo;s models, carries its limits, dies on schedule</div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Telemetry — flip the window, the day bars and totals follow ── */
const WINDOWS = {
  '7d':  { bars: [18, 34, 26, 58, 44, 72, 61], tokens: '4.1M', spend: '$12.40', p95: '2.1s' },
  '30d': { bars: [22, 30, 44, 38, 52, 47, 66, 58, 71, 63, 80, 74], tokens: '18.6M', spend: '$56.90', p95: '2.4s' },
  '90d': { bars: [30, 42, 38, 55, 49, 64, 58, 73, 67, 82, 76, 90], tokens: '52.3M', spend: '$161.20', p95: '2.3s' },
};

export function MetricsMock() {
  const [win, setWin] = useState('30d');
  const d = WINDOWS[win];
  return (
    <div className="od-studio gwm" aria-hidden="true">
      <div className="od-studio-bar">
        <span className="od-studio-back">‹ Router</span>
        <span className="od-studio-name">Metrics</span>
        <span className="gwm-winrow">
          {Object.keys(WINDOWS).map((w) => (
            <button key={w} className={`gwm-tab ${win === w ? 'active' : ''}`} onClick={() => setWin(w)}>{w}</button>
          ))}
        </span>
      </div>
      <div className="gwm-body">
        <div className="gwm-stats">
          <span><b>{d.tokens}</b> tokens</span>
          <span><b>{d.spend}</b> spend</span>
          <span><b>{d.p95}</b> p95</span>
        </div>
        <div className="gwm-bars">
          {d.bars.map((h, i) => <i key={win + i} style={{ height: `${h}%` }} />)}
        </div>
        <div className="gwm-foot">tokens · spend per day — metadata only, never a prompt</div>
      </div>
    </div>
  );
}

/* ── The front door — click a way in, see the one line that changes ── */
const WAY_DETAIL = {
  'one endpoint': 'base_url = "https://router.glyphh.ai"  # the only line that changes',
  'one bill': 'claude-fable-5-1 · Pro rate · paid from the org budget, itemized per call',
  'your call': 'gpt-5.6 turned off · 23 models on · teams narrow from here',
};

export function WayCard({ tag, title, desc }) {
  const [open, setOpen] = useState(false);
  return (
    <button className={`od-extract-card reveal gwm-way ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
      <span className="od-extract-tag">{tag}</span>
      <h3>{title}</h3>
      <p>{desc}</p>
      {open && <span className="gwm-way-detail gwm-mono">{WAY_DETAIL[tag]}</span>}
      <span className="gwm-way-hint">{open ? '· click to close' : '· click to see it'}</span>
    </button>
  );
}
