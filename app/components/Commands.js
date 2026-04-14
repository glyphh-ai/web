const commands = [
  {
    id: 'cmd-yo',
    word: 'Yo',
    tagline: 'Capture anything. Refine everything.',
    desc: "Grabs the AI conversation you're looking at — from Claude, Gemini, ChatGPT, or any URL. Then opens a workspace where you can refine, restructure, and save it as clean markdown.",
    example: '.yo summarize this as a technical spec',
  },
  {
    id: 'cmd-sup',
    word: 'Sup',
    tagline: 'Find it. Format it. Send it anywhere.',
    desc: "Searches your saved library with AI-powered matching. Uses skills or LLM to format your context into any AI or app — ready to use, not just pasted.",
    example: '.sup auth flow from last week',
  },
  {
    id: 'cmd-dip',
    word: 'Dip',
    tagline: 'Switch apps. Instantly.',
    desc: 'App-to-app transitions and layout navigation, instantly. Dip switches panels, rearranges your workspace, and moves between AI tools without losing your place.',
    example: '.dip claude',
  },
];

export default function Commands() {
  return (
    <section className="commands" id="features">
      {commands.map(cmd => (
        <div key={cmd.id} className="command-section">
          <div className="container">
            <h2 className="command-hero-title reveal">
              <span className="dot dot-hidden" data-dot-anchor id={cmd.id}>.</span>{cmd.word}
            </h2>
            <p className="command-hero-tagline reveal">{cmd.tagline}</p>
            <div className="command-detail reveal">
              <p className="command-desc">{cmd.desc}</p>
              <div className="command-example">
                <span className="example-prompt">&gt;</span> {cmd.example}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
