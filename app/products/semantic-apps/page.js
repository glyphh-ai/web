import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';
import ExpandableShot from '../../components/ExpandableShot';
import FinalCTA from '../../components/FinalCTA';

// Semantic apps (his order, 2026-09-18): the task layer seeds, built-in
// skills build the graph and the RAG, the UI extends into the user's day,
// and the org governs what ships. Router page grammar, direct copy.

export const metadata = {
  title: 'Glyphh Semantic Apps — apps that know your context',
  description:
    'Every Glyphh app ships with SQLite, on-device vector search, and a knowledge graph. Tasks seed it. Built-in skills build the graph and the RAG. Share it through the org hub, reviewed and role-gated.',
};

const SEEDS = ['Gmail', 'Slack', 'Files', 'Calendar'];
const NATIVE = ['SQLite', 'vector search', 'knowledge graph', 'RAG'];

function SemanticStage() {
  return (
    <div className="apx-stage mcx-stage gwx-hero-stage" aria-hidden="true">
      <div className="apx-col">
        <div className="apx-col-label">seeded by tasks</div>
        {SEEDS.map((s) => <div key={s} className="apx-node">{s}</div>)}
      </div>
      <div className="mcx-flows">
        <div className="apx-flow"><i /><i /><i /></div>
        <div className="apx-flow mcx-flow-back"><i /><i /></div>
      </div>
      <div className="apx-hub mcx-hub">
        <div className="apx-glow" />
        <div className="apx-orbit" />
        <div className="mcx-orbit-b" />
        <img src="/glyphh-mascot-square-black.png" alt="" className="apx-mascot" width="88" height="88" />
        <span className="apx-hub-label">Semantic app</span>
      </div>
      <div className="mcx-flows">
        <div className="apx-flow"><i /><i /><i /></div>
        <div className="apx-flow mcx-flow-back"><i /><i /></div>
      </div>
      <div className="apx-col">
        <div className="apx-col-label">native on the desktop</div>
        {NATIVE.map((n) => <div key={n} className="apx-node">{n}</div>)}
      </div>
    </div>
  );
}

const PILLARS = [
  { tag: 'SEED', title: 'The task layer fills it', desc: 'A task pulls from Gmail, Slack, files, or any connected service on a schedule and writes the result into the app\'s store. Deterministic. Journaled. The same data every morning.' },
  { tag: 'BUILD', title: 'Built-in skills build the graph', desc: 'Skills that ship with the desktop turn the store into a knowledge graph and a retrieval index. RAG over your own data with no model call to get there and no vendor in the middle.' },
  { tag: 'GOVERN', title: 'The org decides what ships', desc: 'An app is published through the org hub. An admin reviews it. A role gates who can install it. Every install and every run is visible in the console.' },
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
    name: 'Seed',
    title: 'Seeded by the task layer.',
    desc: 'The data in a semantic app does not come from a chat. It comes from tasks: programs the desktop runs on a clock, with a checkpoint journal, against the services you connected. The store is full before anyone opens the app.',
    mock: (
      <Studio back="Tasks" name="inbox-to-store" right="every 15 min">
        <div className="gwm-sec">RUN · 09:15</div>
        <Row left="1  gmail.threads.list" right="41 new ✓" />
        <Row left="2  extract people, orgs, dates" right="118 facts ✓" />
        <Row left="3  write sqlite" right="checkpoint ✓" />
        <Row left="4  embed" right="on device ✓" />
      </Studio>
    ),
  },
  {
    name: 'Build',
    title: 'Skills that build the graph.',
    desc: 'The desktop ships the skills that turn rows into a knowledge graph and a vector index: entities, relationships, time. Ask the app a question and it retrieves from your data first, then reasons. Bring your own skill to shape the graph your way.',
    mock: (
      <Studio back="Skills" name="build-graph" right="house">
        <div className="gwm-sec">GRAPH</div>
        <Row left="people" right="1,204 nodes" />
        <Row left="orgs" right="312 nodes" />
        <Row left="mentions · meetings · owes" right="9,870 edges" />
        <div className="gwm-sec">INDEX</div>
        <Row left="vectors" right="24,116 · local" />
        <Row left="query" right="who is waiting on me this week" />
      </Studio>
    ),
  },
  {
    name: 'Use',
    title: 'UI that extends into your day.',
    desc: 'A semantic app is a panel beside the agent, not a tab you visit. It opens next to Gmail, next to the code, next to the chat. The agent reads the app\'s memory into every turn, so a prompt in Glyphh starts with your context instead of a blank page.',
    mock: (
      <Studio back="Desktop" name="Monday" right="3 panels">
        <div className="gwm-sec">LAYOUT</div>
        <Row left="agent" right="Sales desk" />
        <Row left="panel" right="Pipeline (semantic app)" />
        <Row left="panel" right="Gmail" />
        <div className="gwm-sec">THIS TURN</div>
        <Row left="context" right="9 stalls · 4 threads · 2 meetings" />
      </Studio>
    ),
  },
  {
    name: 'Govern',
    title: 'Governed and audited at the org level.',
    desc: 'Building an app is a member\'s job. Shipping it is the org\'s. A submission lands in the hub, an admin approves the version, a role decides who installs it. What runs on every desktop is the version the org signed off on, and the console shows who is running it.',
    mock: (
      <Studio back="AI Hub" name="Pipeline" right="v4 · pending">
        <div className="gwm-sec">SUBMISSION</div>
        <Row left="by" right="j.ortiz · member" />
        <Row left="changes" right="adds stall scoring" />
        <div className="gwm-sec">POLICY</div>
        <Row left="role" right="Sales · Leadership" />
        <Row left="review" right="admin approval required" />
        <Row left="installs" right="14 desktops on v3" />
      </Studio>
    ),
  },
];

export default function SemanticAppsPage() {
  return (
    <div className="office-page design-page">
      <Reveal />
      <Nav />
      <header className="page-hero page-hero-tight op-hero">
        <div className="container op-hero-inner">
          <div className="op-hero-copy">
            <div className="hero-badge">
              <span className="badge-dot" aria-hidden="true"></span>
              GLYPHH SEMANTIC APPS
            </div>
            <h1 className="page-hero-title">
              Apps that know your context<span className="dot">.</span>
            </h1>
            <p className="page-hero-sub">
              Every Glyphh app ships with SQLite, on-device vector search, and a knowledge
              graph. Tasks seed it. Built-in skills build the graph and the RAG. Share it
              through the org hub, reviewed and role-gated.
            </p>
            <div className="hero-ctas">
              <a href="/#download" className="btn btn-primary btn-lg group">
                <span className="btn-label">Get Glyphh Desktop — Free</span>
                <span className="btn-fill"></span>
              </a>
            </div>
          </div>
          <div className="od-hero-mock reveal"><SemanticStage /></div>
        </div>
      </header>

      <section className="od-extract">
        <div className="container">
          <div className="section-label reveal">{'{'}<span className="accent">SEED · BUILD · GOVERN</span>{'}'}</div>
          <h2 className="section-title reveal">Your data, on your machine, in the agent&rsquo;s context.</h2>
          <div className="od-extract-grid">
            {PILLARS.map((p) => <Card key={p.tag} {...p} />)}
          </div>
        </div>
      </section>

      <section className="od-extract">
        <div className="container">
          <div className="shots-grid">
            <div className="reveal"><ExpandableShot src="/screen-shots/v2/settings-artifacts.jpg" alt="Artifacts in Glyphh: files the agent made, with previews" crop={{ pos: '50% 48%', zoom: 1.9 }} /></div>
            <div className="reveal"><ExpandableShot src="/screen-shots/v2/settings-tabs.jpg" alt="Tabs in Glyphh: web apps and Glyphh apps kept as panels" crop={{ pos: '50% 48%', zoom: 1.9 }} /></div>
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
          <h2 className="section-title reveal">Not a chatbot with a database. A database with an agent.</h2>
          <p className="section-subtitle reveal">
            The model changes. The loop changes. The store, the graph, and the index stay on
            your machine and keep getting better every time a task runs. That is what makes
            an app semantic: it remembers what you were doing without asking a vendor.
          </p>
        </div>
      </section>

      <FinalCTA
        title={<h2>Seed it<span className="dot">.</span> Build it<span className="dot">.</span> Ship it to the org<span className="dot">.</span></h2>}
        text={<p>Download <span className="compose-cmd">Glyphh</span> free and build your first semantic app with the Glyphh skill.</p>}
        primary={{ href: '/#download', label: 'Get Glyphh Desktop — Free' }}
        secondary={{ href: '/products/skills', label: 'See Glyphh Skills' }}
      />
      <Footer />
    </div>
  );
}
