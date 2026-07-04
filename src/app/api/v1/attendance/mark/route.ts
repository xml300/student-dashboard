import { NextResponse } from 'next/server';
import { db } from '@/data/db';
import { and, eq } from 'drizzle-orm';
import { attendanceRecords, authorizedDevices, students } from '@/data/db/schema';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({
                success: false,
                error: 'Unauthorized'
            }, { status: 401 });
        }

        if(!user.studentId){
            return NextResponse.json({
                success: false,
                error: 'Unauthorized'
            }, { status: 401 });
        }

        const { uuid, sessionId } = await req.json();
        if (!uuid || !sessionId) {
            return NextResponse.json({ success: false, error: 'Missing uuid or sessionId' }, { status: 400 });
        }
        const [student] = await db.select().from(students).leftJoin(authorizedDevices, eq(students.id, authorizedDevices.id))
            .where(eq(students.id, user.studentId)).limit(1);
        if (!student) {
            return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
        }

        const studentId = student.students.id;

        // Check if attendance has already been marked
        const [existingRecord] = await db.select().from(attendanceRecords)
            .where(and(eq(attendanceRecords.sessionId, sessionId), eq(attendanceRecords.studentId, studentId)))
            .limit(1);

        if (existingRecord) {
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
        console.log(e);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}
