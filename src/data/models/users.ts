import { eq } from "drizzle-orm";
import { db } from "../db";
import { User, users } from "../db/schema";

export const Users = {
    get: async () => {
        const allUsers = await db.select().from(users);
        return allUsers;
    },
    getById: async (id: number) => {
        const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
        return user;
    },
    create: async (data: typeof users.$inferInsert) => {
        const [newUser] = await db.insert(users).values(data).returning();
        return newUser;
    },
    getByUsername: async (username: string) => {
        const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
        return user;
    },
    update: async (id: number, data: Partial<User>) => {
        const [updatedUser] = await db.update(users).set(data).where(eq(users.id, id)).returning();
        return updatedUser;
    },
    delete: async (id: number) => {
        const [deletedUser] = await db.delete(users).where(eq(users.id, id)).returning();
        return deletedUser;
    }
}
