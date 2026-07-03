import { NextResponse } from 'next/server';
import { db } from '@/data/db';
import { and, desc, eq } from 'drizzle-orm';
import { attendanceRecords, courses, lectureSessions, students, users } from '@/data/db/schema';

interface AttendanceRecord {
  studentId: number | null;
  studentName: string;
  matricNo: string;
  attendanceRecord: number | null;
  time: Date | null;
}

export async function GET(_req: Request, { params }: { params: Promise<{courseId: string}> }) {
  const courseId = (await params).courseId;

  
  const latestSession = await db
    .select({ sessionId: lectureSessions.id })
    .from(lectureSessions)
    .innerJoin(courses, eq(lectureSessions.courseId, courses.id))
    .where(eq(courses.courseCode, courseId))
    .orderBy(desc(lectureSessions.sessionDatetime))
    .limit(1);

  if (!latestSession.length) {
    return NextResponse.json([]);
  }
  const latestSessionId = latestSession[0].sessionId;

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
    .innerJoin(
      lectureSessions,
      eq(attendanceRecords.sessionId, lectureSessions.id)
    )
    .innerJoin(students, eq(attendanceRecords.studentId, students.id))
    .innerJoin(users, eq(students.userId, users.id))
    .innerJoin(courses, eq(lectureSessions.courseId, courses.id))
    .where(and(eq(courses.courseCode, courseId), eq(attendanceRecords.sessionId, latestSessionId)));

  
  const uniqueAttendance = Object.values(
    attendance.reduce((acc, record) => {
      acc[record.recordId] = record;
      return acc;
    }, {} as Record<number, typeof attendance[0]>)
  );

  const groupedBySession = uniqueAttendance.reduce((acc, record) => {
    const { sessionId, sessionDatetime, recordId, ...rest } = record;
    if (sessionId !== null) {
      if (!acc[sessionId]) {
        acc[sessionId] = {
          id: sessionId,
          recordId: recordId,
          date: sessionDatetime,
          session: `Session ${sessionId}`,
          records: [],
        };
      }
      acc[sessionId].records.push({
        studentId: rest.studentId,
        studentName: rest.username || rest.matricNo,
        matricNo: rest.matricNo,
        attendanceRecord: rest.attendanceRecord,
        time: rest.markedAt,
      });
    }
    return acc;
  }, {} as Record<number, { id: number; recordId: number; date: Date | null; session: string; records: AttendanceRecord[] }>);

  return NextResponse.json(Object.values(groupedBySession));
}


export async function POST(req: Request, { params }: { params: Promise<{courseId: string}> }) {
  const courseId = (await params).courseId;
  const { studentId, sessionId, attendanceRecord } = await req.json();
  
  const newRecord = await db.insert(attendanceRecords).values({
    sessionId, 
    studentId,
    attendanceRecord,
  }).returning({ recordId: attendanceRecords.id });

  
  const { addActivity } = await import("@/app/api/v1/admin/dashboard/addActivity");
  await addActivity({
    category: "User Management",
    action: "Attendance recorded",
    affectedItem: courseId,
    details: `Attendance for student ${studentId} in course ${courseId}`
  });

  return NextResponse.json(newRecord);
}
