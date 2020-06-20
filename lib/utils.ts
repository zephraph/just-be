import { IncomingMessage } from "http";

export const urlFromReq = (req: IncomingMessage) => {
  const host = req.headers.host ?? "localhost:3000";
  const protocol = host.split(":")[0] === "localhost" ? "http" : "https";
  return `${protocol}://${host}${process.env.ASSET_PREFIX ?? ""}`;
};

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
