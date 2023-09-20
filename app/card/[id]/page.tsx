import { listMdx, getMdx } from "services/post";
import Post from "components/post";
import { api_config } from "config";

interface iProps {
  params: { id: string };
}

async function CardPage({ params: { id } }: iProps) {
  const post = await getMdx(api_config.card_dir, id);
  // @ts-expect-error Server Component
  return <Post post={post}></Post>;
}

export async function generateStaticParams() {
  const posts = await listMdx(api_config.card_dir);
  return posts.map((post) => ({ id: post.id }));
}

export default CardPage;
