import Nav from './components/Nav';
import Reveal from './components/Reveal';
import Hero from './components/Hero';
import StoryHeads from './components/StoryHeads';
import FeatureGrid from './components/FeatureGrid';
import ReleaseStrip from './components/ReleaseStrip';
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
      {/* The new messaging pass, top-down: header bands for every section of
          the story. Bodies land under them next; nothing below is removed
          until each band absorbs or replaces its old section. */}
      <StoryHeads />
      {/* The story: the detail grid → shipped (Release) — Connections moved
          up into its StoryHeads band (icon river + note live there now). */}
      <FeatureGrid />
      <ReleaseStrip />
      {/* The close: pricing → download → FAQ → the final CTA. */}
      <Pricing />
      <Download />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
