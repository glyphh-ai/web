'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * GlyphhDemo — an interactive mock of the Glyphh desktop app for the hero.
 *
 * Replaces the orbit graphic (which read as a second icon cloud next to the
 * Integrations scroller). This shows the actual product: a multi-panel native
 * window with an app rail, switchable scenes (vibe-coding, an automation flow,
 * the agent working across apps), and a live status bar. Tabs auto-rotate until
 * the visitor clicks one; hovering pauses the rotation.
 */

const RAIL = [
  { name: 'Claude', domain: 'claude.ai' },
  { name: 'GitHub', domain: 'github.com' },
  { name: 'Slack', domain: 'slack.com' },
  { name: 'Gmail', domain: 'mail.google.com' },
  { name: 'Figma', domain: 'figma.com' },
  { name: 'Linear', domain: 'linear.app' },
];

const TABS = [
  { id: 'vibe', label: 'Vibe coding' },
  { id: 'flow', label: 'Automation' },
  { id: 'agent', label: 'Agent' },
];

const favicon = (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

function AppIcon({ name, domain, size = 18 }) {
  return (
    <span className="gd-appicon" title={name}>
      <img
        src={favicon(domain)}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextElementSibling?.classList.add('visible');
        }}
      />
      <span className="gd-appicon-fallback">{name.charAt(0)}</span>
    </span>
  );
}

function VibeScene() {
  const tools = [
    { name: 'Grep', arg: '"PlanCard"', meta: '3 matches', done: true },
    { name: 'Read', arg: 'Pricing.jsx', meta: '142 lines', done: true },
    { name: 'Edit', arg: 'Pricing.jsx', meta: '+6 −1', done: false },
  ];
  const diff = [
    { sign: ' ', t: '  <div className="plans">', type: 'ctx' },
    { sign: '−', t: '    <PlanCard tier="Free" />', type: 'del' },
    { sign: '+', t: '    <PlanCard tier="Free" />', type: 'add' },
    { sign: '+', t: '    <PlanCard tier="Pro" featured />', type: 'add' },
  ];
  return (
    <div className="gd-scene gd-vibe">
      <div className="gd-vibe-prompt" style={{ animationDelay: '0s' }}>
        <img className="gd-agent-glyphh" src="/glyphh-mascot.png" alt="" width={18} height={18} />
        <span>Add a <b>Pro</b> tier to the pricing page</span>
      </div>
      <div className="gd-tools">
        {tools.map((t, i) => (
          <div className="gd-tool" key={i} style={{ animationDelay: `${0.5 + i * 0.5}s` }}>
            <span className="gd-tool-mark">{t.done ? '✓' : <span className="gd-spinner" />}</span>
            <span className="gd-tool-name">{t.name}</span>
            <span className="gd-tool-arg">{t.arg}</span>
            <span className="gd-tool-meta">{t.meta}</span>
          </div>
        ))}
      </div>
      <div className="gd-diff" style={{ animationDelay: '2.1s' }}>
        <div className="gd-diff-head">
          app/components/Pricing.jsx
          <span className="gd-diff-stat"><b className="add">+6</b> <b className="del">−1</b></span>
        </div>
        {diff.map((d, i) => (
          <div className={`gd-diffline ${d.type}`} key={i}>
            <span className="gd-diff-sign">{d.sign}</span>{d.t}
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowScene() {
  const nodes = [
    { label: 'New email', sub: 'Gmail', domain: 'mail.google.com' },
    { label: 'Classify lead', sub: 'Agent', glyphh: true },
    { label: 'Notify #sales', sub: 'Slack', domain: 'slack.com' },
  ];
  return (
    <div className="gd-scene gd-flow">
      <div className="gd-flow-head">
        <span className="gd-badge"><span className="gd-pulse" /> Flow running</span>
        <span className="gd-flow-name">lead-router</span>
      </div>
      <div className="gd-flow-track">
        {nodes.map((n, i) => (
          <div className="gd-flow-step" key={i}>
            <div className="gd-flow-node">
              {n.glyphh
                ? <img className="gd-flow-glyphh" src="/glyphh-mascot.png" alt="" width={22} height={22} />
                : <AppIcon name={n.sub} domain={n.domain} size={22} />}
              <div className="gd-flow-text">
                <strong>{n.label}</strong>
                <span>{n.sub}</span>
              </div>
            </div>
            {i < nodes.length - 1 && (
              <div className="gd-flow-wire"><span className="gd-flow-spark" /></div>
            )}
          </div>
        ))}
      </div>
      <div className="gd-statusline">
        <span className="gd-check">✓</span> 3 steps · runs on every new email
      </div>
    </div>
  );
}

function AgentScene() {
  const steps = [
    { t: 'Searched context · 6 sources', done: true },
    { t: 'Read Linear issue GLY-204', done: true },
    { t: 'Edited 3 files in glyphh-web', done: true },
    { t: 'Ran tests · 28 passing', done: true },
    { t: 'Posting summary to Slack', done: false },
  ];
  return (
    <div className="gd-scene gd-agent">
      <div className="gd-agent-prompt">
        <img className="gd-agent-glyphh" src="/glyphh-mascot.png" alt="" width={20} height={20} />
        <span>Ship the pricing change and update the team.</span>
      </div>
      <ul className="gd-agent-steps">
        {steps.map((s, i) => (
          <li key={i} className={s.done ? 'done' : 'active'} style={{ animationDelay: `${i * 0.45}s` }}>
            <span className="gd-step-mark">{s.done ? '✓' : <span className="gd-spinner" />}</span>
            {s.t}{!s.done && <span className="gd-dots"><i /><i /><i /></span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

const SCENES = { vibe: VibeScene, flow: FlowScene, agent: AgentScene };

/* Each rail app opens as a panel showing the app in use — the way the
   product embeds live web apps as panels. Mockups, in each app's own UI. */
const APP_META = {
  Claude: { url: 'claude.ai', kind: 'claude' },
  GitHub: { url: 'github.com/glyphh-ai/glyphh-web', kind: 'github' },
  Slack: { url: 'app.slack.com/client', kind: 'slack' },
  Gmail: { url: 'mail.google.com', kind: 'gmail' },
  Figma: { url: 'figma.com/file/pricing', kind: 'figma' },
  Linear: { url: 'linear.app', kind: 'linear' },
};

function GmailMock() {
  const mails = [
    { from: 'Stripe', subj: 'New subscription · Pro', snip: 'You have a new Pro subscriber —', time: '2m', unread: true },
    { from: 'Vercel', subj: 'Deployment ready', snip: 'glyphh-web deployed to production', time: '14m', unread: true },
    { from: 'Linear', subj: 'GLY-204 moved to Done', snip: 'Chris completed Add Pro pricing', time: '1h', unread: false },
    { from: 'GitHub', subj: '[glyphh-web] PR #412 merged', snip: 'Add Pro pricing tier was merged', time: '3h', unread: false },
  ];
  return (
    <div className="mk mk-gmail">
      <div className="mk-gm-side">
        <div className="mk-gm-compose">＋ Compose</div>
        <div className="mk-gm-nav active">Inbox<span>24</span></div>
        <div className="mk-gm-nav">Starred</div>
        <div className="mk-gm-nav">Sent</div>
        <div className="mk-gm-nav">Drafts</div>
      </div>
      <div className="mk-gm-list">
        {mails.map((m, i) => (
          <div key={i} className={`mk-gm-row${m.unread ? ' unread' : ''}`}>
            <span className="mk-gm-star">☆</span>
            <span className="mk-gm-from">{m.from}</span>
            <span className="mk-gm-text"><b>{m.subj}</b> — {m.snip}</span>
            <span className="mk-gm-time">{m.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlackMock() {
  return (
    <div className="mk mk-slack">
      <div className="mk-sl-side">
        <div className="mk-sl-team">Glyphh HQ</div>
        <div className="mk-sl-ch">＃ general</div>
        <div className="mk-sl-ch">＃ sales</div>
        <div className="mk-sl-sec">Direct messages</div>
        <div className="mk-sl-dm active"><span className="mk-sl-dot" />Dana</div>
        <div className="mk-sl-dm"><span className="mk-sl-dot off" />Sam</div>
      </div>
      <div className="mk-sl-main">
        <div className="mk-sl-head">Dana</div>
        <div className="mk-sl-msgs">
          <div className="mk-sl-msg"><span className="mk-av av1">D</span><div><b>Dana</b> <i>9:41</i><p>Pro tier is live 🎉 nice work</p></div></div>
          <div className="mk-sl-msg"><span className="mk-av av2">C</span><div><b>You</b> <i>9:42</i><p>Glyphh shipped it end-to-end</p></div></div>
        </div>
        <div className="mk-sl-input">Message Dana</div>
      </div>
    </div>
  );
}

function GithubMock() {
  return (
    <div className="mk mk-gh">
      <div className="mk-gh-head">
        <span className="mk-gh-repo">glyphh-ai / glyphh-web</span>
        <span className="mk-gh-pr">⌥ Pull requests</span>
      </div>
      <div className="mk-gh-prtitle">
        <span className="mk-gh-badge">Open</span>
        Add Pro pricing tier <span className="mk-gh-num">#412</span>
      </div>
      <div className="mk-gh-file">Pricing.jsx</div>
      <div className="mk-gh-diff">
        <div className="ctx">  &lt;div className="plans"&gt;</div>
        <div className="del">- &lt;PlanCard tier="Free" /&gt;</div>
        <div className="add">+ &lt;PlanCard tier="Free" /&gt;</div>
        <div className="add">+ &lt;PlanCard tier="Pro" featured /&gt;</div>
      </div>
    </div>
  );
}

function LinearMock() {
  const rows = [
    { id: 'GLY-204', t: 'Add Pro pricing tier', s: 'done', p: 'C' },
    { id: 'GLY-205', t: 'Update billing docs', s: 'prog', p: 'D' },
    { id: 'GLY-206', t: 'Annual plan toggle', s: 'todo', p: 'S' },
    { id: 'GLY-207', t: 'Proration on upgrade', s: 'todo', p: 'C' },
  ];
  return (
    <div className="mk mk-linear">
      <div className="mk-ln-head">Cycle 14 · Active</div>
      {rows.map((r, i) => (
        <div key={i} className="mk-ln-row">
          <span className={`mk-ln-st ${r.s}`} />
          <span className="mk-ln-id">{r.id}</span>
          <span className="mk-ln-title">{r.t}</span>
          <span className="mk-ln-av">{r.p}</span>
        </div>
      ))}
    </div>
  );
}

function FigmaMock() {
  return (
    <div className="mk mk-figma">
      <div className="mk-fg-side">
        <div className="mk-fg-layer active">▤ Pricing</div>
        <div className="mk-fg-layer">▢ Free card</div>
        <div className="mk-fg-layer">▢ Pro card</div>
        <div className="mk-fg-layer">T Heading</div>
      </div>
      <div className="mk-fg-canvas">
        <span className="mk-fg-frame fa" />
        <span className="mk-fg-frame fb" />
        <span className="mk-fg-label">Pricing / Pro</span>
      </div>
    </div>
  );
}

function ClaudeMock() {
  return (
    <div className="mk mk-claude">
      <div className="mk-cl-msg user">Summarize the pricing change for the team.</div>
      <div className="mk-cl-msg bot">
        <span className="mk-cl-mark">✳</span>
        <p>Added a featured <b>Pro</b> tier at $12/mo; Free stays the default. Shipped the page and merged PR #412.</p>
      </div>
      <div className="mk-cl-input">Reply to Claude…</div>
    </div>
  );
}

const APP_MOCKS = { gmail: GmailMock, slack: SlackMock, github: GithubMock, linear: LinearMock, figma: FigmaMock, claude: ClaudeMock };

function AppView({ name }) {
  const app = RAIL.find((a) => a.name === name) || { name, domain: '' };
  const meta = APP_META[name] || {};
  const Mock = APP_MOCKS[meta.kind];
  return (
    <div className="gd-appview">
      <div className="gd-browserbar">
        <span className="gd-bb-dots"><i /><i /><i /></span>
        <span className="gd-bb-url">
          <AppIcon name={app.name} domain={app.domain} size={13} />
          {meta.url}
        </span>
        <span className="gd-bb-live"><span className="gd-pulse" /> live</span>
      </div>
      <div className="gd-appshot">
        {Mock ? <Mock /> : null}
      </div>
    </div>
  );
}

/* Auto-tour: cycle the scenes AND the app web panels so a visitor sees the
   whole story — vibe-coding, automations, the agent, and live app views —
   without having to click anything. */
const ROTATION = ['vibe', 'app:GitHub', 'flow', 'app:Slack', 'agent', 'app:Claude', 'app:Figma'];

export default function GlyphhDemo() {
  const [active, setActive] = useState('vibe');
  const [auto, setAuto] = useState(true);
  const paused = useRef(false);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => {
      if (paused.current) return;
      setActive((a) => {
        const i = ROTATION.indexOf(a);
        return ROTATION[(i + 1) % ROTATION.length];
      });
    }, 3600);
    return () => clearInterval(t);
  }, [auto]);

  const isApp = active.startsWith('app:');
  const appName = isApp ? active.slice(4) : null;
  const Scene = SCENES[active];

  return (
    <div
      className="gd-window"
      role="img"
      aria-label="The Glyphh desktop app: a multi-panel workspace where an AI agent vibe-codes, runs automations, and works across your apps"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <div className="gd-titlebar">
        <span className="gd-lights"><i /><i /><i /></span>
        <span className="gd-title">glyphh — Workbench</span>
        <span className="gd-live"><span className="gd-pulse" /> live</span>
      </div>
      <div className="gd-body">
        <nav className="gd-rail">
          <span className="gd-rail-glyphh">
            <img src="/glyphh-mascot.png" alt="" width={20} height={20} />
          </span>
          {RAIL.map((a) => (
            <button
              key={a.name}
              type="button"
              title={`Open ${a.name}`}
              className={`gd-rail-icon${active === `app:${a.name}` ? ' is-active' : ''}`}
              onClick={() => { setActive(`app:${a.name}`); setAuto(false); }}
            >
              <AppIcon name={a.name} domain={a.domain} />
            </button>
          ))}
        </nav>
        <div className="gd-main">
          <div className="gd-tabs" role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active === tab.id}
                className={`gd-tab${active === tab.id ? ' is-active' : ''}`}
                onClick={() => { setActive(tab.id); setAuto(false); }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="gd-stage" key={active}>
            {isApp ? <AppView name={appName} /> : <Scene />}
          </div>
        </div>
      </div>
      <div className="gd-statusbar" aria-hidden="true">
        <span className="gd-stat gd-stat-cap"><span className="gd-pulse" /> Capturing context</span>
        <span className="gd-stat"><span className="gd-stat-ico">⚙</span> MCP · 14 tools</span>
        <span className="gd-stat"><span className="gd-stat-ico">⟳</span> 2 flows running</span>
      </div>
    </div>
  );
}
