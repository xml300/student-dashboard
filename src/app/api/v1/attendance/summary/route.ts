import { NextResponse } from 'next/server';
import { db } from '@/data/db';
import { attendanceRooms, lectureSessions, courses } from '@/data/db/schema';
import { eq } from 'drizzle-orm';
import { LectureSessions } from '@/data/models/lecture-sessions';
import { Courses } from '@/data/models/courses';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json({
      success: false,
      error: {
        code: 400,
        message: 'Missing sessionId'
      }
    }, { status: 400 });
  }

  try {
    const rooms = await LectureSessions.getAttendanceRooms(parseInt(sessionId));
    if (rooms.length === 0) {
      return NextResponse.json({
        success: false,
        error: {
          code: 404,
          message: 'Room not found'
        }
      }, { status: 404 });
    }
    const room = rooms[0];

    if (!room.sessionId) {
      return NextResponse.json({
        success: false,
        error: {
          code: 404,
          message: 'Room is not associated with a session'
        }
      }, { status: 404 });
    }

    const session = await LectureSessions.getById(parseInt(sessionId));
    if (!session) {
      return NextResponse.json({
        success: false,
        error: {
          code: 404,
          message: 'Session not found'
        }
      }, { status: 404 });
    }

    if (!session.courseId) {
      return NextResponse.json({
        success: false,
        error: {
          code: 404,
          message: 'Session is not associated with a course'
        }
      }, { status: 404 });
    }

    const course = await Courses.getById(session.courseId);
    if (!course) {
      return NextResponse.json({
        success: false,
        error: {
          code: 404,
          message: 'Course not found'
        }
      }, { status: 404 });
    }
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
