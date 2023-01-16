import type { NextApiRequest, NextApiResponse } from "next";
import { DataSource } from "typeorm";

export type tApiRequest = NextApiRequest & { database: DataSource };
export type tApiResponse<T> = NextApiResponse<T>;
export type tApiHandler<T> = {
  (req: tApiRequest, res: tApiResponse<T>): unknown | Promise<unknown>
}