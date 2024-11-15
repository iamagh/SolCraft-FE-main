/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  env: {
    backendUrl: 'ul'
  }
};

module.exports = nextConfig;
