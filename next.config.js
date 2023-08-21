

  const nextConfig = {
    images: {
      domains: ['m.media-amazon.com'],
    },
    experimental: {
      appDir: true,
    },
    webpack: (config) => {
      config.externals = [...config.externals, 'bcrypt'];
      return config;
    },
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
  
  module.exports = nextConfig;
  