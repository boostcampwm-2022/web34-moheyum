/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: () => [
    {
      source: '/api/:path*',
      destination: `${process.env.BE_URL}/api/:path*`,
    },
  ],
  images: {
    domains: ['kr.object.ncloudstorage.com', 'localhost'],
  },
};

module.exports = nextConfig;
