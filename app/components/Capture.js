/**
 * Capture — app-level context capture + the bridge to MCP.
 *
 * Replaces the old adaL/HDC section (that substrate was removed from the
 * product). The story now: Glyphh captures context at the app level and
 * lets you wire every app you use to MCP tools.
 */

const pillars = [
  {
    title: 'Every app, captured',
    desc: 'Each panel — your editor, inbox, browser, dashboards, your own tools — is captured automatically as you use it. No copy-paste, no manual tagging, no session to manage.',
  },
  {
    title: 'App-level, not screen-level',
    desc: 'Capture happens per app, so context stays structured and attributable — the agent knows which app each fact came from and can act on it precisely.',
  },
  {
    title: 'Connect any app to MCP',
    desc: 'Wire the apps you already work in to MCP tools, so the agent can read from and act across all of them from one place — your whole stack, one context.',
  },
  {
    title: 'Local and private',
    desc: 'Captures are indexed with on-device embeddings and stored on your machine. Recall is gated to what is actually relevant — your data never leaves the box.',
  },
];

export default function Capture() {
  return (
    <section className="adal" id="capture">
      <div className="container">
        <div className="section-label reveal">{'{'}
          <span className="accent">CONTEXT CAPTURE</span>
          {'}'}</div>
        <h2 className="section-title reveal">
          It remembers everything<br/>you&rsquo;re working on.
        </h2>
        <p className="adal-lede reveal">
          As you work in any app, Glyphh captures what you&rsquo;re doing and
          indexes it on your machine — so the agent already knows the context,
          across every app, with no copy-pasting and nothing to re-explain.
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
