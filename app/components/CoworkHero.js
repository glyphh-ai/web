import HeroFlow from './HeroFlow';
import ExpandableShot from './ExpandableShot';

/**
 * CoworkHero — the Glyphh Desktop hero: the copy block over one real 16:9
 * product VIDEO (/screen-shots/glyphh-hero.mp4; swap the file to refresh —
 * same resolution as the old still, which stays on as the poster frame).
 * The old animated mock (gradient canvas, abstract deck, typing ask) is gone.
 *
 * Backdrop: the home hero's stream effect in its Desktop orientation —
 * streams from both edges CONVERGING on the center (many sources, one
 * workspace), tinted warmer than home (purple → pink → amber).
 */

const DESKTOP_FLOW = ['179, 107, 251', '245, 158, 11', '236, 72, 153']; // purple / amber / pink

export default function CoworkHero() {
  return (
    <section className="rhero rhero-product">
      <HeroFlow mode="converge" colors={DESKTOP_FLOW} seed={2025} />
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
          <h1 className="rhero-title">Agents. Models. Apps. <span className="rhero-accent">One workspace.</span></h1>
          <p className="rhero-sub">
            Glyphh Desktop combines all three into Layouts you switch with one
            keystroke. Code this hour, a PowerPoint and email the next, a live
            app by lunch.
          </p>
          <div className="hero-ctas rhero-ctas">
            <a href="#download" className="btn btn-primary btn-lg group">
              <span className="btn-label">Download Now</span>
              <span className="btn-fill"></span>
            </a>
            <a href="#layouts" className="btn btn-ghost btn-lg group">
              <span className="btn-label">Watch It Switch</span>
              <span className="btn-fill"></span>
            </a>
          </div>
          <div className="rhero-ticker" aria-hidden="true">
            <span>[ connections ]</span>
            <span>[ apps ]</span>
            <span>[ loops ]</span>
            <span>[ layouts ]</span>
            <span>[ command center ]</span>
          </div>
        </div>
      </div>

      <div className="hero-stage">
        <ExpandableShot src="/screen-shots/glyphh-hero.mp4?v=2" alt="The Glyphh Desktop workspace — your apps open beside the agent" eager />
      </div>
    </section>
  );
}
