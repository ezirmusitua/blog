import PostContent from "./components/Content";
import PostCover from "./components/Cover";
import { iPost } from "./interface";
import "./index.css";

async function Post({ post }: { post: iPost }) {
  return (
    <main className="relative h-content md:pt-8 md:pb-4">
      <div className="content-width mx-auto py-8 bg-white shadow-md">
        <PostCover frontmatter={post.frontmatter}></PostCover>
        <div className="px-8">
          <PostContent post={post}></PostContent>
        </div>
      </div>
    </main>
  );
}

export default Post;
