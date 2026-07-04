import { NextResponse } from "next/server";
import { db } from "@/data/db";
import { courses, courseAssignments } from "@/data/db/schema";
import { eq } from "drizzle-orm"; 
import { Courses } from "@/data/models/courses";
import { getCurrentUser } from "@/lib/auth";


export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if(!user.lecturerId){
    return NextResponse.json({ message: "No Lecturer Assigned" }, { status: 401 });
  }

  const coursesList = await Courses.getByLecturerId(user.lecturerId);
  return NextResponse.json(coursesList);
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if(!user.lecturerId){
    return NextResponse.json({ message: "No Lecturer Assigned" }, { status: 401 });
  }

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
  }).returning({ id: courses.id });

  
  const { addActivity } = await import("@/app/api/v1/admin/dashboard/addActivity");
  await addActivity({
    category: "Course Management",
    action: "Created new course",
    affectedItem: courseCode,
    details: `Course '${courseName}' created by lecturer ${user.lecturerId}`
  });

  await db.insert(courseAssignments).values({
    lecturerId: user.lecturerId,
    courseId: course[0].id,
  });

  return NextResponse.json({ success: true, course: { name: courseName, id: courseCode, description: courseDesc, credits: courseUnit, status, semester } });
}
