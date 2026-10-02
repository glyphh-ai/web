/**
 * AdaTerminal: the picture beside "Ada speaks in math" (his order, 2026-10-02).
 * A command line where the operations run down the input: each role is bound,
 * the bindings are bundled into a glyph, and a query is answered with cosines
 * and a fact tree. Lines appear one after another, in CSS. Decorative.
 */
const LINES = [
  ['cmd', 'ada encode ticket.json'],
  ['op', 'component ⊗ kubelet', 'bind', '±1 × 4096'],
  ['op', 'severity  ⊗ therm(7)', 'bind', '±1 × 4096'],
  ['op', 'title     ⊗ bag(pods crash)', 'bind', '±1 × 4096'],
  ['op', 'Σ w · roles → sign', 'bundle', 'issue'],
  ['op', 'ρ(issue) ⊗ attr:issue', 'roll, bind', 'layer'],
  ['op', 'Σ [issue · 1.0, meta · 0.0]', 'bundle', 'glyph g'],
  ['cmd', 'ada query --like g'],
  ['op', 'cos(g, r₁) = g · r₁ / d', 'cosine', '0.91'],
  ['op', 'cos(g, r₂)', 'cosine', '0.34'],
  ['op', 'softmax(cos / τ),  τ = 0.12', 'P', '0.98'],
  ['tree', 'ticket          0.91'],
  ['tree', '  issue         0.91'],
  ['tree', '    title       0.20'],
  ['tree', '    component   1.00'],
  ['tree', '    severity    0.93'],
];

export default function AdaTerminal() {
  return (
    <div className="ada-term" aria-hidden="true">
      <div className="ada-term-bar"><i /><i /><i /><span>ada</span></div>
      <div className="ada-term-body">
        {LINES.map(([kind, text, op, out], i) => (
          <div key={i} className={`ada-term-line ada-term-${kind}`} style={{ '--i': i }}>
            {kind === 'cmd' && <span className="ada-term-prompt">$</span>}
            <span className="ada-term-text">{text}</span>
            {op && <span className="ada-term-op">{op}</span>}
            {out && <span className="ada-term-out">{out}</span>}
          </div>
        ))}
        <div className="ada-term-line ada-term-cmd" style={{ '--i': LINES.length }}>
          <span className="ada-term-prompt">$</span><span className="ada-term-caret" />
        </div>
      </div>
    </div>
  );
}
