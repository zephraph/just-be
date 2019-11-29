import "../styles/base.css";
import "../styles/nord.css";
import App from "next/app";
import React from "react";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <main className="font-sans">
        <Component {...pageProps} />
      </main>
    );
  }
}
