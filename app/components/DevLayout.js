/**
 * DevLayout — the builder's workspace on the same gradient canvas: files left,
 * Monaco top center, terminal below it, the coding agent right — and the model
 * picker EXPANDED over it, exactly as the app renders it: role groups
 * (Planner / Worker) with the picked model checked in each, the loop chip to
 * the right.
 */

const Lines = ({ n, seed = 0, w = 40 }) => (
  <div className="dv-lines">
    {Array.from({ length: n }).map((_, i) => (
      <span key={i} className="dv-line" style={{ width: `${w + (((i + seed) * 31) % 45)}%` }} />
    ))}
  </div>
);

const CODE_COLORS = ['#b36bfb', '#7ce3ab', '#8ab8ff', '#e0c176', '#c6c1d4'];

export default function DevLayout() {
  return (
    <section className="devlayout" id="builders">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">BUILD</span> {'}'}</div>
        <h2 className="section-title reveal">Built for builders, too.</h2>
        <p className="dv-sub reveal">
          A full dev workspace — files, code, terminal, agent — with the loop
          picker one click away. Bring your own keys, too: any provider that
          speaks the OpenAI API plugs straight in, never marked up.
        </p>

        <div className="hs-canvas dv-canvas reveal" aria-hidden="true">
          {/* The dev layout: files | monaco-over-terminal | coding agent. */}
          <div className="dv-desk">
            <div className="dv-pane dv-files">
              <div className="dv-pane-head">Files</div>
              <Lines n={9} seed={3} w={38} />
            </div>
            <div className="dv-center">
              <div className="dv-pane dv-code">
                <div className="dv-pane-head">app.ts</div>
                <div className="dv-codelines">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <span
                      key={i}
                      className="dv-codeline"
                      style={{
                        width: `${34 + ((i * 37) % 52)}%`,
                        marginLeft: `${(i % 3) * 14}px`,
                        background: CODE_COLORS[i % CODE_COLORS.length],
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="dv-pane dv-term">
                <div className="dv-term-line"><span className="dv-prompt">❯</span><span className="dv-line" style={{ width: '46%' }} /></div>
                <div className="dv-term-line"><span className="dv-line dv-line-dim" style={{ width: '68%' }} /></div>
                <div className="dv-term-line"><span className="dv-prompt">❯</span><span className="dv-caret" /></div>
              </div>
            </div>
            <div className="dv-pane dv-agent">
              <div className="dv-pane-head dv-agent-head">⣿ Glyphh</div>
              <div className="dv-bubble dv-bubble-user"><Lines n={1} seed={1} w={55} /></div>
              <div className="dv-bubble"><Lines n={3} seed={5} w={48} /></div>
            </div>
          </div>

          {/* The picker, EXPANDED — the app's dropdown, verbatim shape:
              role-group heads, two-line items, the picked model checked. */}
          <div className="dv-pick">
            <div className="dv-chips">
              <span className="hs-pill hs-pill-open"><i className="ch-dot ch-dot-frontier" />Fable 5 · Mistral Small 3.2</span>
              <span className="hs-pill hs-pill-loop">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-2.6-6.3" /><polyline points="21 3 21 9 15 9" /></svg>
                Plan &amp; Build
              </span>
            </div>
            <div className="dv-drop">
              <div className="dv-drop-head">Planner</div>
              <div className="dv-drop-item selected">
                <span className="dv-drop-name">Fable 5<i className="dv-check">✓</i></span>
                <span className="dv-drop-sub">200k context · frontier</span>
              </div>
              <div className="dv-drop-item">
                <span className="dv-drop-name">GPT-5</span>
                <span className="dv-drop-sub">200k context · frontier</span>
              </div>
              <div className="dv-drop-head">Worker</div>
              <div className="dv-drop-item selected">
                <span className="dv-drop-name">Mistral Small 3.2<i className="dv-check">✓</i></span>
                <span className="dv-drop-sub">128k context · open weights · 2 cr / M</span>
              </div>
              <div className="dv-drop-item">
                <span className="dv-drop-name">Qwen 3</span>
                <span className="dv-drop-sub">128k context · open weights · 1 cr / M</span>
              </div>
              <div className="dv-drop-head">Your keys</div>
              <div className="dv-drop-item">
                <span className="dv-drop-name">Your provider</span>
                <span className="dv-drop-sub">any OpenAI-compatible API · your key · 0 cr</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
