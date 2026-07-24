// Home hero — centered copy over flowing data streams (bundled left, fanning
// right into scattered particles).

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
            AI research &amp; development — everything open source
          </div>
          <h1 className="rhero-title">
            AI that does <span className="rhero-accent">real work</span>.
          </h1>
          <p className="rhero-sub">
            Glyphh builds the AI that&rsquo;s grounded in research: memory
            systems, vector-symbolic architectures, and the runtimes agents
            perform well on.
          </p>
          <div className="hero-ctas rhero-ctas">
            <a href="/products/desktop" className="btn btn-primary btn-lg group">
              <span className="btn-label">Get Glyphh Desktop</span>
              <span className="btn-fill"></span>
            </a>
            <a href="/research" className="btn btn-ghost btn-lg group">
              <span className="btn-label">Explore the research</span>
              <span className="btn-fill"></span>
            </a>
          </div>
          <div className="rhero-ticker" aria-hidden="true">
            <span>[ vsa ]</span>
            <span>[ hdc ]</span>
            <span>[ memory ]</span>
            <span>[ agentic runtimes ]</span>
          </div>
        </div>
      </div>
    </section>
  );
}
