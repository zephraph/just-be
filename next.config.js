const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([
  'lodash-es',
  'date-fns/esm',
  'prettier/esm/standalone',
  'prettier/esm/parser-typescript',
])
const withPreact = require('next-plugin-preact')
const withNextBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { default: WindiPlugin } = require('windicss-webpack-plugin')

module.exports = withPlugins([withTM, withPreact, withNextBundleAnalyzer], {
  images: {
    domains: ['pbs.twimg.com'],
  },
  async redirects() {
    return [
      {
        source: '/building-my-blog',
        destination: '/posts/building-my-blog',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/feed',
        destination: '/api/feed/rss',
      },
      {
        source: '/feed/:slug',
        destination: '/api/feed/:slug',
      },
    ]
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      lodash: 'lodash-es',
      'date-fns': 'date-fns/esm',
    }
    config.plugins.push(
      new WindiPlugin({
        scan: {
          dirs: ['./'],
          exclude: ['node_modules', '.git', '.next/**/*'],
        },
      })
    )
    return config
  },
})
