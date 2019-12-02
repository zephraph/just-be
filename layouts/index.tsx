import React from "react";

export default frontMatter => {
  return ({ children }) => {
    return (
      <article className="sm:m-auto mx-3 max-w-xl">
        <h1>{frontMatter.title}</h1>
        <section className="text-justify">{children}</section>
      </article>
    );
  };
};
