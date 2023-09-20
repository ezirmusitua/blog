import { api_config } from "config";
import { GetServerSideProps } from "next";
import { listMdx } from "services/post";

//pages/sitemap.xml.js
const EXTERNAL_DATA_URL = "https://ezirmusitua.site/blog";

function generateSiteMap(posts: Array<{ id: string }>) {
  const post_urls = posts.map(
    ({ id }) => `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
       </url>
     `
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://ezirmusitua.site</loc>
     </url>
     ${post_urls.join("")}
   </urlset>
 `;
}

function SiteMap() {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await listMdx(api_config.posts_dir);
  const cards = await listMdx(api_config.cards_dir);
  const sitemap = generateSiteMap([...posts, ...cards]);
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return { props: {} };
};

export default SiteMap;
