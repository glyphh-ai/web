import SystemMap from './SystemMap';

/**
 * TheSystem — the overview (his order, 2026-10-05): one minimal picture of
 * the whole thing, then one line per part. Sits between the pitch and the
 * planes so the story reads: why (the inversion), what (the system), how
 * (the planes), then each part in turn.
 */
const PARTS = [
  ['Desktop', 'the shell on your machine'],
  ['Web', 'the same app, in a tab'],
  ['Apps', 'semantic programs your org owns'],
  ['Router', 'every model, governed'],
  ['Memory', 'what the models learn, kept local'],
  ['Connections', '3,500+ tools as tools'],
  ['Tasks', 'programs on a clock'],
];

export default function TheSystem() {
  return (
    <section className="hiw sys" id="system">
      <div className="qs-head">
        <span className="qs-kicker">The system</span>
        <a href="https://docs.glyphh.ai" className="qs-more">Read the docs &rarr;</a>
      </div>
      <h2 className="ix-h2 lt-h2">One operating system. Seven parts. One bus.</h2>
      <p className="ix-desc hv-pitch-lede">
        The desktop and the web are the surfaces. The router allocates models and money. Memory keeps
        what the models learn. Connections reach the world. Apps and tasks are the programs that run on
        all of it.
      </p>
      <div className="hv-panel sys-panel">
        <SystemMap />
      </div>
      <ul className="sys-parts">
        {PARTS.map(([name, line]) => (
          <li key={name}><span>{name}</span>{line}</li>
        ))}
      </ul>
    </section>
  );
}
