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
  async redirects() {
    const PLATFORM = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';
    // Products that are not Glyphh's: their old addresses land on the home page.
    const GONE = [
      '/products/router', '/products/gateway', '/products/desktop', '/products/workspace', '/products/code',
      '/products/connect', '/products/skills', '/products/semantic-apps', '/products/cloud', '/products/office',
      '/products/design', '/integrations', '/integrations/:path*', '/chat', '/code', '/work', '/dream',
      // The desktop was open-sourced (2026-10-20); its posts left the blog.
      '/blog/glyphh-desktop-connections', '/blog/glyphh-desktop-workspaces', '/blog/welcome-to-glyphh-ai',
    ];
    return [
      // The site has no sign-in of its own: the platform signs you in.
      { source: '/login', destination: PLATFORM, permanent: false },
      { source: '/signin', destination: PLATFORM, permanent: false },
      { source: '/products', destination: '/', permanent: false },
      // Ada is the home page (2026-10-21).
      { source: '/products/ada', destination: '/', permanent: true },
      // The research page is off the site; the page stays in the tree.
      { source: '/research', destination: '/', permanent: false },
      ...GONE.map((source) => ({ source, destination: '/', permanent: true })),
      // Glyphh is Ada (2026-11-24): rrotor and the bots are gone. Their old addresses do not 404.
      { source: '/products/rrotor', destination: '/', permanent: true },
      { source: '/products/rrotor/:path*', destination: '/', permanent: true },
      { source: '/use-cases/claude-bots', destination: '/marketplace', permanent: true },
      { source: '/blog/a-bot-that-learned-its-job', destination: '/blog', permanent: true },
      // The old marketplace's agreements and code of conduct are gone, and the Terms cover what remains. The
      // Marketplace page (/marketplace) only shows what is in github.com/glyphh-ai/plugins.
      ...['/developer-agreement', '/marketplace-terms', '/code-of-conduct'].map((source) => ({ source, destination: '/terms', permanent: true })),
    ];
  },
};
export default nextConfig;
