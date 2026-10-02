import { headers } from 'next/headers';
import Nav from './components/Nav';
import Reveal from './components/Reveal';
import Hero from './components/Hero';
import CompanyHero from './components/CompanyHero';
import AdaSpeaks from './components/AdaSpeaks';
import Products from './components/Products';
import Limits from './components/Limits';
import OneAccount from './components/OneAccount';
import WhyAda from './components/WhyAda';
import Latest from './components/Latest';
import StoryHeads from './components/StoryHeads';
import Mcp from './components/Mcp';
import AppMarquee from './components/AppMarquee';
import Download from './components/Download';
import FAQ from './components/FAQ';
import OpenSourceSection from './components/OpenSourceSection';
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
      {/* THE COMPANY HOME (his order, 2026-10-01): the hero is Glyphh the AI
          company, and the page is three doors: Ada, Glyphh Desktop, the Model
          Router. The desktop's hero and its sections moved to
          /products/desktop. Campaign variants (/code, /work) keep the desktop
          stage hero. */}
      {variant === 'default' ? <CompanyHero /> : <Hero variant={variant} stage />}
      <div className="site-frame">
        <Limits />
        <AdaSpeaks />
        <Products />
        {/* The One platform section is off the page (his order, 2026-10-01). Hidden, not deleted. */}
        {false && <OneAccount />}
        {/* The blog section is off the home page (his order, 2026-10-01); Blog is
            in the header menu. Hidden, not deleted. */}
        {false && <Latest />}
        <WhyAda />
      </div>
      {/* EVERYTHING under the hero is OFF the page while the refactor works
          down from the top (his order, 2026-09-22). Hidden, not deleted —
          each band comes back restyled in site.md order. */}
      {false && (
        <>
      {/* The connections scroller (his order, 2026-09-21): right under the
          hero, before the callout. */}
      <AppMarquee />
      {/* THE CALLOUT (2026-09-18) is OFF the page (his order, 2026-09-21): its
          stage now sits beside the hero and its four cards came off. Hidden,
          not deleted. */}
      {false && <Mcp />}
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
      <OpenSourceSection />
      <FAQ />
      <FinalCTA />
        </>
      )}
      <Footer />
    </div>
  );
}
