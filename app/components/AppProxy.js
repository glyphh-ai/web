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
        <div className="adal-grid">
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
