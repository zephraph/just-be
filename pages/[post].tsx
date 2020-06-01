import { GetStaticProps, GetStaticPaths } from "next";
import { getTableContents } from "lib/notion/table";
import { Post } from "lib/types";
import { NotionRenderer } from "react-notion";
import { fetchPageById } from "lib/notion";
import { fetchPostMetaFromSlug } from "lib/notion/blog";

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
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postMeta = (!params.id || !params.Name
    ? await fetchPostMetaFromSlug(params.post as string)
    : params) as Post;

  const page = await fetchPageById(postMeta.id, process.env.NOTION_TOKEN);
  return { props: { title: postMeta.Name, page: page.recordMap.block } };
};

const BlogPost = ({ page, title }) => {
  return (
    <>
      <header className="notion mb-1">
        <h1 className="notion-h1">{title}</h1>
      </header>
      <NotionRenderer blockMap={page} />
    </>
  );
};

export default BlogPost;
