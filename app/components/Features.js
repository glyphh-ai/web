import { styledText } from './cmd-style';

const features = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    title: 'Always-On Context',
    desc: 'Every panel you open collects context in the background with local vector embeddings. No manual capture. No lost conversations. It is just there when you .yo.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    title: '.yo Agent',
    desc: 'A single capable agent that navigates panels, runs shell commands, reads and writes files, and orchestrates tasks across your entire workspace — powered by Claude with every MCP tool you have connected.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,
    title: 'Local MCP Server',
    desc: 'Connect any MCP server — local or remote — over stdio, SSE, or streamable HTTP. Your agent gets tools from every server you connect. MCP relay bridges your tools to other clients.',
    badge: 'Pro',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    title: 'Dev Spaces',
    desc: 'Launch a named multi-agent workspace with .code. Agents share a live event log and per-agent inboxes so teammates stay in sync — without you brokering every message. Spin up a full coordinated team in one command.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
    title: 'Skills',
    desc: 'More than templates. Skills are full automation units — prompt-based or JavaScript runners with LLM calls, MCP tool invocation, cron scheduling, data stores, and sub-skill chaining.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v18M3 12h18M5.63 5.63l12.74 12.74M18.37 5.63L5.63 18.37"/></svg>,
    title: 'Vibes',
    desc: 'Build interactive HTML apps inside Yo. Vibes get the full API — run skills, search captures, read files, store data, render charts. Dashboards, data tools, custom UIs.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h18"/></svg>,
    title: 'Panels and Layouts',
    desc: 'Every app runs in its own native panel. Design custom grid layouts with drag-to-resize. Save and switch between workspaces instantly. .dip to move — your context follows.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 8h4M7 12h10"/></svg>,
    title: 'Native App with Terminal',
    desc: 'Not a browser tab — a native Mac app with real file system access, a built-in terminal, and shell integration. The agent works on your actual files.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: 'Pay As You Go',
    desc: 'No API key required. yos credits power every agent call — buy a pack, enable auto top-up, and only pay for what you use.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>,
    title: 'Cloud Sync',
    desc: 'Sync your library and skills across devices. Everything stays up to date, everywhere you work.',
    badge: 'Pro',
  },
];

export default function Features() {
  return (
    <section className="features-grid">
      <div className="container">
        <div className="section-label">{'{'}
          <span className="accent">EVERYTHING YOU NEED</span>
          {'}'}</div>
        <h2 className="section-title">Built for anyone who uses AI daily</h2>
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
