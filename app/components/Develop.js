/**
 * Develop — the product demo, relocated out of the hero into a section with
 * context. The headline frames the video so people know what they're watching:
 * building real software inside Glyphh, with the agent and every app side by side.
 */
export default function Develop() {
  return (
    <section className="develop" id="develop">
      <div className="container">
        <div className="section-label reveal">{'{'}
          <span className="accent">DEVELOP IN GLYPHH</span>
          {'}'}</div>
        <h2 className="section-title reveal">Build software without leaving your workspace</h2>
        <p className="section-subtitle reveal">
          A real IDE, an agent with access to your files, and every app you use —
          all side by side. Watch context follow you from panel to panel as you ship.
        </p>
      </div>
      <div className="develop-video reveal">
        <div className="hero-video-frame">
          <div className="hero-video-inner">
            <video
              className="hero-video-player"
              src="/hero-v1-yosup.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
}
