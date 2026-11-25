import { CTA } from '../lib/site';

// The studio's one call to action, at the foot of every page.
export default function CtaBand() {
  return (
    <section className="st-cta">
      <div>
        <h2>Have a problem?</h2>
        <p>
          Whether it&rsquo;s an inefficient workflow, a complicated technical challenge or an idea you don&rsquo;t know how
          to implement, Glyphh can help you explore and build a solution.
        </p>
      </div>
      <div className="st-actions" style={{ marginTop: 0 }}>
        <a className="st-btn primary" href="/work-with-me">Tell me about your problem</a>
        <a className="st-btn" href="/submit-a-problem" title={CTA}>Submit a problem for the channel</a>
      </div>
    </section>
  );
}
