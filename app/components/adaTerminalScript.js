/**
 * What the Ada terminal types (AdaTerminal.js). A STUB of the SDK's glyph
 * methods: `symbol`, `bind`, `bundle` and `cosine` are the kernel's primitives
 * under the names the SDK is expected to give them, and are not shipped yet.
 * `ada.query` and `ada.facts` are the SDK's real calls (sdk/src/resources/ada.ts).
 * When the SDK lands its glyph methods, change the names and shapes here only.
 */
export const SDK_METHODS = ['symbol', 'bind', 'bundle', 'cosine', 'query', 'facts'];

export const SCRIPT = [
  { run: 'const { symbol, bind, bundle, cosine } = glyphh' },
  { run: 'const role = bind(symbol("component"), symbol("kubelet"))', out: ['a ⊙ b  →  Glyph ±1 × 4096'] },
  { run: 'const issue = bundle([role, severity, title])', out: ['sign(Σ wᵢ · gᵢ)  →  Glyph ±1 × 4096'] },
  { run: 'cosine(issue, record)', out: ['g · r / d  =  0.91'] },
  { run: 'await ada.query({ modelId, situation: ticket })', out: ['{ top: "sig/node", confidence: 0.98, act: true }'] },
  {
    run: 'await ada.facts({ modelId, situation: ticket })',
    out: [
      'ticket          0.91',
      '  issue         0.91',
      '    title       0.20',
      '    component   1.00',
      '    severity    0.93',
    ],
  },
];
