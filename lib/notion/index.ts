import { INotionParams } from "./types";
import { parsePageId } from "./utils";
import fetch from "isomorphic-unfetch";

export * from "./types";

const NOTION_API = "https://www.notion.so/api/v3";

const loadPageChunkBody = {
  limit: 999,
  cursor: { stack: [] },
  chunkNumber: 0,
  verticalColumns: false,
};

const fetchNotionData = async ({
  resource,
  body,
  notionToken,
}: INotionParams) => {
  const res = await fetch(`${NOTION_API}/${resource}`, {
    credentials: "include",
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(notionToken && { cookie: `token_v2=${notionToken}` }),
    },
    body: JSON.stringify(body),
  });

  console.log(res.status);

  return res.json();
};

export const fetchPageById = async (pageId: string, notionToken?: string) => {
  const res = await fetchNotionData({
    resource: "loadPageChunk",
    body: {
      pageId: parsePageId(pageId),
      ...loadPageChunkBody,
    },
    notionToken,
  });

  return res;
};

const queryCollectionBody = {
  query: { aggregations: [{ property: "title", aggregator: "count" }] },
  loader: {
    type: "table",
    limit: 999,
    searchQuery: "",
    userTimeZone: "America/New_York",
    userLocale: "en",
    loadContentCover: true,
  },
};

export const fetchTableData = async (
  collectionId: string,
  collectionViewId: string,
  notionToken?: string
) => {
  const table = await fetchNotionData({
    resource: "queryCollection",
    body: {
      collectionId,
      collectionViewId,
      ...queryCollectionBody,
    },
    notionToken,
  });
  return table;
};

export const fetchNotionUsers = async (
  userIds: string[],
  notionToken?: string
): Promise<{ id: string; full_name: string }[]> => {
  const users = await fetchNotionData({
    resource: "getRecordValues",
    body: {
      requests: userIds.map((id) => ({ id, table: "notion_user" })),
    },
    notionToken,
  });
  return users.results.map((u: any) => {
    const user = {
      id: u.value.id,
      firstName: u.value.given_name,
      lastLame: u.value.family_name,
      fullName: u.value.given_name + " " + u.value.family_name,
      profilePhoto: u.value.profile_photo,
    };
    return user;
  });
};
