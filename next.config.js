const withPreact = require('next-plugin-preact')
const withNextBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { default: WindiPlugin } = require('windicss-webpack-plugin')

module.exports = withNextBundleAnalyzer(
  withPreact({
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
)
