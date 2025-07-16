import { db } from "@/db/index";
import {
  users,
  students,
  courses,
  lectureSessions,
  attendanceRecords,
  studentEnrollments,
} from "@/db/schema";
import { and, eq, sql, count, countDistinct } from "drizzle-orm";

export async function getAttendanceSummary(
  startDate?: string,
  endDate?: string,
  courseId?: number
) {
  const query = db
    .select({
      courseCode: courses.courseCode,
      courseName: courses.courseName,
      totalStudents: sql<number>`count(distinct ${students.studentId})`,
      attendanceRate: sql<number>`avg(${attendanceRecords.attendanceRecord}) * 100`,
    })
    .from(courses)
    .leftJoin(lectureSessions, eq(courses.courseId, lectureSessions.courseId))
    .leftJoin(
      attendanceRecords,
      eq(lectureSessions.sessionId, attendanceRecords.sessionId)
    )
    .leftJoin(students, eq(attendanceRecords.studentId, students.studentId));

  const conditions = [];
  if (startDate) {
    conditions.push(sql`${lectureSessions.sessionDatetime} >= ${startDate}`);
  }
  if (endDate) {
    conditions.push(sql`${lectureSessions.sessionDatetime} <= ${endDate}`);
  }
  if (courseId) {
    conditions.push(eq(courses.courseId, courseId));
  }

  const summary = await query
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .groupBy(courses.courseId, courses.courseCode, courses.courseName);

  return summary;
}

export async function getCourseComparison(
  startDate?: string,
  endDate?: string,
  courseId?: number
) {
  const query = db
    .select({
      courseCode: courses.courseCode,
      courseName: courses.courseName,
      attendanceRate: sql<number>`avg(${attendanceRecords.attendanceRecord}) * 100`,
    })
    .from(courses)
    .leftJoin(lectureSessions, eq(courses.courseId, lectureSessions.courseId))
    .leftJoin(
      attendanceRecords,
      eq(lectureSessions.sessionId, attendanceRecords.sessionId)
    );

  const conditions = [];
  if (startDate) {
    conditions.push(sql`${lectureSessions.sessionDatetime} >= ${startDate}`);
  }
  if (endDate) {
    conditions.push(sql`${lectureSessions.sessionDatetime} <= ${endDate}`);
  }
  if (courseId) {
    conditions.push(eq(courses.courseId, courseId));
  }

  const comparison = await query
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .groupBy(courses.courseId, courses.courseCode, courses.courseName)
    .orderBy(sql`avg(${attendanceRecords.attendanceRecord}) desc`);

  return comparison;
}

export async function getStudentInsights(
  studentId?: number,
  startDate?: string,
  endDate?: string,
  courseId?: number
) {
  const query = db
    .select({
      studentName: users.username,
      matricNo: students.matricNo,
      courseCode: courses.courseCode,
      attendanceRate: sql<number>`avg(${attendanceRecords.attendanceRecord}) * 100`,
      lastSession: sql<string>`max(${lectureSessions.sessionDatetime})`,
      totalSessionsAttended: sql<number>`count(${attendanceRecords.attendanceRecord}) filter (where ${attendanceRecords.attendanceRecord} = true)`,
      totalSessions: sql<number>`count(${lectureSessions.sessionId})`,
    })
    .from(students)
    .leftJoin(users, eq(students.userId, users.id))
    .leftJoin(
      attendanceRecords,
      eq(students.studentId, attendanceRecords.studentId)
    )
    .leftJoin(
      lectureSessions,
      eq(attendanceRecords.sessionId, lectureSessions.sessionId)
    )
    .leftJoin(courses, eq(lectureSessions.courseId, courses.courseId));

  const conditions = [];
  if (studentId) {
    conditions.push(eq(students.studentId, studentId));
  }
  if (startDate) {
    conditions.push(sql`${lectureSessions.sessionDatetime} >= ${startDate}`);
  }
  if (endDate) {
    conditions.push(sql`${lectureSessions.sessionDatetime} <= ${endDate}`);
  }
  if (courseId) {
    conditions.push(eq(courses.courseId, courseId));
  }

  const insights = await query
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .groupBy(users.username, students.matricNo, courses.courseCode);

  return insights;
}

export async function getCourses() {
  const allCourses = await db
    .select({
      id: courses.courseCode,
      name: courses.courseName,
      title: courses.courseName,
      description: courses.courseDesc,
      semester: courses.semester,
      status: courses.status,
      students: countDistinct(studentEnrollments.studentId),
      credits: courses.courseUnit,
      activeSessionId: lectureSessions.sessionId
    })
    .from(courses)
    .innerJoin(lectureSessions, eq(lectureSessions.courseId, courses.courseId))
    .leftJoin(studentEnrollments, eq(studentEnrollments.courseId, courses.courseId))
    .groupBy(courses.courseId, lectureSessions.sessionId);
  return allCourses;
}

export async function getStudents() {
  const allStudents = await db
    .select({
      studentId: students.studentId,
      username: users.username,
      matricNo: students.matricNo,
    })
    .from(students)
    .leftJoin(users, eq(students.userId, users.id));
  return allStudents;
}
