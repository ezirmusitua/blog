import { DefaultMeta } from "app/head";
import { get_post } from "services/post";
import config from "config";

interface iProps {
  params: { id: string };
}

async function PostHead({ params: { id } }: iProps) {
  const post = await get_post(id);
  return (
    <head>
      <title>{`${post.frontmatter.title} - ${config.site_title}`}</title>
      <DefaultMeta></DefaultMeta>
      <meta name="keywords" content={post.frontmatter.keywords || ""}></meta>
      <meta
        name="description"
        content={post.frontmatter.excerpt || "Blog post from ezirmusitua"}
      ></meta>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github.min.css"
      ></link>
    </head>
  );
}

export default PostHead;
