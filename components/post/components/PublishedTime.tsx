import classnames from "classnames";

interface iProps {
  date: string;
  className?: string;
}
function PublishedTime({ date, className = "" }: iProps) {
  const display = date == "1970-01-01" ? "很久以前" : date;
  const _className = classnames(
    "w-full mb-0 text-[var(--text-color)] font-bold",
    className
  );
  return <p className={_className}>{display}</p>;
}

export default PublishedTime;
