import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import CoworkHero from '../../components/CoworkHero';
import Integrations from '../../components/Integrations';
import LoopStrip from '../../components/LoopStrip';
import SwitchStrip from '../../components/SwitchStrip';
import GhostMode from '../../components/GhostMode';
import DevLayout from '../../components/DevLayout';
import Cowork from '../../components/Cowork';
import Controls from '../../components/Controls';
import Pricing from '../../components/Pricing';
import Download from '../../components/Download';
import FAQ from '../../components/FAQ';
import FinalCTA from '../../components/FinalCTA';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Glyphh Desktop — A new class of desktop agent for Mac & Windows',
  description: 'Every task you do needs the right Agents, Workflow and Apps. Glyphh Desktop combines all three into Layouts you switch instantly — code this hour, a PowerPoint and email the next, a live app by lunch.',
};

export default function GlyphhDesktopPage() {
  return (
    <>
      <Reveal />
      <Nav />
      <CoworkHero />
      {/* The story builds: Layouts (what) → Switch (how) → Workspace (where)
          → Reach (with what) → Ghost mode (anywhere) → Ship (how far)
          → Governance (who decides). */}
      <LoopStrip />
      <SwitchStrip />
      <Cowork />
      <Integrations />
      <GhostMode />
      <DevLayout />
      <Controls />
      <Pricing />
      <Download />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
