import ExpandableShot from './ExpandableShot';

/**
 * ReleaseStrip — "{ RELEASE }" — the payoff of the heart: work ships as a
 * live app. One looping 16:9 product video (/screen-shots/glyphh-release.mp4;
 * swap the file to refresh) under the published URL.
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
          <ExpandableShot src="/screen-shots/glyphh-release.mp4" alt="An app built in Glyphh, released live at its own URL" />
        </div>
      </div>
    </section>
  );
}
