import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  output: 'standalone',
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'date-fns',
      'react-day-picker'
    ],
  },
  webpack: (config, { dev, isServer }) => {
    // Exclude DND packages from server-side bundle to avoid SSR issues
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@dnd-kit/core': 'commonjs @dnd-kit/core',
        '@dnd-kit/sortable': 'commonjs @dnd-kit/sortable',
        '@dnd-kit/utilities': 'commonjs @dnd-kit/utilities',
        '@dnd-kit/modifiers': 'commonjs @dnd-kit/modifiers',
      });
    }

    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;
