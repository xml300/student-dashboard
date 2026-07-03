import { getCurrentUser } from "@/lib/auth";
import { getCourses } from "@/lib/reports";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const user = await getCurrentUser();
    const studentId = user?.studentId;
    const courses = await getCourses({ studentId: studentId });
    
    return NextResponse.json({
        success: true,
        data: courses
    });
}
