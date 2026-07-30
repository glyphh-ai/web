/**
 * ResearchBand — the credibility layer: opens the research half of the home
 * page with the line that used to lead the hero. Ada and the pillars follow.
 */

export default function ResearchBand() {
  return (
    <section className="research-band" id="research">
      <div className="container">
        <div className="section-label">{'{'} <span className="accent">THE RESEARCH</span> {'}'}</div>
        <h2 className="section-title">We put the human back in intelligence.</h2>
        <p className="section-sub">
          AI&rsquo;s amazing &mdash; until you leave it alone. Everything
          under Glyphh is grounded in real research &mdash; memory systems,
          vector-symbolic architectures, and runtimes with a person in the
          loop by design &mdash; and all of it lands on GitHub first.
          <a href="/research" className="pillars-link"> Explore the research →</a>
        </p>
      </div>
    </section>
  );
}
