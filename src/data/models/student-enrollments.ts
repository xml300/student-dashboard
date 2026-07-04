import { eq } from "drizzle-orm";
import { db } from "../db";
import { studentEnrollments, StudentEnrollment } from "../db/schema";

export const StudentEnrollments = {
    get: async () => {
        const allStudentEnrollments = await db.select().from(studentEnrollments);
        return allStudentEnrollments;
    },
    getById: async (id: number) => {
        const [studentEnrollment] = await db.select().from(studentEnrollments).where(eq(studentEnrollments.id, id)).limit(1);
        return studentEnrollment;
    },
    create: async (data: typeof studentEnrollments.$inferInsert) => {
        const [newEnrollment] = await db.insert(studentEnrollments).values(data).returning();
        return newEnrollment;
    },
    update: async (id: number, data: Partial<StudentEnrollment>) => {
        const [updatedStudentEnrollment] = await db.update(studentEnrollments).set(data).where(eq(studentEnrollments.id, id)).returning();
        return updatedStudentEnrollment;
    },
    delete: async (id: number) => {
        const [deletedStudentEnrollment] = await db.delete(studentEnrollments).where(eq(studentEnrollments.id, id)).returning();
        return deletedStudentEnrollment;
    }
}