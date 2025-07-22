import { db } from "@/db";
import { courses, studentEnrollments } from "@/db/schema";
import {eq} from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: NextRequest){
    const user = await getCurrentUser();
    const {courseId} = await request.json();
    const course = await db.select().from(courses).where(eq(courses.courseCode, courseId)).limit(1);

    if(!course || course.length === 0){
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const courseItem = course[0];

    await db.insert(studentEnrollments).values({
        studentId: (user as any)?.studentId,
        courseId: courseItem.courseId,
    });
    return NextResponse.json({ success: true }, {status: 200});
}
