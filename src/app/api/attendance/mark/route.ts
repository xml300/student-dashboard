import { NextResponse } from 'next/server';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
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

        // Insert attendance record
        await db.insert(attendanceRecords).values({
            sessionId: sessionId,
            studentId: student[0].students.studentId,
            attendanceRecord: 1, // 1 = present
        });

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}
