import classnames from "classnames";
import { iFrontMatter } from "schema/post";
import PostItem from "./PostItem";

interface iProps {
  posts: ({ id: string } & iFrontMatter)[];
}

function Posts({ posts }: iProps) {
  const item_class = (index: number) =>
    classnames({
      "border-b": index != posts.length - 1,
      "border-[var(--border-color)]": index != posts.length - 1,
    });
  return (
    <section className="content-width px-8 py-8 bg-white shadow-md">
      {posts.map((p, index) => (
        <div key={p.id} className={item_class(index)}>
          <PostItem post={p}></PostItem>
        </div>
      ))}
    </section>
  );
}

export default Posts;
