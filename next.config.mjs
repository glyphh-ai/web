/** @type {import('next').NextConfig} */
const nextConfig = {
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
