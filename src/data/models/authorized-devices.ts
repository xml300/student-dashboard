import { eq } from "drizzle-orm";
import { db } from "../db";
import { AuthorizedDevice, authorizedDevices } from "../db/schema";


export const AuthorizedDevices = {
    get: async () => {
        const devices = await db.select().from(authorizedDevices);
        return devices;
    },
    getById: async (id: number) => {
        const [device] = await db.select().from(authorizedDevices).where(eq(authorizedDevices.id, id)).limit(1);
        return device;
    },
    create: async (data: typeof authorizedDevices.$inferInsert) => {
        const [newDevice] = await db.insert(authorizedDevices).values(data).returning();
        return newDevice;
    },
    update: async (id: number, data: Partial<AuthorizedDevice>) => {
        const [updatedDevice] = await db.update(authorizedDevices).set(data).where(eq(authorizedDevices.id, id)).returning();
        return updatedDevice;
    },
    delete: async (id: number) => {
        const [deletedDevice] = await db.delete(authorizedDevices).where(eq(authorizedDevices.id, id)).returning();
        return deletedDevice;
    }
}