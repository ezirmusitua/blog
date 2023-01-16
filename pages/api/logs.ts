import { Get } from "guards";
import with_interceptors from "interceptors";
import { tApiHandler, tApiRequest, tApiResponse } from "interface";
import with_middlewares from "middlewares";
import { sLog } from "schema";

let handler: tApiHandler<any> = async (
  req: tApiRequest,
  res: tApiResponse<any>
) => {
  const log_repo = req.database.getRepository(sLog);
  const logs = await log_repo.find({});
  res.status(200).json({ logs });
};
handler = with_interceptors(handler);
handler = with_middlewares(handler);
handler = Get(handler);

export default handler;

