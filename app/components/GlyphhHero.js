'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * GlyphhHero — the animated "control room" hero graphic (full-width, centred
 * under the hero copy so it has room to breathe).
 *
 * Top row: a vertical-scrolling app list (which, once Glyphh finds the app,
 * flips to that app's tools in two columns) · the Glyphh agent chat · a stack
 * of three boxes (Connections / MCP Tools / Agent). A full-width Runtime row
 * sits below. Connecting lines are drawn in an SVG overlay whose endpoints are
 * MEASURED from the real DOM boxes (getBoundingClientRect) so they always meet
 * the box edges, and they highlight per step to show Glyphh driving the work.
 */

const APPS = [
  'notion.so', 'figma.com', 'linear.app', 'discord.com', 'vercel.com',
  'stripe.com', 'github.com', 'gitlab.com', 'reddit.com', 'youtube.com',
  'x.com', 'hubspot.com', 'zoom.us', 'asana.com', 'airtable.com',
  'dropbox.com', 'shopify.com', 'calendly.com', 'loom.com', 'webflow.com',
  'trello.com', 'monday.com', 'spotify.com', 'telegram.org', 'slack.com',
  'salesforce.com', 'mail.google.com', 'perplexity.ai', 'intercom.com', 'sentry.io',
  'cloudflare.com', 'atlassian.net', 'docs.google.com', 'canva.com', 'twilio.com',
];
const SLACK_TOOLS = [
  'find_dm', 'read_panel', 'post_message', 'list_channels', 'search_messages', 'get_thread',
  'add_reaction', 'upload_file', 'set_status', 'create_channel', 'invite_user', 'pin_message',
];
const favicon = (d) => `https://www.google.com/s2/favicons?domain=${d}&sz=64`;

const STEPS = 7;
const BRAILLE = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

const CONNECTIONS = [
  { app: 'slack.com', name: 'Slack', via: 'Pipedream' },
  { app: 'mail.google.com', name: 'Gmail', via: 'Pipedream' },
  { app: 'salesforce.com', name: 'Salesforce', via: 'Pipedream' },
];
const MCP_TOOLS = [
  { app: 'slack.com', tool: 'find_dm' },
  { app: 'slack.com', tool: 'read_panel' },
  { app: 'salesforce.com', tool: 'get_record' },
  { app: 'mail.google.com', tool: 'create_draft' },
];

export default function GlyphhHero() {
  const [step, setStep] = useState(0);
  const [spin, setSpin] = useState(0);
  const [lines, setLines] = useState([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [scrollY, setScrollY] = useState(0);

  const wrapRef = useRef(null);
  const centerRef = useRef(null);
  const leftRef = useRef(null);
  const rtRef = useRef(null);
  const rmRef = useRef(null);
  const rbRef = useRef(null);
  const runRef = useRef(null);
  const gridRef = useRef(null);
  const slackRef = useRef(null);

  useEffect(() => {
    const a = setInterval(() => setStep((s) => (s + 1) % STEPS), 1800);
    const b = setInterval(() => setSpin((s) => (s + 1) % BRAILLE.length), 110);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);

  // Apps sit static, then fast-scroll to centre Slack once the search fires.
  useEffect(() => {
    if (step >= 1 && gridRef.current && slackRef.current) {
      const win = gridRef.current.clientHeight;
      const track = slackRef.current.parentElement;
      const target = slackRef.current.offsetTop + slackRef.current.offsetHeight / 2 - win / 2;
      const max = Math.max(0, track.scrollHeight - win);
      setScrollY(Math.min(max, Math.max(0, target)));
    } else {
      setScrollY(0);
    }
  }, [step]);

  // ── Measure box positions → line endpoints (always meet the edges) ──
  // useEffect (not useLayoutEffect) — runs client-only, so no SSR warning; the
  // lines just appear one frame after paint, which is fine for decoration.
  useEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      const center = centerRef.current;
      if (!wrap || !center) return;
      const c = wrap.getBoundingClientRect();
      const rel = (el) => {
        const r = el.getBoundingClientRect();
        return { l: r.left - c.left, r: r.right - c.left, t: r.top - c.top, b: r.bottom - c.top, cx: (r.left + r.right) / 2 - c.left, cy: (r.top + r.bottom) / 2 - c.top };
      };
      const C = rel(center);
      const out = [];
      const horiz = (id, el, side) => {
        if (!el) return;
        const T = rel(el);
        // from the centre's near edge (at the target's vertical centre) to the target edge
        if (side === 'left') out.push({ id, x1: C.l, y1: T.cy, x2: T.r, y2: T.cy });
        else out.push({ id, x1: C.r, y1: T.cy, x2: T.l, y2: T.cy });
      };
      horiz('L', leftRef.current, 'left');
      horiz('RT', rtRef.current, 'right');
      horiz('RM', rmRef.current, 'right');
      horiz('RB', rbRef.current, 'right');
      if (runRef.current) {
        const R = rel(runRef.current);
        out.push({ id: 'B', x1: C.cx, y1: C.b, x2: C.cx, y2: R.t });        // centre → runtime
        if (rbRef.current) { const RB = rel(rbRef.current); out.push({ id: 'RBh', x1: RB.cx, y1: RB.b, x2: RB.cx, y2: R.t }); } // agent → runtime
      }
      setLines(out);
      setSize({ w: c.width, h: c.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', measure);
    // content (app/tools flip, agent reply) changes box sizes — remeasure shortly after
    const t = setTimeout(measure, 60);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); clearTimeout(t); };
  }, [step]);

  // derived state
  const searching = step === 1;
  const slackFound = step >= 1;
  const toolsView = step >= 2;
  const slackConnected = step >= 2;
  const replied = step >= 4;
  const mcpActive = step >= 5;
  const agentActive = step >= 6;
  const runL = step === 3;
  const runR = step === 5 || step === 6;
  const br = BRAILLE[spin];

  const active = {
    L: step === 1, RT: step === 1 || step === 2, RM: step === 5,
    RB: step === 6, B: step === 3 || step === 5, RBh: step === 6,
  };

  return (
    <div className="gh" ref={wrapRef} role="img" aria-label="Glyphh agent orchestrating apps, connections, MCP tools and a runtime across one workspace">
      <svg className="gh-lines" width={size.w} height={size.h} aria-hidden="true">
        {lines.map((ln) => (
          <line key={ln.id} className={`gh-ln ${active[ln.id] ? 'on' : ''}`} x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2} />
        ))}
      </svg>

      <div className="gh-grid">
        {/* ── Left: scrolling apps → app tools ─────────────── */}
        <div className={`gh-card gh-apps ${searching ? 'on' : ''}`} ref={leftRef}>
          <div className="gh-card-label">GLYPHH_APPS <span className="gh-sb-meta">{APPS.length}</span></div>
          <div className={`gh-search ${searching ? 'on' : ''}`}>
            <svg viewBox="0 0 24 24" className="gh-search-ic"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
            <span className="gh-search-q">{searching ? 'slack — tom · pricing' : 'search apps'}</span>
          </div>
          {/* scrolling grid of app icons (no labels); fades at the bottom */}
          <div className={`gh-appgrid ${toolsView ? 'shrunk' : ''}`} ref={gridRef}>
            <div className="gh-appgrid-track" style={{ transform: `translateY(-${scrollY}px)` }}>
              {APPS.map((d, i) => (
                <span key={d + i} ref={d === 'slack.com' ? slackRef : null} className={`gh-appcell ${slackFound && d === 'slack.com' ? 'hot' : ''}`}>
                  <img src={favicon(d)} alt="" width="18" height="18" loading="lazy" onError={(e) => { e.target.style.opacity = 0; }} />
                </span>
              ))}
            </div>
          </div>
          {/* once the app is found, its MCP tools fade in at the bottom */}
          {toolsView && (
            <div className="gh-found">
              <div className="gh-found-label"><img src={favicon('slack.com')} alt="" width="13" height="13" /> SLACK · MCP TOOLS</div>
              <div className="gh-tools2">
                {SLACK_TOOLS.map((t) => (
                  <span className="gh-t2" key={t}><i /> {t}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Centre: the Glyphh agent chat ────────────────── */}
        <div className="gh-card gh-chat" ref={centerRef}>
          <div className="gh-chat-head">
            <img src="/glyphh-logo-white.png" alt="Glyphh" className="gh-logo" />
            <span className="gh-chat-title">Glyphh <b>Cowork</b></span>
          </div>
          <div className="gh-msgs">
            <div className="gh-msg gh-msg-user">
              find my slack from yesterday from tom about pricing, pull the customer info from salesforce, then email them a quote
            </div>
            {replied && (
              <div className="gh-msg gh-msg-agent">
                <span className="gh-msg-dot" /> Found Tom’s thread, pulled the Salesforce record, and drafted the quote email — ready to send.
              </div>
            )}
          </div>
          <div className="gh-reply">
            <span className="gh-reply-plus">+</span>
            <span className="gh-reply-ph">Reply…</span>
            <span className="gh-reply-model">Haiku 4.5</span>
            <span className="gh-send"><svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></svg></span>
          </div>
        </div>

        {/* ── Right: connections / MCP / agent ─────────────── */}
        <div className="gh-right">
          <div className={`gh-card gh-mini ${active.RT ? 'on' : ''}`} ref={rtRef}>
            <div className="gh-card-label">GLYPHH_CONNECTIONS</div>
            {CONNECTIONS.map((cn) => {
              const live = cn.name === 'Slack' ? slackConnected : true;
              return (
                <div className="gh-conn" key={cn.name}>
                  <img src={favicon(cn.app)} alt="" width="15" height="15" />
                  <span className="gh-conn-name">{cn.name}</span>
                  <span className="gh-conn-arr">→ {cn.via} →</span>
                  <span className={`gh-conn-status ${live ? 'ok' : ''}`}><i />{live ? 'Connected' : 'Connecting'}</span>
                </div>
              );
            })}
          </div>

          <div className={`gh-card gh-mini ${active.RM ? 'on' : ''}`} ref={rmRef}>
            <div className="gh-card-label">MCP_TOOLS</div>
            {MCP_TOOLS.map((t, i) => (
              <div className={`gh-tool ${mcpActive && i < 3 ? 'lit' : ''}`} key={t.app + t.tool}>
                <img src={favicon(t.app)} alt="" width="13" height="13" />
                <span className="gh-tool-name">{t.tool}</span>
                {mcpActive && i < 3 && <span className="gh-tool-tick">✓</span>}
              </div>
            ))}
          </div>

          <div className={`gh-card gh-mini ${agentActive ? 'on' : ''}`} ref={rbRef}>
            <div className="gh-card-label">AGENT</div>
            <div className="gh-kv"><span>AGENT</span><b>Coding Agent</b></div>
            <div className="gh-kv"><span>PROVIDER</span><b>Anthropic</b></div>
            <div className="gh-kv"><span>MODEL</span><b>Haiku 4.5</b></div>
          </div>
        </div>

        {/* ── Bottom: runtime ──────────────────────────────── */}
        <div className="gh-card gh-runtime" ref={runRef}>
          <div className="gh-card-label">GLYPHH_RUNTIME <span className="gh-sb-meta">sandbox · 2 instances</span></div>
          <div className="gh-rt-row">
            <div className={`gh-rt-cell ${runL ? 'run' : step > 3 ? 'done' : ''}`}>
              <span className="gh-rt-h"><i className="gh-spin">{runL ? br : '✓'}</i> INSTANCE-0 · slack</span>
              <pre>{`msgs = slack.find_dm(\n  from='tom', topic='pricing'\n)`}</pre>
            </div>
            <div className={`gh-rt-cell ${runR ? 'run' : ''}`}>
              <span className="gh-rt-h"><i className="gh-spin">{runR ? br : '·'}</i> INSTANCE-1 · salesforce → gmail</span>
              <pre>{`rec = salesforce.get_record(msgs)\ngmail.create_draft(rec, quote)`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
