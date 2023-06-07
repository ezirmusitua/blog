import { GetServerSideProps } from "next";
import { generateFeed } from "services/post";

function RssJsonPage() {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const content = await generateFeed("json");
  res.setHeader("Content-Type", "application/json; encoding=UTF-8");
  res.write(content);
  res.end();

  return { props: {} };
};

export default RssJsonPage;
