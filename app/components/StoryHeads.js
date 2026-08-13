import { ConnectionsRiver } from './Integrations';
import ExpandableShot from './ExpandableShot';

/**
 * StoryHeads — the new home narrative, top to bottom, as header bands only.
 * Each band is a { LABEL } + title + lede in the site's standard section
 * head style. Scaffolding for the 2026-08 messaging pass: sections get
 * their bodies (demos, grids, shots) built under these one at a time, and
 * bands may migrate into existing components as the structure settles.
 *
 * The hierarchy: CONNECTIONS (everything you use, connected) → LOOPS (turn
 * connections into your way of working) → MEMORY (your context follows you
 * — absorbs the CONTEXT beat) → MODELS → EXECUTION → COMMAND → RROT →
 * APPS / DREAM (build what's missing).
 */
const HEADS = [
  {
    id: 'connections',
    label: 'CONNECTIONS',
    title: '3,500+ ways to connect your work.',
    ledes: [
      'Connect Glyphh to the software, services, data, and systems you already use through thousands of MCP connections. Then let RPA reach beyond APIs and interact with the applications on your screen.',
    ],
    tag: 'Connect almost anything. Automate almost everything. Work Seamlessly!',
  },
  {
    id: 'loops',
    label: 'LOOPS',
    title: 'Build your way of working once.',
    ledes: [
      'Connect Workspaces with their own apps, tools, model slots, and reasoning loops. Hot-swap models without breaking the workflow. Move from research to email to code and back again—your Loop comes with you.',
    ],
    // The "Your apps, beside the agent" shot, promoted from the detail grid.
    // Cropped into its LEFT portion inline; the lightbox shows it whole.
    shot: {
      src: '/screen-shots/glyphh-workspace.png',
      alt: 'Your apps beside the agent — Gmail, Slack, and dashboards open as panels next to Glyphh',
      crop: { pos: '0% 30%', zoom: 1.8 },
    },
  },
  {
    id: 'memory',
    label: 'MEMORY',
    title: 'Your context follows you.',
    ledes: [
      'Switch layouts, models, apps, devices, and environments without rebuilding the context behind your work. Glyphh carries the context that matters from one task to the next, so every prompt starts warm.',
      "Glyphh continuously carries relevant context forward—from what you're doing right now to the goals and knowledge accumulated over time. Your next prompt is never cold.",
    ],
    // The agents shot ("Agents that work your way"), promoted from the
    // detail grid — the agents that follow you across the workspace.
    shot: {
      src: '/screen-shots/glyphh-app-home.png',
      alt: 'Agents that follow you — named agents, each with a role, a loop, and a model team, carrying your context',
      crop: { pos: '50% 30%', zoom: 1.6 },
    },
  },
  {
    id: 'models',
    label: 'MODELS',
    title: 'Your workflow. Any intelligence.',
    ledes: [
      'Use frontier, open-weight, self-hosted, local, or cloud models. Give every Loop the models it needs, then swap them instantly without losing state.',
      'Or build your own deterministic Loops—repeatable reasoning circuits that run the models, tools, and steps you define, in the order you define them. Shape each one to your workflow, your Workspace, and your apps, and get the same dependable process every run.',
    ],
    // "The right models, every task" shot, promoted from the detail grid.
    shot: {
      src: '/screen-shots/glyphh-custom-apps.png',
      alt: 'The right models, every task — a small team of AIs in a circuit, any seat swappable',
      crop: { pos: '70% 30%', zoom: 1.7 },
    },
  },
  // EXECUTION, COMMAND, RROT, and APPS live as cards in the { INSIDE }
  // FeatureGrid section (FeatureGrid.js), which follows these bands.
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
      {h.id === 'connections' && <ConnectionsRiver />}
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
