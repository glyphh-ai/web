import ExpandableShot from './ExpandableShot';

/**
 * LoopStrip — the Loops section, the heart of the story: how agents run a
 * job. Real shot of the loop editor (/screen-shots/glyphh-custom-apps.png;
 * swap the file to refresh) — the Rotor loop's roles, model slots, and graph.
 */

export default function LoopStrip() {
  return (
    <section className="loopstrip" id="loops">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">LOOPS</span> {'}'}</div>
        <h2 className="section-title reveal">It starts with a loop.</h2>
        <p className="section-subtitle reveal">
          A loop is how your agents run a job: roles in a circuit, each role a
          model slot you fill. A planner writes the plan, an architect splits
          it into work packets, workers execute in parallel — Fable plans,
          GPT architects, Mistral builds. Swap any slot. See exactly who did
          what.
        </p>

        <div className="reveal">
          <ExpandableShot src="/screen-shots/glyphh-custom-apps.png" alt="The loop editor — the Rotor loop's planner, architect, and worker slots, with the models that fill them" />
        </div>
      </div>
    </section>
  );
}
