import { NextResponse } from "next/server";
import { db } from "@/data/db";
import { lectureSessions, courses } from "@/data/db/schema";
import { eq } from "drizzle-orm";


export async function GET() {
  const schedule = await db
    .select({
      id: lectureSessions.id,
      title: courses.courseName,
      date: lectureSessions.sessionDatetime,
      startTime: lectureSessions.sessionDatetime,
      endTime: lectureSessions.sessionDatetime, 
      location: courses.courseName, 
      type: courses.courseCode, 
      courseCode: courses.courseCode,
    })
    .from(lectureSessions)
    .leftJoin(courses, eq(lectureSessions.courseId, courses.id));

  
  const formatted = schedule.map((event) => ({
    ...event,
    date: event.date?.toISOString().split('T')[0],
    startTime: event.startTime?.toISOString().split('T')[1]?.slice(0,5),
    endTime: event.endTime?.toISOString().split('T')[1]?.slice(0,5),
    location: event.location || '',
  }));
  return NextResponse.json(formatted);
}


export async function POST(req: Request) {
  const body = await req.json();
  
  const { courseId, sessionDatetime, duration } = body;
  if (!courseId || !sessionDatetime || !duration) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const [newSession] = await db.insert(lectureSessions).values({
    courseId,
    sessionDatetime: new Date(sessionDatetime),
    duration,
  }).returning();
  return NextResponse.json(newSession);
}


export async function PUT(req: Request) {
  const body = await req.json();
  const { sessionId, sessionDatetime, duration } = body;
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
  }
  const updated = await db.update(lectureSessions)
    .set({
      ...(sessionDatetime && { sessionDatetime: new Date(sessionDatetime) }),
      ...(duration && { duration }),
    })
    .where(eq(lectureSessions.id, sessionId))
    .returning();
  return NextResponse.json(updated[0] || {});
}


export async function DELETE(req: Request) {
  const body = await req.json();
  const { sessionId } = body;
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
  }
  await db.delete(lectureSessions).where(eq(lectureSessions.id, sessionId));
  return NextResponse.json({ success: true });
}
