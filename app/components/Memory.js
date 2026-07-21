/**
 * Memory — "It remembers." One exchange: an old decision asked for in plain
 * words, recalled with a source chip. Semantic memory, never named that.
 */
export default function Memory() {
  return (
    <section className="memory" id="memory">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">MEMORY</span> {'}'}</div>
        <h2 className="section-title reveal">It remembers.</h2>
        <p className="mm-sub reveal">
          Decisions, preferences, that thing from March — memory is built in,
          not bolted on.
        </p>

        <div className="mm-stage reveal" aria-hidden="true">
          <div className="mm-q">What did we decide about EU pricing?</div>
          <div className="mm-a">
            <p>Annual-only at launch, VAT-inclusive — revisit after Q3.</p>
            <span className="mm-src">⌁ recalled · pricing call · Mar 12</span>
          </div>
        </div>
      </div>
    </section>
  );
}
