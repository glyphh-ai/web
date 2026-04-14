const commands = [
  {
    name: 'yo',
    tag: 'Capture + Refine',
    desc: "Grabs the AI conversation you're looking at — from Claude, Gemini, ChatGPT, or any URL. Then opens a workspace where you can refine, restructure, and save it as clean markdown.",
    example: 'yo summarize this as a technical spec',
  },
  {
    name: 'sup',
    tag: 'Search + Recall',
    desc: "Searches your saved library with AI-powered fuzzy matching. Finds what you need and loads it right into whatever AI you're currently talking to.",
    example: 'sup auth flow from last week',
  },
  {
    name: 'dip',
    tag: 'Quick Add',
    desc: 'Paste in a URL, a code snippet, or raw text. Dip saves it straight to your library without opening the full workspace. Fast context capture.',
    example: 'dip https://docs.stripe.com/api/charges',
  },
];

export default function Commands() {
  return (
    <section className="commands" id="features">
      <div className="container">
        <div className="section-label">{'{'}
          <span className="accent">THREE COMMANDS</span>
          {'}'}</div>
        <h2 className="section-title">Type a command. Just talk.</h2>
        <p className="section-sub">No menus. No workflows. Just natural language in a command bar.</p>
        <div className="command-grid">
          {commands.map(cmd => (
            <div key={cmd.name} className="command-card reveal">
              <div className="command-header">
                <code className="command-name">{cmd.name}</code>
                <span className="command-tag">{cmd.tag}</span>
              </div>
              <p className="command-desc">{cmd.desc}</p>
              <div className="command-example">
                <span className="example-prompt">&gt;</span> {cmd.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
