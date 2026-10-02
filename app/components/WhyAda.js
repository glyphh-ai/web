/**
 * WhyAda: the "Why Ada?" tribute, ported from AdaSection (2026-07) into the
 * frame grammar (his order, 2026-10-01): a kicker row, the heading, then the
 * quote beside the copy and the timeline, square and hairlined like the rest
 * of the page. The words are the original's; "our memory system" became Ada,
 * the model, which is what carries her name now.
 */

const TIMELINE = [
  { year: '1815', event: 'Augusta Ada Byron is born in London.' },
  { year: '1843', event: 'Note G: the first published computer program, written for a machine that didn\u2019t exist yet.' },
  { year: '1852', event: 'Ada dies at 36, a century before her program could run.' },
  { year: 'today', event: 'Ada, our first model, carries her name and her idea forward.' },
];

export default function WhyAda() {
  return (
    <section className="hiw why-ada" id="why-ada">
      <div className="qs-head">
        <span className="qs-kicker">Why &ldquo;Ada&rdquo;?</span>
        <a href="/products/ada" className="qs-more">Meet Ada &rarr;</a>
      </div>
      <h2 className="ix-h2 lt-h2">Named for the first programmer.</h2>
      <p className="ix-desc">
        Ada is named for Ada Lovelace, because she saw, before anyone, what we&rsquo;re still building.
      </p>

      <div className="why-ada-grid">
        <figure className="why-ada-quote">
          <span className="why-ada-mark" aria-hidden="true">&ldquo;</span>
          <blockquote>
            The Analytical Engine weaves algebraic patterns, just as the Jacquard loom weaves flowers and leaves.
          </blockquote>
          <figcaption>
            <span className="why-ada-name">Ada Lovelace</span>
            <span className="why-ada-note">Notes on the Analytical Engine &middot; 1843</span>
          </figcaption>
        </figure>

        <div className="why-ada-copy">
          <p>
            In 1843, Ada Lovelace published the first computer program, and then went further than the machine
            itself. She argued that an engine could act on <em>symbols</em>, not just numbers: that if
            relationships could be represented, a machine could compose music, reason over language, weave
            structure.
          </p>
          <p>
            That is the oldest statement of the bet we&rsquo;re making. Vector-symbolic architectures treat
            knowledge as symbols you can compute with. Ada holds meaning as structure, not approximation, so it
            answers exactly, the way she imagined machines would: patterns woven, never guessed.
          </p>
          <ol className="why-ada-timeline">
            {TIMELINE.map((t) => (
              <li key={t.year}>
                <span className="why-ada-year">{t.year}</span>
                <span className="why-ada-event">{t.event}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
