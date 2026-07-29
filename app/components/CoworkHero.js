import HeroParticles from './HeroParticles';
import ExpandableShot from './ExpandableShot';

/**
 * CoworkHero — the Glyphh Desktop hero: the copy block over one real 16:9
 * product VIDEO (/screen-shots/glyphh-hero.mp4; swap the file to refresh —
 * same resolution as the old still, which stays on as the poster frame).
 * The old animated mock (gradient canvas, abstract deck, typing ask) is gone.
 */

export default function CoworkHero() {
  return (
    <section className="hero hero-stacked">
      <HeroParticles />
      <div className="hero-copy hero-copy-center">
        <div className="hero-badge">
          <span className="badge-dot" aria-hidden="true"></span>
          A new class of desktop agent · Mac &amp; Windows
        </div>
        <h1 className="hero-title">Every task you do needs the right Agents, Workflow and Apps.</h1>
        <p className="hero-sub-big">
          Glyphh Desktop combines all three into Layouts you switch instantly
          — each one sets what&apos;s on your screen, which agents run on which
          models, and what they can reach. Code this hour, a PowerPoint and
          email the next, a live app by lunch.
        </p>
        <div className="hero-ctas">
          <a href="#download" className="btn btn-primary btn-lg group">
            <span className="btn-label">Download Now</span>
            <span className="btn-fill"></span>
          </a>
          <a href="#loops" className="btn btn-ghost btn-lg group">
            <span className="btn-label">Watch It Switch</span>
            <span className="btn-fill"></span>
          </a>
        </div>
      </div>

      <div className="hero-stage">
        <ExpandableShot src="/screen-shots/glyphh-hero.mp4?v=2" alt="The Glyphh Desktop workspace — your apps open beside the agent" eager />
      </div>
    </section>
  );
}
