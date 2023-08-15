/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.externals = [...config.externals, 'bcrypt'];
    return config;
  },
};

module.exports = nextConfig
module.exports = {
    // Add your Webpack configuration here
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.(node)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          
        },
      });
  
      // Add other Webpack rules and configurations if needed
  
      return config;
    },
  };