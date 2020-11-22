import { DecorationType, ColumnType, RowContentType } from "./types";

const pathToId = (path: string) =>
  `${path.substr(0, 8)}-${path.substr(8, 4)}-${path.substr(
    12,
    4
  )}-${path.substr(16, 4)}-${path.substr(20)}`;

/** Used to convert a raw page id into a notion api page id */
export const parsePageId = (id: string) => {
  return id.includes("-") ? id : pathToId(id);
};

const getTextContent = (text: DecorationType[]) => {
  return text.reduce((prev, current) => prev + current[0], "");
};

export const getNotionValue = (
  val: DecorationType[],
  type: ColumnType
): RowContentType => {
  switch (type) {
    case "text":
      return getTextContent(val);
    case "person":
      return (
        val.filter((v) => v.length > 1).map((v) => v[1]![0][1] as string) || []
      );
    case "checkbox":
      return val[0][0] === "Yes";
    case "date":
      if (val[0][1]![0][0] === "d") return val[0]![1]![0]![1]!.start_date;
      else return "";
    case "title":
      return getTextContent(val);
    case "select":
      return val[0][0];
    case "multi_select":
      return val[0][0].split(",") as string[];
    case "number":
      return Number(val[0][0]);
    default:
      console.error({ val, type });
      return "Not supported";
  }
};
