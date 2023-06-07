import { GetServerSideProps } from "next";
import { generateFeed } from "services/post";

function AtomXmlPage() {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const content = await generateFeed("atom");
  res.setHeader("Content-Type", "application/xml; encoding=UTF-8");
  res.write(content);
  res.end();

  return { props: {} };
};

export default AtomXmlPage;
