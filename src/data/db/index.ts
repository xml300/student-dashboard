import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || "",
});

declare global {
  var db: ReturnType<typeof drizzle> | undefined
}

export const db = global.db ?? drizzle(pool, { schema });
if (process.env.NODE_ENV !== "production") global.db = db;