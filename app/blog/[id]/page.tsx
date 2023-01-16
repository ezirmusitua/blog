import { list_post, get_post } from "services/post";
import Post from "components/post";

interface iProps {
  params: { id: string };
}

async function BlogPostPage({ params: { id } }: iProps) {
  const post = await get_post(id);
  // @ts-expect-error Server Component
  return <Post post={post}></Post>;
}

export default BlogPostPage;

export async function generateStaticParams() {
  const posts = await list_post();
  return posts.map((post) => ({ id: post.id }));
}
