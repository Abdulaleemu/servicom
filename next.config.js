/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_BASEURL: process.env.BASEURL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
