import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { db } from '@/db';
import { activities, courseAssignments, courses } from '@/db/schema';
import { and, eq } from 'drizzle-orm';


export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const lecturerId = session.lecturerId;
  try {
    const { courseId } = await req.json();
    if (!courseId || !lecturerId) {
      return NextResponse.json({ error: 'Missing courseId or lecturerId' }, { status: 400 });
    }

    const course = await db.select().from(courses).where(eq(courses.courseCode, courseId));
    const existingAssignment = await db.select().from(courseAssignments)
      .where(and(
        eq(courseAssignments.courseId, course[0].courseId),
        eq(courseAssignments.lecturerId, lecturerId)
      ));

    if (existingAssignment.length > 0) {
      return NextResponse.json({ error: 'Course already assigned to this lecturer' }, { status: 409 });
    }

    await db.insert(courseAssignments).values({
      courseId: course[0].courseId,
      lecturerId,
    });

    await db.insert(activities).values({
      category: 'Course Management',
      action: 'Assigned Course',
      affectedItem: `Course ID: ${courseId}`,
      details: `Assigned course ${courseId} to lecturer ${lecturerId}`,
    });

    return NextResponse.json({ success: true, courseId, lecturerId });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to assign course' }, { status: 500 });
  }
}
