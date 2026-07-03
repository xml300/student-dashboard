import { db } from "@/data/db";
import { courses, studentEnrollments } from "@/data/db/schema";
import { eq } from "drizzle-orm";

import { NextResponse, NextRequest } from 'next/server';
import { getCourses } from '@/lib/reports';
import { getCurrentUser } from '@/lib/auth';
import { Courses } from "@/data/models/courses";

export async function GET(request: NextRequest) {
    const user = await getCurrentUser();
    const searchParams = request.nextUrl.searchParams;
    const isAll = searchParams.get('isAll');
    const studentId = (user as any)?.studentId;
    let courses = null;
    if (isAll) {
        courses = await getCourses();
    } else {
        courses = await getCourses({ studentId: studentId });
    }
    return NextResponse.json(courses || []);
}

export async function POST(request: NextRequest) {
    const { courseId } = await request.json();
    const course = await Courses.getByCode(courseId);
    if (!course) {
        return NextResponse.json({ success: false,
            error: {
                code: 404,
                message: "Course not found" 
            }
        }, { status: 404 });
    }

    const user = await getCurrentUser();
    await db.insert(studentEnrollments).values({
        studentId: (user as any)?.studentId,
        courseId: course.id,
    });
    return NextResponse.json({ success: true }, { status: 200 });
}
