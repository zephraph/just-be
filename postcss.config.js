const removeUnusedCSS = require("@fullhuman/postcss-purgecss")({
  content: ["./pages/**/*.jsx", "./pages/**/*.tsx", "./pages/**/*.mdx"],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production" ? [removeUnusedCSS] : [])
  ]
};
