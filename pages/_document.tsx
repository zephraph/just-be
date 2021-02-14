import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style>{`
            /* @license see https://just-be.dev/fonts/bastia/LICENSE */
            @font-face {
              font-family: "Bastia-bold";
              font-display: swap;
              src: url('/fonts/bastia/bold.woff2') format('woff2'), url('/fonts/bastia/bold.woff') format('woff')
            }
          `}
          </style>
          {process.env.NODE_ENV === "production" && (
            <script
              async
              defer
              data-domain="just-be.dev"
              src="https://plausible.io/js/plausible.js"
            ></script>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
