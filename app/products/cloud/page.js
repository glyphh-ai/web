import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Glyphh Cloud — start on your machine, keep going in the cloud',
  description:
    'Run the agent locally with your own files and shell, then hand the same session to the cloud with its own filesystem and your repo already cloned. Standing agents keep working on their schedule while your laptop is shut.',
};

/* ── CSS mockups — drawn in the site's own language, like the other
      product pages (no screenshots to go stale every release). ── */

/** The handoff: the same session, on the machine and then in the cloud. */
function HandoffMock() {
  return (
    <div className="oc-mock oc-handoff" aria-hidden="true">
      <div className="oc-win">
        <div className="oc-win-bar">
          <span className="oc-dot" /><span className="oc-dot" /><span className="oc-dot" />
          <span className="oc-win-name">This machine</span>
          <span className="oc-chip oc-chip-local">local</span>
        </div>
        <div className="oc-win-body">
          <div className="oc-row"><span className="oc-key">folder</span><span className="oc-val">~/work/happy-shoes</span></div>
          <div className="oc-row"><span className="oc-key">session</span><span className="oc-val">Q3 revenue model</span></div>
          <div className="oc-line" />
          <div className="oc-line short" />
          <div className="oc-tools"><i /><i /><i /><span>files · shell · git</span></div>
        </div>
      </div>

      <div className="oc-hand">
        <span className="oc-hand-label">same session</span>
        <span className="oc-hand-track"><i className="oc-hand-dot" /></span>
      </div>

      <div className="oc-win oc-win-cloud">
        <div className="oc-win-bar">
          <span className="oc-dot" /><span className="oc-dot" /><span className="oc-dot" />
          <span className="oc-win-name">Cloud</span>
          <span className="oc-chip oc-chip-cloud">running</span>
        </div>
        <div className="oc-win-body">
          <div className="oc-row"><span className="oc-key">workspace</span><span className="oc-val">persistent</span></div>
          <div className="oc-row"><span className="oc-key">repo</span><span className="oc-val">cloned ✓</span></div>
          <div className="oc-line" />
          <div className="oc-line short" />
          <div className="oc-tools"><i /><i /><i /><span>same thread · same context</span></div>
        </div>
      </div>
    </div>
  );
}

/** The night shift: standing agents firing while the desk is dark. */
function ScheduleMock() {
  const ROWS = [
    { name: 'Morning brief', when: '06:00 daily', state: 'queued' },
    { name: 'Inbox triage', when: '03:00 nightly', state: 'running' },
    { name: 'Repo watch', when: 'every 2h', state: 'done' },
    { name: 'Weekly rollup', when: 'Fri 17:00', state: 'queued' },
  ];
  return (
    <div className="oc-mock oc-sched" aria-hidden="true">
      <div className="oc-win-bar">
        <span className="oc-dot" /><span className="oc-dot" /><span className="oc-dot" />
        <span className="oc-win-name">Scheduled tasks</span>
        <span className="oc-chip oc-chip-off">desktop offline</span>
      </div>
      <div className="oc-sched-body">
        {ROWS.map((r) => (
          <div className={`oc-task oc-task-${r.state}`} key={r.name}>
            <span className="oc-task-dot" />
            <span className="oc-task-name">{r.name}</span>
            <span className="oc-task-when">{r.when}</span>
            <span className="oc-task-state">{r.state}</span>
          </div>
        ))}
        <div className="oc-sched-foot">
          <img src="/glyphh-mascot.png" alt="" width={26} height={26} />
          <span>working while you sleep</span>
        </div>
      </div>
    </div>
  );
}

const WHERE = [
  {
    tag: 'LOCAL',
    title: 'Your machine, your files',
    desc: 'The agent runs on your laptop with your folders, your shell, and your git. Nothing leaves the room unless you send it.',
  },
  {
    tag: 'CLOUD',
    title: 'Its own workspace',
    desc: 'A cloud session gets a persistent filesystem and your repo cloned before the first turn — no setup step, no "clone this" prompt.',
  },
  {
    tag: 'EITHER',
    title: 'Fixed at the start',
    desc: 'A session belongs to where it began. It never silently moves machines — you always know where your work is running.',
  },
];

export default function CloudPage() {
  return (
    <div className="cloud-page">
      <Reveal />
      <Nav />

      {/* ── HERO ── */}
      <header className="page-hero page-hero-tight op-hero">
        <div className="container op-hero-inner">
          <div className="op-hero-copy">
            <div className="hero-badge">
              <span className="badge-dot" aria-hidden="true"></span>
              GLYPHH CLOUD
            </div>
            <h1 className="page-hero-title">
              Start on your machine<span className="dot">.</span> <span className="hero-accent">Keep going in the cloud</span><span className="dot">.</span>
            </h1>
            <p className="page-hero-sub">
              Run the agent locally with your own files and shell. When the job outgrows your laptop,
              the same session picks up in the cloud with its own filesystem and your repo already
              cloned. Same thread, same context, same tools.
            </p>
            <div className="hero-ctas">
              <a href="/#download" className="btn btn-primary btn-lg group">
                <span className="btn-label">Get Glyphh Desktop — Free</span>
                <span className="btn-fill"></span>
              </a>
            </div>
          </div>
          <div className="oc-hero-mock reveal"><HandoffMock /></div>
        </div>
      </header>

      {/* ── WHERE IT RUNS ── */}
      <section className="oc-where">
        <div className="container">
          <span className="rp-eyebrow">{'{'} where it runs {'}'}</span>
          <h2 className="section-title">Local or remote, never both by accident.</h2>
          <div className="oc-where-grid">
            {WHERE.map((w) => (
              <div className="oc-where-card reveal" key={w.tag}>
                <span className="oc-where-tag">{w.tag}</span>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 24/7 ── */}
      <section className="oc-night" id="agents">
        <div className="container oc-night-split">
          <div className="oc-night-copy">
            <span className="rp-eyebrow">{'{'} 24/7 agents {'}'}</span>
            <h2 className="section-title">Close the laptop. The work doesn&rsquo;t stop.</h2>
            <p className="section-subtitle">
              Standing agents run in the cloud on their own schedule — while your machine is off,
              your laptop is shut, and you are nowhere near a keyboard. They fire when you told them
              to, do the work, and the results are waiting when you come back.
            </p>
            <p className="section-subtitle">
              Every run keeps its receipts: what fired, when, which tools it used, and what it
              changed. Open the thread from any surface and read the turn like you were there.
            </p>
          </div>
          <div className="oc-night-mock reveal"><ScheduleMock /></div>
        </div>
      </section>

      {/* ── FOLLOW IT ANYWHERE ── */}
      <section className="oc-follow">
        <div className="container">
          <span className="rp-eyebrow">{'{'} every surface {'}'}</span>
          <h2 className="section-title">Watch it from wherever you are.</h2>
          <p className="section-subtitle">
            Open a running session on your desktop, in a browser, or on your phone and the live turn
            streams in — tool receipts included. From mobile you can point a new session at the cloud,
            at a GitHub repo, or at a folder on a desktop you left running at home.
          </p>
          <p className="section-subtitle oc-sec-note">
            Your desktop holds an outbound connection to the cloud. Nothing ever dials into your
            machine.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="final-cta">
        <div className="container">
          <div className="final-cta-inner">
            <h2>Start it here. Finish it anywhere.</h2>
            <p>Free to start — the desktop, the web app, and the phone all run the same sessions.</p>
            <div className="hero-ctas">
              <a href="/#download" className="btn btn-primary btn-lg group">
                <span className="btn-label">Get Glyphh Desktop — Free</span>
                <span className="btn-fill"></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
