import { NowRequest, NowResponse } from "@now/node";
import { fetchPageById } from "lib/notion";
import { getTableContents } from "lib/notion/table";
import { Post } from "lib/types";

export default async function (req: NowRequest, res: NowResponse) {
  const { slug } = req.query;

  const posts = ((await getTableContents(
    process.env.BLOG_ID,
    process.env.NOTION_TOKEN
  )) as unknown) as Post[];

  const id = posts.find((post) => post.Slug.split(",").includes(slug as string))
    ?.id;

  if (id) {
    const page = await fetchPageById(id as string, process.env.NOTION_TOKEN);
    res.status(200).send(page);
  } else {
    res.status(404).end();
  }
}
