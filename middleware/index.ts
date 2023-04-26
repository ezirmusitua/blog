import Cors from "./cors";

import { tApiHandler, tApiRequest, tApiResponse } from "interface";

const Presets = [Cors];

export default function withMiddleware(handler: tApiHandler<any>) {
  return async (req: tApiRequest, res: tApiResponse<any>) => {
    for await (const middleware of Presets) {
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
