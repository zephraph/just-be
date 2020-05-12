import "lib/styles/base.css";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import App from "next/app";
import React from "react";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}
