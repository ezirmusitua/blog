import { iFrontMatter } from "schema/post";

interface iProps {
  metadata: iFrontMatter;
  extra?: Record<string, any>;
}

function ArticleJsonLD({ metadata, extra = {} }: iProps) {
  const content = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: metadata.title,
      image: [metadata.cover_image].filter(Boolean),
      datePublished: new Date(metadata.date).toISOString(),
      dateModified: new Date(metadata.date).toISOString(),
      author: [
        {
          "@type": "Person",
          name: "ezirmusitua",
          url: "https://ezirmusitua.site",
        },
      ],
      description: metadata.excerpt,
      ...extra,
    },
    null,
    2
  );
  return <script type="application/ld+json">{content}</script>;
}

export default ArticleJsonLD;
