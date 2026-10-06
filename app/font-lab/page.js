import {
  Geist, Geist_Mono, Inter, JetBrains_Mono, Orbitron, IBM_Plex_Sans, IBM_Plex_Mono, Red_Hat_Display, Red_Hat_Text, Red_Hat_Mono,
  Space_Grotesk, Sora, Unbounded, Chakra_Petch, Instrument_Sans, Bricolage_Grotesque, Manrope, DM_Sans, DM_Mono, Schibsted_Grotesk,
} from 'next/font/google';
import './font-lab.css';
import { adaLive } from '../lib/ada-live';

// A scratch page (2026-10-02): candidate type systems for every stack (web,
// desktop, mobile, console). Each option is a display face, a text face and a
// mono face, shown on the same samples. Delete once one is chosen.

const geist = Geist({ subsets: ['latin'] });
const geistMono = Geist_Mono({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetbrains = JetBrains_Mono({ subsets: ['latin'] });
const orbitron = Orbitron({ subsets: ['latin'], weight: ['500'] });
const plex = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'] });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'] });
const rhDisplay = Red_Hat_Display({ subsets: ['latin'] });
const rhText = Red_Hat_Text({ subsets: ['latin'] });
const rhMono = Red_Hat_Mono({ subsets: ['latin'] });
const grotesk = Space_Grotesk({ subsets: ['latin'] });
const sora = Sora({ subsets: ['latin'] });
const unbounded = Unbounded({ subsets: ['latin'] });
const chakra = Chakra_Petch({ subsets: ['latin'], weight: ['500', '600'] });
const instrument = Instrument_Sans({ subsets: ['latin'] });
const bricolage = Bricolage_Grotesque({ subsets: ['latin'] });
const manrope = Manrope({ subsets: ['latin'] });
const dmSans = DM_Sans({ subsets: ['latin'] });
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'] });
const schibsted = Schibsted_Grotesk({ subsets: ['latin'] });

export const metadata = { title: 'Font lab', robots: { index: false } };

const f = (font) => font.style.fontFamily;

// key, name, display, text, mono, heading weight, heading tracking, the note
const OPTIONS = [
  ['A', 'Today: Orbitron + Geist + JetBrains Mono', orbitron, geist, jetbrains, 500, '0', 'What the site uses now.'],
  ['B', 'Geist + Geist Mono', geist, geist, geistMono, 700, '-0.035em', 'One family for everything. Already bundled in the desktop app and the console.'],
  ['C', 'Inter + JetBrains Mono', inter, inter, jetbrains, 700, '-0.035em', 'The most widely used UI face. The desktop app shipped Inter before Geist.'],
  ['D', 'IBM Plex Sans + IBM Plex Mono', plex, plex, plexMono, 600, '-0.02em', 'One superfamily with a matching mono. Engineered, a little formal.'],
  ['E', 'Red Hat Display + Text + Mono', rhDisplay, rhText, rhMono, 800, '-0.03em', 'One superfamily with a display, a text and a mono cut.'],
  ['F', 'Space Grotesk + Geist + JetBrains Mono', grotesk, geist, jetbrains, 700, '-0.04em', 'A technical display face over the current text.'],
  ['G', 'Sora + Geist + JetBrains Mono', sora, geist, jetbrains, 700, '-0.035em', 'Wide, geometric headings over the current text.'],
  ['H', 'Unbounded + Geist + Geist Mono', unbounded, geist, geistMono, 600, '-0.04em', 'The widest display here. Loud in headings, so it stays out of the UI.'],
  ['I', 'Chakra Petch + Geist + JetBrains Mono', chakra, geist, jetbrains, 600, '-0.01em', 'Squared, sci-fi headings. The nearest in spirit to Orbitron, easier to read.'],
  ['J', 'Instrument Sans + JetBrains Mono', instrument, instrument, jetbrains, 700, '-0.035em', 'A sharper, more editorial sans for both headings and text.'],
  ['K', 'Bricolage Grotesque + Inter + JetBrains Mono', bricolage, inter, jetbrains, 700, '-0.035em', 'Headings with character over a neutral text.'],
  ['L', 'Manrope + JetBrains Mono', manrope, manrope, jetbrains, 800, '-0.035em', 'Rounder and friendlier, one family for headings and text.'],
  ['M', 'DM Sans + DM Mono', dmSans, dmSans, dmMono, 700, '-0.035em', 'Low-contrast geometric sans with its own mono.'],
  ['N', 'Schibsted Grotesk + JetBrains Mono', schibsted, schibsted, jetbrains, 800, '-0.035em', 'A news grotesk: compact, confident headings.'],
  ['O', 'JetBrains Mono headings + Geist', jetbrains, geist, jetbrains, 700, '-0.04em', 'Mono as the display face: reads as a language, not a brand font.'],
];

// The sample copy: Ada's with Ada on (one switch: app/lib/ada-live.js), else
// the desktop and the Router. Whole columns, so each branch is the page as it was.
const ADA_ROWS = [
  ['deploy_service', 'canary', '0.98', 'act'],
  ['rotate_keys', 'staged', '0.74', 'act'],
  ['drop_table', 'refuse', '0.51', 'ask'],
];

const ROWS = [
  ['claude-fable-5-1', 'Anthropic', '$15.00', 'pro'],
  ['gpt-5', 'OpenAI', '$10.00', 'pro'],
  ['qwen3-coder', 'open weights', '$0.90', 'solo'],
];

const prose = (key) => adaLive() ? (
  <div className="fl-prose">
    <h2>Typed models your agents build, feed and query</h2>
    <p>
      Productivity doesn&rsquo;t come from prompting. It comes from building. An Ada model holds records:
      a situation, the outcome that was tried, and whether it worked. Ask it about a new situation and it
      answers with what worked before, how confident it is, and the 12 records it stands on.
    </p>
    <h3>When Ada says to act</h3>
    <p className="fl-small">
      A query returns <code>act</code>, true only when confidence is at least 0.7 and three or more records
      stand behind the answer. 1Il| 0O 5S 8B rn m.
    </p>
    <div className="fl-actions">
      <a className="btn btn-primary btn-lg group" href={`#${key}`}><span className="btn-fill" /><span className="btn-label">Download Glyphh</span></a>
      <a className="btn btn-secondary btn-lg group" href={`#${key}`}><span className="btn-fill" /><span className="btn-label">Read the docs</span></a>
    </div>
  </div>
) : (
  <div className="fl-prose">
    <h2>The operating system for frontier AI</h2>
    <p>
      Productivity doesn&rsquo;t come from prompting. It comes from building. Glyphh Desktop runs the
      agent, skills, tasks and your connections on your machine, with every frontier model and open
      weights beside the apps you already use. Save the setup under one name and switch in a keystroke.
    </p>
    <h3>When the Router picks the model</h3>
    <p className="fl-small">
      Point any client at one base URL. An auto-router picks the model per request, and every token is
      paid from one budget at a published rate. 1Il| 0O 5S 8B rn m.
    </p>
    <div className="fl-actions">
      <a className="btn btn-primary btn-lg group" href={`#${key}`}><span className="btn-fill" /><span className="btn-label">Download Glyphh</span></a>
      <a className="btn btn-secondary btn-lg group" href={`#${key}`}><span className="btn-fill" /><span className="btn-label">Read the docs</span></a>
    </div>
  </div>
);

const ui = () => adaLive() ? (
  <div className="fl-ui">
    <nav className="fl-nav">
      <span className="on">Models</span><span>Records</span><span>Space</span><span>Settings</span>
    </nav>
    <table className="fl-table">
      <thead><tr><th>Situation</th><th>Outcome</th><th>Confidence</th><th>Gate</th></tr></thead>
      <tbody>
        {ADA_ROWS.map(([s, o, c, g]) => (
          <tr key={s}><td><code>{s}</code></td><td>{o}</td><td className="fl-num">{c}</td><td><span className="fl-tag">{g}</span></td></tr>
        ))}
      </tbody>
    </table>
    <pre className="fl-code">{`claude plugin install ada@glyphh-ai
ada_query({ task: "deploy_service", env: "prod" })
// => { top: "canary", act: true, confidence: 0.98 }`}</pre>
    <p className="fl-label">EP. 03 &middot; CONNECTIONS &middot; 4 MIN</p>
  </div>
) : (
  <div className="fl-ui">
    <nav className="fl-nav">
      <span className="on">Models</span><span>Keys</span><span>Budgets</span><span>Settings</span>
    </nav>
    <table className="fl-table">
      <thead><tr><th>Model</th><th>Provider</th><th>Output / M</th><th>Plan</th></tr></thead>
      <tbody>
        {ROWS.map(([s, o, c, g]) => (
          <tr key={s}><td><code>{s}</code></td><td>{o}</td><td className="fl-num">{c}</td><td><span className="fl-tag">{g}</span></td></tr>
        ))}
      </tbody>
    </table>
    <pre className="fl-code">{`npm install -g @glyphh-ai/cli
glyphh login
// => signed in · acme · plan pro · router: auto`}</pre>
    <p className="fl-label">EP. 03 &middot; CONNECTIONS &middot; 4 MIN</p>
  </div>
);

function Sample({ option }) {
  const [key, name, display, text, mono, weight, tracking, note] = option;
  const vars = {
    '--font-display': f(display), '--font-sans': f(text), '--font-mono': f(mono),
    '--fl-weight': weight, '--fl-tracking': tracking,
  };
  return (
    <section id={key} className="fl-option" style={vars}>
      <header className="fl-head">
        <span className="fl-key">{key}</span>
        <span className="fl-name">{name}</span>
        <span className="fl-note">{note}</span>
      </header>
      <h1 className="fl-hero">AI at build time. <em>Not</em> runtime.</h1>
      <div className="fl-cols">
        {prose(key)}
        {ui()}
      </div>
    </section>
  );
}

export default function FontLab() {
  return (
    <main className="font-lab">
      <div className="fl-index">
        <span>Font lab</span>
        {OPTIONS.map(([key, name]) => <a key={key} href={`#${key}`} title={name}>{key}</a>)}
      </div>
      {OPTIONS.map((o) => <Sample key={o[0]} option={o} />)}
    </main>
  );
}
