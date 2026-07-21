/**
 * LoopStrip — "The right loop for every job." The gradient canvas, the OUTPUT
 * (an abstract project board, plan already built), the active loop's steps
 * floating over it — and the loop RAIL above, because the point is plural:
 * the whole app reorients around whichever loop the job calls for.
 */

const favicon = (d) => `https://www.google.com/s2/favicons?domain=${d}&sz=64`;

const FLOW = [
  { kind: 'Plan', who: 'Fable 5', d: 'anthropic.com' },
  { kind: 'Build', who: 'Llama 4', d: 'meta.com' },
  { kind: 'Iterate', who: 'Qwen 3', d: 'qwen.ai' },
  { kind: 'Check', who: 'Fable 5', d: 'anthropic.com' },
];

const COLUMNS = [
  { title: 'To do', cards: 2 },
  { title: 'In progress', cards: 3 },
  { title: 'Done', cards: 2 },
];

export default function LoopStrip() {
  return (
    <section className="loopstrip" id="loops">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">LOOPS</span> {'}'}</div>
        <h2 className="section-title reveal">The right loop for every job.</h2>
        <p className="ls-sub reveal">
          Not one loop for all work. Every job picks its loop — and the whole
          app reorients around it: the models that think, the tools it may
          touch, the workspace it opens. Your best way of working, saved and
          repeatable.
        </p>

        <div className="hs-canvas ls-canvas reveal" aria-hidden="true">
          {/* The OUTPUT: an abstract project plan, already laid out. */}
          <div className="ls-board">
            <div className="ls-board-head">Launch plan</div>
            <div className="ls-cols">
              {COLUMNS.map((col, ci) => (
                <div className="ls-col" key={col.title}>
                  <div className="ls-col-title">{col.title}</div>
                  {Array.from({ length: col.cards }).map((_, i) => (
                    <div className="ls-card" key={i}>
                      <span className="ls-card-line" style={{ width: `${62 + ((i + ci * 2) * 29) % 32}%` }} />
                      <span className="ls-card-meta">
                        <i className="ls-card-dot" />
                        <span className="ls-card-chip" />
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* The loop, floating over the output — model logos doing the steps. */}
          <div className="ls-flow">
            {FLOW.map((s, i) => (
              <div style={{ display: 'contents' }} key={i}>
                {i > 0 && <span className="ls-flow-link" />}
                <div className="ls-flow-node">
                  <img src={favicon(s.d)} alt="" />
                  <span className="ls-flow-kind">{s.kind}</span>
                  <span className="ls-flow-who">{s.who}</span>
                </div>
              </div>
            ))}
            <span className="ls-flow-link" />
            <div className="ls-flow-node ls-flow-done">
              <span className="ls-flow-kind">✓ Published</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
