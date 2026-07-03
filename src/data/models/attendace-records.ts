import { eq } from "drizzle-orm";
import { db } from "../db";
import { attendanceRecords, AttendanceRecord } from "../db/schema";



export const AttendanceRecords = {
    get: async () => {
        const records = await db.select().from(attendanceRecords);
        return records;
    },
    getById: async (id: number) => {
        const [record] = await db.select().from(attendanceRecords).where(eq(attendanceRecords.id, id)).limit(1);
        return record;
    },
    update: async (id: number, data: Partial<AttendanceRecord>) => {
        const [updatedRecord] = await db.update(attendanceRecords).set(data).where(eq(attendanceRecords.id, id)).returning();
        return updatedRecord;
    },
    delete: async (id: number) => {
        const [deletedRecord] = await db.delete(attendanceRecords).where(eq(attendanceRecords.id, id)).returning();
        return deletedRecord;
    }
}