import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import CoworkHero from '../../components/CoworkHero';
import Integrations from '../../components/Integrations';
import LoopStrip from '../../components/LoopStrip';
import Layouts from '../../components/Layouts';
import SwitchStrip from '../../components/SwitchStrip';
import ReleaseStrip from '../../components/ReleaseStrip';
import DevLayout from '../../components/DevLayout';
import Cowork from '../../components/Cowork';
import Controls from '../../components/Controls';
import Pricing from '../../components/Pricing';
import Download from '../../components/Download';
import FAQ from '../../components/FAQ';
import FinalCTA from '../../components/FinalCTA';
import Footer from '../../components/Footer';

// title = og:title = twitter:title — the page's own H1. Deliberately NOT the
// homepage pitch: the home page owns that line, this page owns the depth.
const TITLE = 'Glyphh Desktop — Every task needs the right Agents, Workflow and Apps.';
const DESCRIPTION =
  'Glyphh Desktop combines all three into Layouts you switch with one keystroke — each one sets what’s on your screen, which agents run on which models, and what they can reach. Mac & Windows.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function GlyphhDesktopPage() {
  return (
    <>
      <Reveal />
      <Nav />
      <CoworkHero />
      {/* The story in the app's own order (mirrors the first-run tour):
          1 Connections (real work behind the scenes) → 2 Apps (navigate
          beside the agent) → 3 Loops (how work gets done) → 4 Layouts
          (orient the workspace per job) → 5 Command center (one keystroke
          to anywhere). Then Build → Release, Governance. */}
      <Integrations />
      <Cowork />
      <LoopStrip />
      <Layouts />
      <SwitchStrip />
      <DevLayout />
      <ReleaseStrip />
      <Controls />
      <Pricing />
      <Download />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
