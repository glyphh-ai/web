import Nav from '../components/Nav';
import Footer from '../components/Footer';
import LetterField from '../components/LetterField';
import { adaLive } from '../lib/ada-live';

/**
 * /research — the substrate (site.md §7), in the frame (site refactor
 * 2026-09-22). This page is why "validated" and "deterministic" are real
 * words on this site: the thread from Lovelace to vector-symbolic memory,
 * why micro programs can be trusted, the five repos, and the path from
 * research idea to product. The pre-refactor page's bands (ResearchBand,
 * AdaSection) stay in the tree, unmounted.
 */

const GITHUB_URL = 'https://github.com/glyphh-ai';

export const metadata = {
  title: 'Research — Glyphh',
  description:
    'The science under the operating system: hyperdimensional computing, schema-on-write memory, and deterministic runtimes — published as running code.',
};

// The stack: each a real repo (site.md §7.4).
// The adaL and ada repos are listed only with Ada on (one switch: app/lib/ada-live.js).
const STACK = [
  ...(adaLive() ? [
  { tag: 'memory', name: 'adaL', title: 'Memory that never confabulates', desc: 'Schema-on-write: exact answers, versioned history, no model in the read path.', href: `${GITHUB_URL}/adaL` },
  { tag: 'engine', name: 'ada', title: 'The engine everything plugs into', desc: 'Ingestion, querying, streaming, MCP tools.', href: `${GITHUB_URL}/ada` },
  ] : []),
  { tag: 'hdc', name: 'models', title: 'Inference in microseconds, no GPU', desc: 'Pure hyperdimensional computing for classification and intent.', href: `${GITHUB_URL}/models` },
  { tag: 'runtime', name: 'rrotor', title: 'Deterministic agent loops', desc: 'The open RotorSpec runtime: reproducible runs, auditable behavior.', href: `${GITHUB_URL}/rrotor` },
  { tag: 'agent', name: 'code', title: 'The coding agent, in the open', desc: 'The governed loop the desktop is built on, with memory wired in from the first turn.', href: GITHUB_URL, soon: true },
];

// Why micro programs can be trusted. A server component, so it lands in the page
// as the section itself, with or without the thread above it.
function Trust() {
  return (
    <section className="ix-section rs-prose" id="trust">
      <span className="qs-kicker">Why micro programs can be trusted</span>
      <h2 className="ix-h2">Deterministic is a property, not a promise.</h2>
      <p>
        A micro program is only as trustworthy as its substrate. Schema-on-write memory means no model in the read
        path &mdash; exact answers, versioned history. HDC inference runs in microseconds with no GPU &mdash; the
        same input gives the same answer. Deterministic loops make every run reproducible and auditable.
        That&rsquo;s what &ldquo;validated&rdquo; means here.
      </p>
    </section>
  );
}

export default function ResearchPage() {
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/" className="ix-crumb">&larr; Home</a>
          <span className="qs-kicker">Research</span>
          <h1 className="ix-title">The science under the operating system.</h1>
          <p className="ix-lede">
            Hyperdimensional computing, schema-on-write memory, and deterministic runtimes &mdash; published as
            running code.
          </p>
          <div className="ix-actions">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="os-cta os-cta-primary">Follow the work on GitHub &rarr;</a>
            <a href="#stack" className="os-cta os-cta-ghost">The stack</a>
          </div>
        </section>

        {/* The Lovelace thread opens the trust section only with Ada on (one switch: app/lib/ada-live.js). */}
        {adaLive() ? (
          <>
            <section className="ix-section rs-prose">
              <span className="qs-kicker">The thread</span>
              <p>
                In 1843 Ada Lovelace saw that machines could act on symbols, not just numbers &mdash; patterns woven,
                never guessed. Vector-symbolic architectures make that exact: memory that never confabulates, inference
                you can reproduce.
              </p>
            </section>
            <Trust />
          </>
        ) : <Trust />}

        <section className="ix-section" id="stack">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">The stack</span>
              <h2 className="ix-h2">From representation to running agent</h2>
            </div>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="qs-more">github.com/glyphh-ai &rarr;</a>
          </div>
          <div className="hv-grid rs-grid">
            {STACK.map((s, i) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="hv-tile rs-tile">
                <LetterField seed={i + 20} />
                <span className="rs-tag">{s.tag}{s.soon ? ' · coming soon' : ''}</span>
                <h3 className="hv-tile-title">{s.name}</h3>
                <p className="hv-tile-head">{s.title}</p>
                <p className="hv-tile-body">{s.desc}</p>
              </a>
            ))}
            <div className="hv-tile rs-tile rs-tile-note">
              <span className="rs-tag">from idea to product</span>
              <p className="hv-tile-body">
                {adaLive() ? (
                  <>
                    This isn&rsquo;t a lab arm. adaL is the memory in the desktop; rrotor runs the loops; hdc models route
                    intent in the kernel. The path from research idea to program you can run is the product.
                  </>
                ) : (
                  <>
                    This isn&rsquo;t a lab arm. rrotor runs the loops; hdc models route
                    intent in the kernel. The path from research idea to program you can run is the product.
                  </>
                )}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
