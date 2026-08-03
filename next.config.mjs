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
      // The Glyphh Desktop page moved from /products/apps.
      { source: '/products/apps', destination: '/products/desktop', permanent: true },
      // Glyphh Code was retired; its page lands on the flagship.
      { source: '/products/code', destination: '/products/desktop', permanent: false },
      { source: '/products/apps/:path*', destination: '/products/desktop/:path*', permanent: true },
    ];
  },
};
export default nextConfig;
