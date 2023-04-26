import { Get } from "guards";
import withInterceptors from "interceptors";
import { tApiHandler, tApiRequest, tApiResponse } from "interface";
import withMiddleware from "middleware";
import { getPost, listPost } from "services/post";

let handler: tApiHandler<any> = async (
  req: tApiRequest,
  res: tApiResponse<any>
) => {
  try {
    const { id } = req.query;
    if (!id) {
      const posts = await listPost();
      return res.status(200).json({ posts });
    } else {
      const post = await getPost(id + "");
      return res.status(200).json({ post });
    }
  } catch (e: any) {
    console.log("[ERROR] something went wrong ", e.message);
    return res.status(500).send("Interval server error");
  }
};

handler = withInterceptors(handler);
handler = withMiddleware(handler);
handler = Get(handler);

export default handler;
