import { Feed } from "feed";
import { getPublishedPosts } from "./notion/blog";

export const buildFeed = async () => {
  const feed = new Feed({
    id: "https://just-be.dev/",
    link: "https://just-be.dev/",
    title: "Just Be",
    description: "Justin Bennett's technical blog",
    copyright: "All rights reserved 2020, Justin Bennett",
    language: "en",
    feedLinks: {
      rss: "https://just-be.dev/feed",
      atom: "https://just-be.dev/feed/atom",
      json: "https://just-be.dev/feed/json",
    },
    author: {
      name: "Justin Bennett",
      email: "zephraph@gmail.com",
      link: "https://just-be.dev/about",
    },
  });

  const posts = await getPublishedPosts();
  posts.forEach((post) => {
    const link = `https://just-be.dev/posts/${post.Slug}`;
    feed.addItem({
      id: link,
      title: post.Name,
      description: post.Preview,
      link,
      date: new Date(post["Published Date"] || Date.now()),
    });
  });

  return feed;
};
