import { NextResponse } from 'next/server';
import { db } from '@/data/db';
import { attendanceRecords, attendanceRooms, courses, authorizedDevices, lectureSessions, studentEnrollments } from '@/data/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';
import { Courses } from '@/data/models/courses';
import { Activities } from '@/data/models/activities';

export async function POST(req: Request) {
    const user = await getCurrentUser();
    if(!user) return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    
    const userId = user.id;
    try {
        const { courseId } = await req.json();
        if (!courseId) {
            return NextResponse.json({ error: 'Missing courseId' }, { status: 400 });
        }

        const course = await Courses.getByCode(courseId);
        const [newSession] = await db
            .insert(lectureSessions)
            .values({
                courseId: course.id,
                duration: 2
            })
            .returning();

        if (!newSession) {
            return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
        }
 
        await Activities.create({
            category: "Course Management",
            action: "Created new lecture session",
            affectedItem: courseId,
            details: `Session ${newSession.id} created for course ${courseId}`
        });

        const students = await db.select().from(studentEnrollments).innerJoin(courses, eq(courses.id, studentEnrollments.courseId))
        .where(eq(courses.courseCode, courseId));
        

        for (const student of students) {
            await db.insert(attendanceRecords)
                .values({
                    sessionId: newSession.id,
                    studentId: student.student_enrollments.studentId,
                    attendanceRecord: 0,
                });
        }

        const devices = await db.select().from(authorizedDevices).where(eq(authorizedDevices.userId, userId))
        for(const device of devices){
        await db.insert(attendanceRooms).values({
            sessionId: newSession.id,
            deviceUUID: device.deviceUUID,
        })
        }

        return NextResponse.json({
            sessionId: newSession.id,
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
