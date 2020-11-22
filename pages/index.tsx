import { GetStaticProps } from "next";
import { getPublishedPosts } from "lib/notion/blog";
import Link from "next/link";
import { Post } from "lib/types";
import { formatDate } from "lib/utils/date";

export const getStaticProps: GetStaticProps = async () => {
  const publishedPosts = await getPublishedPosts();
  return {
    props: { posts: publishedPosts },
    revalidate: 60,
  };
};

const BlogPosts = ({ posts }: { posts: Post[] }) => {
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
              <div className="flex justify-between">
                <span className="font-medium mr-3">{post.Name}</span>
                <span className="text-gray-700">
                  {formatDate(post["Published Date"])}
                </span>
              </div>
              <span className="text-gray-600">{post.Preview}</span>
            </div>
          </a>
        </Link>
      ))}
    </>
  );
};

export default BlogPosts;
