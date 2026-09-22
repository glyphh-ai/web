/**
 * The product pages' mockups, as one shared module so the docs pages can show
 * them too (his order, 2026-09-22): the three marketecture stages (Router,
 * Connect, Semantic Apps) and the "studio" panels — a titled window with mono
 * rows — for tasks, the graph, the desktop, the hub, workspaces, loops, tools.
 * Markup and copy are the product pages', verbatim; the classes are styled in
 * globals.css.
 */

const fav = (d, size = 16) => `https://www.google.com/s2/favicons?domain=${d}&sz=64`;

// ── stages ─────────────────────────────────────────────────────────────────

const CONNECTIONS = [
  'slack.com', 'mail.google.com', 'salesforce.com', 'github.com', 'notion.so',
  'figma.com', 'linear.app', 'stripe.com', 'vercel.com', 'discord.com',
  'zoom.us', 'asana.com', 'airtable.com', 'dropbox.com', 'shopify.com',
];
const VENDORS = ['anthropic.com', 'openai.com', 'gemini.google.com', 'mistral.ai', 'x.ai', 'deepseek.com', 'groq.com', 'ollama.com'];
const LOOPS = ['Claude Code', 'Codex', 'Gemini', 'Glyphh loop'];
const SERVICES = [...CONNECTIONS, 'hubspot.com', 'atlassian.net', 'docs.google.com', 'calendly.com', 'intercom.com'];
const SEEDS = ['Gmail', 'Slack', 'Files', 'Calendar'];
const NATIVE = ['SQLite', 'vector search', 'knowledge graph', 'RAG'];

function Flows() {
  return (
    <div className="mcx-flows">
      <div className="apx-flow"><i /><i /><i /></div>
      <div className="apx-flow mcx-flow-back"><i /><i /></div>
    </div>
  );
}

function Hub({ label, apps, appsLabel, mascot = 64 }) {
  return (
    <div className="apx-hub mcx-hub">
      {apps ? (
        <div className="mcx-apps">
          <span className="mcx-apps-label">{appsLabel}</span>
          <div className="mcx-apps-track">
            {[...apps, ...apps].map((d, i) => (
              <span key={d + i} className="mcx-app"><img src={fav(d)} alt="" width="16" height="16" loading="lazy" /></span>
            ))}
          </div>
        </div>
      ) : null}
      {apps ? (
        <div className="mcx-vflows">
          <div className="mcx-vflow"><i /><i /></div>
          <div className="mcx-vflow mcx-vflow-up"><i /><i /></div>
        </div>
      ) : null}
      <div className="apx-glow" />
      <div className="apx-orbit" />
      <div className="mcx-orbit-b" />
      <img src="/glyphh-mascot-square-black.png" alt="" className="apx-mascot" width={mascot} height={mascot} />
      <span className="apx-hub-label">{label}</span>
    </div>
  );
}

export function GatewayStage() {
  return (
    <div className="apx-stage mcx-stage gwx-hero-stage" aria-hidden="true">
      <div className="apx-col">
        <div className="apx-col-label">everything you run</div>
        <div className="apx-node">Glyphh Desktop</div>
        <div className="apx-node">Agents</div>
        <div className="apx-node">Machines</div>
      </div>
      <Flows />
      <Hub label="Glyphh" apps={CONNECTIONS} appsLabel="Glyphh Connect" />
      <Flows />
      <div className="apx-col">
        <div className="apx-col-label">every provider</div>
        <div className="mcx-llms">
          {VENDORS.map((domain, i) => (
            <span key={domain} className="mcx-llm" style={{ '--d': `${i * 0.45}s` }}>
              <img src={fav(domain)} alt="" width="20" height="20" loading="lazy" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ConnectStage() {
  return (
    <div className="apx-stage mcx-stage gwx-hero-stage" aria-hidden="true">
      <div className="apx-col">
        <div className="apx-col-label">the loops</div>
        {LOOPS.map((l) => <div key={l} className="apx-node">{l}</div>)}
      </div>
      <Flows />
      <Hub label="Glyphh Connect" apps={SERVICES} appsLabel="3,500+ services" mascot={88} />
      <Flows />
      <div className="apx-col">
        <div className="apx-col-label">as tools</div>
        <div className="apx-node">org-shared auth</div>
        <div className="apx-node">personal auth</div>
        <div className="apx-node">RPA beyond APIs</div>
      </div>
    </div>
  );
}

export function SemanticStage() {
  return (
    <div className="apx-stage mcx-stage gwx-hero-stage" aria-hidden="true">
      <div className="apx-col">
        <div className="apx-col-label">seeded by tasks</div>
        {SEEDS.map((s) => <div key={s} className="apx-node">{s}</div>)}
      </div>
      <Flows />
      <Hub label="Semantic app" mascot={88} />
      <Flows />
      <div className="apx-col">
        <div className="apx-col-label">native on the desktop</div>
        {NATIVE.map((n) => <div key={n} className="apx-node">{n}</div>)}
      </div>
    </div>
  );
}

// ── studios ────────────────────────────────────────────────────────────────

export function Studio({ back, name, right, children }) {
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

export const Row = ({ left, right }) => (
  <div className="gwm-row"><span className="gwm-mono">{left}</span><span className="gwm-mono">{right}</span></div>
);

export const TaskRunMock = () => (
  <Studio back="Tasks" name="inbox-to-store" right="every 15 min">
    <div className="gwm-sec">RUN · 09:15</div>
    <Row left="1  gmail.threads.list" right="41 new ✓" />
    <Row left="2  extract people, orgs, dates" right="118 facts ✓" />
    <Row left="3  write sqlite" right="checkpoint ✓" />
    <Row left="4  embed" right="on device ✓" />
  </Studio>
);

export const GraphMock = () => (
  <Studio back="Skills" name="build-graph" right="house">
    <div className="gwm-sec">GRAPH</div>
    <Row left="people" right="1,204 nodes" />
    <Row left="orgs" right="312 nodes" />
    <Row left="mentions · meetings · owes" right="9,870 edges" />
    <div className="gwm-sec">INDEX</div>
    <Row left="vectors" right="24,116 · local" />
    <Row left="query" right="who is waiting on me this week" />
  </Studio>
);

export const DeskMock = () => (
  <Studio back="Desktop" name="Monday" right="3 panels">
    <div className="gwm-sec">LAYOUT</div>
    <Row left="agent" right="Sales desk" />
    <Row left="panel" right="Pipeline (semantic app)" />
    <Row left="panel" right="Gmail" />
    <div className="gwm-sec">THIS TURN</div>
    <Row left="context" right="9 stalls · 4 threads · 2 meetings" />
  </Studio>
);

export const HubReviewMock = () => (
  <Studio back="AI Hub" name="Pipeline" right="v4 · pending">
    <div className="gwm-sec">SUBMISSION</div>
    <Row left="by" right="j.ortiz · member" />
    <Row left="changes" right="adds stall scoring" />
    <div className="gwm-sec">POLICY</div>
    <Row left="role" right="Sales · Leadership" />
    <Row left="review" right="admin approval required" />
  </Studio>
);

export const WorkspaceMock = () => (
  <Studio back="Workspaces" name="Sales desk" right="3 × 2 · saved">
    <div className="gwm-sec">CELLS</div>
    <Row left="agent" right="Glyphh · Claude Code" />
    <Row left="panel" right="Pipeline (semantic app)" />
    <Row left="panel" right="Gmail" />
    <Row left="panel" right="Browser → hubspot.com" />
    <Row left="panel" right="Terminal → npm run dev" />
  </Studio>
);

export const LoopMock = () => (
  <Studio back="Sales desk" name="Loop" right="bound">
    <div className="gwm-sec">LOOP</div>
    <Row left="Claude Code" right="via the Router" />
    <div className="gwm-sec">MODELS</div>
    <Row left="planner" right="claude-fable-5-1" />
    <Row left="worker" right="claude-haiku-4-5" />
    <div className="gwm-sec">SPACE</div>
    <Row left="co-work" right="ask mode" />
  </Studio>
);

export const ToolsMock = () => (
  <Studio back="Sales desk" name="Tools" right="14 tools">
    <div className="gwm-sec">FROM APPS</div>
    <Row left="pipeline.deals.list · pipeline.note.draft" right="app" />
    <Row left="images.save_image · drive.list_drive" right="app" />
    <div className="gwm-sec">FROM CONNECTIONS</div>
    <Row left="gmail.* · hubspot.*" right="org-shared" />
    <Row left="slack.*" right="personal" />
  </Studio>
);
