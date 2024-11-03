/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  swcMinify: false,
  images: {
    unoptimized: true
},
};

module.exports = nextConfig;
