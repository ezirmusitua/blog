import { tApiHandler, tApiRequest, tApiResponse } from "interface";
import append_database from "./database";

const interceptors = [append_database];

export default function withInterceptors(handler: tApiHandler<any>) {
  return async (req: tApiRequest, res: tApiResponse<any>) => {
    for await (const interceptor of interceptors) {
      await interceptor(req, res);
    }
    return handler(req, res);
  };
}
