const nextConfig = {
  output: "export",
  reactStrictMode: true,
  swcMinify: false,
  images: {
    unoptimized: true
  },
  trailingSlash: true, // Adds trailing slashes to all paths
};

module.exports = nextConfig;
