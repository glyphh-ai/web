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
    body: 'Use blended AI models that use connections, data, and tasks to create applications that are 95%+ not using AI at runtime.',
    href: '/docs/semantic-apps',
  },
  {
    n: '02',
    title: 'Runtime (rrotor)',
    body: 'Use frontier and open-weight models to reduce cost and improve quality.',
    href: '/docs/rrotor',
  },
  {
    n: '03',
    title: 'Control Plane',
    body: 'Approve models, review apps, manage spend, and control how apps are delivered and governed.',
    href: '/docs/router',
  },
  {
    n: '04',
    title: 'Teams',
    body: 'Use AI for personal productivity and rely on curated apps, connections, and the harness to gain massive productivity improvements.',
    href: '/docs/desktop',
  },
];

function Arrow({ dir }) {
  return (
    <div className={`pl-arrow pl-${dir}`} aria-hidden="true">
      <i /><i /><i />
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
          <img src="/glyphh-mascot.png" alt="" width="64" height="64" />
          <span className="pl-core-title">Desktop</span>
          <span className="pl-core-sub">the universal operating system</span>
        </div>
        <Arrow dir="right" />
        <Arrow dir="down" />
        <Arrow dir="left" />
        <Arrow dir="up" />
      </div>
    </section>
  );
}
