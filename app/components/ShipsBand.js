import ExpandableShot from './ExpandableShot';

/**
 * ShipsBand — the encore: everything the three faces make can ship as a
 * live URL. Full-bleed band on a slightly lifted ground; reuses the
 * publish visual from /products/desktop (the URL pill over the release
 * video) largely intact. The mascot lives here.
 */

export default function ShipsBand() {
  return (
    <section className="ships" id="ships">
      <div className="container">
        <img
          src="/glyphh-mascot-square.png"
          alt=""
          className="ships-mascot"
          width="72"
          height="72"
          loading="lazy"
        />
        <h2 className="section-title reveal">And one more thing: it ships.</h2>
        <div className="release-url reveal" aria-hidden="true">
          <span className="release-lock">🔒</span> your-app.glyphh.app
        </div>
        <p className="section-subtitle reveal">
          Anything you build gets a live URL at your-app.glyphh.app &mdash; an
          installable app, a public page, or an MCP endpoint another AI can
          call. No deploy, no open ports, no infra to run.
        </p>
        <div className="reveal">
          <ExpandableShot src="/videos/desktop-release.mp4" alt="An app built in Glyphh, released live at its own URL" />
        </div>
      </div>
    </section>
  );
}
