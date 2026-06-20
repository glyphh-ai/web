/**
 * MCP — the whole app is an MCP server, in both directions.
 *
 * A headline capability that wasn't surfaced anywhere: Glyphh speaks MCP
 * natively. It connects any MCP server in, and exposes itself as an MCP
 * server out, so other clients can use everything you've wired up.
 */

const pillars = [
  {
    title: 'Glyphh is an MCP server',
    desc: 'Every app, skill, and tool you connect is exposed through Glyphh’s own MCP server. Point Claude Code, Cursor, or any MCP client at it and they get your entire toolkit — with your context.',
  },
  {
    title: 'Connect any server in',
    desc: 'stdio, SSE, or streamable-HTTP — local CLIs, remote APIs, your own servers. Plug them in and the agent picks the tools up automatically across every panel.',
  },
  {
    title: 'One relay for everything',
    desc: 'Your apps, captures, and connectors become a single MCP surface. Shared tools and shared context across every client you point at it — no per-app glue.',
  },
  {
    title: '3,500+ apps via Pipedream',
    desc: 'On Pro, connect Pipedream and reach 3,500+ apps through the same MCP layer — Gmail, Slack, Notion, GitHub and thousands more, all available to the agent.',
    badge: 'Pro',
  },
];

export default function Mcp() {
  return (
    <section className="adal" id="mcp">
      <div className="container">
        <div className="section-label reveal">{'{'}
          <span className="accent">MODEL CONTEXT PROTOCOL</span>
          {'}'}</div>
        <h2 className="section-title reveal">
          The entire app<br/>is an MCP server.
        </h2>
        <p className="adal-lede reveal">
          Glyphh speaks MCP natively, both directions. Connect any MCP
          server into the workspace, and expose Glyphh itself as a server
          so tools like Claude Code and Cursor can use everything you have
          wired up — your apps, your skills, your context.
        </p>
        <div className="adal-grid">
          {pillars.map((p, i) => (
            <div key={i} className="adal-pillar reveal">
              <div className="adal-pillar-bullet" aria-hidden="true">·</div>
              <h3>{p.title}{p.badge && <span className="feature-badge">{p.badge}</span>}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
