import { GetStaticProps, GetStaticPaths } from 'next'
import { getTableContents } from 'lib/notion/table'
import { Post } from 'lib/types'
import { NotionRenderer } from 'react-notion'
import { ExtendedBlock, fetchPageById } from 'lib/notion'
import { fetchPostMetaFromSlug } from 'lib/notion/blog'
import { to } from 'lib/utils/await'
import { NextSeo } from 'next-seo'
import pLocate from 'p-locate'
import { Title } from 'lib/components/title'
import { siteURL } from 'lib/utils/url'
import { fetchTweetAst } from 'static-tweets'
import { Tweet } from 'react-static-tweets'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = ((await getTableContents(process.env.BLOG_ID, {
    notionToken: process.env.NOTION_TOKEN,
  })) as unknown) as Post[]

  return {
    paths: posts
      .filter((post) =>
        process.env.NODE_ENV === 'development' ? post : post.Published
      )
      .map((post) => ({
        params: {
          ...post,
          post: post.Slug?.split(',')[0].trim() ?? '',
        },
      })) as any,
    fallback: 'blocking',
  }
}

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
  )

  for (let block of Object.values(data.page.block).map(
    ({ value }) => value as ExtendedBlock
  )) {
    if (block.type === 'tweet') {
      const source = block.properties?.source?.[0]?.[0]
      const id = source?.split('?')[0].split('/').pop()
      if (!id) continue
      block.properties = {
        ...block.properties,
        id,
        ast: await fetchTweetAst(id),
      }
    }
  }

  if (err) {
    console.error('ERROR:', err)
    return {
      notFound: true,
      props: {},
      revalidate: 60,
    }
  }

  const { page, postMeta } = data

  return {
    props: {
      title: postMeta.Name,
      page: page.block,
      description: postMeta.Preview,
      published: postMeta['Published Date'] || Date.now(),
      slug: postMeta.Slug,
      backPath: '/',
    },
    revalidate: 60 * 30, // Only revalidate every 30 minutes
  }
}

const BlogPost = ({ page, slug, title, description, published }) => {
  return (
    <>
      <NextSeo
        title={`${title}`}
        description={description}
        openGraph={{
          type: 'website',
          title,
          description,
          images: [
            {
              url: siteURL(`api/og/posts/${slug}`),
              alt: title,
            },
          ],
        }}
        twitter={{
          handle: '@zephraph',
          cardType: 'summary_large_image',
        }}
      />
      <Title text={title} date={published} />
      <NotionRenderer
        blockMap={page}
        customBlockComponents={{
          tweet: ({ blockValue }) => {
            const { id, ast } = blockValue.properties
            if (id && ast) {
              return <Tweet id={id} ast={ast} />
            }
            return null
          },
        }}
      />
    </>
  )
}

export default BlogPost
