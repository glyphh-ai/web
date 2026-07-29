// Home hero — product-first: the desktop positioning over the flowing data
// streams. The research line ("We put the human back in intelligence") now
// headlines the research band further down the page.

import HeroFlow from './HeroFlow';

export default function ResearchHero() {
  return (
    <section className="rhero rhero-tunnelfull">
      <HeroFlow />
      <div className="rhero-inner container">
        <div className="rhero-copy">
          <img
            src="/glyphh-mascot-square.png"
            alt=""
            className="rhero-mascot"
            width="88"
            height="88"
          />
          <div className="hero-badge">
            <span className="badge-dot" aria-hidden="true"></span>
            A new class of desktop agent · Mac &amp; Windows
          </div>
          <h1 className="rhero-title">
            Every task needs the right{' '}
            <span className="rhero-accent">Agents, Workflow and Apps</span>.
          </h1>
          <p className="rhero-sub">
            Glyphh Desktop combines all three into Layouts you switch
            instantly — each one sets what&rsquo;s on your screen, which
            agents run on which models, and what they can reach. Code this
            hour, a PowerPoint and email the next, a live app by lunch.
          </p>
          <div className="hero-ctas rhero-ctas">
            <a href="/products/desktop#download" className="btn btn-primary btn-lg group">
              <span className="btn-label">Download Glyphh Desktop</span>
              <span className="btn-fill"></span>
            </a>
            <a href="/research" className="btn btn-ghost btn-lg group">
              <span className="btn-label">Explore the research</span>
              <span className="btn-fill"></span>
            </a>
          </div>
          <div className="rhero-ticker" aria-hidden="true">
            <span>[ loops ]</span>
            <span>[ layouts ]</span>
            <span>[ ghost mode ]</span>
            <span>[ live apps ]</span>
          </div>
        </div>
      </div>
    </section>
  );
}
