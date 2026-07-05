import { styledText } from './cmd-style';

const features = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h18"/></svg>,
    title: 'Layouts at the OS level',
    desc: 'Say the word and your whole screen rearranges — real OS windows tiled into saved layouts, apps launched into their cells, on Mac and Windows. Native window control, not tabs in a browser.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
    title: 'The command palette',
    desc: 'One hotkey overlays your screen: every app, layout, and running window a click or a `.dip` command away. Type an app name and it opens full-screen; type a layout and the desktop snaps into shape.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,
    title: 'One relay, any AI',
    desc: 'Connect Claude, ChatGPT, Gemini, or any MCP client to your Glyphh endpoint with one approval. Everything you’ve wired up — apps, tools, skills — becomes theirs to use, with your consent.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: '3,500+ connected services',
    desc: 'Gmail, Slack, Notion, GitHub, Salesforce and thousands more, connected with OAuth and exposed as tools your AI can call — send the message, file the ticket, update the record.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v18M3 12h18M5.63 5.63l12.74 12.74M18.37 5.63L5.63 18.37"/></svg>,
    title: 'Skills as code',
    desc: 'Repeatable workflows your AI runs on demand — deterministic, auditable, exportable. Teach Glyphh once; every connected client can use it forever.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    title: 'Glyphh apps',
    desc: 'Installable micro-apps that ship their own MCP tools — like Send Message on macOS. Install one and your AI immediately knows how to use it. Build your own with a manifest and an HTML file.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    title: 'Guarded by default',
    desc: 'An injection firewall screens every relayed request before it reaches your machine. Tool access is scoped per user, tokens are revocable, and a local-only server mode skips the cloud entirely.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    title: 'Bring your own AI',
    desc: 'Glyphh never resells model access and never marks up tokens. Your AI subscription is yours; Glyphh meters only the compute it does for you — 1 credit per 30 seconds of tool work.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>,
    title: 'Cloud sync',
    desc: 'Apps, layouts, and skills live in your org’s library and replicate across machines. Sign in anywhere — the workspace is yours, not the box.',
  },
];

export default function Features() {
  return (
    <section className="features-grid" id="features">
      <div className="container">
        <div className="section-label">{'{'}
          <span className="accent">WHAT YOU CAN DO</span>
          {'}'}</div>
        <h2 className="section-title">Everything your AI needs to actually do the work</h2>
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
