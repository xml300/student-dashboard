import { NextResponse } from 'next/server';
import { db } from '@/db';
import { and, eq } from 'drizzle-orm';
import { attendanceRecords, authorizedDevices, students } from '@/db/schema';

export async function POST(req: Request) {
    try {
        const { uuid, sessionId } = await req.json();
        if (!uuid || !sessionId) {
            return NextResponse.json({ success: false, error: 'Missing uuid or sessionId' }, { status: 400 });
        }
        const student = await db.select().from(students).leftJoin(authorizedDevices, eq(students.studentId, authorizedDevices.studentId))
                                            .where(eq(authorizedDevices.deviceUUID, uuid)).limit(1);
        if (!student.length) {
            return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
        }

        const studentId = student[0].students.studentId;

        // Check if attendance has already been marked
        const existingRecord = await db.select().from(attendanceRecords)
            .where(and(eq(attendanceRecords.sessionId, sessionId), eq(attendanceRecords.studentId, studentId)))
            .limit(1);

        if (existingRecord.length > 0) {
            return NextResponse.json({ success: false, error: 'Attendance already marked' }, { status: 409 });
        }

        // Insert attendance record
        await db.insert(attendanceRecords).values({
            sessionId: sessionId,
            studentId: studentId,
            attendanceRecord: 1, // 1 = present
        });

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}
