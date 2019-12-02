// @ts-ignore
import "../lib/styles/base.css";
import App from "next/app";
import Head from "next/head";
import React from "react";
import { GoogleFont } from "react-typography";
import typography from "../lib/styles/typography";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <GoogleFont key="google-fonts" typography={typography} />~
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}
