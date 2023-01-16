import { iPost } from "./interface";

export async function get_post(id: string): Promise<iPost> {
  const resp = await fetch(
    `http://localhost:3000/api/post?id=${encodeURIComponent(id)}`,
    { method: "GET" }
  );
  const data = await resp.json();
  return data.post;
}
