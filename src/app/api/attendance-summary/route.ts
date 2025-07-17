import { NextResponse } from 'next/server';
import { db } from '@/db';
import { attendanceRooms, lectureSessions, courses } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const attendID = searchParams.get('attendID');

  if (!attendID) {
    return NextResponse.json({ error: 'Missing attendID' }, { status: 400 });
  }

  try {
    const roomData = await db.select().from(attendanceRooms).where(eq(attendanceRooms.sessionId, parseInt(attendID))).limit(1);
    if (roomData.length === 0) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }
    const room = roomData[0];

    if (!room.sessionId) {
      return NextResponse.json({ error: 'Room is not associated with a session' }, { status: 404 });
    }

    const sessionData = await db.select().from(lectureSessions).where(eq(lectureSessions.sessionId, room.sessionId)).limit(1);
    if (sessionData.length === 0) {
        return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }
    const session = sessionData[0];

    if (!session.courseId) {
        return NextResponse.json({ error: 'Session is not associated with a course' }, { status: 404 });
    }

    const courseData = await db.select().from(courses).where(eq(courses.courseId, session.courseId)).limit(1);
    if (courseData.length === 0) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    const course = courseData[0];
    const roomStatus = 'open';

    return NextResponse.json({ 
        room: { id: room.id, name: course.courseName, status: roomStatus },
        session: { id: session.sessionId, name: course.courseName, time: session.sessionDatetime, status: 'ongoing' }
    });
  } catch (error) {
    console.error('Error fetching attendance summary:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
