import ExpandableShot from './ExpandableShot';

/**
 * ReleaseStrip — the Build close: work ships as a live app. Plays the
 * desktop release film (/videos/desktop-release.mp4) under the published URL.
 */

export default function ReleaseStrip() {
  return (
    <section className="release" id="release">
      <div className="container">
        <h2 className="section-title reveal">Build it. Ship it. Share it.</h2>
        <div className="release-url reveal" aria-hidden="true">
          <span className="release-lock">🔒</span> your-app.glyphh.app
        </div>
        <p className="section-subtitle reveal">
          Ask for an app and Glyphh goes all the way — built, hosted, and
          published at its own URL, on your phone, shareable with your team.
          Work that used to end as a file ends as a product.
        </p>

        <div className="reveal">
          <ExpandableShot src="/videos/desktop-release.mp4" alt="The Glyphh desktop release film" />
        </div>
      </div>
    </section>
  );
}
