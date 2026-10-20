import Image from 'next/image';
import AdaField from './AdaField';

// THE MINIMAL HOME (his order, 2026-10-13): the Glyphh logo at the centre of
// the page and one line under it. Since 2026-10-20 the line is Ada's, with
// Ada learning beside it (AdaField) and one quiet row of links.
export default function MinimalHome() {
  return (
    <main className="mh-page">
      <Image className="mh-logo logo-dark" src="/glyphh-logo-text-white.png" alt="Glyphh" width={417} height={130} priority />
      <Image className="mh-logo logo-light" src="/glyphh-logo-text-black.png" alt="" width={442} height={162} priority />
      <h1 className="mh-line">Glyphh Ada is a classifier that improves as more data is classified.</h1>
      <div className="mh-field">
        <AdaField />
      </div>
      <p className="mh-sub">
        A classifier that answers from its nearest precedents, says how sure it is, and asks when it is not. In a
        runtime you run yourself.
      </p>
      <nav className="mh-links" aria-label="Glyphh">
        <a href="/products/ada">Ada</a>
        <a href="/pricing">Pricing</a>
        <a href="https://docs.glyphh.ai">Docs</a>
        <a href="https://platform.glyphh.ai">Sign in</a>
      </nav>
    </main>
  );
}
