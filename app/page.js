import Nav from './components/Nav';
import Reveal from './components/Reveal';
import Hero from './components/Hero';
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
      <Footer />
    </div>
  );
}
