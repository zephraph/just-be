import { GetStaticProps, GetStaticPaths } from "next";
import { getTableContents } from "lib/notion/table";
import { Post } from "lib/types";
import { NotionRenderer } from "react-notion";
import { fetchPageById } from "lib/notion";
import { fetchPostMetaFromSlug } from "lib/notion/blog";
import { to } from "lib/utils/await";
import { NextSeo } from "next-seo";
import pLocate from "p-locate";
import { Title } from "lib/components/title";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = ((await getTableContents(process.env.BLOG_ID, {
    notionToken: process.env.NOTION_TOKEN,
  })) as unknown) as Post[];

  return {
    paths: posts
      .filter((post) =>
        process.env.NODE_ENV === "development" ? post : post.Published
      )
      .map((post) => ({
        params: {
          ...post,
          post: post.Slug.split(",")[0].trim(),
        },
      })) as any,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const [err, data] = await to(
    pLocate(
      [
        (params as unknown) as Post,
        fetchPostMetaFromSlug(params?.post as string),
      ],
      (meta) => Boolean(meta?.id && meta.Name)
    ).then<{ postMeta: Post; page }>(async (meta) => ({
      postMeta: meta,
      page: await fetchPageById(meta.id, process.env.NOTION_TOKEN),
    }))
  );

  if (err) {
    console.error("ERROR:", err);
    return {
      notFound: true,
      props: {},
      revalidate: 60,
    };
  }

  const { page, postMeta } = data;

  return {
    props: {
      title: postMeta.Name,
      page: page.recordMap.block,
      description: postMeta.Preview,
      published: postMeta["Published Date"] || Date.now(),
      backPath: "/",
    },
    revalidate: 60 * 30, // Only revalidate every 30 minutes
  };
};

const BlogPost = ({ page, title, description, published }) => {
  return (
    <>
      <NextSeo title={`Just Be | ${title}`} description={description} />
      <Title text={title} date={published} />
      <NotionRenderer blockMap={page} />
    </>
  );
};

export default BlogPost;
