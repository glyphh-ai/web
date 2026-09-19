import { ConnectionsRiver } from './Integrations';
import ExpandableShot from './ExpandableShot';

/**
 * StoryHeads — the new home narrative, top to bottom, as header bands only.
 * Each band is a { LABEL } + title + lede in the site's standard section
 * head style. Scaffolding for the 2026-08 messaging pass: sections get
 * their bodies (demos, grids, shots) built under these one at a time, and
 * bands may migrate into existing components as the structure settles.
 *
 * The order (his order, 2026-09-18): LOCAL CO-WORK → MCP TOOLS FOR ANYTHING
 * → SKILLS THAT EXTEND TO TASKS → SEMANTIC APPS → PLUGINS. Each a direct
 * attack, no framing.
 */
const HEADS = [
  // Each band is a direct attack (his order, 2026-09-18). No framing, no
  // metaphors: what it is, what it does.
  {
    id: 'cowork',
    href: '/products/workspace',
    cta: 'Glyphh Workspace',
    label: 'LOCAL CO-WORK',
    title: 'It runs on your machine.',
    ledes: [
      'Glyphh is a desktop application. Chat, work, and code run locally, beside the apps you already use, with your files and your keys on your own disk. Nothing you make is hosted by us.',
      'Every model is a plug: Claude, GPT, Gemini, Kimi K3, and hundreds of open-weight models, direct. Switch mid-task. The harness, the tools, and the skills stay the same.',
    ],
    shot: {
      src: '/screen-shots/glyphh-workspace.png',
      alt: 'Glyphh on the desktop: the agent beside Gmail, Slack, and a dashboard, each in its own panel',
      crop: { pos: '0% 30%', zoom: 1.8 },
    },
  },
  {
    id: 'mcp',
    href: '/products/connect',
    cta: 'Glyphh Connect',
    label: 'MCP TOOLS FOR ANYTHING',
    title: 'Every app you install is a tool your agent can call.',
    ledes: [
      'An app declares its tools in its manifest. Install it and those tools are in the local toolbox for whichever model is driving. Other apps reach them the same way, through the framework, not through us.',
      '3,500+ connected services come in as tools too: Gmail, Slack, Salesforce, GitHub, Notion, and the rest, with org-shared or personal auth. RPA covers what has no API.',
    ],
  },
  {
    id: 'skills',
    label: 'SKILLS THAT EXTEND TO TASKS',
    href: '/products/skills',
    cta: 'The skills framework',
    title: 'Teach it once. Schedule it.',
    ledes: [
      'A skill is a folder with a SKILL.md at its root, the standard every CLI reads. Glyphh reads yours, ships its own, and lets your org publish more to its hub, reviewed and role-gated.',
      'A task is a skill on a clock: a program the desktop runs on a schedule, with a checkpoint journal, so the same work happens the same way every morning without anyone typing it.',
    ],
    shot: {
      src: '/screen-shots/glyphh-app-home.png',
      alt: 'Skills and tasks in Glyphh: named skills with a role and a schedule',
      crop: { pos: '50% 30%', zoom: 1.6 },
    },
  },
  {
    id: 'semantic',
    label: 'SEMANTIC APPS',
    href: '/products/semantic-apps',
    cta: 'Semantic apps',
    title: 'Apps that remember what you were doing.',
    ledes: [
      'Every Glyphh app gets SQLite, on-device vector search, and a knowledge graph out of the box. What you do in one is retrievable from the next, on your machine, with no model call to get there.',
      'The agent reads that memory into every turn, so a prompt in Glyphh starts with your context instead of a blank page.',
    ],
    shot: {
      src: '/screen-shots/glyphh-custom-apps.png',
      alt: 'Semantic apps in Glyphh: an app with its own data, search, and graph',
      crop: { pos: '70% 30%', zoom: 1.7 },
    },
  },
  {
    id: 'plugins',
    label: 'PLUGINS',
    title: 'Extend the harness, not the vendor.',
    ledes: [
      'Plugins add to Glyphh itself: new panels, new tool kinds, new loops. They work with every model because they plug into the harness, not into one vendor\'s client.',
      'Build one with the Glyphh skill and the same loop you already use. Publish it to your org, or keep it on your machine.',
    ],
  },
];

function HeadCopy({ h }) {
  return (
    <>
      <h2 className="section-title reveal">{h.title}</h2>
      {h.cmds && (
        <div className="story-cmds reveal">
          {h.cmds.map((c) => (
            <p key={c.cmd}>
              <span className="compose-cmd">{c.cmd}</span> {c.rest}
            </p>
          ))}
        </div>
      )}
      {h.ledes.map((lede) => (
        <p key={lede.slice(0, 24)} className="section-subtitle reveal">{lede}</p>
      ))}
      {h.tag && <p className="story-tag reveal">{h.tag}</p>}
      {h.href && (
        <p className="reveal">
          <a href={h.href} className="btn btn-secondary btn-sm group">
            <span className="btn-label">{h.cta}</span>
            <span className="btn-fill"></span>
          </a>
        </p>
      )}
    </>
  );
}

function HeadBand({ h }) {
  return (
    <section className="story-head" id={`story-${h.id}`}>
      {h.shot ? (
        /* Shot bands split: copy on the LEFT, the shot on the RIGHT —
           zoomed into its crop region, full-screen on click. */
        <div className="container story-split">
          <div className="story-split-copy"><HeadCopy h={h} /></div>
          <div className="story-split-shot reveal">
            <ExpandableShot src={h.shot.src} alt={h.shot.alt} crop={h.shot.crop} />
          </div>
        </div>
      ) : (
        <div className="container"><HeadCopy h={h} /></div>
      )}
      {/* CONNECTIONS carries its body already: the icon river + note,
          moved up from the old standalone Integrations section. */}
      {h.id === 'mcp' && <ConnectionsRiver />}
    </section>
  );
}

export default function StoryHeads() {
  return (
    <>
      {HEADS.map((h) => <HeadBand key={h.id} h={h} />)}
    </>
  );
}
