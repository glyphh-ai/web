import LetterField from './LetterField';

/**
 * Planes — the section above How it works (redesigned 2026-09-22, his call:
 * "similar but still squares"). A system diagram: the four planes as true
 * squares in a left-to-right pipeline, particle arrows between them growing
 * louder with every step; each square drops a connector onto the DESKTOP,
 * a full-width bus beneath them carrying the mark, the name, and the loops it
 * runs; and a thin return rail over the top carries particles back from
 * Teams to Build, so the flow is still a loop. His copy.
 */

const PLANES = [
  { n: '01', title: 'Build Plane', body: 'Blend AI models with your connections, data, and tasks to build applications that run 95%+ of the time without AI at runtime.', href: '/docs/semantic-apps' },
  { n: '02', title: 'Runtime (rrotor)', body: 'Run frontier and open-weight models together to cut cost and raise quality.', href: '/docs/rrotor' },
  { n: '03', title: 'Control Plane', body: 'Approve models, review apps, manage spend, and decide how apps are delivered and governed.', href: '/docs/router' },
  { n: '04', title: 'Teams', body: 'Use AI for personal productivity, and lean on curated apps, connections, and the harness for massive gains across the team.', href: '/docs/desktop' },
];

// The loops the desktop runs, besides its own.
const LOOPS = [
  { name: 'Claude Code', domain: 'claude.ai' },
  { name: 'Codex', domain: 'chatgpt.com' },
  { name: 'Gemini', domain: 'gemini.google.com' },
  { name: 'Copilot', domain: 'github.com' },
  { name: 'Cursor', domain: 'cursor.com' },
];

const frac = (x) => x - Math.floor(x);

// A particle arrow. `n` particles ride the line; `level` grows along the
// pipeline and sets how many tiny cubes emit off it, each with its own heading
// and speed, reaching farther and spreading faster with every step.
function Arrow({ dir, n = 3, level = 1, len = 'var(--gut)' }) {
  const emits = level * 4;
  return (
    <div className={`pl-arrow pl-${dir}`} style={{ '--len': len }} aria-hidden="true">
      {Array.from({ length: n }, (_, k) => <i key={k} style={{ animationDelay: `${(-2.4 * k / n).toFixed(2)}s` }} />)}
      {Array.from({ length: emits }, (_, k) => {
        const h1 = frac(k * 0.618 + level * 0.113), h2 = frac(k * 0.371 + 0.5), h3 = frac(k * 0.827 + level * 0.29);
        const angle = h1 * Math.PI * 2;
        const reach = (7 + level * 5) * (0.5 + h2);
        const dur = 2.4 * (1.15 - h3 * (0.35 + level * 0.12));
        return (
          <b
            key={k}
            style={{
              animationDuration: `${dur.toFixed(2)}s`,
              animationDelay: `${(-dur * frac(k * 0.917)).toFixed(2)}s`,
              '--ex': `${(Math.cos(angle) * reach).toFixed(1)}px`,
              '--ey': `${(Math.sin(angle) * reach).toFixed(1)}px`,
              '--cs': `${(2 + level * 0.4).toFixed(1)}px`,
            }}
          />
        );
      })}
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

      <div className="pl-sys">
        {/* the return rail over the top: Teams back to Build */}
        <div className="pl-rail" aria-hidden="true">
          <Arrow dir="left" n={4} level={1} len="100%" />
        </div>

        <div className="pl-row">
          {PLANES.map((p, i) => (
            <div key={p.n} className="pl-cell">
              <a href={p.href} className="pl-sq">
                <LetterField seed={i + 40} />
                <span className="pl-n">{p.n}</span>
                <h3 className="pl-title">{p.title}</h3>
                <p className="pl-body">{p.body}</p>
              </a>
              {i < PLANES.length - 1 ? <Arrow dir="right" n={(i + 1) * 2} level={i + 1} /> : null}
              {/* the drop onto the bus */}
              <Arrow dir="down" n={i + 2} level={i + 1} len="var(--drop)" />
            </div>
          ))}
        </div>

        <div className="pl-bus">
          <div className="pl-bus-brand">
            <img src="/glyphh-mascot.png" alt="" width="44" height="44" aria-hidden="true" />
            <div>
              <span className="pl-bus-title">Desktop</span>
              <span className="pl-bus-sub">the universal operating system</span>
            </div>
          </div>
          <div className="pl-loops" aria-label="The loops the desktop runs">
            {LOOPS.map((l) => (
              <span key={l.name} className="pl-loop" title={l.name}>
                <img src={`https://www.google.com/s2/favicons?domain=${l.domain}&sz=64`} alt={l.name} width="20" height="20" loading="lazy" />
              </span>
            ))}
          </div>
          {/* particles run the bus's border the other way round */}
          {['top', 'left', 'bottom', 'right'].map((e) => (
            <div key={e} className={`pl-edge pl-edge-${e}`} aria-hidden="true"><i /><i /><i /></div>
          ))}
        </div>
      </div>
    </section>
  );
}
