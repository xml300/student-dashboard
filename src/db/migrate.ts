import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from ".";

async function main() {
  console.log("Running migrations...");
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("Migrations finished.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
