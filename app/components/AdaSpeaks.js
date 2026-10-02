import HoloTree from './HoloTree';
import DistortField from './DistortField';

/**
 * AdaSpeaks: the section before Products (his order, 2026-10-01). The
 * hologram fact tree on one side, his words on the other: "Ada speaks in
 * math." and the two sentences that say what that means.
 */
export default function AdaSpeaks() {
  return (
    <section className="hiw ada-speaks" id="ada">
      <DistortField />
      <div className="qs-head">
        <span className="qs-kicker">Ada</span>
        <a href="/products/ada" className="qs-more">Meet Ada &rarr;</a>
      </div>
      <div className="ada-speaks-grid">
        <HoloTree />
        <div className="ada-speaks-copy">
          <h2 className="ada-speaks-h">Ada speaks in <em>math.</em></h2>
          <p>
            A mathematical structure that carries state: hierarchical, weighted, typed and temporal.
          </p>
          <p>
            Send it a like glyph and it answers with a fact tree: what is near, how near, and why.
          </p>
        </div>
      </div>
    </section>
  );
}
