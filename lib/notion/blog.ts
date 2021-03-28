import { getTableContents } from './table'
import { Post } from 'lib/types'

export const getPublishedPosts = async () => {
  const posts = ((await getTableContents(process.env.BLOG_ID, {
    notionToken: process.env.NOTION_TOKEN,
  })) as unknown) as Post[]
  return (process.env.NODE_ENV === 'development'
    ? posts
    : posts.filter((post) => post.Published)
  ).sort((a, b) => {
    const aDate = a['Published Date'] ?? new Date(0).toISOString()
    const bDate = b['Published Date'] ?? new Date(0).toISOString()
    console.log(aDate, bDate)
    if (aDate > bDate) return -1
    if (aDate < bDate) return 1
    return 0
  })
}

export const fetchPostMetaFromSlug = async (slug: string) => {
  const posts = ((await getTableContents(process.env.BLOG_ID, {
    notionToken: process.env.NOTION_TOKEN,
  })) as unknown) as Post[]

  return posts.find((post) => post.Slug?.split(',').includes(slug))
}
