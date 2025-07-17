import { db } from "@/db/index";
import {
  users,
  students,
  courses,
  lectureSessions,
  attendanceRecords,
  studentEnrollments,
} from "@/db/schema";
import { eq, countDistinct, max } from "drizzle-orm";


export async function getCourses({ studentId }: { studentId?: number } = {}) {
  if (studentId) {
    const allCourses = await db
      .select({
        id: courses.courseCode,
        courseId: courses.courseId,
        name: courses.courseName,
        title: courses.courseName,
        description: courses.courseDesc,
        semester: courses.semester,
        status: courses.status,
        students: countDistinct(studentEnrollments.studentId),
        credits: courses.courseUnit,
        activeSessionId: max(lectureSessions.sessionId),
        activeSessionDatetime: max(lectureSessions.sessionDatetime)
      })
      .from(courses)
      .innerJoin(lectureSessions, eq(lectureSessions.courseId, courses.courseId))
      .leftJoin(studentEnrollments, eq(studentEnrollments.courseId, courses.courseId))
      .groupBy(courses.courseCode,
        courses.courseId,
        courses.courseName,
        courses.courseDesc,
        courses.semester,
        courses.status,
        courses.courseUnit,
      )
      .where(eq(studentEnrollments.studentId, studentId));
    return allCourses;
}
  const allCourses = db
    .select({
      id: courses.courseCode,
      name: courses.courseName,
      title: courses.courseName,
      description: courses.courseDesc,
      semester: courses.semester,
      status: courses.status,
      credits: courses.courseUnit
    })
    .from(courses);
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
