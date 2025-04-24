/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Disable API routes for static export
  trailingSlash: true,
  distDir: 'out',
};

module.exports = nextConfig; 