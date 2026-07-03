import { NextResponse } from "next/server";
import { db } from "@/db";
import { courses, courseAssignments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getAllCoursesData } from "@/lib/data/reports";
import { getServerSession } from "next-auth";
import { NSession } from "@/data/types/types";
import { authOptions } from "../auth/[...nextauth]/authOptions";


export async function GET() {
  const session: NSession | null = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const coursesList = await getAllCoursesData({ lecturerId: session.lecturerId });
  
  return NextResponse.json(coursesList || []);
}

export async function POST(req: Request) {
  const session: NSession | null = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { courseName, courseCode, courseDesc, courseUnit, semester, status } = await req.json();
  if (!courseName || !courseCode || !courseDesc) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  
  const existing = await db.select().from(courses).where(eq(courses.courseCode, courseCode));
  if (existing.length > 0) {
    return NextResponse.json({ error: "Course already exists" }, { status: 409 });
  }
  
  const course = await db.insert(courses).values({
    courseName,
    courseCode,
    courseDesc,
    courseUnit,
    status,
    semester
  }).returning({ id: courses.courseId });

  
  const { addActivity } = await import("@/app/api/dashboard/addActivity");
  await addActivity({
    category: "Course Management",
    action: "Created new course",
    affectedItem: courseCode,
    details: `Course '${courseName}' created by lecturer ${session!.lecturerId}`
  });

  await db.insert(courseAssignments).values({
    lecturerId: session.lecturerId,
    courseId: course[0].id,
  });

  return NextResponse.json({ success: true, course: { name: courseName, id: courseCode, description: courseDesc, credits: courseUnit, status, semester } });
}
