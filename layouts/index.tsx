import React from "react";
import { H1 } from "../components/Heading";
import { decorate } from "../lib/transform-children";
import { MDXProvider } from "@mdx-js/react";

const P = ({ children, ...props }) => (
  <p className="mb-3 text-base leading-normal" {...props}>
    {children}
  </p>
);

export default frontMatter => {
  return ({ children }) => {
    return (
      <article className="sm:m-auto mx-3 text-justify max-w-xl">
        <H1 className="mb-3">{frontMatter.title}</H1>
        <MDXProvider components={{ p: P }}>{children}</MDXProvider>
      </article>
    );
  };
};
