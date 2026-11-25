/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fly runs the Docker standalone server (see Dockerfile); Heroku's `next start`
  // path is unaffected — standalone is additional build output, not a mode switch.
  output: 'standalone',
  // Dev-only: Next blocks cross-origin requests to the dev server (HMR socket,
  // internal dev assets) unless the origin is allowlisted. Reaching the server
  // from a phone/iPad over the LAN is cross-origin, so without this the page
  // loads but never hydrates — every button goes dead. localhost is exempt,
  // which is why it only breaks over the network. Add your LAN host/subnet.
  allowedDevOrigins: ['192.168.1.41', '192.168.1.*'],
  // PAGES ARE NEVER CACHED PAST A DEPLOY (his report, 2026-09-19: a product
  // page "lost the styling of the entire web surface"). Prerendered pages
  // shipped with s-maxage of a year while their stylesheet names change on
  // every build, so a cached copy pointed at CSS that no longer existed and
  // painted bare. HTML revalidates every time; hashed assets stay immutable.
  async headers() {
    return [
      {
        source: '/:path((?!_next/static|_next/image|favicon.ico).*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=0, s-maxage=0, must-revalidate' }],
      },
      // PRODUCTION ONLY (2026-09-21): dev chunk names never change, so a
      // year of `immutable` pinned every open tab to the first bundle it saw
      // and no edit ever showed up without a hard refresh. Hashed prod assets
      // keep the long cache; dev gets no-store.
      {
        source: '/_next/static/:path*',
        headers: [{
          key: 'Cache-Control',
          value: process.env.NODE_ENV === 'development' ? 'no-store' : 'public, max-age=31536000, immutable',
        }],
      },
      // Chunk stylesheets are answered by these two (middleware.js): a real
      // file is the immutable asset; the fallback bundle is never kept.
      {
        source: '/api/css/asset',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/api/css/all',
        headers: [{ key: 'Cache-Control', value: 'no-store' }],
      },
    ];
  },
  // A page a browser cached before 2026-09-19 (a year, immutable) still asks
  // for the stylesheet of the build that made it. That file is gone after a
  // deploy, so the page painted bare. A chunk stylesheet that no longer
  // exists is answered with every stylesheet of the current build.
  async rewrites() {
    return {
      fallback: [{ source: '/_next/static/chunks/:name*.css', destination: '/api/css/all' }],
    };
  },
  // The studio (the brand brief, 2026-11-25): Glyphh is no longer a product, so every old product address lands on
  // the page that now tells its story. Nothing 404s.
  async redirects() {
    const ENGINE = '/projects/glyphh-ai-decision-engine';
    const move = (source, destination) => ({ source, destination, permanent: true });
    // Products that were never Glyphh's in the end: their old addresses land on the projects.
    const GONE = [
      '/products/router', '/products/gateway', '/products/workspace', '/products/code',
      '/products/connect', '/products/skills', '/products/semantic-apps', '/products/cloud', '/products/office',
      '/products/design', '/integrations', '/integrations/:path*', '/chat', '/code', '/work', '/dream',
    ];
    return [
      // The posts that left the blog before (the desktop was open-sourced 2026-10-20; the bots went 2026-11-24).
      ...['/blog/glyphh-desktop-connections', '/blog/glyphh-desktop-workspaces'].map((s) => move(s, '/projects/desktop')),
      move('/blog/welcome-to-glyphh-ai', '/journal'),
      move('/blog/a-bot-that-learned-its-job', '/projects/bots-proof'),
      // The blog is the journal.
      move('/blog', '/journal'),
      move('/blog/:slug*', '/journal/:slug*'),
      // No sign-in, no plans, no platform: the account and pricing addresses go to the engine's story.
      ...['/login', '/signin', '/signup', '/pricing', '/refund', '/faq', '/products', '/products/ada', '/products/cloud-ada'].map((s) => move(s, ENGINE)),
      move('/use-cases', ENGINE),
      move('/use-cases/:path*', ENGINE),
      move('/research', '/labs'),
      move('/marketplace', '/labs'),
      move('/marketplace/:path*', '/labs'),
      move('/contact', '/work-with-us'),
      move('/work-with-me', '/work-with-us'),
      move('/products/desktop', '/projects/desktop'),
      move('/products/rrotor', '/projects/rrotor'),
      move('/products/rrotor/:path*', '/projects/rrotor'),
      move('/games', '/projects'),
      ...GONE.map((s) => move(s, '/projects')),
      // The old marketplace's agreements and code of conduct are gone; the Terms cover what remains.
      ...['/developer-agreement', '/marketplace-terms', '/code-of-conduct'].map((s) => move(s, '/terms')),
    ];
  },
};
export default nextConfig;
