import Nav from './components/Nav';
import Reveal from './components/Reveal';
import HomeHero from './components/HomeHero';
import Footer from './components/Footer';

// Down to the frame: nav, hero, footer. Nothing between them.

export default function Home() {
  return (
    <div className="home-page">
      <Reveal />
      <Nav />
      <HomeHero />
      <Footer />
    </div>
  );
}
