import { api_config } from "config";
import { DataSource } from "typeorm";
import type { NextApiRequest, NextApiResponse } from "next";
import { sLog } from "schema";

export default async function append_database(
  req: NextApiRequest & { database: DataSource },
  res: NextApiResponse
) {
  if (req?.database?.isInitialized) return;
  const database = new DataSource({
    type: "sqljs",
    ...api_config.database,
    entities: [sLog],
  });
  try {
    // await database.initialize();
    // console.info("[INFO] initialize database success");
  } catch (e: any) {
    console.error("initialize database failed: ", e.message);
  }
  req.database = database;
}

