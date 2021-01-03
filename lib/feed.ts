import { Feed } from "feed";
import { getPublishedPosts } from "./notion/blog";
import { compareDesc } from "date-fns";

export const buildFeed = async () => {
  const posts = await getPublishedPosts();
  const feed = new Feed({
    id: "https://just-be.dev/",
    link: "https://just-be.dev/",
    title: "Just Be",
    description: "Justin Bennett's technical blog",
    copyright: "All rights reserved 2020, Justin Bennett",
    language: "en",
    updated: posts
      .map((post) => new Date(post["Published Date"]))
      .sort(compareDesc)[0],
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
