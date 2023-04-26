import Comments from "./components/Comments";
import PostContent from "./components/Content";
import PostCover from "./components/Cover";
import "./index.css";
import { iPost } from "./interface";

async function Post({ post }: { post: iPost }) {
  return (
    <main className="relative h-content md:pt-8 md:pb-4">
      <div className="content-width mx-auto py-8 bg-white shadow-md">
        <PostCover frontmatter={post.frontmatter}></PostCover>
        <div className="px-8">
          <PostContent post={post}></PostContent>
        </div>
      </div>
      <Comments></Comments>
    </main>
  );
}

export default Post;
