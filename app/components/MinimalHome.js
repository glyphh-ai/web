import Image from 'next/image';
import AdaField from './AdaField';

// THE MINIMAL HOME (his order, 2026-10-13): one line at the centre of the page.
// Since 2026-10-20: the promise, what Ada is in one sentence, the two next
// steps, Ada learning (AdaField) with its workflow under it, the experiment
// labelled as one, and one quiet row of links, the Glyphh wordmark first in it.
export default function MinimalHome() {
  return (
    <main className="mh-page">
      <h1 className="mh-line">Stop paying an LLM to classify familiar requests.</h1>
      <p className="mh-what">
        Glyphh Ada classifies anything you have labelled examples of — tickets, transactions, documents, events —
        returns a confidence and the precedents behind it, and lets your application send the uncertain ones to an
        LLM. Run it on your own infrastructure.
      </p>
      <div className="mh-actions">
        <a href="https://platform.glyphh.ai" className="os-cta os-cta-primary">Start free</a>
        <a href="/use-cases/support-routing" className="os-cta os-cta-ghost">See ticket routing in action</a>
      </div>
      <div className="mh-field">
        <AdaField />
      </div>
      <ol className="mh-flow" aria-label="How Ada works">
        <li>Labelled examples</li>
        <li>A new item</li>
        <li>Class and confidence</li>
        <li>Unsure: the LLM</li>
      </ol>
      <nav className="mh-links" aria-label="Glyphh">
        <a href="/" className="mh-mark" aria-label="Glyphh">
          <Image className="logo-dark" src="/glyphh-logo-text-white.png" alt="" width={417} height={130} priority />
          <Image className="logo-light" src="/glyphh-logo-text-black.png" alt="" width={442} height={162} priority />
        </a>
        <a href="/products/ada">Ada</a>
        <a href="/use-cases">Use cases</a>
        <a href="/pricing">Pricing</a>
        <a href="https://docs.glyphh.ai">Docs</a>
        <a href="https://platform.glyphh.ai">Sign in</a>
      </nav>
    </main>
  );
}
