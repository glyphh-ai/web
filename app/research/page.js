import Nav from '../components/Nav';
import Footer from '../components/Footer';
import LetterField from '../components/LetterField';

/**
 * /research — the thinking under Ada, in the frame. Off the site for now
 * (next.config.mjs redirects /research to /), so it stays honest for the day
 * it returns: only what is built, and the repos it is built in.
 */

const GITHUB_URL = 'https://github.com/glyphh-ai';

export const metadata = {
  title: 'Research — Glyphh',
  description:
    'The thinking under Ada: answers from the nearest precedents, calibrated confidence, weights learnt from your own cases, and an LLM only for the cases Ada has not seen.',
};

// The stack: each a real repo.
const STACK = [
  { tag: 'classifier', name: 'Ada', title: 'Answers from precedent', desc: 'Typed models that learn from labelled examples and answer with a calibrated confidence and the precedents behind it.', href: '/', internal: true },
  { tag: 'cloud', name: 'Ada Cloud', title: 'Where your models run', desc: 'Glyphh’s cloud, isolated per organisation: the API at ada.glyphh.ai and the connector for Claude.', href: 'https://docs.glyphh.ai' },
  { tag: 'developer', name: 'glyphh', title: 'The plugin and the SDKs', desc: 'The Claude plugin with the Ada skill, and the Python and TypeScript SDKs your software calls Ada with.', href: `${GITHUB_URL}/glyphh` },
];

export default function ResearchPage() {
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/" className="ix-crumb">&larr; Home</a>
          <span className="qs-kicker">Research</span>
          <h1 className="ix-title">The thinking under Ada.</h1>
          <p className="ix-lede">
            Answers from the nearest precedents, a confidence you can trust, and an LLM only for the cases Ada has not
            seen yet.
          </p>
          <div className="ix-actions">
            <a href="https://platform.glyphh.ai" className="os-cta os-cta-primary">Start free</a>
            <a href="/use-cases/support-routing" className="os-cta os-cta-ghost">See ticket routing in action</a>
          </div>
        </section>

        <section className="ix-section rs-prose">
          <span className="qs-kicker">The thread</span>
          <p>
            In 1843 Ada Lovelace saw that machines could act on symbols, not just numbers. Ada is named for her: it
            works on the typed fields of your cases, and every answer can be traced back to the cases it came from.
          </p>
        </section>

        <section className="ix-section rs-prose" id="trust">
          <span className="qs-kicker">How an answer is made</span>
          <h2 className="ix-h2">Arithmetic on your own cases.</h2>
          <p>
            Each labelled example you record is a precedent. A new case is compared with them field by field, and the
            nearest decide the answer, with a calibrated confidence and the precedents it stands on. Ada learns its own
            weights from the cases you have graded, so the fields that predict the outcome count for more. The same
            question always gets the same answer.
          </p>
          <p>
            When nothing is close enough, Ada says so instead of guessing. Your application hands that case to an LLM
            or a person, and the answer is recorded, so the next case like it is Ada&rsquo;s.
          </p>
        </section>

        <section className="ix-section" id="stack">
          <div className="ix-section-head">
            <div>
              <span className="qs-kicker">The stack</span>
              <h2 className="ix-h2">What it is built in</h2>
            </div>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="qs-more">github.com/glyphh-ai &rarr;</a>
          </div>
          <div className="hv-grid rs-grid">
            {STACK.map((s, i) => (
              <a key={s.name} href={s.href} {...(s.internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })} className="hv-tile rs-tile">
                <LetterField seed={i + 20} />
                <span className="rs-tag">{s.tag}</span>
                <h3 className="hv-tile-title">{s.name}</h3>
                <p className="hv-tile-head">{s.title}</p>
                <p className="hv-tile-body">{s.desc}</p>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
