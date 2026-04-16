const commands = [
  {
    id: 'cmd-yo',
    word: 'Yo',
    tagline: "You're always in the conversation.",
    desc: "When you drop .yo, you're speaking into the system. Context from every panel you have open is already being collected in the background — it's there when you need it. You never have to think about session.",
    example: '.yo what do you think of the code changes we just made?',
  },
  {
    id: 'cmd-sup',
    word: 'Sup',
    tagline: 'The panel says hey back.',
    desc: "When an AI or app responds, that's the .sup — the panel checking in. Claude, Gemini, Slack, your code editor — each one a voice in the conversation. Their responses feed back into your context automatically.",
    example: '.yo just had a coding session — here is what we talked about',
  },
  {
    id: 'cmd-dip',
    word: 'Dip',
    tagline: 'Move. Your context moves with you.',
    desc: 'Drop into a new panel and your context travels with you. .yo again and you are already in the conversation — no setup, no copy-paste, no session to manage. The app is the context.',
    example: '.dip slack',
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
