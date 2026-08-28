/**
 * AnywhereBand — LOCAL → REMOTE and 24/7 AGENTS.
 *
 * Two story bands in the site's standard head style (StoryHeads.js), each
 * paired with a drawn scene starring the Glyphh mascot: the session handing
 * itself from a laptop to the cloud, and the agent still working while the
 * machine sleeps. The scenes are inline SVG on the site's own tokens — the
 * mascot rides in as its brand PNG so the character is never re-drawn.
 */

/** The mascot, in a circular brand well — the character in both scenes. */
function Mascot({ x, y, r, dim = false }) {
  return (
    <g opacity={dim ? 0.45 : 1}>
      <circle cx={x} cy={y} r={r} fill="url(#ab-brand)" />
      <image
        href="/glyphh-mascot.png"
        x={x - r * 0.62}
        y={y - r * 0.62}
        width={r * 1.24}
        height={r * 1.24}
        preserveAspectRatio="xMidYMid meet"
      />
    </g>
  );
}

function SceneHandoff() {
  return (
    <svg className="ab-scene" viewBox="0 0 520 260" role="img"
      aria-label="A session running on a laptop handing itself to the cloud, the same agent in both">
      <defs>
        <linearGradient id="ab-brand" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#9333ea" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      {/* LOCAL — the laptop */}
      <g>
        <rect x="28" y="66" width="168" height="106" rx="10" fill="var(--surface)" stroke="var(--border-2)" strokeWidth="2" />
        <path d="M16 176h192l10 16H6z" fill="var(--surface-2)" stroke="var(--border-2)" strokeWidth="2" strokeLinejoin="round" />
        <Mascot x={112} y={112} r={34} />
        <text x="112" y="222" textAnchor="middle" className="ab-cap">your machine</text>
      </g>

      {/* THE HANDOFF — the same session, moving */}
      <g className="ab-flow">
        <path d="M214 118 C 258 82, 302 82, 344 106" fill="none" stroke="var(--accent)" strokeWidth="2.5"
          strokeLinecap="round" strokeDasharray="7 9" opacity="0.75" />
        <circle r="4.5" fill="var(--accent-light)">
          <animateMotion dur="2.6s" repeatCount="indefinite" path="M214 118 C 258 82, 302 82, 344 106" />
        </circle>
      </g>

      {/* REMOTE — the cloud */}
      <g>
        <path d="M356 150c-16 0-29-13-29-29 0-15 11-27 26-29 5-19 22-32 42-32 22 0 40 16 43 37 17 2 30 16 30 33 0 11-6 20-14 25z"
          fill="var(--surface)" stroke="var(--border-2)" strokeWidth="2" strokeLinejoin="round" />
        <Mascot x={404} y={104} r={30} />
        <text x="404" y="222" textAnchor="middle" className="ab-cap">the cloud</text>
      </g>
    </svg>
  );
}

function SceneNightShift() {
  return (
    <svg className="ab-scene" viewBox="0 0 520 260" role="img"
      aria-label="A closed laptop at night while the agent keeps working in the cloud">
      <defs>
        <linearGradient id="ab-brand-2" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#9333ea" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      {/* NIGHT — moon + stars */}
      <g opacity="0.9">
        <path d="M70 44a20 20 0 1 0 20 20 15 15 0 0 1-20-20z" fill="var(--text-3)" />
        <g fill="var(--text-4)">
          <circle cx="128" cy="38" r="2.2" /><circle cx="168" cy="62" r="1.6" />
          <circle cx="212" cy="34" r="2" /><circle cx="262" cy="56" r="1.5" />
          <circle cx="316" cy="32" r="2.2" /><circle cx="372" cy="58" r="1.6" />
          <circle cx="436" cy="36" r="2" /><circle cx="478" cy="66" r="1.5" />
        </g>
      </g>

      {/* ASLEEP — the closed laptop */}
      <g>
        <rect x="34" y="150" width="164" height="16" rx="8" fill="var(--surface-2)" stroke="var(--border-2)" strokeWidth="2" />
        <path d="M24 172h184l8 14H16z" fill="var(--surface)" stroke="var(--border-2)" strokeWidth="2" strokeLinejoin="round" />
        <text x="116" y="216" textAnchor="middle" className="ab-cap">closed</text>
      </g>

      {/* AWAKE — the agent, still running */}
      <g>
        <path d="M330 158c-17 0-31-14-31-31 0-16 12-29 28-31 5-20 23-34 45-34 23 0 43 17 46 39 18 2 32 17 32 35 0 12-6 22-15 27z"
          fill="var(--surface)" stroke="var(--border-2)" strokeWidth="2" strokeLinejoin="round" />
        <Mascot x={381} y={108} r={31} />
        {/* the work ticking over while nobody watches */}
        <g className="ab-pulse">
          <circle cx="341" cy="150" r="3.5" fill="var(--accent)" />
          <circle cx="357" cy="150" r="3.5" fill="var(--accent)" />
          <circle cx="373" cy="150" r="3.5" fill="var(--accent)" />
        </g>
        <text x="381" y="216" textAnchor="middle" className="ab-cap">still working</text>
      </g>
    </svg>
  );
}

const BANDS = [
  {
    id: 'handoff',
    label: 'LOCAL → REMOTE',
    title: 'Start on your machine. Keep going in the cloud.',
    lede:
      'Run the agent locally with your files, your shell, and your folders — nothing leaves the room. ' +
      'When a job outgrows your laptop, the same session picks up in the cloud with its own filesystem ' +
      'and your repo already cloned. Same thread, same context, same tools.',
    scene: <SceneHandoff />,
  },
  {
    id: 'nightshift',
    label: '24/7 AGENTS',
    title: "Close the laptop. The work doesn't stop.",
    lede:
      'Standing agents run in the cloud on their own schedule — while your machine is off, ' +
      'your laptop is shut, and you are nowhere near a keyboard. They fire when you told them to, ' +
      'do the work, and the results are waiting when you come back.',
    scene: <SceneNightShift />,
  },
];

export default function AnywhereBand() {
  return (
    <>
      {BANDS.map((b) => (
        <section className="story-head ab-band" id={`story-${b.id}`} key={b.id}>
          <div className="container story-split">
            <div className="story-split-copy">
              <p className="section-label reveal">{'{ '}{b.label}{' }'}</p>
              <h2 className="section-title reveal">{b.title}</h2>
              <p className="section-subtitle reveal">{b.lede}</p>
            </div>
            <div className="story-split-shot ab-art reveal">{b.scene}</div>
          </div>
        </section>
      ))}
    </>
  );
}
