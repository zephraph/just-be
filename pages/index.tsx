import { GetStaticProps } from "next";
import { getPublishedPosts } from "lib/notion/blog";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async () => {
  const publishedPosts = await getPublishedPosts();
  return { props: { posts: publishedPosts } };
};

const BlogPosts = ({ posts }) => {
  return (
    <>
      {posts.map((post, currentPost) => (
        <Link href="/[post]" as={`/${post.Slug}`}>
          <a className="">
            <div
              className={`flex flex-col hover:bg-gray-200 rounded p-2 -ml-2 ${
                currentPost < posts.length - 1 ? "pb-3 mb-1" : ""
              }`}
            >
              <span className="">{post.Name}</span>
              <span className="text-gray-600">{post.Preview}</span>
            </div>
          </a>
        </Link>
      ))}
    </>
  );
};

export default BlogPosts;
