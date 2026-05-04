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
    video: '/drip-yosup.mp4',
  },
  {
    id: 'cmd-council',
    word: 'Council',
    tagline: 'Multi-model debate.',
    desc: "Convene a council of LLMs to debate a topic. Name the models you want, then state the prompt. The .yo agent moderates rounds, and you get diverse perspectives from different providers.",
    example: '.council grok claude gemini what came first the chicken or egg',
    video: '/council-yousup.mp4',
  },
];

const composeExamples = [
  { tokens: [{ cmd: '.council', arg: 'grok claude gemini' }, { cmd: '', arg: 'what came first the chicken or egg' }], gloss: 'three models debate a question' },
  { tokens: [{ cmd: '.dip', arg: 'notion' }, { cmd: '.drip', arg: '5 hearts' }], gloss: 'switch to Notion, drop five hearts' },
  { tokens: [{ cmd: '.dip', arg: 'linear' }, { cmd: '.drip', arg: 'fireworks' }, { cmd: '.council', arg: 'claude gemini should we use Postgres' }], gloss: 'ship it, celebrate, get a second opinion' },
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
