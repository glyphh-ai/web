/**
 * CliBridge — one short band: the CLI and Desktop are two ways into the
 * same workspace.
 */

export default function CliBridge() {
  return (
    <section className="cli-bridge" id="desktop-bridge">
      <div className="container">
        <div className="prods-pricing reveal">
          <div className="prods-pricing-copy">
            <h3>Same thread, both surfaces.</h3>
            <p>
              Start in the terminal, open Desktop later &mdash; your agents,
              skills, and everything you&rsquo;ve built are already there. One
              workspace, two ways in.
            </p>
          </div>
          <a href="/products/desktop" className="btn btn-primary btn-lg group">
            <span className="btn-label">Get Glyphh Desktop &rarr;</span>
            <span className="btn-fill"></span>
          </a>
        </div>
      </div>
    </section>
  );
}
