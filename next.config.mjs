/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The Glyphh Desktop page moved from /products/apps.
      { source: '/products/apps', destination: '/products/desktop', permanent: true },
      { source: '/products/apps/:path*', destination: '/products/desktop/:path*', permanent: true },
    ];
  },
};
export default nextConfig;
