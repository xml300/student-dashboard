import { db } from "@/data/db";
import { courses, studentEnrollments } from "@/data/db/schema";
import { eq } from "drizzle-orm";

import { NextResponse, NextRequest } from 'next/server';
import { getCourses } from '@/lib/reports';
import { getCurrentUser } from '@/lib/auth';
import { Courses } from "@/data/models/courses";

export async function GET() {
    const courses = await Courses.get();
    return NextResponse.json({
        success: true,
        data: courses
    });
}

export async function POST(request: NextRequest) {
    const { courseId } = await request.json();
    const course = await Courses.getByCode(courseId);
    if (!course) {
        return NextResponse.json({
            success: false,
            error: {
                code: 404,
                message: "Course not found"
            }
        });
    }

    const user = await getCurrentUser();
    await db.insert(studentEnrollments).values({
        studentId: user?.studentId,
        courseId: course.id,
    });
    return NextResponse.json({
        success: true,
    });
}
