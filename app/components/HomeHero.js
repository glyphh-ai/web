import HeroFlow from './HeroFlow';

/**
 * HomeHero — the single-story pitch. Text-only, left-aligned; the app
 * marquee peeks above the fold to bait the scroll. The five H1 lines are
 * intentional pacing — hard breaks at desktop width, each of lines 1–3 on
 * its own line at any width.
 */

export default function HomeHero() {
  return (
    <section className="hh">
      <HeroFlow />
      <div className="container hh-inner">
        <div className="hero-badge">
          <span className="badge-dot" aria-hidden="true"></span>
          A new class of desktop agent &middot; Mac &amp; Windows
        </div>
        <h1 className="hh-title">
          <span className="hh-line">An AI desktop assistant.</span>
          <span className="hh-line">A coding agent.</span>
          <span className="hh-line">An autopilot for your busywork.</span>
          {/* The trailing em dash is glued to its word so it can never be
              orphaned onto a line of its own if the line ever does wrap. */}
          <span className="hh-line hh-line-bold">This isn&rsquo;t three products. It&rsquo;s one <span className="hh-nowrap">workspace &mdash;</span></span>
          <span className="hh-line hh-line-bold">and it reshapes itself around whatever you&rsquo;re doing.</span>
        </h1>
        <p className="hh-sub">
          It connects to the 3,500+ apps you use every day &mdash; Gmail,
          Slack, Salesforce. And where every other AI is isolated, here
          Claude, ChatGPT, and open models all work from the same thread. You
          pick who does what: PowerPoints from Claude, images from GPT, grunt
          work from Mistral. You never start over.
        </p>
        <div className="hero-ctas hh-ctas">
          <a href="/products/desktop#download" className="btn btn-primary btn-lg group">
            <span className="btn-label">Download free &mdash; Mac &amp; Windows</span>
            <span className="btn-fill"></span>
          </a>
          <a href="#demo" className="btn btn-ghost btn-lg group">
            <span className="btn-label">Watch the 75-second demo</span>
            <span className="btn-fill"></span>
          </a>
        </div>
      </div>
    </section>
  );
}
