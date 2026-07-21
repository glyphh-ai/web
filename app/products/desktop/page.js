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
  title: 'Glyphh Desktop — The AI that follows you everywhere you work.',
  description: 'Build a slide deck, clear your inbox, update a sheet, run the Monday report — all while you are on your standup, getting a coffee, or on your way in. Glyphh Desktop works across the apps you already use, and asks before anything risky.',
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
