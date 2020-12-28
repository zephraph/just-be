import { formatDate } from "lib/utils/date";

interface TitleProps {
  text: string;
  date?: string;
}

export const Title = ({ text, date }: TitleProps) => (
  <header className="notion mb-1 flex items-center justify-between">
    <h1 className="notion-h1">{text}</h1>
    {date && <span className="text-gray-600">{formatDate(date)}</span>}
  </header>
);
