/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: () => [
    {
      source: '/api/:path*',
      destination: `${process.env.TEST_BE_SERVER}/:path*`,
    },
  ],
};

module.exports = nextConfig;
