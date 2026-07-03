import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/data/db/schema.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
