import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/data/db';
import { activities, courseAssignments, courses } from '@/data/db/schema';
import { and, eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';


export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const lecturerId = user.lecturerId;
  try {
    const { courseId } = await req.json();
    if (!courseId || !lecturerId) {
      return NextResponse.json({ error: 'Missing courseId or lecturerId' }, { status: 400 });
    }

    const course = await db.select().from(courses).where(eq(courses.courseCode, courseId));
    const existingAssignment = await db.select().from(courseAssignments)
      .where(and(
        eq(courseAssignments.courseId, course[0].id),
        eq(courseAssignments.lecturerId, lecturerId)
      ));

    if (existingAssignment.length > 0) {
      return NextResponse.json({ error: 'Course already assigned to this lecturer' }, { status: 409 });
    }

    await db.insert(courseAssignments).values({
      courseId: course[0].id,
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
