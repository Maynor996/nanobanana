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
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },

  // 启用压缩
  compress: true,

  // 静态资产优化
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|mp4|woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
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