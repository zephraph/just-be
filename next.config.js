const withPreact = require("next-plugin-preact");

module.exports = withPreact({
  async redirects() {
    return [
      {
        source: "/building-my-blog",
        destination: "/posts/building-my-blog",
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
    ];
  },
});
