import { GetStaticProps } from "next";
import { getPublishedPosts } from "lib/notion/blog";
import Link from "next/link";
import { Post } from "lib/types";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

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
      <Stack spacing="3" className="-ml-4">
        {posts.map((post, currentPost) => (
          <Link href={`/${post.Slug}`}>
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
