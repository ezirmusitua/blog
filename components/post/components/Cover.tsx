// import Image from "next/image";
import { iFrontMatter } from "schema/post";
import PublishedTime from "./PublishedTime";

interface iProps {
  frontmatter: iFrontMatter;
}

function PostCover({ frontmatter }: iProps) {
  return (
    <div className="relative w-full px-8">
      {frontmatter.cover_image && (
        <div className="relative w-full h-[240px]">
          <img
            className="absolute left-0 top-0 w-full h-full object-cover object-center"
            src={frontmatter.cover_image}
            sizes="(min-width: 1280px) 1920px, (min-width: 1024px) 1600px, 960px"
            alt="cover"
          ></img>
        </div>
      )}
      <div className="relative w-full">
        <div className="pr-4 flex justify-center items-center">
          <h1 className="leading-normal text-[var(--em-color)]">
            {frontmatter.title}
          </h1>
        </div>
        <blockquote>
          <q>{frontmatter.excerpt}</q>
        </blockquote>
        <PublishedTime
          date={frontmatter.date}
          className="text-right"
        ></PublishedTime>
      </div>
    </div>
  );
}

export default PostCover;
