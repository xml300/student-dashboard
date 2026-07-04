import { eq } from "drizzle-orm";
import { db } from "../db";
import { lectureSessions, LectureSession } from "../db/schema";


export const LectureSessions = {
    get: async () => {
        const allSessions = await db.select().from(lectureSessions);
        return allSessions;
    },
    getById: async (id: number) => {
        const [session] = await db.select().from(lectureSessions).where(eq(lectureSessions.id, id)).limit(1);
        return session;
    },
    create: async (data: typeof lectureSessions.$inferInsert) => {
        const [newSession] = await db.insert(lectureSessions).values(data).returning();
        return newSession;
    },
    getByCourseId: async (courseId: number) => {
        const courseSessions = await db.select().from(lectureSessions).where(eq(lectureSessions.courseId, courseId));
        return courseSessions;
    },
    update: async (id: number, data: Partial<LectureSession>) => {
        const [updatedSession] = await db.update(lectureSessions).set(data).where(eq(lectureSessions.id, id)).returning();
        return updatedSession;
    },
    delete: async (id: number) => {
        const [deletedSession] = await db.delete(lectureSessions).where(eq(lectureSessions.id, id)).returning();
        return deletedSession;
    }
}