'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * GlyphhHero — the animated "control room" hero graphic.
 *
 * 8-step loop:
 *  0 reset — user types the request (left static, no app selected)
 *  1 agent accepts + fires a search tool call
 *  2 search — lines to the apps (left) AND connections (top-right) at once;
 *    the list fast-scrolls to Slack, Slack connects, its MCP tools fade in
 *  3 agent shows the MCP tool call
 *  4 execute — centre + right light up, the runtime spins
 *  5 agent posts its final response
 *  6-7 the centre becomes the drafted Gmail quote; hold, then loop
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

const STEPS = 11;
const BRAILLE = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

const CONNECTIONS = [
  { app: 'slack.com', name: 'Slack', via: 'Pipedream' },
  { app: 'mail.google.com', name: 'Gmail', via: 'Pipedream' },
  { app: 'salesforce.com', name: 'Salesforce', via: 'Pipedream' },
];
const MCP_TOOLS = [
  { app: 'slack.com', tool: 'find_dm' },
  { app: 'salesforce.com', tool: 'get_record' },
  { app: 'mail.google.com', tool: 'create_draft' },
];

const ToolChip = ({ label }) => <span className="gh-tc"><i className="gh-tc-dot" />{label}</span>;

// Claude sunburst mark (coral). Approximation — swap for the official Claude
// SVG asset when available.
const ClaudeMark = () => (
  <svg className="gh-claude-mark" viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
    <g fill="#d97757">
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x="11.1" y="2.6" width="1.8" height="6.6" rx="0.9" transform={`rotate(${i * 30} 12 12)`} />
      ))}
    </g>
  </svg>
);

// OpenAI "blossom" mark (ChatGPT green) — approximation; swap for the official
// OpenAI SVG when available.
const OpenAIMark = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
    <g fill="none" stroke="#10a37f" strokeWidth="1.5">
      {Array.from({ length: 6 }).map((_, i) => (
        <ellipse key={i} cx="12" cy="8.4" rx="3" ry="5" transform={`rotate(${i * 60} 12 12)`} />
      ))}
    </g>
  </svg>
);

// Gemini 4-point sparkle (Google gradient) — approximation; swap for the
// official Gemini SVG when available.
const GeminiMark = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
    <defs>
      <linearGradient id="gh-gem" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#4285f4" />
        <stop offset="0.5" stopColor="#9b72cb" />
        <stop offset="1" stopColor="#d96570" />
      </linearGradient>
    </defs>
    <path d="M12 2c0 5.2 1.7 8.3 10 10-8.3 1.7-10 4.8-10 10 0-5.2-1.7-8.3-10-10 8.3-1.7 10-4.8 10-10z" fill="url(#gh-gem)" />
  </svg>
);

// The demo runs the SAME flow under each connected AI, re-branding the desktop
// window per cycle — proof that any MCP client drives one Glyphh workspace.
// Each model themes the WHOLE window (bg / text / borders / surfaces + accent),
// so switching models is unmistakable: Claude dark, ChatGPT white, Gemini blue.
const MODELS = [
  { key: 'claude', name: 'Claude', client: 'Claude Desktop', Mark: ClaudeMark,
    accent: '#d97757', bg: '#262420', fg: '#ece9e2', fg2: '#a8a49a', line: '#3a372f', surf: '#2f2c26' },
  { key: 'openai', name: 'ChatGPT', client: 'ChatGPT', Mark: OpenAIMark,
    accent: '#10a37f', bg: '#ffffff', fg: '#2d2d2d', fg2: '#8e8ea0', line: '#e6e6e8', surf: '#f7f7f8' },
  { key: 'gemini', name: 'Gemini', client: 'Gemini', Mark: GeminiMark,
    accent: '#4285f4', bg: '#e9f0fd', fg: '#1f1f24', fg2: '#5f6368', line: '#cfdcf5', surf: '#dde8fb' },
];

export default function GlyphhHero() {
  const [tick, setTick] = useState(0);
  const step = tick % STEPS;
  const model = MODELS[Math.floor(tick / STEPS) % MODELS.length];
  const Mark = model.Mark;
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
    const a = setInterval(() => setTick((t) => (t + 1) % (STEPS * MODELS.length)), 1900);
    const b = setInterval(() => setSpin((s) => (s + 1) % BRAILLE.length), 110);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);

  // ── derived flow state ──────────────────────────────────────
  // Act 1 (0-6): find Slack → pull Salesforce → draft Gmail.
  // Act 2 (7-8): "make it an app for my phone" → build + publish.
  // Finale (9-10): the app live on a phone, held a beat longer.
  const gmailView = step === 6;               // the drafted quote email
  const appChat = step === 7 || step === 8;   // the app follow-up
  const phoneView = step >= 9;                // the built app on a phone
  const searching = step === 2;
  const slackFound = step >= 2;
  const toolsView = step >= 2;
  const slackConnected = step >= 2;
  const mcpActive = step >= 4;
  // Chat messages persist once reached, so the act-1 history stays visible
  // (scrolled up) under the act-2 conversation.
  const agentAccept = step >= 1;
  const agentMcp = step >= 3;
  const agentReplied = step >= 5;
  const working = step >= 1 && step <= 4;     // act-1 tool spinner
  const appBuilding = step === 7;             // packaging the app
  const appLive = step >= 8;
  const runL = step === 4;
  const runR = step === 4;
  const runApp = step === 7;                  // runtime builds + publishes the app
  const chatOn = step === 4 || appChat;       // centre-panel glow while it works
  const br = BRAILLE[spin];

  const active = { L: step === 2, RT: step === 2, RM: step === 4, B: step === 4, RB: false, RBh: false };

  // Apps sit static, then fast-scroll to centre Slack once the search fires.
  useEffect(() => {
    if (slackFound && gridRef.current && slackRef.current) {
      const win = gridRef.current.clientHeight;
      const track = slackRef.current.parentElement;
      const target = slackRef.current.offsetTop + slackRef.current.offsetHeight / 2 - win / 2;
      const max = Math.max(0, track.scrollHeight - win);
      setScrollY(Math.min(max, Math.max(0, target)));
    } else {
      setScrollY(0);
    }
  }, [step, slackFound]);

  // ── measure box positions → line endpoints ──────────────────
  useEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current; const center = centerRef.current;
      if (!wrap || !center) return;
      const c = wrap.getBoundingClientRect();
      const rel = (el) => { const r = el.getBoundingClientRect(); return { l: r.left - c.left, r: r.right - c.left, t: r.top - c.top, b: r.bottom - c.top, cx: (r.left + r.right) / 2 - c.left, cy: (r.top + r.bottom) / 2 - c.top }; };
      const C = rel(center);
      const out = [];
      const horiz = (id, el, side) => { if (!el) return; const T = rel(el); if (side === 'left') out.push({ id, x1: C.l, y1: T.cy, x2: T.r, y2: T.cy }); else out.push({ id, x1: C.r, y1: T.cy, x2: T.l, y2: T.cy }); };
      horiz('L', leftRef.current, 'left');
      horiz('RT', rtRef.current, 'right');
      horiz('RM', rmRef.current, 'right');
      horiz('RB', rbRef.current, 'right');
      if (runRef.current) {
        const R = rel(runRef.current);
        out.push({ id: 'B', x1: C.cx, y1: C.b, x2: C.cx, y2: R.t });
      }
      setLines(out);
      setSize({ w: c.width, h: c.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', measure);
    const t = setTimeout(measure, 60);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); clearTimeout(t); };
  }, [step]);

  return (
    <div className="gh" ref={wrapRef} role="img" aria-label="Claude, ChatGPT and Gemini each driving the same Glyphh workspace — finding a Slack message, pulling a Salesforce record, drafting a Gmail quote, then building and hosting an app you can run from your phone">
      {/* Connector lines hide during the phone finale — the centre panel goes
          bare there, so lines pointing at it render oddly. */}
      {!phoneView && (
        <svg className="gh-lines" width={size.w} height={size.h} aria-hidden="true">
          {lines.map((ln) => (
            <line key={ln.id} className={`gh-ln ${active[ln.id] ? 'on' : ''}`} x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2} />
          ))}
        </svg>
      )}

      <div className="gh-grid">
        {/* ── Left: scrolling app icon grid → MCP tools ────── */}
        <div className={`gh-card gh-apps ${searching ? 'on' : ''}`} ref={leftRef}>
          <div className="gh-card-label">GLYPHH_APPS <span className="gh-sb-meta">{APPS.length}</span></div>
          <div className={`gh-search ${searching ? 'on' : ''}`}>
            <svg viewBox="0 0 24 24" className="gh-search-ic"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
            <span className="gh-search-q">{slackFound ? 'slack — tom · pricing' : 'search apps'}</span>
          </div>
          <div className={`gh-appgrid ${toolsView ? 'shrunk' : ''}`} ref={gridRef}>
            <div className="gh-appgrid-track" style={{ transform: `translateY(-${scrollY}px)` }}>
              {APPS.map((d, i) => (
                <span key={d + i} ref={d === 'slack.com' ? slackRef : null} className={`gh-appcell ${slackFound && d === 'slack.com' ? 'hot' : ''}`}>
                  <img src={favicon(d)} alt="" width="18" height="18" loading="lazy" onError={(e) => { e.target.style.opacity = 0; }} />
                </span>
              ))}
            </div>
          </div>
          {toolsView && (
            <div className="gh-found">
              <div className="gh-found-label"><img src={favicon('slack.com')} alt="" width="13" height="13" /> SLACK · MCP TOOLS</div>
              <div className="gh-tools2">
                {SLACK_TOOLS.map((t) => <span className="gh-t2" key={t}><i /> {t}</span>)}
              </div>
            </div>
          )}
        </div>

        {/* ── Centre: your AI's chat, driving Glyphh → Gmail draft ── */}
        <div className={`gh-card gh-chat ${chatOn ? 'on' : ''} ${phoneView ? 'gh-chat-bare' : ''}`} ref={centerRef} style={{ '--m': model.accent, '--m-bg': model.bg, '--m-fg': model.fg, '--m-fg2': model.fg2, '--m-line': model.line, '--m-surf': model.surf }}>
          <div className="gh-chat-head">
            <span className="gh-claude"><Mark /> {model.name}</span>
            <span className="gh-sb-meta">connected over the relay</span>
          </div>

          {phoneView ? (
            <div className="gh-phone">
              <div className="gh-phone-frame">
                <span className="gh-phone-notch" />
                <div className="gh-phone-screen">
                  <div className="gh-phone-status"><span>9:41</span><span className="gh-phone-batt" /></div>
                  <div className="gh-phone-url">
                    <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                    quote-tool.glyphh.app
                  </div>
                  <div className="gh-phone-appbar">Quote Tool</div>
                  <div className="gh-phone-body">
                    <div className="gh-phone-field"><span>Customer</span><b>Acme</b></div>
                    <div className="gh-phone-field"><span>Plan</span><b>Pro — $4,800/yr</b></div>
                    <div className="gh-phone-field"><span>Discount</span><b>15% partner</b></div>
                    <div className="gh-phone-cta">Send quote</div>
                  </div>
                  <span className="gh-phone-home" />
                </div>
              </div>
              <div className="gh-phone-cap"><span className="gh-msg-dot" /> Live · hosted on your machine</div>
            </div>
          ) : gmailView ? (
            <div className="gh-gmail">
              <div className="gh-gmail-head"><img src={favicon('mail.google.com')} alt="" width="14" height="14" /> New message</div>
              <div className="gh-gmail-row"><span>To</span><b>jordan@acme.com</b></div>
              <div className="gh-gmail-row"><span>Subject</span><b>Your Glyphh quote</b></div>
              <div className="gh-gmail-body">
                Hi Jordan,<br /><br />
                Great chatting about pricing. Here’s your quote: <b>Pro — $4,800/yr</b> (15% partner discount applied).<br /><br />
                Best,<br />Chris
              </div>
              <div className="gh-gmail-send"><span className="gh-gmail-btn">Send</span></div>
            </div>
          ) : (
            <>
              <div className="gh-msgs">
                <div className="gh-msg gh-msg-user">
                  find my slack from yesterday from tom about pricing, pull the customer info from salesforce, then email them a quote
                </div>
                {agentAccept && (
                  <div className="gh-msg gh-msg-agent">
                    <span className="gh-msg-dot" /> On it — searching Slack for Tom’s pricing thread.
                    <div className="gh-tcs"><ToolChip label="slack.search_messages" /></div>
                  </div>
                )}
                {agentMcp && (
                  <div className="gh-msg gh-msg-agent">
                    <span className="gh-msg-dot" /> Pulling the customer record and drafting the quote.
                    <div className="gh-tcs"><ToolChip label="salesforce.get_record" /><ToolChip label="gmail.create_draft" /></div>
                  </div>
                )}
                {agentReplied && (
                  <div className="gh-msg gh-msg-agent">
                    <span className="gh-msg-dot" /> Done — the quote email to Acme is drafted and ready to send.
                  </div>
                )}
                {appChat && (
                  <div className="gh-msg gh-msg-user">
                    Oh and can you create an app I can run from my phone for this?
                  </div>
                )}
                {appChat && (
                  <div className="gh-msg gh-msg-agent">
                    <span className="gh-msg-dot" /> On it — packaging a Glyphh app and publishing it.
                    <div className="gh-tcs"><ToolChip label="glyphh.build_app" /><ToolChip label="glyphh.publish" /></div>
                  </div>
                )}
                {appLive && (
                  <div className="gh-msg gh-msg-agent">
                    <span className="gh-msg-dot" /> Done — live at <b>quote-tool.glyphh.app</b>, ready on your phone.
                  </div>
                )}
                {working && (
                  <div className="gh-working"><span className="gh-brl">{br}</span> running tools…</div>
                )}
                {appBuilding && (
                  <div className="gh-working"><span className="gh-brl">{br}</span> building app…</div>
                )}
              </div>
              <div className="gh-reply">
                <span className="gh-reply-plus">+</span>
                <span className="gh-reply-ph">Reply…</span>
                <span className="gh-reply-model">{model.name}</span>
                <span className="gh-send"><svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></svg></span>
              </div>
            </>
          )}
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
              <div className={`gh-tool ${mcpActive ? 'lit' : ''}`} key={t.app + t.tool}>
                <img src={favicon(t.app)} alt="" width="13" height="13" />
                <span className="gh-tool-name">{t.app.split('.')[0]}.{t.tool}</span>
                {mcpActive && <span className="gh-tool-tick">✓</span>}
              </div>
            ))}
          </div>

          <div className="gh-card gh-mini" ref={rbRef}>
            <div className="gh-card-label">CLIENT</div>
            <div className="gh-kv"><span>CLIENT</span><b>{model.client}</b></div>
            <div className="gh-kv"><span>LINK</span><b>MCP relay</b></div>
            <div className="gh-kv"><span>STATUS</span><b>Connected</b></div>
          </div>
        </div>

        {/* ── Bottom: runtime ──────────────────────────────── */}
        <div className="gh-card gh-runtime" ref={runRef}>
          <div className="gh-card-label">GLYPHH_RUNTIME <span className="gh-sb-meta">sandbox · 2 instances</span></div>
          <div className="gh-rt-row">
            <div className={`gh-rt-cell ${runL ? 'run' : step > 4 ? 'done' : ''}`}>
              <span className="gh-rt-h"><i className="gh-spin">{runL ? br : step > 4 ? '✓' : '·'}</i> INSTANCE-0 · slack</span>
              <pre>{`msgs = slack.find_dm(\n  from='tom', topic='pricing'\n)`}</pre>
            </div>
            <div className={`gh-rt-cell ${runR || runApp ? 'run' : step > 4 ? 'done' : ''}`}>
              {step >= 7 ? (
                <>
                  <span className="gh-rt-h"><i className="gh-spin">{runApp ? br : '✓'}</i> INSTANCE-1 · publish app</span>
                  <pre>{`app = glyphh.build_app('quote-tool')\napp.publish()  # quote-tool.glyphh.app`}</pre>
                </>
              ) : (
                <>
                  <span className="gh-rt-h"><i className="gh-spin">{runR ? br : step > 4 ? '✓' : '·'}</i> INSTANCE-1 · salesforce → gmail</span>
                  <pre>{`rec = salesforce.get_record(msgs)\ngmail.create_draft(rec, quote)`}</pre>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
