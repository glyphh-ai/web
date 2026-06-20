const SHOTS = [
  {
    img: 'glyphh-ide.png',
    title: 'A real IDE, not a tab',
    text: 'Monaco editor, file tree, diff viewer, terminal, and Plan view — all native, all drag-resizable panels. The agent has Read, Edit, Bash, and Grep on your actual project files.',
  },
  {
    img: 'glyphh-vibe.png',
    title: 'Vibe-code anything',
    text: 'Describe what you want and watch it come together. The agent builds across your apps and files — not trapped in a chat box, working where you actually work.',
  },
  {
    img: 'glyphh-workflow.png',
    title: 'Skills as visual workflows',
    text: 'Every skill is a workflow: trigger → inputs → tools → outputs. Drag the pieces around, and click a connected app to jump straight into its panel.',
  },
  {
    img: 'glyphh-captures.png',
    title: 'Context that travels with you',
    text: 'Every panel is captured to a local vector store as you work, so the agent already knows what you’ve been doing — no copy-paste, no re-explaining, no lost flow.',
  },
  {
    img: 'glyphh-custom-apps.png',
    title: 'Bring every app you use',
    text: 'ChatGPT, Gmail, Slack, GitHub, your internal tools — add any app as a native panel and let the agent navigate and act across all of them.',
  },
  {
    img: 'glyphh-layouts.png',
    title: 'A workspace that fits the work',
    text: 'Split panels, save a layout per project, switch with one command. The workspace adapts to the task in front of you, not the other way around.',
  },
];

export default function Screenshots() {
  return (
    <section className="shots" id="screenshots">
      <div className="container">
        <div className="section-label reveal">{'{'}
          <span className="accent">SEE IT IN ACTION</span>
          {'}'}</div>
        <h2 className="section-title reveal">One workspace, every way you work</h2>

        <div className="shots-list">
          {SHOTS.map((s, i) => (
            <div key={i} className={`shot-row${i % 2 ? ' shot-row-rev' : ''} reveal`}>
              <div className="shot-frame">
                <div className="shot-inner">
                  <img src={`/screen-shots/${s.img}`} alt={s.title} loading="lazy" />
                </div>
              </div>
              <div className="shot-copy">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
