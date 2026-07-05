import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import Hero from '../../components/Hero';
import Mcp from '../../components/Mcp';
import Rpa from '../../components/Rpa';
import Screenshots from '../../components/Screenshots';
import Features from '../../components/Features';
import Integrations from '../../components/Integrations';
import Pricing from '../../components/Pricing';
import Download from '../../components/Download';
import FAQ from '../../components/FAQ';
import FinalCTA from '../../components/FinalCTA';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Glyphh Apps — Give your AI hands.',
  description: 'Glyphh Apps is the workspace your AI drives. Connect Claude, ChatGPT, or any MCP client to your real desktop — open apps, tile layouts, work across 3,500+ connected services, run skills. Bring your own AI; no token markup.',
};

export default function GlyphhAppsPage() {
  return (
    <>
      <Reveal />
      <Nav />
      <Hero />
      <Integrations />
      <Mcp />
      <Screenshots />
      <Rpa />
      <Features />
      <Pricing />
      <Download />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
