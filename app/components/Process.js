/**
 * Process: the four steps from the docs, under the "hard limits" copy (his
 * order, 2026-10-01). One rail with a pulse running along it, and four
 * stations: a big outlined number, a small drawing of what happens there, the
 * step, and one line. Drawn with the theme's own tokens, so it follows light
 * and dark.
 */

const STEPS = [
  {
    n: '01',
    title: 'Define the glyph space',
    body: 'The layers, segments and roles your data has, and what each one weighs.',
    art: (
      <>
        <polygon className="pr-plane" points="40,14 68,28 40,42 12,28" />
        <polygon className="pr-plane" points="40,26 68,40 40,54 12,40" />
        <polygon className="pr-plane pr-hot" points="40,38 68,52 40,66 12,52" />
      </>
    ),
  },
  {
    n: '02',
    title: 'Encode your data',
    body: 'Each object becomes a glyph in that space.',
    art: (
      <>
        <path className="pr-line" d="M18 22c-5 0-6 3-6 7v5c0 3-2 6-4 6 2 0 4 3 4 6v5c0 4 1 7 6 7" />
        <path className="pr-line" d="M30 22c5 0 6 3 6 7v5c0 3 2 6 4 6-2 0-4 3-4 6v5c0 4-1 7-6 7" />
        <path className="pr-line pr-dash" d="M44 40h10" />
        <rect className="pr-gem pr-hot" x="56" y="32" width="16" height="16" transform="rotate(45 64 40)" />
      </>
    ),
  },
  {
    n: '03',
    title: 'Send like glyphs',
    body: 'A query is a glyph of the same shape.',
    art: (
      <>
        <rect className="pr-gem" x="52" y="12" width="9" height="9" transform="rotate(45 56.5 16.5)" />
        <rect className="pr-gem" x="60" y="42" width="9" height="9" transform="rotate(45 64.5 46.5)" />
        <rect className="pr-gem" x="38" y="58" width="9" height="9" transform="rotate(45 42.5 62.5)" />
        <path className="pr-line pr-dash" d="M24 40 L56.5 16.5 M24 40 L64.5 46.5 M24 40 L42.5 62.5" />
        <rect className="pr-gem pr-hot" x="16" y="32" width="16" height="16" transform="rotate(45 24 40)" />
      </>
    ),
  },
  {
    n: '04',
    title: 'Receive fact trees',
    body: 'What is near it, how near, and why.',
    art: (
      <>
        <path className="pr-line" d="M14 16v46 M14 30h8 M14 46h8 M14 62h8" />
        <rect className="pr-bar pr-hot" x="24" y="12" width="46" height="8" />
        <rect className="pr-bar" x="26" y="26" width="34" height="8" />
        <rect className="pr-bar" x="26" y="42" width="42" height="8" />
        <rect className="pr-bar" x="26" y="58" width="22" height="8" />
      </>
    ),
  },
];

export default function Process() {
  return (
    <div className="process" aria-label="How it works, in four steps">
      <div className="process-rail" aria-hidden="true"><span /></div>
      <ol className="process-steps">
        {STEPS.map((s) => (
          <li key={s.n} className="process-step">
            <span className="process-n" aria-hidden="true">{s.n}</span>
            <svg className="process-art" viewBox="0 0 80 80" aria-hidden="true">{s.art}</svg>
            <h3 className="process-title">{s.title}</h3>
            <p className="process-body">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
