const TIMELINE = [
  { year: '1815', event: 'Augusta Ada Byron is born in London.' },
  { year: '1843', event: 'Note G — the first published computer program, written for a machine that didn’t exist yet.' },
  { year: '1852', event: 'Ada dies at 36, a century before her program could run.' },
  { year: 'today', event: 'Ada — our memory system — carries her name and her idea forward.' },
];

export default function AdaSection() {
  return (
    <section className="ada" id="why-ada">
      <div className="container">
        <div className="section-label">{'{'} <span className="accent">WHY &ldquo;ADA&rdquo;?</span> {'}'}</div>
        <h2 className="section-title">Named for the first programmer</h2>
        <p className="section-sub">
          Our memory research is named for Ada Lovelace — because she saw,
          before anyone, what we&apos;re still building.
        </p>

        <div className="ada-card reveal">
          <div className="ada-quote-col">
            <span className="ada-quote-mark" aria-hidden="true">&ldquo;</span>
            <blockquote className="ada-quote">
              The Analytical Engine weaves algebraic patterns, just as the
              Jacquard loom weaves flowers and leaves.
            </blockquote>
            <div className="ada-attrib">
              <span className="ada-attrib-name">Ada Lovelace</span>
              <span className="ada-attrib-note">Notes on the Analytical Engine · 1843</span>
            </div>
          </div>
          <div className="ada-copy-col">
            <p>
              In 1843, Ada Lovelace published the first computer program —
              and then went further than the machine itself. She argued that
              an engine could act on <em>symbols</em>, not just numbers:
              that if relationships could be represented, a machine could
              compose music, reason over language, weave structure.
            </p>
            <p>
              That is the oldest statement of the bet we&apos;re making.
              Vector-symbolic architectures treat knowledge as symbols you
              can compute with. Our memory system stores facts as structure,
              not approximation — so it recalls exactly, the way Ada
              imagined machines would: patterns woven, never guessed.
            </p>
            <ol className="ada-timeline">
              {TIMELINE.map((t) => (
                <li key={t.year}>
                  <span className="ada-year">{t.year}</span>
                  <span className="ada-event">{t.event}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
