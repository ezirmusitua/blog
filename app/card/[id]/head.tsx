import { DefaultMeta } from "app/head";
import { getMdx } from "services/post";
import config, { api_config } from "config";
import ArticleJsonLD from "components/ArticleJsonLD";

interface iProps {
  params: { id: string };
}

async function CardHead({ params: { id } }: iProps) {
  const post = await getMdx(api_config.cards_dir, id);
  const frontmatter = { ...post.frontmatter };
  let { links, commands } = frontmatter;
  if (frontmatter.links) {
    links = JSON.parse(frontmatter.links as string);
  }
  if (frontmatter.commands) {
    commands = JSON.parse(frontmatter.commands as string);
  }

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
      <ArticleJsonLD
        metadata={post.frontmatter}
        extra={{ links, commands }}
      ></ArticleJsonLD>
    </head>
  );
}

export default CardHead;
