import Posts from "./components/Posts";
import Profile from "./components/Profile";
import { list_post } from "services/post";

async function Home() {
  const posts = await list_post();

  return (
    <main className="w-full pt-12 pb-8 px-4 flex flex-wrap justify-center gap-4">
      <Profile></Profile>
      <Posts posts={posts}></Posts>
    </main>
  );
}

export default Home;
