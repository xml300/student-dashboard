import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { lectureSessions, LectureSession, attendanceRecords, attendanceRooms } from "../db/schema";


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
    getAttendanceRooms: async (id: number) => {
        const rooms = await db.select().from(attendanceRooms).where(eq(attendanceRooms.sessionId, id));
        return rooms;
    },
    getRecords: async (id: number) => {
        const records = await db.select().from(attendanceRecords).where(eq(attendanceRecords.sessionId, id));
        return records;
    },
    getRecordByStudentId: async (sessionId: number, studentId: number) => {
        const [record] = await db.select().from(attendanceRecords)
            .where(and(
                eq(attendanceRecords.sessionId, sessionId),
                eq(attendanceRecords.studentId, studentId)
            ))
            .limit(1);
        return record;
    },
    markRecord: async (id: number,  studentId: number, attendanceRecord: number) => {
        const [newRecord] = await db.insert(attendanceRecords).values({
            sessionId: id,
            studentId: studentId,
            attendanceRecord: attendanceRecord,
        }).returning({ recordId: attendanceRecords.id });
        return newRecord;
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