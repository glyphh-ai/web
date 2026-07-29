import ExpandableShot from './ExpandableShot';

/**
 * SwitchStrip — the switching beat: the palette that swaps the whole
 * workspace. Real shot of the switcher (/screen-shots/glyphh-command-palette.png;
 * swap the file to refresh) — apps and Layouts in one search.
 */

export default function SwitchStrip() {
  return (
    <section className="switchstrip" id="switch">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">SWITCH</span> {'}'}</div>
        <h2 className="section-title reveal">The whole workspace, one keystroke away.</h2>
        <p className="section-subtitle reveal">
          Open the palette, type a name, Enter — Dev, email, web-dev — and
          everything reassembles at once: screen, workflow, models,
          connections. Hundreds of tasks a day deserve better than hunting
          for tabs.
        </p>

        <div className="reveal">
          <ExpandableShot src="/screen-shots/glyphh-command-palette.png" alt="The switcher — search apps and Layouts, Enter opens the top match" />
        </div>
      </div>
    </section>
  );
}
