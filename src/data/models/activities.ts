import { eq } from "drizzle-orm";
import { db } from "../db";
import { activities, Activity} from "../db/schema";

export const Activities = {
    get: async () => {
        const allActivities = await db.select().from(activities);
        return allActivities;
    },
    getById: async (id: number) => {
        const [activity] = await db.select().from(activities).where(eq(activities.id, id)).limit(1);
        return activity;
    },
    create: async (data: typeof activities.$inferInsert) => {
        const [newActivity] = await db.insert(activities).values(data).returning();
        return newActivity;
    },
    update: async (id: number, data: Partial<Activity>) => {
        const [updatedActivity] = await db.update(activities).set(data).where(eq(activities.id, id)).returning();
        return updatedActivity;
    },
    delete: async (id: number) => {
        const [deletedActivity] = await db.delete(activities).where(eq(activities.id, id)).returning();
        return deletedActivity;
    }
}
