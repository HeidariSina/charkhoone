/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  env: {
    API_URL: `http://94.101.186.158:1338`,
    SOLO_URL: `http://94.101.186.158:3000`,
  },
};

module.exports = nextConfig;
