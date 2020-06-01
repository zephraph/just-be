import { getTableContents } from "./table";
import { Post } from "lib/types";

export const getPublishedPosts = async () => {
  const posts = ((await getTableContents(
    process.env.BLOG_ID,
    process.env.NOTION_TOKEN
  )) as unknown) as Post[];
  return posts.filter((post) => post.Published);
};

export const fetchPostMetaFromSlug = async (slug: string) => {
  const posts = ((await getTableContents(
    process.env.BLOG_ID,
    process.env.NOTION_TOKEN
  )) as unknown) as Post[];

  return posts.find((post) => post.Slug.split(",").includes(slug));
};
