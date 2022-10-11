const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["lodash-es", "date-fns/esm"]);
const withPreact = require("next-plugin-preact");
const withNextBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const { default: WindiPlugin } = require("windicss-webpack-plugin");

module.exports = withPlugins([withTM, withPreact, withNextBundleAnalyzer], {
  images: {
    domains: ["pbs.twimg.com"],
  },
  async redirects() {
    return [
      {
        source: "/building-my-blog",
        destination: "/posts/building-my-blog",
        permanent: true,
      },
      {
        source: "/tips",
        destination: "/notes",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/feed",
        destination: "/api/feed/rss",
      },
      {
        source: "/feed/:slug",
        destination: "/api/feed/:slug",
      },
      {
        source: "/notes/:path*",
        destination: "https://publish.obsidian.md/just-be.dev/:path*",
      },
    ];
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      lodash: "lodash-es",
      "date-fns": "date-fns/esm",
    };
    config.plugins.push(
      new WindiPlugin({
        scan: {
          dirs: ["./"],
          exclude: ["node_modules", ".git", ".next/**/*"],
        },
      })
    );
    return config;
  },
});
