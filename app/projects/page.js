import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CtaBand from '../components/CtaBand';
import Board from './Board';
import { PROJECTS, CATEGORIES } from './projects';

export const metadata = {
  title: 'Projects — Glyphh',
  description: 'Applications, experiments, tools and open-source software from the Glyphh studio. Each one is a problem, the way it was approached, and what came of it.',
  alternates: { canonical: '/projects' },
  openGraph: { title: 'Projects — Glyphh', description: 'Applications, experiments, tools and open-source software from the Glyphh studio.', url: '/projects' },
};

export default function ProjectsPage() {
  return (
    <div className="st">
      <Nav />
      <main className="st-main">
        <span className="st-kicker">Projects</span>
        <h1>Things I&rsquo;ve built.</h1>
        <p className="st-lede">
          Applications, experiments, tools and research. Some are finished, some are experiments, some are archived.
          Not every one is a business, and not every experiment worked. Each page tells the problem and what came of it.
        </p>
        <Board projects={PROJECTS} categories={CATEGORIES} />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
