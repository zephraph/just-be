const withMDX = require("next-mdx-enhanced")({
  defaultLayout: true
});
const withCSS = require("@zeit/next-css");

module.exports = withCSS(
  withMDX({
    webpack: function(config) {
      config.resolve.alias = {
        ...config.resolve.alias,
        react: "preact/compat",
        react$: "preact/compat",
        "react-dom": "preact/compat",
        "react-dom$": "preact/compat"
      };

      return config;
    }
  })
);
