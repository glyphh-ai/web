import { headers } from 'next/headers';
import Nav from './components/Nav';
import Reveal from './components/Reveal';
import Hero from './components/Hero';
import StoryHeads from './components/StoryHeads';
import Mcp from './components/Mcp';
import Download from './components/Download';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

// The 2026-08 rebuild, section by section. Hero first; the old HomeHero
// (tabs + dream reel) stays in the tree until the switching story lands in
// its own band, then gets deleted or absorbed.

// glyphh.ai/code and glyphh.ai/work are internally rewritten to this page with
// a different hero (see ../middleware.js). Canonicalize every variant to the
// root so search engines treat them as one page — no SEO fragmentation.
export const metadata = {
  alternates: { canonical: '/' },
};

export default async function Home() {
  // The middleware tags campaign paths with a hero variant; bare glyphh.ai has
  // no header and falls back to `default`.
  const variant = (await headers()).get('x-hero-variant') || 'default';
  return (
    <div className="home-page">
      <Reveal />
      <Nav />
      <Hero variant={variant} />
      {/* THE CALLOUT (his order, 2026-09-18): Glyphh in the middle, the loops
          on the left, Glyphh Connect above, Glyphh Router on the right. It
          sits right under the hero because it IS the pitch, drawn. */}
      <Mcp />
      {/* Then each section is a direct attack: local co-work, MCP tools for
          anything, skills that extend to tasks, semantic apps, plugins. */}
      <StoryHeads />
      {/* FeatureGrid ("One app, every surface of your work.") and
          ReleaseStrip ("Build it. Ship it. Share it.") are OFF the page (his
          call, 2026-08-28: they add nothing). The components stay in the
          tree — hidden, not deleted — so either can be remounted here. */}
      {/* The close: download → FAQ → the final CTA. Pricing lives on its
          own page (his order, 2026-09-11) — the nav and FAQ link to it. */}
      <Download />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
