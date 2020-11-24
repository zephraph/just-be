import { GetStaticProps, GetStaticPaths } from "next";
import { getTableContents } from "lib/notion/table";
import { Post } from "lib/types";
import { NotionRenderer } from "react-notion";
import { fetchPageById } from "lib/notion";
import { fetchPostMetaFromSlug } from "lib/notion/blog";
import { formatDate } from "lib/utils/date";
import { to } from "lib/utils/await";
import { NextSeo } from "next-seo";
import pLocate from "p-locate";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = ((await getTableContents(
    process.env.BLOG_ID,
    process.env.NOTION_TOKEN
  )) as unknown) as Post[];

  return {
    paths: posts
      .filter((post) => post.Published)
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
      published: postMeta["Published Date"],
      backPath: "/",
    },
    revalidate: 60 * 30, // Only revalidate every 30 minutes
  };
};

const BlogPost = ({ page, title, description, published }) => {
  return (
    <>
      <NextSeo title={`Just Be | ${title}`} description={description} />
      <header className="notion mb-1 flex items-center justify-between">
        <h1 className="notion-h1">{title}</h1>{" "}
        <span className="text-gray-600">{formatDate(published)}</span>
      </header>
      <NotionRenderer blockMap={page} />
    </>
  );
};

export default BlogPost;
