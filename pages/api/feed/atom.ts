import { NextApiRequest, NextApiResponse } from "next";
import { buildFeed } from "lib/feed";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("content-type", "application/atom+xml");
  res.statusCode = 200;
  res.send((await buildFeed()).atom1());
  res.end();
};
