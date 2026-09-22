import { APPS_ROW1, APPS_ROW2 } from './apps-data';
import ModelTicker from './ModelTicker';

/**
 * WorksWith — the "Works with everything" section in the frame (site refactor
 * 2026-09-22). Two rows of service tiles scroll past each other with a tick
 * rail between, inside a High Vis panel, under a kicker row; a two-link
 * footer sends people to the full catalogs. The tiles are the favicon wall
 * from AppMarquee, squared off. CSS-only motion; a static row under
 * prefers-reduced-motion.
 */

function Row({ apps, direction }) {
  return (
    <div className="ww-row">
      <div className={`ww-track ${direction}`}>
        {[0, 1].map((s) =>
          apps.map((app) => (
            <div
              key={`${app.domain}-${s}`}
              className="ww-tile"
              aria-hidden={s === 1 || undefined}
            >
              <img
                src={`https://www.google.com/s2/favicons?domain=${app.domain}&sz=64`}
                alt=""
                width={30}
                height={30}
                decoding="async"
                fetchPriority="low"
              />
              <span>{app.name}</span>
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export default function WorksWith() {
  return (
    <section className="ww" id="works-with">
      <div className="qs-head">
        <span className="qs-kicker">Works with everything</span>
        <a href="/integrations" className="qs-more">Explore integrations &rarr;</a>
      </div>
      <div className="hv-panel ww-panel">
        <Row apps={APPS_ROW1} direction="scroll-left" />
        {/* The tick rail between the rows came off (his order, 2026-09-22). Hidden, not deleted. */}
        {false && <div className="ww-rail" aria-hidden="true" />}
        {/* The model ticker (his order, 2026-09-22): a split-flap row of model names between the connection rows. */}
        <ModelTicker />
        <Row apps={APPS_ROW2} direction="scroll-right" />
        <div className="ww-foot">
          <a href="/integrations/connect">Browse all connections &rarr;</a>
          <a href="/integrations/models">See every model &rarr;</a>
        </div>
      </div>
    </section>
  );
}
