import ExpandableShot from './ExpandableShot';

/**
 * Layouts — a Layout wraps a loop with everything else the job needs. Real
 * shot of the Layout editor (/screen-shots/glyphh-layouts.png; swap the file
 * to refresh) — the app grid plus the loop & models binding.
 */

export default function Layouts() {
  return (
    <section className="layouts" id="layouts">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">LAYOUTS</span> {'}'}</div>
        <h2 className="section-title reveal">A Layout wraps the loop in the job.</h2>
        <p className="section-subtitle reveal">
          Which apps are on screen and how they&apos;re arranged, which loop
          loads, which models fill its slots, which connections your agents
          can use — saved together, named after the job. Your Dev Layout runs
          Plan &amp; Build with Fable and Mistral; Marketing, the same loop
          restaffed with Gemini, your inbox and analytics up instead.
        </p>

        <div className="reveal">
          <ExpandableShot src="/screen-shots/glyphh-layouts.png" alt="The Layout editor — apps arranged on a grid, and the loop and models the Layout loads" />
        </div>
      </div>
    </section>
  );
}
