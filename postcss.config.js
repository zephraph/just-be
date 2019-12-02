const postcss = require("postcss");
const typography = require("./lib/styles/typography");

const typographyPlugin = postcss.plugin("typography", () => css => {
  css.walkAtRules("typography", rule => {
    const overrides = rule.nodes || [];
    const root = postcss.parse(typography.toString());

    root.append(overrides);
    rule.replaceWith(root);
  });
});

const removeUnusedCSS = require("@fullhuman/postcss-purgecss")({
  content: ["./pages/**/*.jsx", "./pages/**/*.tsx", "./pages/**/*.mdx"],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = {
  plugins: [
    require("tailwindcss"),
    typographyPlugin,
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production" ? [removeUnusedCSS] : [])
  ]
};
