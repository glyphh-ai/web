/**
 * AppProxy — the app-proxy story: any app in your library can get its own
 * public URL, served from your machine over the relay, as HTTP or as a scoped
 * MCP endpoint. Reuses the .adal section styling (see Mcp) for consistency.
 */

const pillars = [
  {
    title: 'HTTP apps → a public address',
    desc: 'Point an app at a local server and it gets a public URL at your-app.glyphh.app. Your machine serves it over the relay — no deploy, no ports to open, no infra to run.',
  },
  {
    title: 'LLM apps → your model over MCP',
    desc: 'Expose your own Claude, GPT, or Gemini as a scoped MCP endpoint. Any client calls send_prompt, use_tool, or run_agent — the model call runs on your machine, with your key, never ours.',
  },
  {
    title: 'Gated, guarded, metered',
    desc: 'Every public URL is OAuth/SSO-gated, with per-app guardrails — input caps, rolling token and call budgets, concurrency limits — and provider keys stay host-only, unreadable from any sandbox.',
  },
];

export default function AppProxy() {
  return (
    <section className="adal" id="publish">
      <div className="container">
        <div className="section-label reveal">{'{'}
          <span className="accent">PUBLISH</span>
          {'}'}</div>
        <h2 className="section-title reveal">
          Share what you build — no hosting required.
        </h2>
        <p className="adal-lede reveal">
          Anything you build goes live at <b>your-app.glyphh.app</b>, served
          over the relay. Hand it to others as an installable Glyphh app, a
          public URL, or an MCP endpoint their own AI can call. No deploy, no
          open ports, no infra to run — and your keys never leave home.
        </p>

        {/* Marketecture: you build → the relay (mascot hub, ringed by the LLMs
            that can connect) → anyone uses. Pure-CSS motion; mirrors the
            homepage's pg-stage visual language. Favicons via the same Google
            s2 service used across the site. */}
        <div className="apx-stage reveal" aria-hidden="true">
          <div className="apx-col">
            <div className="apx-col-label">you build</div>
            <div className="apx-node">app</div>
            <div className="apx-node">agent</div>
            <div className="apx-node">automation</div>
          </div>
          <div className="mcx-flows">
            <div className="apx-flow"><i /><i /><i /></div>
            <div className="apx-flow mcx-flow-back"><i /><i /></div>
          </div>
          <div className="apx-hub">
            <div className="apx-glow" />
            <div className="apx-orbit" />
            {[
              ['claude.ai', 337.5], ['chatgpt.com', 22.5], ['gemini.google.com', 67.5],
              ['grok.com', 112.5], ['copilot.microsoft.com', 157.5], ['chat.mistral.ai', 202.5],
              ['chat.qwen.ai', 247.5], ['ollama.com', 292.5],
            ].map(([domain, angle], i) => (
              <span key={domain} className="apx-oi" style={{ '--a': `${angle}deg`, '--d': `${i * 0.55}s` }}>
                <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} alt="" width="20" height="20" loading="lazy" />
              </span>
            ))}
            <img src="/glyphh-mascot-square-black.png" alt="" className="apx-mascot" width="88" height="88" />
            <span className="apx-hub-label">Glyphh</span>
          </div>
          <div className="mcx-flows">
            <div className="apx-flow"><i /><i /><i /></div>
            <div className="apx-flow mcx-flow-back"><i /><i /></div>
          </div>
          <div className="apx-col">
            <div className="apx-col-label">anyone uses</div>
            <div className="apx-node">my-app<span className="apx-dim">.glyphh.app</span></div>
            <div className="apx-node">HTTP API</div>
            <div className="apx-node">MCP endpoint</div>
          </div>
        </div>
        <p className="apx-cap reveal">any LLM — frontier or local — connects over one relay</p>

        <div className="adal-grid adal-grid-three">
          {pillars.map((p, i) => (
            <div key={i} className="adal-pillar reveal">
              <div className="adal-pillar-bullet" aria-hidden="true">·</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
