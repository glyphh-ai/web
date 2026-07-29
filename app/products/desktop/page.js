import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import CoworkHero from '../../components/CoworkHero';
import Integrations from '../../components/Integrations';
import LoopStrip from '../../components/LoopStrip';
import Layouts from '../../components/Layouts';
import SwitchStrip from '../../components/SwitchStrip';
import ReleaseStrip from '../../components/ReleaseStrip';
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
      {/* The heart of the story, in build order: Loops (the engine) →
          Layouts (the container) → Switch (the motion) → Build → Release.
          Then the supporting features: Workspace, Reach, Ghost mode,
          Governance. */}
      <LoopStrip />
      <Layouts />
      <SwitchStrip />
      <DevLayout />
      <ReleaseStrip />
      <Cowork />
      <Integrations />
      <GhostMode />
      <Controls />
      <Pricing />
      <Download />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
