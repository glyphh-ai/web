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

/* Each rail app opens its own "page" as a panel view. */
const APP_META = {
  Claude: { url: 'claude.ai', kind: 'chat' },
  GitHub: { url: 'github.com/glyphh-ai/glyphh-web', kind: 'github' },
  Slack: { url: 'app.slack.com', kind: 'slack' },
  Gmail: { url: 'mail.google.com', kind: 'mail' },
  Figma: { url: 'figma.com/file/pricing', kind: 'figma' },
  Linear: { url: 'linear.app', kind: 'linear' },
};

function AppBody({ kind }) {
  switch (kind) {
    case 'chat':
      return (
        <div className="gd-chat">
          <div className="gd-bubble user">Summarize the pricing change for the team.</div>
          <div className="gd-bubble bot">
            Added a featured <b>Pro</b> tier at $12/mo; Free stays the default. Updated
            the page and opened PR #412.
          </div>
        </div>
      );
    case 'github':
      return (
        <div className="gd-rows">
          <div className="gd-row gd-row-head"><span className="gd-tag">PR #412</span> Add Pro pricing tier</div>
          <div className="gd-row"><span className="gd-row-title">Pricing.jsx</span><span className="gd-row-meta"><b className="add">+6</b> <b className="del">−1</b></span></div>
          <div className="gd-row"><span className="gd-row-title">Pricing.test.jsx</span><span className="gd-row-meta"><b className="add">+12</b></span></div>
        </div>
      );
    case 'slack':
      return (
        <div className="gd-rows">
          <div className="gd-row gd-row-head"># sales</div>
          <div className="gd-row"><span className="gd-row-title">Glyphh</span><span className="gd-row-sub">Pro tier is live 🎉</span></div>
          <div className="gd-row"><span className="gd-row-title">Dana</span><span className="gd-row-sub">nice — updating the deck</span></div>
        </div>
      );
    case 'mail':
      return (
        <div className="gd-rows">
          <div className="gd-row gd-row-head">Inbox · 3 new</div>
          <div className="gd-row"><span className="gd-row-title">Stripe</span><span className="gd-row-sub">New subscription · Pro</span><span className="gd-row-meta">2m</span></div>
          <div className="gd-row"><span className="gd-row-title">Vercel</span><span className="gd-row-sub">Deployment ready</span><span className="gd-row-meta">9m</span></div>
        </div>
      );
    case 'figma':
      return (
        <div className="gd-figma">
          <span className="gd-frame f1" />
          <span className="gd-frame f2" />
          <span className="gd-frame f3" />
          <span className="gd-figma-cap">Pricing / Pro card</span>
        </div>
      );
    case 'linear':
      return (
        <div className="gd-rows">
          <div className="gd-row gd-row-head">In Progress</div>
          <div className="gd-row"><span className="gd-sdot green" /><span className="gd-row-title">GLY-204</span><span className="gd-row-sub">Add Pro pricing tier</span></div>
          <div className="gd-row"><span className="gd-sdot amber" /><span className="gd-row-title">GLY-205</span><span className="gd-row-sub">Update billing docs</span></div>
        </div>
      );
    default:
      return null;
  }
}

function AppView({ name }) {
  const app = RAIL.find((a) => a.name === name) || { name, domain: '' };
  const meta = APP_META[name] || {};
  return (
    <div className="gd-appview">
      <div className="gd-appview-bar">
        <AppIcon name={app.name} domain={app.domain} size={15} />
        <span className="gd-appview-name">{app.name}</span>
        <span className="gd-appview-url">{meta.url}</span>
      </div>
      <div className="gd-appview-body">
        <AppBody kind={meta.kind} />
      </div>
    </div>
  );
}

export default function GlyphhDemo() {
  const [active, setActive] = useState('vibe');
  const [auto, setAuto] = useState(true);
  const paused = useRef(false);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => {
      if (paused.current) return;
      setActive((a) => {
        const i = TABS.findIndex((x) => x.id === a);
        return TABS[(i + 1) % TABS.length].id;
      });
    }, 4200);
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
    </div>
  );
}
