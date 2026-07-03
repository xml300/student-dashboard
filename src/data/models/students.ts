import { eq } from "drizzle-orm";
import { db } from "../db";
import { Student, students, users } from "../db/schema";


export const Students = {
    get: async () => {
        const allStudents = await db.select().from(students).innerJoin(users, eq(students.userId, users.id));
        return allStudents;
    },
    getById: async (id: number) => {
        const [student] = await db.select().from(students).innerJoin(users, eq(students.userId, users.id)).where(eq(students.userId, id)).limit(1);
        return student;
    },
    getByRegNo: async (regNo: string) => {
        const [student] = await db.select().from(students).innerJoin(users, eq(students.userId, users.id)).where(eq(students.matricNo, regNo)).limit(1);
        return student;
    },
    getByUsername: async (username: string) => {
        const [student] = await db.select().from(students).innerJoin(users, eq(students.userId, users.id)).where(eq(users.username, username)).limit(1);
        return student;
    },
    update: async (id: number, data: Partial<Student>) => {
        const [updatedStudent] = await db.update(students).set(data).where(eq(students.id, id)).returning();
        return updatedStudent;
    },
    delete: async (id: number) => {
        const [deletedStudent] = await db.delete(students).where(eq(students.id, id)).returning();
        return deletedStudent;
    }
}