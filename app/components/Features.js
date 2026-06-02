import { styledText } from './cmd-style';

const features = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    title: 'Automation, native',
    desc: 'Flows replace point-and-click RPA. Cron-scheduled or event-driven, they string skills, MCP tools, and agent turns into one durable runbook — auditable, retried, and observable on disk.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,
    title: 'MCP everywhere',
    desc: 'Every tool the agent uses is an MCP server. Plug in stdio, SSE, or streamable-HTTP servers from anywhere — local CLIs, remote APIs, your own — and the agent picks them up. The local relay shares your toolkit with other MCP clients.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    title: 'Vibe-code in a full IDE',
    desc: 'A real Monaco editor, file tree, diff viewer, terminal, and Plan view — all panels, all drag-resizable. The agent has Read, Edit, Bash, and Grep on your actual project files. No browser tab — a native app with file-system access.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    title: 'Agents you build, then ship',
    desc: 'Define an agent with its own role, system prompt, model, permissions, MCP tools, and skill access. Save it once, call it from anywhere — the right-rail agent, a flow step, a sub-agent in a swarm.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v18M3 12h18M5.63 5.63l12.74 12.74M18.37 5.63L5.63 18.37"/></svg>,
    title: 'Skills as code',
    desc: 'Prompt-based or JavaScript runners with LLM calls, MCP tool invocation, cron scheduling, persistent data stores, and sub-skill chaining. Importable, exportable, version-controlled.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    title: 'Always-on context',
    desc: 'Every panel feeds a local vector store as you work. The agent searches your captured conversations, notes, and files before it asks — recall replaces re-explaining.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'Swarms when one agent is not enough',
    desc: 'The lead agent decomposes a goal, dispatches it across a roster of your saved agents, and streams every sub-agent\'s work back into the conversation. Built on the same MCP + skills your tools already use.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h18"/></svg>,
    title: 'Panels + layouts',
    desc: 'Every app — your IDE, the agent, browsers, dashboards, your tools — runs in a native panel. Drag to split, save layouts per project, switch with one command. The workspace fits the work, not the other way around.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: 'Bring your own keys',
    desc: 'No token markup. Anthropic, OpenAI, Gemini, xAI, Perplexity — paste a key and inference goes straight to the provider. Keys stay encrypted on your machine, never on our servers.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>,
    title: 'Cloud sync',
    desc: 'Agents, skills, flows, and layouts replicate across machines. Sign in, work anywhere — the workspace is yours, not the box.',
    badge: 'Pro',
  },
];

export default function Features() {
  return (
    <section className="features-grid" id="features">
      <div className="container">
        <div className="section-label">{'{'}
          <span className="accent">WHAT GLYPHH GIVES YOU</span>
          {'}'}</div>
        <h2 className="section-title">An AI workspace, not another chat box</h2>
        <div className="grid-3">
          {features.map((f, i) => (
            <div key={i} className="feature reveal">
              <div className="feature-icon">{f.icon}</div>
              <h3>{styledText(f.title)}{f.badge && <span className="feature-badge">{f.badge}</span>}</h3>
              <p>{styledText(f.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
