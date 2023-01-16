import { iFrontMatter } from "schema/post";

export interface iPost {
  jsx: string;
  scope?: Record<string, any>;
  frontmatter: iFrontMatter;
}
