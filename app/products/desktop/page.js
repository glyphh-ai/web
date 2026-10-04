import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';
import OsHero from '../../components/OsHero';
import OsPitch from '../../components/OsPitch';
import Planes from '../../components/Planes';
import HowItWorks from '../../components/HowItWorks';
import QuickStart from '../../components/QuickStart';
import WorksWith from '../../components/WorksWith';
import ExpandableShot from '../../components/ExpandableShot';
import FinalCTA from '../../components/FinalCTA';

// Glyphh Desktop (his order, 2026-09-21): Workspace renamed to Desktop, and
// the home page's hero until today, "The open desktop client for frontier
// AI" with the Chat / Work / Code stage, now fronts it. Below the hero the
// page keeps the workspace story (2026-09-19): a workspace is the
// intersection of loops, models, apps and the MCP tools exposed, and
// switching between them is the daily way of working with AI.

export const metadata = {
  // The home page is this page (his order, 2026-10-04): one canonical, the root.
  alternates: { canonical: '/' },
  title: 'Glyphh Desktop — the open desktop client for frontier AI',
  description:
    'Glyphh is the vendor-neutral desktop for Claude, ChatGPT, Gemini, and open-source models. Chat, work, and code run on your machine, beside the apps you already use. Save a loop, its models, its apps and its tools under one name and switch in a keystroke.',
};

const PILLARS = [
  { tag: 'INTERSECTION', title: 'One name for the whole setup', desc: 'A workspace holds a loop, the model for each of its slots, the panels around it, the tools those panels expose, and the working folder. Open the name and all of it is there.' },
  { tag: 'SWITCH', title: 'Context switch in one keystroke', desc: 'Sales desk in the morning, the repo after lunch, the deck before the call. Type the name in any composer, pick it from the wall, or hit the command center. The last session in each comes back with it.' },
  { tag: 'ONE MESSAGE', title: 'Every superpower, one message', desc: 'The loop sees the models, the apps, and the tools the workspace binds. One prompt can read the mail, query the app, write the file, and file the result, because they are all in the room.' },
];

function Card({ tag, title, desc }) {
  return (
    <div className="od-extract-card reveal">
      <span className="od-extract-tag">{tag}</span>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function Studio({ back, name, right, children }) {
  return (
    <div className="od-studio gwm" aria-hidden="true">
      <div className="od-studio-bar">
        <span className="od-studio-back">‹ {back}</span>
        <span className="od-studio-name">{name}</span>
        <span className="od-studio-saved">{right}</span>
      </div>
      <div className="gwm-body">{children}</div>
    </div>
  );
}

const Row = ({ left, right }) => (
  <div className="gwm-row"><span className="gwm-mono">{left}</span><span className="gwm-mono">{right}</span></div>
);

const LAYERS = [
  {
    name: 'The grid',
    title: 'Panels, in the arrangement you left them.',
    desc: 'A workspace is a grid: the agent, dev tools, work panels, and web apps, each in its cell. A Browser cell opens at the URL you set. A Terminal cell runs its first command. Resize or rearrange while it is open and it remembers, documents included.',
    mock: (
      <Studio back="Workspaces" name="Sales desk" right="3 × 2 · saved">
        <div className="gwm-sec">CELLS</div>
        <Row left="agent" right="Glyphh · Claude Code" />
        <Row left="panel" right="Pipeline (semantic app)" />
        <Row left="panel" right="Gmail" />
        <Row left="panel" right="Browser → hubspot.com" />
        <Row left="panel" right="Terminal → npm run dev" />
      </Studio>
    ),
  },
  {
    name: 'The loop and its models',
    title: 'The loop, and a model for each slot.',
    desc: 'The workspace names the loop it runs and binds a model to each of the loop\'s slots. Opening the deck workspace can mean plan with Fable and draft with a local model. Opening the repo can mean Codex on the org\'s roster. Change the workspace, change the whole stack.',
    mock: (
      <Studio back="Sales desk" name="Loop" right="bound">
        <div className="gwm-sec">LOOP</div>
        <Row left="Claude Code" right="via the Router" />
        <div className="gwm-sec">MODELS</div>
        <Row left="planner" right="claude-fable-5-1" />
        <Row left="worker" right="claude-haiku-4-5" />
        <div className="gwm-sec">SPACE</div>
        <Row left="co-work" right="ask mode" />
      </Studio>
    ),
  },
  {
    name: 'The tools in the room',
    title: 'What the loop can reach, decided by what is open.',
    desc: 'Every app in the workspace exposes its tools on the desktop\'s MCP server, and every connection you attached is a tool too. The loop discovers them and calls them headless. Nothing outside the workspace is in reach, which is the point.',
    mock: (
      <Studio back="Sales desk" name="Tools" right="14 tools">
        <div className="gwm-sec">FROM APPS</div>
        <Row left="pipeline.deals.list · pipeline.note.draft" right="app" />
        <Row left="images.save_image · drive.list_drive" right="app" />
        <div className="gwm-sec">FROM CONNECTIONS</div>
        <Row left="gmail.* · hubspot.*" right="org-shared" />
        <Row left="slack.*" right="personal" />
      </Studio>
    ),
  },
  {
    name: 'The switch',
    title: 'Navigate by name. Come back where you were.',
    desc: 'A workspace remembers the session it rode in each space, so opening it from Work never steals its Code session. The wall shows every workspace as a tile. The dot command opens one from any input. The command center is one keystroke from anywhere on the machine.',
    mock: (
      <Studio back="Desktop" name="Switch" right="⌘⇧Space">
        <div className="gwm-sec">WAYS IN</div>
        <Row left=".dip sales" right="from any composer or tab" />
        <Row left="wall tile" right="Sales desk" />
        <Row left="command center" right="type the name" />
        <div className="gwm-sec">COMES BACK WITH</div>
        <Row left="last session" right="per space" />
        <Row left="open documents" right="deck, image, folder" />
      </Studio>
    ),
  },
];

export default function DesktopPage() {
  return (
    <div className="office-page design-page home-page">
      <Reveal />
      <Nav />
      {/* The desktop hero: the home page's hero until 2026-09-21, stage and all. */}
      {/* The home page until 2026-10-01 (his order: "most of that page should
          become the glyphh desktop page"): the OS hero with the screenshots,
          then the frame: the pitch, the planes, how it works, quick start,
          works with. The workspace story follows. */}
      <OsHero />
      <div className="site-frame">
        <OsPitch />
        <Planes />
        <HowItWorks />
        <QuickStart />
        <WorksWith />
      </div>

      {/* The workspace story (2026-09-19: the pillars, the screenshots, the
          layers, the closing CTA) is off the page (his order, 2026-10-01). Hidden,
          not deleted. */}
      {false && (
        <>

      <section className="od-extract">
        <div className="container">
          <div className="section-label reveal">{'{'}<span className="accent">THE NEW WAY OF WORKING</span>{'}'}</div>
          <h2 className="section-title reveal">Loops, models, apps, tools. One name. One keystroke.</h2>
          <div className="od-extract-grid">
            {PILLARS.map((p) => <Card key={p.tag} {...p} />)}
          </div>
        </div>
      </section>

      <section className="od-extract">
        <div className="container">
          <div className="shots-grid">
            <div className="reveal"><ExpandableShot src="/screen-shots/v2/settings-workspaces-1.jpg" alt="Workspaces in Glyphh Desktop: three saved grids" crop={{ pos: '50% 48%', zoom: 1.9 }} /></div>
            <div className="reveal"><ExpandableShot src="/screen-shots/v2/settings-workspaces-2.jpg" alt="The workspace editor: the grid, the loop and models, the app setup per cell" crop={{ pos: '50% 48%', zoom: 1.9 }} /></div>
          </div>
        </div>
      </section>

      <section className="op-products">
        <div className="container">
          {LAYERS.map((c, i) => (
            <div className={`op-prod reveal ${i % 2 ? 'op-prod-flip' : ''}`} key={c.name}>
              <div className="op-prod-copy">
                <div className="op-prod-mark">{c.name}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
              <div className="op-prod-mock">{c.mock}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="od-extract">
        <div className="container">
          <h2 className="section-title reveal">Three apps open and a browser of chat tabs is not a workflow.</h2>
          <p className="section-subtitle reveal">
            It is the vendor&rsquo;s workflow. A workspace is yours: the loop you chose, the models you
            pay for, the apps you already live in, and the tools that make them one system. Name it,
            switch to it, and get back to work.
          </p>
        </div>
      </section>

      <FinalCTA
        title={<h2>Name it<span className="dot">.</span> Switch to it<span className="dot">.</span> Get to work<span className="dot">.</span></h2>}
        text={<p>Download <span className="compose-cmd">Glyphh Desktop</span> free and save your first workspace.</p>}
        primary={{ href: '/#download', label: 'Get Glyphh Desktop' }}
        secondary={{ href: '/products/router', label: 'See Glyphh Router' }}
      />
        </>
      )}
      <Footer />
    </div>
  );
}
