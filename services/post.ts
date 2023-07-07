import { Feed } from "feed";
import { iPost } from "components/post/interface";
import dayjs from "dayjs";
import * as fs from "fs/promises";
import * as path from "path";
import { iFrontMatter } from "schema/post";
import { api_config } from "../config";
import { parse_frontmatter, serialize_mdx } from "./mdx";

function idFromName(p: string) {
  return path.basename(p).replace(path.extname(p), "");
}

function idToName(id: string) {
  return `${decodeURIComponent(id)}.mdx`;
}

interface iPostMeta extends iFrontMatter {
  id: string;
}

export async function listPost(): Promise<iPostMeta[]> {
  let posts: string[] = await fs.readdir(api_config.post_dir);
  posts = posts.filter((f) => f.endsWith(".mdx"));
  const posts_data: iPostMeta[] = await Promise.all(
    posts.map(async (p) => {
      const fp = api_config.post_file(p);
      const frontmatter = await parse_frontmatter(fp);
      return { id: idFromName(p), ...frontmatter } as iPostMeta;
    })
  );
  const sorted = posts_data
    .sort((p, n) => {
      const previous_date: dayjs.Dayjs = dayjs(p.date);
      const next_date = dayjs(n.date);
      if (previous_date.isBefore(next_date)) return 1;
      if (previous_date.isAfter(next_date)) return -1;
      return 0;
    })
    .filter((p) => p.draft != "true");
  return sorted;
}

export async function getPost(id: string): Promise<iPost> {
  const fp = api_config.post_file(idToName(id));
  return serialize_mdx<iFrontMatter>(fp);
}

const Author = {
  name: "ezirmusitua",
  email: "jferroal@gmail.com",
  link: "https://ezirmusitua.site",
};

export async function generateFeed(type: "rss" | "atom" | "json") {
  const posts = await listPost();
  const site_url = "https://ezirmusitua.site";

  const feed = new Feed({
    title: "三水言己",
    description: "三水言己",
    id: site_url,
    link: site_url,
    image: `${site_url}/logo.png`,
    favicon: `${site_url}/favicon.png`,
    copyright: "三水言己",
    generator: "https://github.com/jpmonette/feed",
    feedLinks: {
      rss2: `${site_url}/rss.xml`,
      atom1: `${site_url}/atom.xml`,
      json1: `${site_url}/rss.json`,
    },
    author: Author,
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${site_url}/blog/${post.id}`,
      link: `${site_url}/blog/${post.id}`,
      description: post.excerpt,
      date: new Date(post.date),
      author: [Author],
      image: post.cover_image || "",
    });
  });
  switch (type) {
    case "rss":
      return feed.rss2();
    case "atom":
      return feed.atom1();
    case "json":
      return feed.json1();
  }
}
