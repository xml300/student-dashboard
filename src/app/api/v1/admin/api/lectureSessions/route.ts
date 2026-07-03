import { NextResponse } from 'next/server';
import { db } from '@/db';
import { attendanceRecords, attendanceRooms, courses, lecturerDevices, lectureSessions, studentEnrollments } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if(!session) return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    
    const lecturerId = session.lecturerId;
    try {
        const { courseId } = await req.json();
        
        if (!courseId) {
            return NextResponse.json({ error: 'Missing courseId' }, { status: 400 });
        }

        const course = (await db.select().from(courses).where(eq(courses.courseCode, courseId)).limit(1))[0];

        const [newSession] = await db
            .insert(lectureSessions)
            .values({
                courseId: course.courseId,
                duration: 2
            })
            .returning();

        if (!newSession) {
            return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
        }

        
        const { addActivity } = await import("@/app/api/dashboard/addActivity");
        await addActivity({
            category: "Course Management",
            action: "Created new lecture session",
            affectedItem: courseId,
            details: `Session ${newSession.sessionId} created for course ${courseId}`
        });

        const students = await db.select().from(studentEnrollments).innerJoin(courses, eq(courses.courseId, studentEnrollments.courseId))
        .where(eq(courses.courseCode, courseId));
        

        for (const student of students) {
            await db.insert(attendanceRecords)
                .values({
                    sessionId: newSession.sessionId,
                    studentId: student.student_enrollments.studentId,
                    attendanceRecord: 0,
                });
        }

        const devices = await db.select().from(lecturerDevices).where(eq(lecturerDevices.lecturerId, lecturerId))
        for(const device of devices){
        await db.insert(attendanceRooms).values({
            sessionId: newSession.sessionId,
            deviceUUID: device.deviceUUID,
        })
        }

        return NextResponse.json({
            sessionId: newSession.sessionId,
            sessionDatetime: newSession.sessionDatetime,
            courseId: newSession.courseId,
        });
    } catch (e) {
        if (e instanceof Error) {
            return NextResponse.json({ error: 'Server error: ' + e.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}
