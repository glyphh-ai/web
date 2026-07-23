const FEATURES = [
  {
    k: 'Full local toolset',
    d: 'Bash, Read/Write/Edit, Glob/Grep, WebFetch — the real Claude Code tools, running in your working directory. It makes files, runs commands, and reads the web. No "paste this into your terminal."',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
    ),
  },
  {
    k: 'Permission modes',
    d: 'ask · auto · plan · read-only. Reads run free; every shell command, write, and edit prompts — approve once, allow for the session, or let it rip in auto. Shift-tab cycles it live.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
    ),
  },
  {
    k: 'Your loops & models',
    d: 'The same governed loops and per-role models as Desktop — a frontier planner, an open-weight worker, whatever your org allows. Switch models with /use, loops with /loop, mid-session.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-2.6-6.3" /><polyline points="21 3 21 9 15 9" /></svg>
    ),
  },
  {
    k: 'Machine-reach',
    d: 'The CLI attaches as a machine host, so Desktop (or an agent anywhere) can list and launch apps, open URLs, and drive this box. Install it on a headless server and reach in.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
    ),
  },
  {
    k: 'Metered — no keys',
    d: 'Every model call rides the gateway with your bearer. Proxy or BYOK, org-governed and credit-attributed per model. Nothing to leak into your dotfiles or CI secrets.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6" /><path d="M12 22v-4" /><circle cx="12" cy="13" r="4" /><path d="M5 5l2 2M17 5l-2 2" /></svg>
    ),
  },
  {
    k: 'Built for the pipe',
    d: 'Full-screen TUI when you want it; headless and scriptable when you do not. Drop it in CI, a cron job, or a Makefile — the agent loop is the same one Desktop runs.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17l6-6-6-6" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
    ),
  },
];

export default function CliFeatures() {
  return (
    <section className="cli-power" id="power">
      <div className="container">
        <div className="section-head">
          <div className="hero-badge hero-badge-cli">
            <span className="badge-dot" aria-hidden="true"></span>
            Power-user territory
          </div>
          <h2 className="section-title">Everything Desktop can do<span className="dot">.</span> Without leaving the shell<span className="dot">.</span></h2>
          <p className="section-sub">
            One binary. The agent, your governance, and reach into the machine —
            all where developers already live.
          </p>
        </div>

        <div className="cli-grid">
          {FEATURES.map((f) => (
            <div className="cli-card" key={f.k}>
              <span className="cli-card-icon">{f.icon}</span>
              <h3 className="cli-card-k">{f.k}</h3>
              <p className="cli-card-d">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
