import { Text, Flex, Divider } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'

import { GetStaticPaths, GetStaticProps } from 'next'
import { fetchPostMetaFromSlug } from 'lib/notion/blog'
import { Post } from 'lib/types'
import { serialize } from 'lib/utils/json'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<Post> = async (ctx) => {
  const { slug } = ctx.params
  const meta = await fetchPostMetaFromSlug(slug as string)
  return {
    props: serialize(meta),
  }
}

const image = ({ Name: title, 'Published Date': date }: Post) => {
  return (
    <>
      <NextSeo noindex={true} nofollow={true} />
      <Flex
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        alignItems="center"
        height="100%"
        width="max-content"
        maxWidth="1000px"
        margin="0 auto"
        pb="50px"
      >
        <Text className="bastia" fontSize="6xl" color="gray.500">
          just be
        </Text>
        {title && (
          <>
            <Divider my={4} />
            <Text className="bastia" fontSize="7xl">
              {title}
            </Text>
            <Divider my={4} />
            <Text fontSize="xl" color="gray.500">
              {date}
            </Text>
          </>
        )}
      </Flex>
    </>
  )
}

image.Layout = null

export default image
