import { GetStaticProps } from "next";
import { getPublishedPosts } from "lib/notion/blog";
import Link from "next/link";
import { Post } from "lib/types";
import { Flex, Stack, Text } from "@chakra-ui/react";

export const getStaticProps: GetStaticProps = async () => {
  const publishedPosts = await getPublishedPosts();
  return { props: { posts: publishedPosts } };
};

const BlogPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <Stack spacing="3">
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
  );
};

export default BlogPosts;
