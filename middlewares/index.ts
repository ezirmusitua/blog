import Cors from "./cors";

import { tApiHandler, tApiRequest, tApiResponse } from "interface";

const middlewares = [Cors];

export default function with_middlewares(handler: tApiHandler<any>) {
  return async (req: tApiRequest, res: tApiResponse<any>) => {
    for await (const middleware of middlewares) {
      await new Promise((resolve, reject) =>
        middleware(req, res, (result: any) => {
          if (result instanceof Error) return reject(result);
          return resolve(result);
        })
      );
    }
    return handler(req, res);
  };
}
