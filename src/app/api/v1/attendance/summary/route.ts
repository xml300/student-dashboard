import { NextResponse } from 'next/server';
import { db } from '@/data/db';
import { attendanceRooms, lectureSessions, courses } from '@/data/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const attendID = searchParams.get('attendID');

  if (!attendID) {
    return NextResponse.json({
      success: false,
      error: {
        code: 400,
        message: 'Missing attendID'
      }
    }, { status: 400 });
  }

  try {
    const roomData = await db.select().from(attendanceRooms).where(eq(attendanceRooms.sessionId, parseInt(attendID))).limit(1);
    if (roomData.length === 0) {
      return NextResponse.json({
        success: false,
        error: {
          code: 404,
          message: 'Room not found'
        }
      }, { status: 404 });
    }
    const room = roomData[0];

    if (!room.sessionId) {
      return NextResponse.json({
        success: false,
        error: {
          code: 404,
          message: 'Room is not associated with a session'
        }
      }, { status: 404 });
    }

    const sessionData = await db.select().from(lectureSessions).where(eq(lectureSessions.id, room.sessionId)).limit(1);
    if (sessionData.length === 0) {
      return NextResponse.json({
        success: false,
        error: {
          code: 404,
          message: 'Session not found'
        }
      }, { status: 404 });
    }
    const session = sessionData[0];

    if (!session.courseId) {
      return NextResponse.json({
        success: false,
        error: {
          code: 404,
          message: 'Session is not associated with a course'
        }
      }, { status: 404 });
    }

    const courseData = await db.select().from(courses).where(eq(courses.id, session.courseId)).limit(1);
    if (courseData.length === 0) {
      return NextResponse.json({
        success: false,
        error: {
          code: 404,
          message: 'Course not found'
        }
      }, { status: 404 });
    }
    const course = courseData[0];
    const roomStatus = 'open';

    return NextResponse.json({
      success: true,
      data: {
        room: { id: room.id, name: course.courseName, status: roomStatus },
        session: { id: session.id, name: course.courseName, time: session.sessionDatetime, status: 'ongoing' }
      }
    });
  } catch (error) {
    console.error('Error fetching attendance summary:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 500,
        message: 'Internal Server Error'
      }
    }, { status: 500 });
  }
}
