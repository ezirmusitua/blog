import { Get } from "guards";
import with_interceptors from "interceptors";
import { tApiHandler, tApiRequest, tApiResponse } from "interface";
import with_middlewares from "middlewares";
import { get_post, list_post } from "services/post";

let handler: tApiHandler<any> = async (
  req: tApiRequest,
  res: tApiResponse<any>
) => {
  try {
    const { id } = req.query;
    if (!id) {
      const posts = await list_post();
      return res.status(200).json({ posts });
    } else {
      const post = await get_post(id + "");
      return res.status(200).json({ post });
    }
  } catch (e: any) {
    console.log("[ERROR] something went wrong ", e.message);
    return res.status(500).send("Interval server error");
  }
};

handler = with_interceptors(handler);
handler = with_middlewares(handler);
handler = Get(handler);

export default handler;
