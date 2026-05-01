import { styledText } from './cmd-style';

const commands = [
  {
    id: 'cmd-yo',
    word: 'Yo',
    tagline: "You're always in the conversation.",
    desc: "When you drop .yo, you're speaking into the system. Context from every panel you have open is already being collected in the background — it's there when you need it. You never have to think about session.",
    example: '.yo what do you think of the code changes we just made?',
    video: '/yo-yousup.mp4',
  },
  {
    id: 'cmd-sup',
    word: 'Sup',
    tagline: 'The panel says hey back.',
    desc: "When an AI or app responds, that's the .sup — the panel checking in. Claude, Gemini, Slack, your code editor — each one a voice in the conversation. Their responses feed back into your context automatically.",
    example: '.yo just had a coding session — here is what we talked about',
    video: '/sup-yousup.mp4',
  },
  {
    id: 'cmd-dip',
    word: 'Dip',
    tagline: 'Move. Your context moves with you.',
    desc: 'Drop into a new panel and your context travels with you. .yo again and you are already in the conversation — no setup, no copy-paste, no session to manage. The app is the context.',
    example: '.dip slack',
    video: '/dip-yousup.mp4',
  },
  {
    id: 'cmd-drip',
    word: 'Drip',
    tagline: 'Vibe ships with the work.',
    desc: 'Particle effects on screen — fireworks, hearts, sparkles, whatever fits the moment. Stack a count, mix effects, save your own recipes. The win deserves a flourish; .drip puts it in the same surface as the work, not next to it.',
    example: '.drip 3 fireworks, hearts, cat',
    video: null,
  },
  {
    id: 'cmd-peace',
    word: 'Peace',
    tagline: 'Sign off. Throw a gesture.',
    desc: "A particle peace-sign — for closing a session, finishing a deploy, marking the win. Same engine as .drip, but it lands as a gesture, not a recipe. Drop it solo or chain it: .dip slack .peace and you're out.",
    example: '.peace',
    video: null,
  },
];

const composeExamples = [
  { tokens: [{ cmd: '.dip', arg: 'slack' }, { cmd: '.peace', arg: '3' }], gloss: 'switch to Slack, throw three peace signs' },
  { tokens: [{ cmd: '.dip', arg: 'notion' }, { cmd: '.drip', arg: '5 hearts' }], gloss: 'switch to Notion, drop five hearts' },
  { tokens: [{ cmd: '.dip', arg: 'linear' }, { cmd: '.drip', arg: 'fireworks' }, { cmd: '.peace', arg: '' }], gloss: 'ship it, celebrate, sign off' },
  { tokens: [{ cmd: '.code', arg: 'ui, server, web' }], gloss: 'pick a directory, scaffold three agents' },
];

const devSpaceExamples = [
  { line: '.code new', gloss: 'pick a project directory — workspace created instantly' },
  { line: '.code ui, server, web', gloss: 'scaffold three named code-terminals running Claude Code' },
  { line: '.dip code ui frontend', gloss: 'open (or create) a single agent terminal' },
  { line: '.code list', gloss: 'see all workspaces and saved dev-space layouts' },
];

function renderExample(text) {
  const tokens = [];
  const re = /(\.\w+)(.*?)(?=\s\.\w|$)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    tokens.push({ cmd: m[1], arg: m[2].trim() });
  }
  if (tokens.length === 0) return text;
  return tokens.map((t, i) => (
    <span key={i} className="compose-token">
      <span className="compose-cmd">{t.cmd}</span>
      {t.arg && <span className="compose-arg"> {t.arg}</span>}
      {i < tokens.length - 1 && ' '}
    </span>
  ));
}

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
            {cmd.video && (
              <div className="command-video reveal">
                <video
                  className="command-video-player"
                  src={cmd.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            )}
            {(cmd.desc || cmd.example) && (
              <div className="command-detail reveal">
                {cmd.desc && <p className="command-desc">{styledText(cmd.desc)}</p>}
                {cmd.example && (
                  <div className="command-example">
                    <span className="example-prompt">$</span>{renderExample(cmd.example)}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="command-section" id="cmd-code">
        <div className="container">
          <h2 className="command-hero-title reveal">
            <span className="dot dot-hidden" data-dot-anchor id="cmd-yocode">.</span>Code
          </h2>
          <p className="command-hero-tagline reveal">Three agents, one prompt.</p>
          <div className="command-detail reveal">
            <p className="command-desc">
              Pick a directory, scaffold a dev space — named code-terminals
              running Claude Code, each with a role. They share an event log and per-agent
              inboxes, so they can coordinate without you brokering every message. Drop into
              any of them with <span className="compose-cmd">.dip</span>{' '}code &lt;name&gt;, or recall the whole layout
              with <span className="compose-cmd">.dip</span>{' '}code-&lt;workspace&gt;.
            </p>
            <div className="command-compose-list">
              {devSpaceExamples.map((ex, i) => (
                <div key={i} className="command-compose-row">
                  <div className="command-example">
                    <span className="example-prompt">$</span>{renderExample(ex.line)}
                  </div>
                  <p className="compose-gloss">{ex.gloss}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="command-section command-compose" id="cmd-compose">
        <div className="container">
          <h2 className="command-hero-title reveal">
            <span className="dot">.</span>yo<span className="dot">.</span>sup<span className="dot">.</span>dip
          </h2>
          <p className="command-hero-tagline reveal">Commands chain like sentences.</p>
          <div className="command-detail reveal">
            <p className="command-desc">
              Every command is a word in a slang grammar. Stack them and they read like talk —
              no flags, no menus, no hidden state. The grammar <em>is</em> the API,
              and the API is the way you already speak.
            </p>
            <div className="command-compose-list">
              {composeExamples.map((ex, i) => (
                <div key={i} className="command-compose-row">
                  <div className="command-example">
                    <span className="example-prompt">$</span>
                    {ex.tokens.map((t, j) => (
                      <span key={j} className="compose-token">
                        <span className="compose-cmd">{t.cmd}</span>
                        {t.arg && <span className="compose-arg"> {t.arg}</span>}
                        {j < ex.tokens.length - 1 && ' '}
                      </span>
                    ))}
                  </div>
                  <p className="compose-gloss">{ex.gloss}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
