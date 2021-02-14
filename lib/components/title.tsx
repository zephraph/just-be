import { formatDate } from "lib/utils/date";

interface TitleProps {
  text: string;
  date?: string;
}

export const Title = ({ text, date }: TitleProps) => (
  <header className="notion mb-1">
    {date && <span className="text-gray-600">{formatDate(date)}</span>}
    <h1 className="notion-h1" style={{marginTop: "0.5em"}}>{text}</h1>
  </header>
);
