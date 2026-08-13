import Nav from './components/Nav';
import Reveal from './components/Reveal';
import Hero from './components/Hero';
import Integrations from './components/Integrations';
import FeatureGrid from './components/FeatureGrid';
import ReleaseStrip from './components/ReleaseStrip';
import Controls from './components/Controls';
import Pricing from './components/Pricing';
import Download from './components/Download';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

// The 2026-08 rebuild, section by section. Hero first; the old HomeHero
// (tabs + dream reel) stays in the tree until the switching story lands in
// its own band, then gets deleted or absorbed.

export default function Home() {
  return (
    <div className="home-page">
      <Reveal />
      <Nav />
      <Hero />
      {/* The story: the detail grid → it reaches everything (Connections) →
          shipped (Release) — the switch story lives in the hero's Home tab. */}
      <Integrations />
      <FeatureGrid />
      <ReleaseStrip />
      {/* The close: governance → pricing → download → FAQ → the final CTA. */}
      <Controls />
      <Pricing />
      <Download />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
