import Posts from "./components/Posts";
import Profile from "./components/Profile";
import { listMdx } from "services/post";
import { api_config } from "config";

async function Home() {
  const posts = await listMdx(api_config.posts_dir);

  return (
    <main className="w-full pt-12 pb-8 px-4 flex flex-wrap justify-center gap-4">
      <Profile></Profile>
      <Posts posts={posts}></Posts>
    </main>
  );
}

export default Home;
