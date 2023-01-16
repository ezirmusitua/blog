import { tApiRequest, tApiResponse } from "interface";

export const IsMethod =
  (method: "GET" | "POST" | "PUT" | "DELETE" | "HEAD") =>
  (req: tApiRequest, res: tApiResponse<any>) => {
    if (req.method === method) return true;
    res.status(404);
    res.send("Method Not Allowed");
  };

