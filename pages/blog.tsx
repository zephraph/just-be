import React from "react";
import Link from "next/link";
// @ts-ignore
import { frontMatter } from "./blog/*.mdx";

function formatPath(p) {
  return p.replace(/\.mdx$/, "");
}

export default ({ props }) => (
  <main className="sm:m-auto mx-3 max-w-xl">
    <h1>Blog posts</h1>
    <ul className="ml-0">
      {frontMatter.map(page => (
        <li key={page.title}>
          <Link href={formatPath(page.__resourcePath)}>
            <a>{page.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  </main>
);
