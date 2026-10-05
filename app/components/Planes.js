import Art from './Art';

/**
 * Planes — the section above How it works. The minimal cut (his order,
 * 2026-10-05: "more minimalistic images then just a bunch of squares with
 * lights around them moving"): the deck's planes picture — four boxes on
 * one base, the loop drawn once, one purple dot — and his four texts in a
 * row beneath, each under its box. The particle pipeline, the letter fields
 * and the desktop bus with the loop favicons stood here until this commit.
 */

const PLANES = [
  { n: '01', title: 'Build Plane', body: 'Blend AI models with your connections, data, and tasks to build applications that run 95%+ of the time without AI at runtime.', href: 'https://docs.glyphh.ai/skills' },
  { n: '02', title: 'Runtime (rrotor)', body: 'Run frontier and open-weight models together to cut cost and raise quality.', href: 'https://docs.glyphh.ai/gateway' },
  { n: '03', title: 'Control Plane', body: 'Approve models, review apps, manage spend, and decide how apps are delivered and governed.', href: 'https://docs.glyphh.ai/gateway' },
  { n: '04', title: 'Teams', body: 'Use AI for personal productivity, and lean on curated apps, connections, and the harness for massive gains across the team.', href: 'https://docs.glyphh.ai/install' },
];

export default function Planes() {
  return (
    <section className="pl" id="planes">
      <div className="qs-head">
        <span className="qs-kicker">The planes</span>
        <a href="#how-it-works" className="qs-more">How it works &darr;</a>
      </div>

      <div className="pl-fig">
        <Art name="planes" alt="The four planes in a loop: build, runtime, control, teams" />
      </div>

      <div className="pl-cols">
        {PLANES.map((p) => (
          <a key={p.n} href={p.href} className="pl-col">
            <span className="pl-n">{p.n}</span>
            <h3 className="pl-title">{p.title}</h3>
            <p className="pl-body">{p.body}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
