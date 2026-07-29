import ExpandableShot from './ExpandableShot';

/**
 * LoopStrip — the Layouts section: one Layout sets the whole job. Real shot
 * of the Layout editor (/screen-shots/glyphh-layouts.png; swap the file to
 * refresh) — apps on a grid plus the loop & model binding.
 */

export default function LoopStrip() {
  return (
    <section className="loopstrip" id="layouts">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">LAYOUTS</span> {'}'}</div>
        <h2 className="section-title reveal">One Layout sets the whole job.</h2>
        <p className="section-subtitle reveal">
          The apps on screen and how they&apos;re arranged. The agent workflow
          that loads. Which models fill each slot — frontier or open-weight —
          and which connections your agents can use. Saved together, named
          after the job.
        </p>
        <p className="section-subtitle reveal">
          Your Dev Layout: files, editor, terminal — Plan &amp; Build, Fable
          planning, Mistral building. Your Marketing Layout: the same
          workflow, restaffed — Fable and Gemini — with your inbox and
          analytics up instead.
        </p>

        <div className="reveal">
          <ExpandableShot src="/screen-shots/glyphh-layouts.png" alt="The Layout editor — apps arranged on a grid, and the loop and models the Layout loads" />
        </div>
      </div>
    </section>
  );
}
