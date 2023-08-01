/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ufo-catcher-mini-game-backend.vercel.app/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig
