<<<<<<< HEAD
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || "",
});

export const db = drizzle(pool);
=======
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';
import 'dotenv/config';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();
export const db = drizzle(client, { schema });
>>>>>>> 89af23dbb9007f91ba737715a825608d4b6da105
