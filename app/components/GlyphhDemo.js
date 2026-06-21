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
  const lines = [
    [{ t: 'export default function ', c: 'kw' }, { t: 'Pricing', c: 'fn' }, { t: '() {', c: '' }],
    [{ t: '  return (', c: 'mut' }],
    [{ t: '    <section ', c: 'tag' }, { t: 'className', c: 'attr' }, { t: '="pricing">', c: 'tag' }],
    [{ t: '      <PlanCard ', c: 'tag' }, { t: 'tier', c: 'attr' }, { t: '="Pro" ', c: 'str' }, { t: '/>', c: 'tag' }],
    [{ t: '    </section>', c: 'tag' }],
    [{ t: '  )', c: 'mut' }, { t: ';', c: '' }],
    [{ t: '}', c: '' }],
  ];
  return (
    <div className="gd-scene gd-vibe">
      <div className="gd-filebar">
        <span className="gd-dot gd-dot-mod" /> App.jsx
      </div>
      <pre className="gd-code">
        {lines.map((ln, i) => (
          <div className="gd-codeline" key={i}>
            <span className="gd-gutter">{i + 1}</span>
            <span className="gd-code-text">
              {ln.map((tok, j) => (
                <span key={j} className={`tok ${tok.c}`}>{tok.t}</span>
              ))}
              {i === 3 && <span className="gd-caret" />}
            </span>
          </div>
        ))}
      </pre>
      <div className="gd-statusline">
        <span className="gd-pulse" /> Agent is writing <b>PlanCard</b>…
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
        <nav className="gd-rail" aria-hidden="true">
          <span className="gd-rail-glyphh">
            <img src="/glyphh-mascot.png" alt="" width={20} height={20} />
          </span>
          {RAIL.map((a, i) => (
            <span key={a.name} className={`gd-rail-icon${i === 0 ? ' is-active' : ''}`}>
              <AppIcon name={a.name} domain={a.domain} />
            </span>
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
            <Scene />
          </div>
        </div>
      </div>
    </div>
  );
}
