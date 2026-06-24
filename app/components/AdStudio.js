'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * AdStudio — a hidden, standalone demo at /studio.
 *
 * Plays the story end-to-end: a Slack command (".yo pull up the pricing
 * feature we built with claude and create a new ad") → a Glyphh automation
 * running → the finished ad in Instagram. The Slack command and the ad
 * headline are editable, and "Run" replays the sequence with the new values.
 */

const DEFAULT_CMD = '.yo pull up the pricing feature we built with claude and create a new ad';
const DEFAULT_HEADLINE = 'One workspace.\nEvery app.';

const FLOW_STEPS = [
  'Parsing request from Slack',
  'Found “Pricing” feature — built with Claude',
  'Drafting ad copy with Claude',
  'Generating 1080×1080 creative',
  'Publishing draft to Instagram',
];

const favicon = (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

function StudioSlack({ typed, sent }) {
  return (
    <div className="mk mk-slack">
      <div className="mk-sl-side">
        <div className="mk-sl-team">Glyphh HQ</div>
        <div className="mk-sl-ch">＃ general</div>
        <div className="mk-sl-ch active">＃ marketing</div>
        <div className="mk-sl-sec">Apps</div>
        <div className="mk-sl-dm"><span className="mk-sl-dot" />Glyphh</div>
      </div>
      <div className="mk-sl-main">
        <div className="mk-sl-head">＃ marketing</div>
        <div className="mk-sl-msgs">
          <div className="mk-sl-msg"><span className="mk-av av1">D</span><div><b>Dana</b> <i>10:02</i><p>we need an IG ad for the new pricing 🙏</p></div></div>
          {sent && (
            <div className="mk-sl-msg"><span className="mk-av av2">C</span><div><b>You</b> <i>10:03</i><p className="as-cmd">{typed}</p></div></div>
          )}
          {sent && (
            <div className="mk-sl-msg"><span className="mk-av asg"><img src="/glyphh-mascot.png" alt="" width={14} height={14} /></span><div><b>Glyphh</b> <i>10:03</i><p>On it — pulling the Pricing feature and drafting an ad…</p></div></div>
          )}
        </div>
        <div className="as-composer">
          <span className="as-composer-text">
            {!sent && typed}
            {!sent && !typed && <span className="as-ph">Message #marketing</span>}
            {!sent && <span className="as-caret" />}
          </span>
          <span className="as-send">➤</span>
        </div>
      </div>
    </div>
  );
}

function StudioFlow({ step }) {
  return (
    <div className="mk as-flow">
      <div className="as-flow-head">
        <img src="/glyphh-mascot.png" alt="" width={18} height={18} />
        <b>Automation</b><span className="as-flow-name">ad-from-slack</span>
        <span className="as-badge"><span className="gd-pulse" /> running</span>
      </div>
      <ul className="as-steps">
        {FLOW_STEPS.map((s, i) => (
          <li key={i} className={i < step ? 'done' : i === step ? 'active' : 'todo'}>
            <span className="as-mark">
              {i < step ? '✓' : i === step ? <span className="gd-spinner" /> : '○'}
            </span>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StudioInsta({ headline }) {
  return (
    <div className="mk ig">
      <div className="ig-head">
        <span className="ig-av"><img src="/glyphh-mascot.png" alt="" width={20} height={20} /></span>
        <div className="ig-meta"><b>glyphh</b><span>Sponsored</span></div>
        <span className="ig-more">⋯</span>
      </div>
      <div className="ig-creative">
        <div className="ig-ad">
          <img className="ig-ad-logo" src="/glyphh-logo-white.png" alt="Glyphh" />
          <h3>{headline}</h3>
          <p>Every app. Every LLM. One context.</p>
          <span className="ig-cta">Try Glyphh Pro — $12/mo</span>
        </div>
      </div>
      <div className="ig-actions">
        <span className="ig-i">♡</span><span className="ig-i">💬</span><span className="ig-i">✈</span>
        <span className="ig-i ig-save">🔖</span>
      </div>
      <div className="ig-likes">2,418 likes</div>
      <div className="ig-caption"><b>glyphh</b> One workspace. Every app. Every LLM. ✨ Now with Pro pricing. #productivity #AI #buildfaster</div>
    </div>
  );
}

export default function AdStudio() {
  const [cmd, setCmd] = useState(DEFAULT_CMD);
  const [headline, setHeadline] = useState(DEFAULT_HEADLINE);
  const [phase, setPhase] = useState('idle'); // idle | typing | sent | flow | done
  const [typed, setTyped] = useState('');
  const [step, setStep] = useState(0);
  const timers = useRef([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const after = (ms, fn) => { const t = setTimeout(fn, ms); timers.current.push(t); };

  function run() {
    clearTimers();
    setTyped(''); setStep(0); setPhase('typing');
    let i = 0;
    const type = () => {
      i += 1;
      setTyped(cmd.slice(0, i));
      if (i < cmd.length) after(26 + Math.random() * 40, type);
      else after(750, () => setPhase('sent'));
    };
    after(450, type);
  }

  // auto-play once on mount
  useEffect(() => {
    run();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sent → flow
  useEffect(() => {
    if (phase !== 'sent') return;
    after(1200, () => setPhase('flow'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // flow steps → done
  useEffect(() => {
    if (phase !== 'flow') return;
    if (step < FLOW_STEPS.length) after(850, () => setStep((s) => s + 1));
    else after(800, () => setPhase('done'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, step]);

  const stage = phase === 'flow' ? 1 : phase === 'done' ? 2 : 0;
  const bar = phase === 'flow'
    ? { mascot: true, url: 'glyphh · automation: ad-from-slack' }
    : phase === 'done'
      ? { domain: 'instagram.com', url: 'instagram.com/glyphh' }
      : { domain: 'slack.com', url: 'app.slack.com/client · #marketing' };

  const running = phase !== 'done' && phase !== 'idle';

  return (
    <main className="studio">
      <div className="studio-inner">
        <header className="studio-head">
          <span className="studio-kicker">Glyphh · internal</span>
          <h1>Ad Studio</h1>
          <p>From a Slack message to a finished Instagram ad — one automation.</p>
        </header>

        <div className="studio-grid">
          <div className="studio-controls">
            <label className="studio-field">
              <span>Slack command</span>
              <textarea value={cmd} onChange={(e) => setCmd(e.target.value)} rows={3} />
            </label>
            <label className="studio-field">
              <span>Ad headline</span>
              <textarea value={headline} onChange={(e) => setHeadline(e.target.value)} rows={2} />
            </label>
            <button className="btn btn-primary btn-lg group studio-run" onClick={run} disabled={running}>
              <span className="btn-label">{running ? 'Running…' : phase === 'done' ? 'Replay' : 'Run automation'}</span>
              <span className="btn-fill"></span>
            </button>
            <div className="as-stepper">
              {['Slack', 'Automation', 'Instagram'].map((s, i) => (
                <span key={s} className={`as-stepper-item${i <= stage ? ' on' : ''}${i === stage ? ' cur' : ''}`}>
                  {s}{i < 2 && <span className="as-stepper-arrow">→</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="studio-stage">
            <div className="gd-window">
              <div className="gd-titlebar">
                <span className="gd-lights"><i /><i /><i /></span>
                <span className="gd-title">glyphh — Ad Studio</span>
                <span className="gd-live"><span className="gd-pulse" /> live</span>
              </div>
              <div className="gd-browserbar as-bar">
                <span className="gd-bb-dots"><i /><i /><i /></span>
                <span className="gd-bb-url">
                  {bar.mascot
                    ? <img src="/glyphh-mascot.png" alt="" width={13} height={13} />
                    : <img src={favicon(bar.domain)} alt="" width={13} height={13} />}
                  {bar.url}
                </span>
                <span className="gd-bb-live"><span className="gd-pulse" /> live</span>
              </div>
              <div className="as-viewport" key={phase}>
                {(phase === 'idle' || phase === 'typing' || phase === 'sent')
                  && <StudioSlack typed={typed} sent={phase === 'sent'} />}
                {phase === 'flow' && <StudioFlow step={step} />}
                {phase === 'done' && <StudioInsta headline={headline} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
