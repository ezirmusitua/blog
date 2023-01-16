import { tApiHandler, tApiRequest, tApiResponse } from "interface";
import { IsMethod } from "./methods";

export * from "./methods";
const with_guards = (handler: tApiHandler<any>, guards: any[] = []) => {
  return async (req: tApiRequest, res: tApiResponse<any>) => {
    let passed = true;
    for await (const guard of guards) {
      passed = await guard(req, res);
    }
    if (passed) {
      return handler(req, res);
    } else {
      return res.end();
    }
  };
};

export default with_guards;

export const Get = (handler: tApiHandler<any>) =>
  with_guards(handler, [IsMethod("GET")]);
export const Post = (handler: tApiHandler<any>) =>
  with_guards(handler, [IsMethod("POST")]);
export const Put = (handler: tApiHandler<any>) =>
  with_guards(handler, [IsMethod("PUT")]);
export const Delete = (handler: tApiHandler<any>) =>
  with_guards(handler, [IsMethod("DELETE")]);
export const Head = (handler: tApiHandler<any>) =>
  with_guards(handler, [IsMethod("HEAD")]);
