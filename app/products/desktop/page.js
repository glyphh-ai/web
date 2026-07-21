import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import CoworkHero from '../../components/CoworkHero';
import Integrations from '../../components/Integrations';
import LoopStrip from '../../components/LoopStrip';
import DevLayout from '../../components/DevLayout';
import Cowork from '../../components/Cowork';
import Controls from '../../components/Controls';
import Screenshots from '../../components/Screenshots';
import Pricing from '../../components/Pricing';
import Download from '../../components/Download';
import FAQ from '../../components/FAQ';
import FinalCTA from '../../components/FinalCTA';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Glyphh Desktop — The team agent for real work.',
  description: 'Glyphh Desktop is the team collaboration agent that gets real work done — across the tools you already use, with frontier and open-weight models in one subscription, and you deciding how far it goes.',
};

export default function GlyphhDesktopPage() {
  return (
    <>
      <Reveal />
      <Nav />
      <CoworkHero />
      <Integrations />
      <LoopStrip />
      <DevLayout />
      <Cowork />
      <Controls />
      <Screenshots />
      <Pricing />
      <Download />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
