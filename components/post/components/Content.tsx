"use client";

import "highlight.js/styles/github.css";
import { MDXRemote } from "next-mdx-remote";
// import Image from "next/image";
import { iPost } from "../interface";
import CodeBlock from "./CodeBlock";
import Heading from "./Heading";
import TOC from "./TOC";

const AllowedComponents = {
  Image,
  code: CodeBlock,
  nav: TOC,
  img: (props: any) => {
    const width = props.width || 1920;
    const height = props.height || 1920;
    return (
      <img
        {...props}
        width={width}
        height={height}
        alt={props.alt}
        sizes="(min-width: 1280px) 1920px, (min-width: 1024px) 1600px, 960px"
      ></img>
    );
  },
  h1: (props: any) => <Heading {...props} level={1}></Heading>,
  h2: (props: any) => <Heading {...props} level={2}></Heading>,
  h3: (props: any) => <Heading {...props} level={3}></Heading>,
  h4: (props: any) => <Heading {...props} level={4}></Heading>,
  h5: (props: any) => <Heading {...props} level={5}></Heading>,
  h6: (props: any) => <Heading {...props} level={6}></Heading>,
};

function PostContent({ post }: { post: iPost }) {
  return (
    <MDXRemote
      compiledSource={post.jsx}
      scope={post.scope}
      frontmatter={post.frontmatter as any}
      components={AllowedComponents as any}
    ></MDXRemote>
  );
}

export default PostContent;
