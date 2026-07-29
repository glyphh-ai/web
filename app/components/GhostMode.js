/**
 * GhostMode — the agent, summoned over any app. Text-only section (no
 * product shot yet): the ⌘⇧G keys are the visual.
 */

export default function GhostMode() {
  return (
    <section className="ghostmode" id="ghost-mode">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">GHOST MODE</span> {'}'}</div>
        <h2 className="section-title reveal">In a Meet? In Slack? One keystroke away.</h2>
        <div className="ghost-keys reveal" aria-label="Command Shift G">
          <span className="ghost-key">⌘</span>
          <span className="ghost-key">⇧</span>
          <span className="ghost-key">G</span>
        </div>
        <p className="section-subtitle reveal">
          Ghost mode overlays your agent on whatever you&apos;re in — full
          context, your work ready to pull up. Esc, and you&apos;re back where
          you were.
        </p>
      </div>
    </section>
  );
}
