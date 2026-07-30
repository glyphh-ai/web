import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import CliHero from '../../components/CliHero';
import CliFeatures from '../../components/CliFeatures';
import CliFinal from '../../components/CliFinal';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Glyphh CLI — The whole agent, in your terminal.',
  description: 'The same engine as Glyphh Desktop, full-screen in your shell. Real tools, your loops and models, your governance — scriptable, headless, and no API keys to wrangle.',
};

export default function GlyphhCliPage() {
  return (
    <>
      <Reveal />
      <Nav />
      <CliHero />
      <CliFeatures />
      <CliFinal />
      <Footer />
    </>
  );
}
