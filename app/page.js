import Nav from './components/Nav';
import Reveal from './components/Reveal';
import Footer from './components/Footer';
import AdaField from './components/AdaField';
import AdaStills from './components/AdaStills';
import LetterField from './components/LetterField';
import Receipt from './components/Receipt';
import { HOME_TITLE, HOME_DESCRIPTION } from './lib/home-meta';

// THE HOME PAGE is Ada (his order, 2026-10-21). The clean-up (his order,
// 2026-10-25): the hero's words stay word for word and the field becomes the
// whole hero; the value proposition is the first section, with the published
// numbers; no code anywhere on the page; three sections, each fact once.
// Every number here is the launch post's and the use-case page's
// (benchmarks/banking77, benchmarks/german-credit in glyphh-ai/glyphh).

export const metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
};

const DOCS = 'https://docs.glyphh.ai';
const PLATFORM = 'https://platform.glyphh.ai';
const ROUTING = '/use-cases/support-routing';

const STATS = [
  { n: '97.5%', k: 'Routed right', c: 'Ada, then Claude for the 22% it was unsure of. Claude alone: 96.5%.', href: ROUTING },
  { n: '$0.22', k: 'Cost for the 200', c: 'Against $300 for the same messages with Claude alone.', href: ROUTING },
  { n: '156 of 200', k: 'Answered without a model', c: 'Right on 98.7% of the cases Ada kept.', href: ROUTING },
  { n: '54 to 170 ms', k: 'Time to answer', c: 'In Ada Cloud, up to a million precedents.', href: '/blog/introducing-ada' },
];

const REASONS = [
  {
    title: 'Same answer twice',
    body: 'There is no language model in the path. Ask the same question next quarter and you get the same outcome, the same probability and the same precedents. On German Credit’s 200 held-out loans, Ada’s cost to the bank was 100 against 110 and 114 for Claude.',
  },
  {
    title: 'Every answer shows its precedents',
    body: 'Each answer carries a calibrated probability, how many precedents voted and which ones. An auditor can open the cases a decision stood on, in your own records.',
  },
  {
    title: 'It asks when it is unsure',
    body: 'Below the bar you set, the answer is ask. Your software hands the case to a model or a person, records the result, and Ada has one more precedent.',
  },
];

const WAYS = [
  {
    title: 'From Claude',
    head: 'Claude builds the model with you',
    body: 'Add the Glyphh connector and the glyphh plugin. Claude signs in with your Glyphh account, no key to type, and its Ada skill writes the spec, loads your cases and asks the model.',
    href: `${DOCS}/plugin`,
  },
  {
    title: 'From your software',
    head: 'Two SDKs and an API',
    body: 'Python and JavaScript SDKs, or the API, with a key from the platform. One call to decide, one to record the outcome.',
    href: `${DOCS}/sdks`,
  },
  {
    title: 'From the platform',
    head: 'Models, keys and usage',
    body: 'Sign in to see your models, make keys for your code and follow your usage against your plan.',
    href: PLATFORM,
  },
];

function Tile({ title, head, body, href, i }) {
  const inner = (
    <>
      <LetterField seed={i + 1} />
      <h3 className="hv-tile-title">{title}</h3>
      {head ? <p className="hv-tile-head">{head}</p> : null}
      <p className="hv-tile-body">{body}</p>
    </>
  );
  return href ? <a href={href} className="hv-tile">{inner}</a> : <div className="hv-tile">{inner}</div>;
}

export default function Home() {
  return (
    <div className="home-page">
      <Reveal />
      <Nav />

      {/* THE HERO IS THE FIELD (his order, 2026-10-25). The words sit on it in a
          clear zone (data-clear); the field, the cases and the glow stay off them.
          The hero runs full width, closed by one hairline at its base, where the
          frame's rails start (his order, 2026-10-22). */}
      <section className="mh-hero mh-fill">
        <AdaField fill interactive />
        <div className="mh-copy" data-clear>
          <h1 className="mh-line">Give your code the ability to reason without an LLM.</h1>
          <p className="mh-what">
            Glyphh Ada classifies anything you have labelled examples of — tickets, transactions, documents, events and
            more — returns a confidence, probability gates, and the precedents behind each answer, so every decision can
            be audited.
          </p>
          <div className="mh-actions">
            <a href={PLATFORM} className="os-cta os-cta-primary">Start free</a>
            <a href={ROUTING} className="os-cta os-cta-ghost">See ticket routing in action</a>
          </div>
        </div>
      </section>

      <div className="site-frame">
        <section className="hs reveal" id="why">
          <div className="qs-head">
            <span className="qs-kicker">Why Ada</span>
            <a href={ROUTING} className="qs-more">The experiment &rarr;</a>
          </div>
          <h2 className="ix-h2 hs-h2">Most cases never need the language model.</h2>
          <p className="ix-desc hs-lede">
            On 200 bank messages, Ada answered the ones it was sure of and handed the rest to Claude. Together they beat
            Claude alone, for a fraction of the cost.
          </p>
          <div className="hv-panel st-panel">
            <div className="st-row">
              {STATS.map((s) => (
                <a key={s.k} href={s.href} className="st">
                  <span className="st-k">{s.k}</span>
                  <span className="st-n">{s.n}</span>
                  <span className="st-c">{s.c}</span>
                </a>
              ))}
            </div>
            <p className="st-foot">Banking77, 200 held-out messages, 77 intents. The experiment and every run are public.</p>
          </div>
          <div className="hv-grid hv-grid-3">
            {REASONS.map((r, i) => <Tile key={r.title} title={r.title} body={r.body} i={i} />)}
          </div>
        </section>

        <section className="hs reveal" id="answer">
          <div className="qs-head">
            <span className="qs-kicker">The answer</span>
            <a href={`${DOCS}/sdks`} className="qs-more">The SDKs &rarr;</a>
          </div>
          <h2 className="ix-h2 hs-h2">Every answer comes with its receipts.</h2>
          <p className="ix-desc hs-lede">
            Ada finds the precedents nearest the case, weighs them and reports what they say: a typed outcome, how sure
            it is, and the precedents that voted. One precedent is a thin vote, and the answer says so.
          </p>
          <Receipt />
          <AdaStills />
          <p className="hs-note">
            A model is a JSON spec and the cases you have labelled. Each graded case becomes a precedent, and Ada
            learns its own weights from them.
          </p>
        </section>

        <section className="hs reveal" id="where">
          <div className="qs-head">
            <span className="qs-kicker">Where it runs</span>
            <a href={`${DOCS}/getting-started`} className="qs-more">Getting started &rarr;</a>
          </div>
          <h2 className="ix-h2 hs-h2">Reach Ada from Claude or from your own code.</h2>
          <p className="ix-desc hs-lede">
            Your models live in Ada Cloud, isolated per organisation, with nothing to install. A model is a JSON spec
            and its precedents, and none of your code runs there. We never train on your data. Ada is in every plan,
            Free included.
          </p>
          <div className="hv-grid hv-grid-3">
            {WAYS.map((t, i) => <Tile key={t.title} {...t} i={i + 3} />)}
          </div>
          <div className="hs-actions">
            <a href={PLATFORM} className="os-cta os-cta-primary">Start free</a>
            <a href="/pricing" className="os-cta os-cta-ghost">See pricing</a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
