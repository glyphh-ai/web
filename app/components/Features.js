const features = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    title: 'Always-On Context',
    desc: 'Every panel you open collects context in the background. No manual capture. No lost conversations. It is just there when you .yo.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    title: '.yo Agent',
    desc: 'A full agent that navigates your panels, clicks through apps, searches notes, manages skills and layouts. Just talk to it.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h18"/></svg>,
    title: 'Move Between Panels',
    desc: '.dip to any panel and land in context. Claude, Gemini, Slack, your IDE — the conversation continues wherever you go.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
    title: 'Voice Input',
    desc: 'Talk to the .yo agent with your voice. Press the mic, speak naturally, and the agent acts on what you say.',
    badge: 'Advanced',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
    title: 'Reusable Skills',
    desc: 'Save prompt templates as skills. .sup with a skill and your context is crystallized — summaries, specs, messages, anything repeatable.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
    title: 'Custom Layouts',
    desc: 'Design your own panel arrangements with custom grid sizes, spans, and proportions. Save and switch between workspaces instantly.',
    badge: 'Advanced',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: 'Works Across Your Stack',
    desc: 'Claude, ChatGPT, Gemini, Slack, your IDE — every panel is part of the conversation. Download the desktop app for Mac or Windows.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>,
    title: 'Cloud Sync',
    desc: 'Sync your library and skills across devices. Everything stays up to date, everywhere you work.',
    badge: 'Basic+',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'BYOK — Your Own Keys',
    desc: 'Bring your own API key for Anthropic, OpenAI, or Google. No middleman. Your keys, your usage, your cost.',
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
              <h3>{f.title}{f.badge && <span className="feature-badge">{f.badge}</span>}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
