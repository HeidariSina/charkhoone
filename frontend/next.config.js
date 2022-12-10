/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  env: {
    API_URL: `http://127.0.0.1:1338`,
    SOLO_URL: `http://127.0.0.1:3000`,
  },
};

module.exports = nextConfig;
