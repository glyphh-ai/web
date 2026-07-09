import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import Hero from '../../components/Hero';
import Mcp from '../../components/Mcp';
import Screenshots from '../../components/Screenshots';
import AppProxy from '../../components/AppProxy';
import Features from '../../components/Features';
import Models from '../../components/Models';
import Integrations from '../../components/Integrations';
import Pricing from '../../components/Pricing';
import Download from '../../components/Download';
import FAQ from '../../components/FAQ';
import FinalCTA from '../../components/FinalCTA';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Glyphh Desktop — Connect once. Put any AI to work.',
  description: 'Glyphh is the connective tissue between every LLM you use and everything you build. Connect 3,500+ services once, build automations, agents, and apps, and share them — no hosting, no token markup.',
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
      <AppProxy />
      <Features />
      <Models />
      <Pricing />
      <Download />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
