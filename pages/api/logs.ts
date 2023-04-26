import { Get } from "guards";
import withInterceptors from "interceptors";
import { tApiHandler, tApiRequest, tApiResponse } from "interface";
import withMiddleware from "middleware";
import { sLog } from "schema";

let handler: tApiHandler<any> = async (
  req: tApiRequest,
  res: tApiResponse<any>
) => {
  const log_repo = req.database.getRepository(sLog);
  const logs = await log_repo.find({});
  res.status(200).json({ logs });
};

handler = withInterceptors(handler);
handler = withMiddleware(handler);
handler = Get(handler);

export default handler;
