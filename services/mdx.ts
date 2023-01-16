import * as fs from "fs/promises";
import matter from "gray-matter";
import lisp from "highlight.js/lib/languages/lisp";
import { serialize } from "next-mdx-remote/serialize";
import rehype_highlight from "rehype-highlight";
import remark_gfm from "remark-gfm";
import rehype_slug from "rehype-slug";
import rehype_toc from "rehype-toc";
import { iFrontMatter } from "schema/post";
import { visit } from "unist-util-visit";

/** @type {import('unified').Plugin<Array<void>, import('hast').Root>} */
export function rehype_meta_as_attrs() {
  return (tree: any) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "code" && node.data && node.data.meta) {
        node.properties.meta = JSON.stringify(
          node.data.meta
            .split(" ")
            .reduce((acc: Record<string, any>, part: string) => {
              const [key, value] = part.split("=");
              return { ...acc, [key.trim()]: (value || "").trim() };
            }, {})
        );
      } else {
        node.properties.meta = "{}";
      }
    });
  };
}

export async function parse_frontmatter(path: string) {
  const content = await fs.readFile(path);
  const { data: frontmatter } = matter(content);
  return frontmatter as iFrontMatter;
}

export async function serialize_mdx<F>(fp: string) {
  const content = await fs.readFile(fp);
  const { scope, compiledSource, frontmatter } = await serialize(content, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remark_gfm],
      rehypePlugins: [
        [rehype_highlight, { languages: { lisp: lisp } }],
        rehype_meta_as_attrs,
        rehype_slug,
        rehype_toc,
      ],
    },
  });
  return { scope, jsx: compiledSource, frontmatter: frontmatter as F };
}
