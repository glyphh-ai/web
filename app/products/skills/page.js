import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';
import ExpandableShot from '../../components/ExpandableShot';
import FinalCTA from '../../components/FinalCTA';

// Glyphh Skills (his order, 2026-09-18): the skills framework on its own
// page, in the router page's grammar. Skills for apps, tasks, and agents,
// universal across vendors. Never migrate a skill.

export const metadata = {
  title: 'Glyphh Skills — write it once, run it in every loop',
  description:
    'A skill is a folder with a SKILL.md at its root, the standard Claude Code, Codex, and Gemini already read. Write it once. It powers apps, tasks, and agents, and never needs migrating.',
};

const LOOPS = ['Claude Code', 'Codex', 'Gemini', 'Glyphh loop'];

function SkillsStage() {
  return (
    <div className="apx-stage mcx-stage gwx-hero-stage" aria-hidden="true">
      <div className="apx-col">
        <div className="apx-col-label">written once</div>
        <div className="apx-node">SKILL.md</div>
        <div className="apx-node">scripts/</div>
        <div className="apx-node">references/</div>
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
        <span className="apx-hub-label">Glyphh Skills</span>
      </div>
      <div className="mcx-flows">
        <div className="apx-flow"><i /><i /><i /></div>
        <div className="apx-flow mcx-flow-back"><i /><i /></div>
      </div>
      <div className="apx-col">
        <div className="apx-col-label">runs in every loop</div>
        {LOOPS.map((l) => <div key={l} className="apx-node">{l}</div>)}
      </div>
    </div>
  );
}

const BETS = [
  { tag: 'UNIVERSAL', title: 'Never migrate a skill', desc: 'SKILL.md is the standard every CLI reads. Swap the model, swap the loop, change vendors. The skill does not change. Glyphh reads yours and ships its own.' },
  { tag: 'SHARED', title: 'Publish to your org', desc: 'A member submits a skill to the org hub. An admin reviews it. A role gates who sees it. The same skill lands on every desktop in the org, at the version the admin approved.' },
  { tag: 'LAYERED', title: 'Apps, tasks, agents', desc: 'Skills teach. Apps extend the tool surface. Tasks run skills deterministically on a clock. Agents carry skills, tools, and memory into every turn. One folder at the root of all of it.' },
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
    name: 'Skills',
    title: 'A folder, not a format.',
    desc: 'A skill is a directory with a SKILL.md at its root, plus whatever scripts and references it needs. That is the whole spec, and it is the one Claude Code, Codex, and Gemini already read. Nothing to convert, nothing to re-author when you change vendors.',
    mock: (
      <Studio back="Skills" name="weekly-pipeline-review" right="v3 · approved">
        <div className="gwm-sec">SKILL.md</div>
        <Row left="name" right="weekly-pipeline-review" />
        <Row left="description" right="Pull open deals, flag stalls, draft the Monday note" />
        <div className="gwm-sec">FILES</div>
        <Row left="scripts/stalls.py" right="2.1 KB" />
        <Row left="references/stages.md" right="0.8 KB" />
        <div className="gwm-sec">RUNS IN</div>
        <Row left="Claude Code · Codex · Gemini · Glyphh loop" right="unchanged" />
      </Studio>
    ),
  },
  {
    name: 'Apps',
    title: 'Apps extend the tool surface.',
    desc: 'A Glyphh app registers its tools on the desktop\'s MCP server. Every loop sees them the same way it sees Gmail or Slack: a name and a schema. The app ships with a SKILL.md that tells the loop when to reach for it, so installing an app teaches the agent at the same time.',
    mock: (
      <Studio back="Apps" name="pipeline" right="installed">
        <div className="gwm-sec">TOOLS ON THE DESKTOP MCP</div>
        <Row left="pipeline.deals.list" right="stage, owner, age" />
        <Row left="pipeline.deal.stall" right="days since last touch" />
        <Row left="pipeline.note.draft" right="markdown" />
        <div className="gwm-sec">TEACHES</div>
        <Row left="SKILL.md" right="when to use these tools" />
      </Studio>
    ),
  },
  {
    name: 'Tasks',
    title: 'Tasks make the data deterministic.',
    desc: 'A task is a skill on a clock: a task.json and a run.js the desktop executes on a schedule, with a checkpoint journal. The same steps, the same inputs, the same output every morning. The model does not decide whether the work happens. The schedule does.',
    mock: (
      <Studio back="Tasks" name="pipeline-sync" right="every day · 07:00">
        <div className="gwm-sec">RUN · today 07:00</div>
        <Row left="1  fetch deals" right="212 rows ✓" />
        <Row left="2  score stalls" right="9 flagged ✓" />
        <Row left="3  write store" right="checkpoint ✓" />
        <Row left="4  draft note" right="skill: weekly-pipeline-review ✓" />
        <div className="gwm-sec">JOURNAL</div>
        <Row left="last 30 runs" right="30 / 30 complete" />
      </Studio>
    ),
  },
  {
    name: 'Agents',
    title: 'Agents carry it into every turn.',
    desc: 'An agent is a loop with skills, tools, and memory attached. The semantic features are native to the desktop, so what a task wrote and what an app stored are in the agent\'s context before you type. Swap the model underneath and the agent is the same agent.',
    mock: (
      <Studio back="Agents" name="Sales desk" right="Glyphh loop">
        <div className="gwm-sec">SKILLS</div>
        <Row left="weekly-pipeline-review" right="v3" />
        <Row left="glyphh" right="house" />
        <div className="gwm-sec">TOOLS</div>
        <Row left="pipeline.* · gmail.* · slack.*" right="12 tools" />
        <div className="gwm-sec">MEMORY</div>
        <Row left="facts · graph · vector" right="on device" />
      </Studio>
    ),
  },
];

export default function SkillsPage() {
  return (
    <div className="office-page design-page">
      <Reveal />
      <Nav />
      <header className="page-hero page-hero-tight op-hero">
        <div className="container op-hero-inner">
          <div className="op-hero-copy">
            <div className="hero-badge">
              <span className="badge-dot" aria-hidden="true"></span>
              GLYPHH SKILLS
            </div>
            <h1 className="page-hero-title">
              One skill<span className="dot">.</span>{' '}
              <span className="hero-accent">Every vendor</span><span className="dot">.</span>
            </h1>
            <p className="page-hero-sub">
              A skill is a folder with a SKILL.md at its root, the standard Claude Code,
              Codex, and Gemini already read. Write it once. It powers apps, tasks, and
              agents, runs in every loop, and never needs migrating.
            </p>
            <div className="hero-ctas">
              <a href="/#download" className="btn btn-primary btn-lg group">
                <span className="btn-label">Get Glyphh Desktop</span>
                <span className="btn-fill"></span>
              </a>
            </div>
          </div>
          <div className="od-hero-mock reveal"><SkillsStage /></div>
        </div>
      </header>

      <section className="od-extract">
        <div className="container">
          <div className="section-label reveal">{'{'}<span className="accent">WHAT WE DOUBLED DOWN ON</span>{'}'}</div>
          <h2 className="section-title reveal">Skills are the unit. Everything else is built from them.</h2>
          <div className="od-extract-grid">
            {BETS.map((b) => <Card key={b.tag} {...b} />)}
          </div>
        </div>
      </section>

      <section className="od-extract">
        <div className="container">
          <div className="shots-grid">
            <div className="reveal"><ExpandableShot src="/screen-shots/v2/settings-skill-1.jpg" alt="Discover in Glyphh: the featured pick, For you, and categories" crop={{ pos: '50% 48%', zoom: 1.9 }} /></div>
            <div className="reveal"><ExpandableShot src="/screen-shots/v2/settings-skills-2.jpg" alt="A skill of type app: its tools, read-only and write, each with a permission" crop={{ pos: '50% 48%', zoom: 1.9 }} /></div>
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
          <h2 className="section-title reveal">The vendor is a plug. The skill is yours.</h2>
          <p className="section-subtitle reveal">
            Every vendor wants your skills inside its client, in its format, on its account.
            Glyphh keeps them in a folder on your machine, published through your org, read by
            whichever loop you run today. Change the model, change the loop, keep the work.
          </p>
        </div>
      </section>

      <FinalCTA
        title={<h2>Write it once<span className="dot">.</span> Run it everywhere<span className="dot">.</span></h2>}
        text={<p>Download <span className="compose-cmd">Glyphh</span> free and drop your first SKILL.md into the library.</p>}
        primary={{ href: '/#download', label: 'Get Glyphh Desktop' }}
        secondary={{ href: '/products/semantic-apps', label: 'See Semantic Apps' }}
      />
      <Footer />
    </div>
  );
}
