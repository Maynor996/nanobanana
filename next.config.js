/** @type {import('next').NextConfig} */
const nextConfig = {
  // 性能优化配置
  experimental: {
    // 启用更快的编译
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // 禁用X-Powered-By头部
  poweredByHeader: false,

  // 图片优化
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // 禁用静态图片优化（减少构建时间）
    unoptimized: process.env.NODE_ENV === 'development',
  },

  // 开发环境优化
  ...(process.env.NODE_ENV === 'development' && {
    // 禁用React严格模式以提高性能
    reactStrictMode: false,

    // 启用SWC编译器
    swcMinify: true,
  }),

  // webpack优化
  webpack: (config, { dev, isServer }) => {
    // 开发环境优化
    if (dev && !isServer) {
      // 减少热重载检查
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules', '**/.next'],
      }
    }

    // 生产环境优化
    if (!dev) {
      // 启用压缩
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
      }
    }

    return config
  },
}

module.exports = nextConfig