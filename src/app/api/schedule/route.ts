import { NextResponse } from 'next/server';
import { db } from '@/db';
import { schedule } from '@/db/schema';
import { eq } from 'drizzle-orm';

// For now, we'll use a hardcoded user ID.
// In a real application, you would get this from the user's session.
const userId = 1;

export async function GET() {
  try {
    const userSchedule = await db.query.schedule.findMany({
      // This is a simplified query. In a real application, you would need to join with the courses table to filter by user.
    });
    return NextResponse.json(userSchedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { courseId, dayOfWeek, startTime, endTime } = await req.json();

    await db.insert(schedule).values({
      courseId,
      dayOfWeek,
      startTime,
      endTime,
    });

    return NextResponse.json({ message: 'Schedule entry created successfully' });
  } catch (error) {
    console.error('Error creating schedule entry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
