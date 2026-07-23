import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import CliHero from '../../components/CliHero';
import CliFeatures from '../../components/CliFeatures';
import CliFinal from '../../components/CliFinal';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Glyphh CLI — The whole agent, in your terminal.',
  description: 'The same engine that drives Glyphh Desktop, as a full-screen TUI in your shell. Real local tools (shell, files, the web), your loops and models, permission modes, and machine-reach — scriptable, headless, and metered through the gateway. No API keys to wrangle.',
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
