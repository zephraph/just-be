import "lib/styles/base.css";
import "react-notion/src/styles.css";
import "lib/styles/notion-override.css";
import "prismjs/themes/prism.css";
import { Layout } from "@artsy/next-layout";

import App from "next/app";
import React from "react";

export default class MyApp extends App {
  render() {
    return <Layout {...this.props} />;
  }
}
