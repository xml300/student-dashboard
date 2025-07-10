import { NextResponse } from 'next/server';
import { db } from '@/db';
import { courses } from '@/db/schema';
import { eq } from 'drizzle-orm';

// For now, we'll use a hardcoded user ID.
// In a real application, you would get this from the user's session.
const userId = 1;

export async function GET() {
  try {
    const userCourses = await db.query.courses.findMany({
      where: eq(courses.userId, userId),
    });
    return NextResponse.json(userCourses || []);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, description } = await req.json();

    await db.insert(courses).values({
      name,
      description,
      userId,
    });

    return NextResponse.json({ message: 'Course created successfully' });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
