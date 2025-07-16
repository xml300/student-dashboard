import { db } from "@/db";
import { courses, studentEnrollments } from "@/db/schema";
import {eq} from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const {courseId} = await request.json();
    const course = await db.select().from(courses).where(eq(courses.courseCode, courseId)).limit(1);

    if(!course || course.length === 0){
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const courseItem = course[0];

    await db.insert(studentEnrollments).values({
        studentId: 22,
        courseId: courseItem.courseId,
    });
    return NextResponse.json({ success: true }, {status: 200});
}