'use client';

import { useEffect, useState } from 'react';
import GlyphhHero from '../components/GlyphhHero';
import HeroParticles from '../components/HeroParticles';

/**
 * VideoDemo — the recording stage for the Glyphh Desktop promo.
 *
 * A fixed 6-scene timeline (~50s total), started via window.__startDemo()
 * (the recorder calls it) or ?autoplay=1 / a click for manual viewing:
 *
 *   1. hero          20.6s  one full GlyphhHero run (Claude) → ends on the phone
 *   2. slide-relay    3.5s  black slide — intro THE RELAY
 *   3. relay          9.0s  the RELAY marketecture (LLMs ⇄ Glyphh ⇄ your stack)
 *   4. slide-publish  3.5s  black slide — intro PUBLISH & SHARE
 *   5. publish        9.0s  the PUBLISH marketecture (build → Glyphh → anyone)
 *   6. end            5.0s  mascot + wordmark + glyphh.ai/desktop
 *
 * Scenes are mounted on entry so every animation starts from frame zero.
 * Marketecture markup mirrors Mcp.js / AppProxy.js (reveal classes stripped —
 * there's no IntersectionObserver here).
 */

const TIMELINE = [
  { id: 'hero', dur: 20600 },
  { id: 'slide-relay', dur: 3500 },
  { id: 'relay', dur: 9000 },
  { id: 'slide-publish', dur: 3500 },
  { id: 'publish', dur: 9000 },
  { id: 'end', dur: 5200 },
];

const LLMS = [
  'claude.ai', 'chatgpt.com', 'gemini.google.com', 'grok.com',
  'copilot.microsoft.com', 'chat.mistral.ai', 'chat.qwen.ai', 'ollama.com',
];
const CONNECTIONS = [
  'slack.com', 'mail.google.com', 'salesforce.com', 'github.com', 'notion.so',
  'figma.com', 'linear.app', 'stripe.com', 'vercel.com', 'discord.com',
  'zoom.us', 'asana.com', 'airtable.com', 'dropbox.com', 'shopify.com',
  'hubspot.com', 'atlassian.net', 'docs.google.com', 'calendly.com', 'intercom.com',
];
const fav = (d) => `https://www.google.com/s2/favicons?domain=${d}&sz=64`;

function RelayScene() {
  return (
    <div className="apx-stage mcx-stage" aria-hidden="true" style={{ margin: 0 }}>
      <div className="apx-col">
        <div className="apx-col-label">every LLM</div>
        <div className="mcx-llms">
          {LLMS.map((d, i) => (
            <span key={d} className="mcx-llm" style={{ '--d': `${i * 0.45}s` }}>
              <img src={fav(d)} alt="" width="20" height="20" />
            </span>
          ))}
        </div>
      </div>
      <div className="mcx-flows">
        <div className="apx-flow"><i /><i /><i /></div>
        <div className="apx-flow mcx-flow-back"><i /><i /></div>
      </div>
      <div className="apx-hub mcx-hub">
        <div className="mcx-apps">
          <span className="mcx-apps-label">connections</span>
          <div className="mcx-apps-track">
            {[...CONNECTIONS, ...CONNECTIONS].map((d, i) => (
              <span key={d + i} className="mcx-app"><img src={fav(d)} alt="" width="16" height="16" /></span>
            ))}
          </div>
        </div>
        <div className="mcx-vflows">
          <div className="mcx-vflow"><i /><i /></div>
          <div className="mcx-vflow mcx-vflow-up"><i /><i /></div>
        </div>
        <div className="apx-glow" />
        <div className="apx-orbit" />
        <div className="mcx-orbit-b" />
        <img src="/glyphh-mascot-square-black.png" alt="" className="apx-mascot" width="88" height="88" />
        <span className="apx-hub-label">Glyphh</span>
      </div>
      <div className="mcx-flows">
        <div className="apx-flow"><i /><i /><i /></div>
        <div className="apx-flow mcx-flow-back"><i /><i /></div>
      </div>
      <div className="apx-col">
        <div className="apx-col-label">everything you build</div>
        <div className="apx-node">3,500+ services</div>
        <div className="apx-node">tools &amp; skills</div>
        <div className="apx-node">apps &amp; agents</div>
      </div>
    </div>
  );
}

function PublishScene() {
  return (
    <div className="apx-stage" aria-hidden="true" style={{ margin: 0 }}>
      <div className="apx-col">
        <div className="apx-col-label">you build</div>
        <div className="apx-node">app</div>
        <div className="apx-node">agent</div>
        <div className="apx-node">automation</div>
      </div>
      <div className="apx-flow"><i /><i /><i /></div>
      <div className="apx-hub">
        <div className="apx-glow" />
        <div className="apx-orbit" />
        {[
          ['claude.ai', 337.5], ['chatgpt.com', 22.5], ['gemini.google.com', 67.5],
          ['grok.com', 112.5], ['copilot.microsoft.com', 157.5], ['chat.mistral.ai', 202.5],
          ['chat.qwen.ai', 247.5], ['ollama.com', 292.5],
        ].map(([domain, angle], i) => (
          <span key={domain} className="apx-oi" style={{ '--a': `${angle}deg`, '--d': `${i * 0.55}s` }}>
            <img src={fav(domain)} alt="" width="20" height="20" />
          </span>
        ))}
        <img src="/glyphh-mascot-square-black.png" alt="" className="apx-mascot" width="88" height="88" />
        <span className="apx-hub-label">Glyphh</span>
      </div>
      <div className="apx-flow"><i /><i /><i /></div>
      <div className="apx-col">
        <div className="apx-col-label">anyone uses</div>
        <div className="apx-node">my-app<span className="apx-dim">.glyphh.app</span></div>
        <div className="apx-node">HTTP API</div>
        <div className="apx-node">MCP endpoint</div>
      </div>
    </div>
  );
}

function Slide({ label, title, sub }) {
  return (
    <div className="vd-slide">
      <HeroParticles />
      <span className="vd-label">{'{'} <span className="vd-accent">{label}</span> {'}'}</span>
      <h2 className="vd-title">{title}</h2>
      {sub && <p className="vd-sub">{sub}</p>}
      <div className="vd-line" />
    </div>
  );
}

function EndCard() {
  return (
    <div className="vd-slide vd-end">
      <HeroParticles />
      <div className="vd-end-hub">
        <div className="apx-glow" />
        <div className="apx-orbit" />
        <img src="/glyphh-mascot-square-black.png" alt="" width="104" height="104" style={{ position: 'relative', borderRadius: 24 }} />
      </div>
      <img src="/glyphh-logo-white.png" alt="Glyphh" className="vd-end-logo" />
      <span className="vd-end-url">glyphh.ai<span className="vd-accent">/desktop</span><i className="vd-caret" /></span>
    </div>
  );
}

export default function VideoDemo() {
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(-1);

  // Start hooks: the recorder calls window.__startDemo(); humans can click
  // or pass ?autoplay=1.
  useEffect(() => {
    window.__startDemo = () => setStarted(true);
    if (new URLSearchParams(window.location.search).get('autoplay')) setStarted(true);
    return () => { delete window.__startDemo; };
  }, []);

  useEffect(() => {
    if (!started) return;
    setIdx(0);
    let i = 0;
    const timers = [];
    let acc = 0;
    for (const scene of TIMELINE) {
      acc += scene.dur;
      const next = ++i;
      if (next < TIMELINE.length) timers.push(setTimeout(() => setIdx(next), acc));
    }
    return () => timers.forEach(clearTimeout);
  }, [started]);

  const scene = idx >= 0 ? TIMELINE[idx].id : null;

  return (
    <div className="vd-root" onClick={() => !started && setStarted(true)}>
      <style>{`
        html, body { background: #000 !important; overflow: hidden; }
        .vd-root { position: fixed; inset: 0; background: #000; display: grid; place-items: center; cursor: default; }
        .vd-scene { position: absolute; inset: 0; display: grid; place-items: center; animation: vd-in 0.7s ease both; }
        @keyframes vd-in { from { opacity: 0; } to { opacity: 1; } }
        .vd-hint { font-family: var(--font-mono); font-size: 12px; color: #333; letter-spacing: 0.1em; }
        .vd-hero-wrap { width: 1080px; }
        .vd-scale { transform: scale(1.4); }

        .vd-slide { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; text-align: center; }
        .vd-label { font-family: var(--font-mono); font-size: 15px; letter-spacing: 0.14em; color: var(--text-3); animation: vd-in 0.6s ease both; }
        .vd-accent { color: var(--accent-light, #b975f9); }
        .vd-title {
          font-size: 58px; line-height: 1.14; font-weight: 700; letter-spacing: -0.02em; margin: 0; max-width: 980px;
          background: linear-gradient(100deg, #fff 30%, #b975f9 50%, #fff 70%);
          background-size: 220% 100%;
          -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: vd-in 0.7s ease 0.15s both, vd-sheen 2.6s ease 0.4s infinite;
        }
        @keyframes vd-sheen { 0% { background-position: 120% 0; } 100% { background-position: -120% 0; } }
        .vd-sub { font-size: 19px; color: var(--text-2); margin: 0; max-width: 720px; animation: vd-in 0.7s ease 0.35s both; }
        .vd-line {
          width: 300px; height: 1px; margin-top: 14px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          transform-origin: center; animation: vd-draw 0.9s cubic-bezier(.2,.8,.2,1) 0.5s both;
        }
        @keyframes vd-draw { from { transform: scaleX(0); opacity: 0; } to { transform: scaleX(1); opacity: 1; } }

        .vd-end { gap: 26px; }
        .vd-end-hub { position: relative; width: 220px; height: 220px; display: grid; place-items: center; animation: vd-pop 0.9s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes vd-pop { from { opacity: 0; transform: scale(0.82); } to { opacity: 1; transform: scale(1); } }
        .vd-end-logo { height: 54px; width: auto; animation: vd-in 0.7s ease 0.35s both; }
        .vd-end-url { font-family: var(--font-mono); font-size: 21px; color: var(--text); animation: vd-in 0.7s ease 0.6s both; display: inline-flex; align-items: center; }
        .vd-caret { width: 10px; height: 22px; margin-left: 7px; background: var(--accent-light, #b975f9); animation: vd-blink 1.05s steps(1) infinite; }
        @keyframes vd-blink { 50% { opacity: 0; } }
      `}</style>

      {!started && <span className="vd-hint">CLICK TO START</span>}

      {scene === 'hero' && (
        <div className="vd-scene"><div className="vd-hero-wrap"><GlyphhHero /></div></div>
      )}
      {scene === 'slide-relay' && (
        <div className="vd-scene">
          <Slide
            label="THE RELAY"
            title={<>Every LLM on one side.<br />Everything you build on the other.</>}
            sub="Connect once — every client you use gets all of it."
          />
        </div>
      )}
      {scene === 'relay' && (
        <div className="vd-scene"><div className="vd-scale"><RelayScene /></div></div>
      )}
      {scene === 'slide-publish' && (
        <div className="vd-scene">
          <Slide
            label="PUBLISH &amp; SHARE"
            title={<>Build it. Ship it.<br />No hosting.</>}
            sub="Installable apps, public URLs, MCP endpoints — served over the relay."
          />
        </div>
      )}
      {scene === 'publish' && (
        <div className="vd-scene"><div className="vd-scale"><PublishScene /></div></div>
      )}
      {scene === 'end' && (
        <div className="vd-scene"><EndCard /></div>
      )}
    </div>
  );
}
