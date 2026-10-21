import Image from 'next/image';
import AdaField from './components/AdaField';
import { HOME_TITLE, HOME_DESCRIPTION } from './lib/home-meta';

// THE BETA PAGE (his order, 2026-10-21): while Ada Cloud is built, the site is
// this one page: the promise, Ada learning, and one way in, an email about the
// beta. Every other address comes here (middleware.js); the Ada home page as it
// was is in git history (app/page.js before this change).

const BETA_HREF = 'mailto:sales@glyphh.ai?subject=Glyphh%20beta';

export const metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <main className="mh-page">
      <h1 className="mh-line">Stop paying an LLM to classify familiar requests.</h1>
      <p className="mh-what">
        Glyphh Ada classifies anything you have labelled examples of, returns a confidence and the precedents behind
        it, and sends only the uncertain ones to an LLM. It is in private beta.
      </p>
      <div className="mh-actions">
        <a href={BETA_HREF} className="os-cta os-cta-primary">Email us about the beta</a>
      </div>
      <div className="mh-field">
        <AdaField />
      </div>
      {/* The wordmark lives in this bottom row, never at the top of the page (his order, 2026-10-20). */}
      <nav className="mh-links" aria-label="Glyphh">
        <a href="/" className="mh-mark" aria-label="Glyphh">
          <Image className="logo-dark" src="/glyphh-logo-text-white.png" alt="" width={417} height={130} priority />
          <Image className="logo-light" src="/glyphh-logo-text-black.png" alt="" width={442} height={162} priority />
        </a>
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
      </nav>
    </main>
  );
}
