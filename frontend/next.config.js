/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // destination: 'http://localhost:5000/api/:path*',
        destination: "https://ufo-backend.onrender.com/api/:path*"
      },
    ];
  },
}

module.exports = nextConfig
