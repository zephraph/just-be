import {
  fetchPageById,
  CollectionType,
  fetchTableData,
  RowType,
  RowContentType,
  fetchNotionUsers,
} from ".";
import { getNotionValue } from "./utils";

type Row = { id: string; [key: string]: RowContentType };

export const getTableContents = async (
  tableId: string,
  notionToken?: string
) => {
  const page = await fetchPageById(tableId, notionToken);

  console.log(page);

  if (!page.recordMap.collection) {
    throw new Error(`No table found on Notion page: ${tableId}`);
  }

  const collection: CollectionType = Object.keys(page.recordMap.collection).map(
    (k) => page.recordMap.collection[k]
  )[0];
  const collectionView: {
    value: { id: CollectionType["value"]["id"] };
  } = Object.keys(page.recordMap.collection_view).map(
    (k) => page.recordMap.collection_view[k]
  )[0];

  const table = await fetchTableData(
    collection.value.id,
    collectionView.value.id,
    notionToken
  );

  const collectionRows = collection.value.schema;
  const collectionColKeys = Object.keys(collectionRows);

  const tableArr: RowType[] = table.result.blockIds.map(
    (id: string) => table.recordMap.block[id]
  );

  const tableData = tableArr.filter(
    (b) =>
      b.value && b.value.properties && b.value.parent_id === collection.value.id
  );

  const rows: Row[] = [];

  for (const td of tableData) {
    let row: Row = { id: td.value.id };

    for (const key of collectionColKeys) {
      const val = td.value.properties[key];
      if (val) {
        const schema = collectionRows[key];
        row[schema.name] = getNotionValue(val, schema.type);
        if (schema.type === "person") {
          const users = await fetchNotionUsers(row[schema.name] as string[]);
          row[schema.name] = users;
        }
      }
    }
    rows.push(row);
  }

  return rows;
};