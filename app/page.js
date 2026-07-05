import Nav from './components/Nav';
import Reveal from './components/Reveal';
import ResearchHero from './components/ResearchHero';
import ResearchPillars from './components/ResearchPillars';
import OpenSourceSection from './components/OpenSourceSection';
import ProductsSection from './components/ProductsSection';
import ResearchCTA from './components/ResearchCTA';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Reveal />
      <Nav />
      <ResearchHero />
      <ResearchPillars />
      <OpenSourceSection />
      <ProductsSection />
      <ResearchCTA />
      <Footer />
    </>
  );
}
