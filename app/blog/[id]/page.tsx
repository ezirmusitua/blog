import { listPost, getPost } from "services/post";
import Post from "components/post";

interface iProps {
  params: { id: string };
}

async function BlogPostPage({ params: { id } }: iProps) {
  const post = await getPost(id);
  // @ts-expect-error Server Component
  return <Post post={post}></Post>;
}

export async function generateStaticParams() {
  const posts = await listPost();
  return posts.map((post) => ({ id: post.id }));
}

export default BlogPostPage;
