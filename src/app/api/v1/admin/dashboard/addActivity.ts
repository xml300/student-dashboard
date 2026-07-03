import { db } from "@/db";
import { activities } from "@/db/schema";

export async function addActivity({ category, action, affectedItem, details }: {
  category: string;
  action: string;
  affectedItem?: string;
  details: string;
}) {
  await db.insert(activities).values({
    category,
    action,
    affectedItem,
    details,
    timestamp: new Date(),
  });
}