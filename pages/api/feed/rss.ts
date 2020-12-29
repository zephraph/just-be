import { NextApiRequest, NextApiResponse } from "next";
import { buildFeed } from "lib/feed";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  res.setHeader("content-type", "application/rss+xml");
  res.end((await buildFeed()).rss2());
};
