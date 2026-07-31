import HeroDemo from './HeroDemo';

/**
 * CliDemo — "One session, start to finish." The terminal demo, one
 * continuous scenario, proven in the terminal surface.
 *
 * TODO(chris): replace the animated mock with the real terminal recording
 * (asciinema embed or crisp capture, click-to-play) whose final beat is
 * the mid-session model-flag swap with the thread surviving — the same
 * punchline as the homepage demo.
 */

export default function CliDemo() {
  return (
    <section className="cli-demo" id="demo">
      <div className="container">
        <h2 className="section-title reveal">One session, start to finish.</h2>
        <div className="cli-canvas reveal" aria-hidden="true">
          <HeroDemo />
        </div>
      </div>
    </section>
  );
}
