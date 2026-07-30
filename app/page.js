import Nav from './components/Nav';
import Reveal from './components/Reveal';
import ResearchHero from './components/ResearchHero';
import ProductSpotlight from './components/ProductSpotlight';
import ResearchBand from './components/ResearchBand';
import ResearchPillars from './components/ResearchPillars';
import ProductsSection from './components/ProductsSection';
import AdaSection from './components/AdaSection';
import ResearchCTA from './components/ResearchCTA';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="home-page">
      <Reveal />
      <Nav />
      {/* Product-first: the hero carries the desktop positioning. */}
      <ResearchHero />
      {/* Products — what you can use today, pricing right under it. */}
      <ProductsSection />
      {/* The desktop, up close. */}
      <ProductSpotlight />
      {/* The credibility layer: the research band opens with the line that
          used to lead the hero, then Ada and the pillars. */}
      <ResearchBand />
      <AdaSection />
      <ResearchPillars />
      <ResearchCTA />
      <Footer />
    </div>
  );
}
