import { headers } from 'next/headers';
import Nav from './components/Nav';
import Reveal from './components/Reveal';
import Hero from './components/Hero';
import OsHero from './components/OsHero';
import QuickStart from './components/QuickStart';
import HowItWorks from './components/HowItWorks';
import WorksWith from './components/WorksWith';
import ExpandableShot from './components/ExpandableShot';
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
      {/* The OS hero (site refactor 2026-09-22, site.md §1.1): the golden pitch,
          centered. Campaign variants (/code, /work) keep the desktop stage hero. */}
      {variant === 'default' ? <OsHero variant={variant} /> : <Hero variant={variant} stage />}
      {/* The frame (site refactor 2026-09-22): below the hero the page runs
          inside a railed column. Quick Start is the first section in it. */}
      <div className="site-frame">
        {/* The product video (his order, 2026-09-22): the old site's hero reel,
            first in the frame; he is re-cutting it today — swap the src. */}
        <section className="hv-video">
          <div className="qs-head">
            <span className="qs-kicker">Glyphh Desktop in action</span>
            <span className="qs-links">
              <a href="/video-demo" className="qs-more">Watch the full demo &rarr;</a>
              <a href="https://www.youtube.com/@glyphhai" className="qs-more qs-yt" target="_blank" rel="noopener">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>
                YouTube
              </a>
            </span>
          </div>
          <ExpandableShot src="/screen-shots/glyphh-hero.mp4" poster="/screen-shots/glyphh-app-home.png" alt="Glyphh — the desktop in motion" eager />
        </section>
        <HowItWorks />
        <QuickStart />
        <WorksWith />
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
