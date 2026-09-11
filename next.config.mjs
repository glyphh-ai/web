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
      // Products is a real section again (2026-08-16). The bare index lands on
      // the lead product (Design); retired product URLs fall through to 404.
      { source: '/products', destination: '/products/design', permanent: false },
      // 2026-09-11: Cloud is retired outright; Office is back beside Gateway.
      { source: '/products/cloud', destination: '/', permanent: false },
    ];
  },
};
export default nextConfig;
