import { GetStaticProps, GetStaticPaths } from "next";
import { getTableContents } from "lib/notion/table";
import { Post } from "lib/types";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = ((await getTableContents(
    process.env.BLOG_ID,
    process.env.NOTION_TOKEN
  )) as unknown) as Post[];

  console.log(posts);

  return {
    paths: posts
      .filter((post) => post.Published)
      .map((post) => ({ params: { post: post.Slug.split(",")[0].trim() } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default function () {
  return <h1>Blogs</h1>;
}
