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
    return [
      // Products is a real section again (2026-08-16). The bare index lands on
      // the lead product (Design); retired product URLs fall through to 404.
      { source: '/products', destination: '/products/router', permanent: false },
      // Gateway became Router (his order, 2026-09-18); old links keep working.
      { source: '/products/gateway', destination: '/products/router', permanent: true },
      // Workspace became Desktop (his order, 2026-09-21); old links keep working.
      { source: '/products/workspace', destination: '/products/desktop', permanent: true },
      // 2026-09-11 (staying tight): Gateway is the one product page.
      // The research page is off the site for now (his order, 2026-10-01). The
      // page stays in the tree; the route lands on the home page until it returns.
      { source: '/research', destination: '/', permanent: false },
      { source: '/products/cloud', destination: '/', permanent: false },
      { source: '/products/office', destination: '/', permanent: false },
      { source: '/products/design', destination: '/', permanent: false },
    ];
  },
};
export default nextConfig;
