import { NextResponse, NextRequest } from 'next/server';
import { db } from "@/db/index";
import { courses, lectureSessions, attendanceRecords, studentEnrollments } from "@/db/schema";
import { and, eq, sql, countDistinct, max, desc } from "drizzle-orm";

export async function GET(request: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
    const courseId = (await params).courseId;

    try {
        const courseDetails = await db.select({
            courseId: courses.courseId,
            courseName: courses.courseName,
            courseCode: courses.courseCode,
            courseDesc: courses.courseDesc,
            courseUnit: courses.courseUnit,
            semester: courses.semester,
            students: countDistinct(studentEnrollments.studentId),
        })
        .from(courses)
        .leftJoin(studentEnrollments, eq(studentEnrollments.courseId, courses.courseId))
        .where(eq(courses.courseCode, courseId))
        .groupBy(courses.courseId);

        if (courseDetails.length === 0) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        const attendanceRateResult = await db.select({
            attendanceRate: sql<number>`avg(${attendanceRecords.attendanceRecord}) * 100`,
        })
        .from(attendanceRecords)
        .leftJoin(lectureSessions, eq(attendanceRecords.sessionId, lectureSessions.sessionId))
        .where(eq(lectureSessions.courseId, courseDetails[0].courseId));

        const lastAttendanceResult = await db.select({
            lastAttendance: max(lectureSessions.sessionDatetime),
        })
        .from(lectureSessions)
        .where(eq(lectureSessions.courseId, courseDetails[0].courseId));

        const nextSessionResult = await db.select({
            nextSession: lectureSessions.sessionDatetime,
        })
        .from(lectureSessions)
        .where(and(eq(lectureSessions.courseId, courseDetails[0].courseId), sql`${lectureSessions.sessionDatetime} > NOW()`))
        .orderBy(lectureSessions.sessionDatetime)
        .limit(1);

        const recentSessionsResult = await db.select({
            date: lectureSessions.sessionDatetime,
            attendees: countDistinct(attendanceRecords.studentId),
            totalStudents: sql<number>`(SELECT count(*) FROM ${studentEnrollments} WHERE ${studentEnrollments.courseId} = ${courseDetails[0].courseId})`,
            rate: sql<string>`(CAST(count(DISTINCT ${attendanceRecords.studentId}) AS REAL) / (SELECT count(*) FROM ${studentEnrollments} WHERE ${studentEnrollments.courseId} = ${courseDetails[0].courseId}) * 100) || '%'`,
        })
        .from(lectureSessions)
        .leftJoin(attendanceRecords, eq(lectureSessions.sessionId, attendanceRecords.sessionId))
        .where(eq(lectureSessions.courseId, courseDetails[0].courseId))
        .groupBy(lectureSessions.sessionId)
        .orderBy(desc(lectureSessions.sessionDatetime))
        .limit(3);

        const course = {
            ...courseDetails[0],
            title: courseDetails[0].courseName,
            attendanceRate: Number(attendanceRateResult[0]?.attendanceRate).toFixed(2) + '%' || 'N/A',
            lastAttendance: lastAttendanceResult[0]?.lastAttendance || 'N/A',
            nextSession: nextSessionResult[0]?.nextSession || 'N/A',
            recentSessions: recentSessionsResult,
        };

        return NextResponse.json(course);
    } catch (error) {
        console.error('Error fetching course details:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
