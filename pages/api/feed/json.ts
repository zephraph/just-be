import { NextApiRequest, NextApiResponse } from "next";
import { buildFeed } from "lib/feed";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("content-type", "application/feed+json");
  res.statusCode = 200;
  res.send((await buildFeed()).json1());
  res.end();
};
