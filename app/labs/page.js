import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CtaBand from '../components/CtaBand';
import ProjectCard from '../components/ProjectCard';
import { PROJECTS } from '../projects/projects';

/**
 * /labs: deeper research and experimental technology. The decision engine (Ada) lives here now, as reusable
 * technology rather than a product on sale. Experimental results are marked as experimental.
 */

export const metadata = {
  title: 'Labs — Glyphh',
  description: 'Deeper technical research and experimental technology: the Glyphh decision engine, multi-model intelligence, memory in language models, and what the experiments found.',
  alternates: { canonical: '/labs' },
  openGraph: { title: 'Labs — Glyphh', description: 'Research and experimental technology from the Glyphh studio.', url: '/labs' },
};

const LAB = PROJECTS.filter((p) => p.category === 'Labs' || p.category === 'Research');

export default function LabsPage() {
  return (
    <div className="st">
      <Nav />
      <main className="st-main">
        <span className="st-kicker">Labs</span>
        <h1>Research and experiments.</h1>
        <p className="st-lede">
          Where the deeper technical work lives: decision systems, memory in language models, multi-model intelligence,
          agent architectures and knowledge representation. Experimental results are labelled as experiments; nothing here
          is claimed as a production capability unless it was validated as one.
        </p>

        <section className="st-section">
          <div className="st-section-head">
            <h2>The decision engine</h2>
            <a href="/projects/glyphh-ai-decision-engine">The full story &rarr;</a>
          </div>
          <div className="st-two" style={{ alignItems: 'start' }}>
            <div className="st-prose">
              <p>
                Ada is an experimental decision intelligence engine. It learns from past cases and their outcomes, answers a new
                case from its nearest precedents with a calibrated confidence, shows the precedents behind every answer, and hands
                the cases it is unsure of to a person or an LLM. It runs on hyperdimensional computing, on a CPU, with no
                transformer in the decision path.
              </p>
              <p>
                It was built and sold as a hosted service, Ada Cloud, through 2026. That service is shut down. The engine, its SDKs,
                its Claude plugin, its benchmarks and its documentation are open source, as reusable technology.
              </p>
            </div>
            <div>
              <ul className="st-list" style={{ gridTemplateColumns: '1fr' }}>
                <li><a className="st-link" href="https://github.com/glyphh-ai/glyphh" target="_blank" rel="noopener noreferrer">Source: github.com/glyphh-ai/glyphh</a></li>
                <li><a className="st-link" href="https://docs.glyphh.ai" target="_blank" rel="noopener noreferrer">Documentation: docs.glyphh.ai</a> (written for the hosted service, kept as the engine&rsquo;s reference)</li>
                <li><a className="st-link" href="/journal/introducing-ada">Introducing Ada</a>, the launch write-up with the benchmarks</li>
                <li><a className="st-link" href="/journal/typed-answers">Typed answers</a>: scores, yes or no, numbers, labels and unions</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="st-section">
          <div className="st-section-head"><h2>In the lab</h2></div>
          <div className="st-cards">
            {LAB.map((p) => <ProjectCard key={p.slug} p={p} />)}
          </div>
        </section>

        <section className="st-section">
          <div className="st-section-head"><h2>Open questions</h2></div>
          <ul className="st-list">
            <li>Do several AI models together beat one, and when does aggregating them fail?</li>
            <li>Can a frozen language model learn from what it is told without drifting into nonsense over time?</li>
            <li>Where does deciding from precedent beat a model, and where does it lose?</li>
            <li>How should agents divide up work in one repository without stepping on each other?</li>
          </ul>
        </section>
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
