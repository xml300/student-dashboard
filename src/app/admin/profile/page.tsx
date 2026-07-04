import { db } from '@/data/db'; 
import { lecturers, users, courses, courseAssignments, lectureSessions, authorizedDevices, studentEnrollments } from '@/data/db/schema';
import LecturerProfileClient from './LecturerProfileClient';
import { desc, inArray, eq } from 'drizzle-orm'; 
import { getCurrentUser } from '@/lib/auth';

export default async function LecturerProfilePage() {
  const userSession = await getCurrentUser();
  if (!userSession || !userSession.lecturerId) {
    return <div>Unauthorized</div>;
  } 
  const lecturerId = userSession.lecturerId;

  
  const lecturerRow = await db.select().from(lecturers).where(eq(lecturers.id, lecturerId)).limit(1);
  const lecturer = lecturerRow[0];
  
  if (!lecturer) {
    return <div>Lecturer not found</div>;
  }

  const userRow = await db.select().from(users).where(eq(users.id, lecturer.userId)).limit(1);
  const user = userRow[0];

  
  const courseRows = await db.select({ course: courses, assignment: courseAssignments })
    .from(courses)
    .innerJoin(courseAssignments, eq(courseAssignments.courseId, courses.id))
    .where(eq(courseAssignments.lecturerId, lecturerId));

  
  const coursesData = await Promise.all(courseRows.map(async ({ course }) => {
    const enrollments = await db.select().from(studentEnrollments).where(eq(studentEnrollments.courseId, course.id));
    const students = enrollments.length;
    const sessions = await db.select().from(lectureSessions).orderBy(desc(lectureSessions.sessionDatetime)).where(eq(lectureSessions.courseId, course.id));
    const attendanceRate = 0; 
    let nextSession;
    if (sessions.length > 0 && sessions[0].sessionDatetime) {
        nextSession = new Date(sessions[0].sessionDatetime);
        nextSession.setDate(nextSession.getDate() + 7);
    }
    const recentSessionsData = sessions.map(s => ({
      id: s.id.toString(),
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
      title: course.courseName,
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
  
  const devices = await db.select().from(authorizedDevices).where(eq(authorizedDevices.userId, lecturerId));

  
  const courseIds = courseRows.map(c => c.course.id);
  const recentSessionsRaw = courseIds.length > 0 
    ? await db.select().from(lectureSessions).where(inArray(lectureSessions.courseId, courseIds)).orderBy(desc(lectureSessions.sessionDatetime)).limit(5)
    : [];
  const recentSessions = recentSessionsRaw.map(s => ({
    id: s.id,
    course: courseRows.find(c => c.course.id === s.courseId)?.course.courseName || '',
    date: s.sessionDatetime?.toDateString() || '',
    time: s.sessionDatetime?.toTimeString() || '',
    attendance: '0%', 
    rate: 0, 
    sessionDatetime: s.sessionDatetime ? new Date(s.sessionDatetime) : new Date(),
    attendees: 0, 
    totalStudents: 0, 
  }));

  
  const lecturerProfile = {
    id: lecturer.id,
    name: user?.username || '',
    title: '',
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
