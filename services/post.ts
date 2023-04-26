import { iPost } from "components/post/interface";
import dayjs from "dayjs";
import * as fs from "fs/promises";
import * as path from "path";
import { iFrontMatter } from "schema/post";
import { api_config } from "../config";
import { parse_frontmatter, serialize_mdx } from "./mdx";

function id_from_name(p: string) {
  return path.basename(p).replace(path.extname(p), "");
}

function id_to_name(id: string) {
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
      return { id: id_from_name(p), ...frontmatter } as iPostMeta;
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
  const fp = api_config.post_file(id_to_name(id));
  return serialize_mdx<iFrontMatter>(fp);
}
