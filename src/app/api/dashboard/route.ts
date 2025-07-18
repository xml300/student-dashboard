import { NextResponse } from 'next/server';
import { db } from '@/db';
import { and, eq, count } from 'drizzle-orm';
import { attendanceRecords, lectureSessions, courses, students, authorizedDevices, users } from '@/db/schema';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user || !user.name) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const studentQuery = await db.select().from(students).innerJoin(users, eq(students.userId, users.id)).where(eq(users.username, user.name)).limit(1);
        if (!studentQuery.length) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }
        const student = studentQuery[0].students;
        const studentId = (user as any)?.studentId;

        const totalClassesResult = await db.select({ value: count() }).from(lectureSessions);
        const attendedClassesResult = await db.select({ value: count() }).from(attendanceRecords).where(and(eq(attendanceRecords.studentId, studentId), eq(attendanceRecords.attendanceRecord, 1)));

        const total = totalClassesResult[0].value;
        const attended = attendedClassesResult[0].value;
        const missed = total - attended;
        const attendanceRate = total > 0 ? (attended / total) * 100 : 0;

        const attendanceStats = [
            { label: "Total Classes", value: total },
            { label: "Attended", value: attended },
            { label: "Missed", value: missed },
            { label: "Attendance Rate", value: `${attendanceRate.toFixed(0)}%` },
        ];

        const upcomingSessions = await db.select().from(lectureSessions)
            .leftJoin(courses, eq(lectureSessions.courseId, courses.courseId))
            .orderBy(lectureSessions.sessionDatetime)
            .limit(2);

        const attendanceNotifications = upcomingSessions.map(s => ({
            message: `You have an attendance session in ${s.courses?.courseName}`,
            time: new Date(s.lecture_sessions.sessionDatetime || "").toLocaleTimeString()
        }));

        const attendanceHistory = await db.select().from(attendanceRecords)
            .leftJoin(lectureSessions, eq(attendanceRecords.sessionId, lectureSessions.sessionId))
            .leftJoin(courses, eq(lectureSessions.courseId, courses.courseId))
            .where(eq(attendanceRecords.studentId, studentId))
            .orderBy(lectureSessions.sessionDatetime)
            .limit(4);

        const attendanceActivity = attendanceHistory.map(h => ({
            detail: `${h.attendance_records.attendanceRecord === 1 ? 'Marked present in' : 'Missed class in'} ${h.courses?.courseName}`,
            time: `${new Date(h.lecture_sessions?.sessionDatetime || "").toDateString()}, ${new Date(h.lecture_sessions?.sessionDatetime || "").toLocaleTimeString()}`
        }));

        const authorizedDevice = await db.select().from(authorizedDevices).where(eq(authorizedDevices.studentId, studentId)).limit(1);

        return NextResponse.json({
            userName: user.name,
            attendanceStats,
            attendanceNotifications,
            attendanceActivity,
            deviceInfo: authorizedDevice.length > 0 ? {
                name: authorizedDevice[0].deviceType,
                id: authorizedDevice[0].deviceUUID,
                lastActive: new Date(authorizedDevice[0].updatedAt || "").toLocaleString()
            } : null
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
