import { NextRequest, NextResponse } from "next/server";
import { Courses } from "@/data/models/courses";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
    const { courseId } = await params;
    const user = await getCurrentUser();
    if(!user || !user.studentId) {
        return NextResponse.json({
            success: false,
            error: {
                code: 401,
                message: "Unauthorized"
            }
        });
    }

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

    await Courses.enrollStudent(course.id, user.studentId);
    return NextResponse.json({
        success: true,
    });
}
