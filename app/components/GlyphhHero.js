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

const STEPS = 8;
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
    const a = setInterval(() => setStep((s) => (s + 1) % STEPS), 1900);
    const b = setInterval(() => setSpin((s) => (s + 1) % BRAILLE.length), 110);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);

  // ── derived flow state ──────────────────────────────────────
  const showChat = step < 6;
  const gmailView = step >= 6;
  const agentAccept = step >= 1 && showChat;
  const searching = step === 2;
  const slackFound = step >= 2;
  const toolsView = step >= 2;
  const slackConnected = step >= 2;
  const agentMcp = step >= 3 && showChat;
  const mcpActive = step >= 4;
  const working = step >= 1 && step <= 4; // agent is waiting on tool calls
  const agentReplied = step === 5;
  const runL = step === 4;
  const runR = step === 4;
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
    <div className="gh" ref={wrapRef} role="img" aria-label="Glyphh agent finding a Slack message, pulling a Salesforce record and drafting a Gmail quote across one workspace">
      <svg className="gh-lines" width={size.w} height={size.h} aria-hidden="true">
        {lines.map((ln) => (
          <line key={ln.id} className={`gh-ln ${active[ln.id] ? 'on' : ''}`} x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2} />
        ))}
      </svg>

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
        <div className={`gh-card gh-chat ${active.RM ? 'on' : ''}`} ref={centerRef}>
          <div className="gh-chat-head">
            <img src="/glyphh-logo-white.png" alt="Glyphh" className="gh-logo" />
            <span className="gh-sb-meta">your AI · connected over the relay</span>
          </div>

          {!gmailView ? (
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
                {working && (
                  <div className="gh-working"><span className="gh-brl">{br}</span> running tools…</div>
                )}
              </div>
              <div className="gh-reply">
                <span className="gh-reply-plus">+</span>
                <span className="gh-reply-ph">Reply…</span>
                <span className="gh-reply-model">Claude</span>
                <span className="gh-send"><svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></svg></span>
              </div>
            </>
          ) : (
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
            <div className="gh-kv"><span>CLIENT</span><b>Claude Desktop</b></div>
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
            <div className={`gh-rt-cell ${runR ? 'run' : step > 4 ? 'done' : ''}`}>
              <span className="gh-rt-h"><i className="gh-spin">{runR ? br : step > 4 ? '✓' : '·'}</i> INSTANCE-1 · salesforce → gmail</span>
              <pre>{`rec = salesforce.get_record(msgs)\ngmail.create_draft(rec, quote)`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
