import { eq } from "drizzle-orm";
import { db } from "../db";
import { attendanceRooms, AttendanceRoom } from "../db/schema";

export const AttendanceRooms = {
    get: async () => {
        const allUsers = await db.select().from(attendanceRooms);
        return allUsers;
    },
    getById: async (id: number) => {
        const [room] = await db.select().from(attendanceRooms).where(eq(attendanceRooms.id, id)).limit(1);
        return room;
    },
    getBySessionId: async (sessionId: number) => {
        const sRooms = await db.select().from(attendanceRooms).where(eq(attendanceRooms.sessionId, sessionId));
        return sRooms;
    },
    update: async (id: number, data: Partial<AttendanceRoom>) => {
        const [updatedRoom] = await db.update(attendanceRooms).set(data).where(eq(attendanceRooms.id, id)).returning();
        return updatedRoom;
    },
    delete: async (id: number) => {
        const [deletedRoom] = await db.delete(attendanceRooms).where(eq(attendanceRooms.id, id)).returning();
        return deletedRoom;
    }
}