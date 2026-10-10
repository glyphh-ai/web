import { headers } from 'next/headers';
import Nav from './components/Nav';
import Reveal from './components/Reveal';
import Hero from './components/Hero';
import Footer from './components/Footer';
import DesktopPage, { metadata as desktop } from './products/desktop/page';
import UnderConstruction from './components/UnderConstruction';
import { HOME_TITLE } from './lib/home-meta';

// THE HOME IS GLYPHH DESKTOP (his order, 2026-10-04): glyphh.ai is the desktop
// page, the OS hero with the screenshots, the pitch, the planes, how it
// works, quick start, works with. /products/desktop renders the same page
// and points its canonical here. The company hero and the Products tiles
// (CompanyHero, Products, HeroMap) stay in the tree, unmounted.

// glyphh.ai/code and glyphh.ai/work are internally rewritten to this page with
// a different hero (see ../middleware.js). Canonicalize every variant to the
// root so search engines treat them as one page — no SEO fragmentation.
// The home carries the company's title (his order, 2026-10-06: "Glyphh — the
// vendor-neutral alternative to frontier AI"), not the Desktop page's; the
// description stays the desktop's, verbatim.
export const metadata = {
  title: HOME_TITLE,
  description: desktop.description,
  alternates: { canonical: '/' },
};

const UNDER_CONSTRUCTION = true;

export default async function Home() {
  // The middleware tags campaign paths with a hero variant; bare glyphh.ai has
  // no header and falls back to `default`, which is the desktop page itself.
  const variant = (await headers()).get('x-hero-variant') || 'default';
  // UNDER CONSTRUCTION (his order, 2026-10-10): bare glyphh.ai shows the
  // re-tooling screen; put <DesktopPage /> back here to bring the home back.
  if (variant === 'default') return UNDER_CONSTRUCTION ? <UnderConstruction /> : <DesktopPage />;
  return (
    <div className="home-page">
      <Reveal />
      <Nav />
      <Hero variant={variant} stage />
      <Footer />
    </div>
  );
}
