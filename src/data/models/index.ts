import { eq } from "drizzle-orm";
import { db } from "../db";
import { Course, courses, Lecturer, lecturers, Student, students, User, users } from "../db/schema";


export const LectureSessions = {
    get: async () => {
        const allUsers = await db.select().from(users);
        return allUsers;
    },
    getById: async (id: number) => {
        const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
        return user;
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

export const AttendanceRecords = {
    get: async () => {
        const allUsers = await db.select().from(users);
        return allUsers;
    },
    getById: async (id: number) => {
        const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
        return user;
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

export const CourseAssignments = {
    get: async () => {
        const allUsers = await db.select().from(users);
        return allUsers;
    },
    getById: async (id: number) => {
        const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
        return user;
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

export const StudentEnrollments = {
    get: async () => {
        const allUsers = await db.select().from(users);
        return allUsers;
    },
    getById: async (id: number) => {
        const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
        return user;
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

export const AuthorizedDevices = {
    get: async () => {
        const allUsers = await db.select().from(users);
        return allUsers;
    },
    getById: async (id: number) => {
        const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
        return user;
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

export const LecturerDevices = {
    get: async () => {
        const allUsers = await db.select().from(users);
        return allUsers;
    },
    getById: async (id: number) => {
        const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
        return user;
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

export const Activities = {
    get: async () => {
        const allUsers = await db.select().from(users);
        return allUsers;
    },
    getById: async (id: number) => {
        const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
        return user;
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

export const AttendanceRooms = {
    get: async () => {
        const allUsers = await db.select().from(users);
        return allUsers;
    },
    getById: async (id: number) => {
        const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
        return user;
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