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
  title: 'Glyphh Desktop — Your AI coworker. It actually does the work.',
  description: 'Delegate real work to an AI coworker: it builds decks, clears inboxes, updates sheets, and runs your recurring work on schedule — across the apps you already use, asking first when it matters.',
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
