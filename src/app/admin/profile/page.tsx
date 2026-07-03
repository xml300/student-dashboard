import { db } from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { lecturers, users, courses, courseAssignments, lectureSessions, lecturerDevices, studentEnrollments } from '@/db/schema';
import LecturerProfileClient from './LecturerProfileClient';
import { desc, inArray, eq } from 'drizzle-orm'; 

export default async function LecturerProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.lecturerId) {
    return <div>Unauthorized</div>;
  }
  const lecturerId = session.lecturerId;

  
  const lecturerRow = await db.select().from(lecturers).where(eq(lecturers.lecturerId, lecturerId)).limit(1);
  const lecturer = lecturerRow[0];
  
  if (!lecturer) {
    return <div>Lecturer not found</div>;
  }

  const userRow = await db.select().from(users).where(eq(users.id, lecturer.userId)).limit(1);
  const user = userRow[0];

  
  const courseRows = await db.select({ course: courses, assignment: courseAssignments })
    .from(courses)
    .innerJoin(courseAssignments, eq(courseAssignments.courseId, courses.courseId))
    .where(eq(courseAssignments.lecturerId, lecturerId));

  
  const coursesData = await Promise.all(courseRows.map(async ({ course }) => {
    const enrollments = await db.select().from(studentEnrollments).where(eq(studentEnrollments.courseId, course.courseId));
    const students = enrollments.length;
    const sessions = await db.select().from(lectureSessions).orderBy(desc(lectureSessions.sessionDatetime)).where(eq(lectureSessions.courseId, course.courseId));
    const attendanceRate = 0; 
    let nextSession;
    if (sessions.length > 0 && sessions[0].sessionDatetime) {
        nextSession = new Date(sessions[0].sessionDatetime);
        nextSession.setDate(nextSession.getDate() + 7);
    }
    const recentSessionsData = sessions.map(s => ({
      id: s.sessionId.toString(),
      course: course.courseName,
      date: s.sessionDatetime?.toDateString() || '',
      time: s.sessionDatetime?.toTimeString() || '',
      attendance: '0%', 
      rate: 0, 
      sessionDatetime: s.sessionDatetime?.toISOString() || '',
      attendees: 0, 
      totalStudents: students,
    }));
    return {
      id: course.courseCode,
      name: course.courseName,
      students,
      semester: course.semester,
      description: course.courseDesc,
      credits: course.courseUnit,
      devices: 0, 
      lastAttendance: sessions[0]?.sessionDatetime?.toDateString() || '', 
      nextSession: nextSession?.toDateString() || '',
      recentSessions: recentSessionsData, 
      status: course.status,
      attendanceRate,
    };
  }));
  
  const devices = await db.select().from(lecturerDevices).where(eq(lecturerDevices.lecturerId, lecturerId));

  
  const courseIds = courseRows.map(c => c.course.courseId);
  const recentSessionsRaw = courseIds.length > 0 
    ? await db.select().from(lectureSessions).where(inArray(lectureSessions.courseId, courseIds)).orderBy(desc(lectureSessions.sessionDatetime)).limit(5)
    : [];
  const recentSessions = recentSessionsRaw.map(s => ({
    id: s.sessionId.toString(),
    course: courseRows.find(c => c.course.courseId === s.courseId)?.course.courseName || '',
    date: s.sessionDatetime?.toDateString() || '',
    time: s.sessionDatetime?.toTimeString() || '',
    attendance: '0%', 
    rate: 0, 
    sessionDatetime: s.sessionDatetime?.toISOString() || '',
    attendees: 0, 
    totalStudents: 0, 
  }));

  
  const lecturerProfile = {
    id: lecturer.lecturerId,
    name: user?.username || '',
    department: '', 
    email: '', 
    phone: '', 
    joinDate: lecturer.createdAt ? lecturer.createdAt.toLocaleDateString() : '',
    profileImage: '',
    courses: coursesData,
    devices: devices.length,
    recentSessions,
  };

  return <LecturerProfileClient initialLecturer={lecturerProfile} />;
}
