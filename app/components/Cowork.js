/**
 * Cowork — "Where you work." An abstract desktop: the agent column beside two
 * app panels, skeleton lines only. The feeling of the workbench, zero detail.
 */

const favicon = (d) => `https://www.google.com/s2/favicons?domain=${d}&sz=64`;

const Lines = ({ n, seed = 0 }) => (
  <div className="cw-lines">
    {Array.from({ length: n }).map((_, i) => (
      <span key={i} className="cw-line" style={{ width: `${55 + (((i + seed) * 37) % 40)}%` }} />
    ))}
  </div>
);

export default function Cowork() {
  return (
    <section className="cowork" id="workspace">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">WORKSPACE</span> {'}'}</div>
        <h2 className="section-title reveal">Where you work.</h2>
        <p className="cw-sub reveal">
          Your tools open beside the agent — arranged how you left them.
        </p>

        <div className="cw-desk reveal" aria-hidden="true">
          <div className="cw-panel cw-agent">
            <div className="cw-panel-head"><span className="cw-glyph">⣿</span> Glyphh</div>
            <div className="cw-bubble cw-bubble-user"><Lines n={2} seed={1} /></div>
            <div className="cw-bubble"><Lines n={3} seed={4} /></div>
            <div className="cw-minibar" />
          </div>
          <div className="cw-panel">
            <div className="cw-panel-head"><img src={favicon('docs.google.com')} alt="" /> Slides</div>
            <div className="cw-canvas">
              <span className="cw-block cw-block-lg" />
              <span className="cw-block" />
              <span className="cw-block" />
            </div>
          </div>
          <div className="cw-panel">
            <div className="cw-panel-head"><img src={favicon('app.slack.com')} alt="" /> Slack</div>
            <Lines n={5} seed={2} />
          </div>
        </div>
      </div>
    </section>
  );
}
