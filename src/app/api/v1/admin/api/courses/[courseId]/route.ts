import { getCourseById } from "@/lib/data/reports";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
    const courseId = (await params).courseId;
    const course = await getCourseById(courseId);

    if (!course) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
}
