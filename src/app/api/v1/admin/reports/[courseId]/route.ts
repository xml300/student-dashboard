import { NextResponse } from 'next/server';
import { db } from '@/data/db';
import { eq, desc } from 'drizzle-orm';
import { attendanceRecords, courses, lectureSessions, students, users } from '@/data/db/schema';

export async function GET(_req: Request, { params }: { params: Promise<{courseId: string}> }) {
  const courseId = (await params).courseId;

  
  const sessions = await db
    .select({ sessionId: lectureSessions.id, sessionDatetime: lectureSessions.sessionDatetime })
    .from(lectureSessions)
    .innerJoin(courses, eq(lectureSessions.courseId, courses.id))
    .where(eq(courses.courseCode, courseId))
    .orderBy(desc(lectureSessions.sessionDatetime));

  if (!sessions.length) {
    return NextResponse.json({ records: [], summary: {} });
  }

  
  const attendance = await db
    .select({
      recordId: attendanceRecords.id,
      sessionId: attendanceRecords.sessionId,
      studentId: attendanceRecords.studentId,
      attendanceRecord: attendanceRecords.attendanceRecord,
      markedAt: attendanceRecords.markedAt,
      sessionDatetime: lectureSessions.sessionDatetime,
      username: users.username,
      matricNo: students.matricNo,
    })
    .from(attendanceRecords)
    .innerJoin(lectureSessions, eq(attendanceRecords.sessionId, lectureSessions.id))
    .innerJoin(students, eq(attendanceRecords.studentId, students.id))
    .innerJoin(users, eq(students.userId, users.id))
    .innerJoin(courses, eq(lectureSessions.courseId, courses.id))
    .where(eq(courses.courseCode, courseId));

  
  const uniqueAttendance = Object.values(
    attendance.reduce((acc, record) => {
      acc[record.recordId] = record;
      return acc;
    }, {} as Record<number, typeof attendance[0]>)
  );

  
  const records = uniqueAttendance.map(record => ({
    date: record.sessionDatetime,
    studentName: record.username || record.matricNo,
    studentId: record.studentId,
    matricNo: record.matricNo,
    scheduledTime: record.sessionDatetime,
    checkInTime: record.markedAt,
    status:
      record.attendanceRecord === 1 ? 'Present' :
      record.attendanceRecord === 0 ? 'Absent' :
      record.attendanceRecord === null ? 'Excused' :
      '',
    notes: '', 
  }));

  
  const studentsEnrolled = new Set(records.map(r => r.studentId)).size;
  const sessionsHeld = sessions.length;
  const totalAbsences = records.filter(r => r.status === 'Absent (Unexcused)' || r.status === 'Absent (Excused)').length;
  const totalLate = records.filter(r => r.status === 'Late').length;
  const presentCount = records.filter(r => r.status === 'Present').length;
  const avgAttendance = sessionsHeld > 0 ? Math.round((presentCount / records.length) * 100) : 0;

  const summary = {
    studentsEnrolled,
    sessionsHeld,
    avgAttendance,
    totalAbsences,
    totalLate,
  };

  return NextResponse.json({ records, summary });
}
