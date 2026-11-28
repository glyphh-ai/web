/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fly runs the Docker standalone server (see Dockerfile).
  output: 'standalone',
  // A game's page lives at /<game>/, with its slash (proxy.js); Next would otherwise take the slash off.
  skipTrailingSlashRedirect: true,
  skipProxyUrlNormalize: true,
  // PAGES ARE NEVER CACHED PAST A DEPLOY: HTML and the pages' own files revalidate every time; Next's hashed assets
  // stay immutable.
  async headers() {
    return [
      {
        source: '/:path((?!_next/static|_next/image).*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=0, s-maxage=0, must-revalidate' }],
      },
      {
        source: '/_next/static/:path*',
        headers: [{
          key: 'Cache-Control',
          value: process.env.NODE_ENV === 'development' ? 'no-store' : 'public, max-age=31536000, immutable',
        }],
      },
    ];
  },
};
export default nextConfig;
