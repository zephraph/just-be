import { GetStaticProps } from "next";
import { getPublishedPosts } from "lib/notion/blog";
import Link from "next/link";
import { Post } from "lib/types";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import Head from "next/head";

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
      <NextSeo title="Just Be" />
      <Head>
        <link
          key="rss-feed"
          rel="alternative"
          type="application/rss+xml"
          title="RSS feed for just-be.dev"
          href="/feed"
        />
        <link
          key="atom-feed"
          rel="alternative"
          type="application/atom+xml"
          title="Atom feed for just-be.dev"
          href="/feed/atom"
        />
        <link
          key="json-feed"
          rel="alternative"
          type="application/feed+json"
          title="JSON feed for just-be.dev"
          href="/feed/json"
        />
      </Head>
      <Stack spacing="3" className="-ml-4">
        {posts.map((post) => (
          <Link href={`/posts/${post.Slug}`}>
            <a>
              <Flex
                direction="column"
                p="2"
                ml="2"
                className="rounded hover:bg-gray-200"
              >
                <Text fontSize="xl">{post.Name}</Text>
                <Text fontSize="md" color="gray.500">
                  {post.Preview}
                </Text>
              </Flex>
            </a>
          </Link>
        ))}
      </Stack>
    </>
  );
};

export default BlogPosts;
