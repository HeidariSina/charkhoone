/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  env: {
    API_URL: `http://37.32.26.91:1338`,
    SOLO_URL: `http://37.32.26.91:3000`,
  },
};

module.exports = nextConfig;
