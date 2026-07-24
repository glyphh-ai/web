import Nav from './components/Nav';
import Reveal from './components/Reveal';
import ResearchHero from './components/ResearchHero';
import ProductSpotlight from './components/ProductSpotlight';
import ResearchPillars from './components/ResearchPillars';
import ProductsSection from './components/ProductsSection';
import AdaSection from './components/AdaSection';
import ResearchCTA from './components/ResearchCTA';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Reveal />
      <Nav />
      <ResearchHero />
      {/* Products lead — what you can use today, pricing right under it. */}
      <ProductsSection />
      {/* The desktop, up close. */}
      <ProductSpotlight />
      {/* The technology, one story each (not repeated three ways). The open-
          source repos live on /research now, not a redundant home section. */}
      <AdaSection />
      <ResearchPillars />
      <ResearchCTA />
      <Footer />
    </>
  );
}
