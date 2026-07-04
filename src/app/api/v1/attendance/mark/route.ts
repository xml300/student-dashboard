import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { Students } from '@/data/models/students';
import { LectureSessions } from '@/data/models/lecture-sessions';
import { AttendanceStatus } from '@/types/attendance';

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
        const student = await Students.getById(user.studentId);
        if (!student) {
            return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
        }
        const studentId = student.students.id;
        const existingRecord = await LectureSessions.getRecordByStudentId(sessionId, studentId);
        if (existingRecord) {
            return NextResponse.json({ success: false, error: 'Attendance already marked' }, { status: 409 });
        }
        await LectureSessions.markRecord(sessionId, studentId, AttendanceStatus.PRESENT);
        return NextResponse.json({ success: true });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}
