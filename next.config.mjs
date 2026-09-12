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
  async redirects() {
    return [
      // 2026-09-12: the product pages are gone (Gateway deleted) and pricing
      // moved back onto the home page. Old links land on the home page.
      { source: '/products', destination: '/', permanent: false },
      { source: '/products/:slug*', destination: '/', permanent: false },
      { source: '/pricing', destination: '/#pricing', permanent: false },
    ];
  },
};
export default nextConfig;
