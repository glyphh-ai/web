import LetterField from './LetterField';

/**
 * Planes — the section above How it works (his order, 2026-09-22): the four
 * planes as squares in a 2 × 2, joined by particle arrows that run right,
 * down, left, and up, so the flow is a loop — build, run, govern, use, and
 * back to build. His copy, spelling normalized. Each square carries the
 * hero's letter field behind it.
 */

const PLANES = [
  {
    n: '01',
    title: 'Build Plane',
    body: 'Blend AI models with your connections, data, and tasks to build applications that run 95%+ of the time without AI at runtime.',
    href: '/docs/semantic-apps',
  },
  {
    n: '02',
    title: 'Runtime (rrotor)',
    body: 'Run frontier and open-weight models together to cut cost and raise quality.',
    href: '/docs/rrotor',
  },
  {
    n: '03',
    title: 'Control Plane',
    body: 'Approve models, review apps, manage spend, and decide how apps are delivered and governed.',
    href: '/docs/router',
  },
  {
    n: '04',
    title: 'Teams',
    body: 'Use AI for personal productivity, and lean on curated apps, connections, and the harness for massive gains across the team.',
    href: '/docs/desktop',
  },
];

// The loops the desktop runs, besides its own.
const LOOPS = [
  { name: 'Claude Code', domain: 'claude.ai' },
  { name: 'Codex', domain: 'chatgpt.com' },
  { name: 'Gemini', domain: 'gemini.google.com' },
  { name: 'Copilot', domain: 'github.com' },
  { name: 'Cursor', domain: 'cursor.com' },
];

// `n` particles, spread evenly along the 2.4s run — more with every step round the loop.
function Arrow({ dir, n = 3 }) {
  return (
    <div className={`pl-arrow pl-${dir}`} aria-hidden="true">
      {Array.from({ length: n }, (_, k) => <i key={k} style={{ animationDelay: `${(-2.4 * k / n).toFixed(2)}s` }} />)}
    </div>
  );
}

export default function Planes() {
  return (
    <section className="pl" id="planes">
      <div className="qs-head">
        <span className="qs-kicker">The planes</span>
        <a href="#how-it-works" className="qs-more">How it works &darr;</a>
      </div>
      <div className="pl-wrap">
        {PLANES.map((p, i) => (
          <a key={p.n} href={p.href} className={`pl-sq pl-sq-${i + 1}`}>
            <LetterField seed={i + 40} />
            <span className="pl-n">{p.n}</span>
            <h3 className="pl-title">{p.title}</h3>
            <p className="pl-body">{p.body}</p>
          </a>
        ))}
        {/* The centre: the desktop, the universal operating system — behind the arrows, in the middle of the loop. */}
        <div className="pl-core" aria-hidden="true">
          {/* particles run the border the other way round — counter to the loop outside */}
          {['top', 'left', 'bottom', 'right'].map((e) => (
            <div key={e} className={`pl-edge pl-edge-${e}`}><i /><i /><i /></div>
          ))}
          <img src="/glyphh-mascot.png" alt="" width="64" height="64" />
          <span className="pl-core-title">Desktop</span>
          <span className="pl-core-sub">the universal operating system</span>
          {/* the loops the desktop runs (the Glyphh loop aside): white-bordered squares along the foot */}
          <div className="pl-loops">
            {LOOPS.map((l) => (
              <span key={l.name} className="pl-loop" title={l.name}>
                <img src={`https://www.google.com/s2/favicons?domain=${l.domain}&sz=64`} alt={l.name} width="20" height="20" loading="lazy" />
              </span>
            ))}
          </div>
        </div>
        <Arrow dir="right" n={2} />
        <Arrow dir="down" n={4} />
        <Arrow dir="left" n={6} />
        <Arrow dir="up" n={8} />
      </div>
    </section>
  );
}
