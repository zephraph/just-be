import { GetStaticProps } from "next";
import { getPublishedPosts } from "lib/notion/blog";
import Link from "next/link";
import { Post } from "lib/types";
import { Flex, Stack, Text, Tag, TagLabel } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { siteURL } from "lib/utils/url";

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
      <NextSeo
        title="Just Be"
        twitter={{
          handle: "@zephraph",
          cardType: "summary_large_image",
        }}
        openGraph={{
          type: "website",
          title: "Just Be",
          images: [
            {
              url: `${siteURL("images/just-be-social-share.png")}`,
              alt: "just-be.dev",
            },
          ],
        }}
      />
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
      <Stack spacing="3" className="-ml-8 mt-2">
        {posts.map((post) => (
          <Link key={post.Slug} href={`/posts/${post.Slug}`}>
            <a>
              <Flex
                direction="column"
                py="6"
                px="6"
                mt="-3"
                ml="2"
                className="rounded hover:bg-gray-100"
              >
                <Text color="gray.500" fontSize="sm" mb={1}>
                  {post["Published Date"]}
                </Text>
                <Text fontSize="2xl" fontFamily="Bastia-bold">
                  {post.Name}
                </Text>
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
