import { api_config } from "config";
import { iFrontMatter } from "schema/post";

export async function list_post(): Promise<({ id: string } & iFrontMatter)[]> {
  const resp = await fetch(api_config.resource("/api/post"), { method: "GET" });
  const { posts } = await resp.json();
  return posts;
}
