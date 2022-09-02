/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Using pnpm patch and this config, we turn off eval-source-map
  // Actually breaks strict csp without these two steps
  webpack: (config, { dev }) => {
    config.devtool = false;
    for (const r of config.module.rules) {
      if (r.loader === 'babel-loader') {
        r.options.sourceMaps = false;
      }
    }

    return config;
  },
};

module.exports = nextConfig;
