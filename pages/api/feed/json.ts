import { NextApiRequest, NextApiResponse } from "next";
import { buildFeed } from "lib/feed";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  res.setHeader("content-type", "application/feed+json");
  res.end((await buildFeed()).json1());
};
