import { Courses } from "@/data/models/courses";
import { getCurrentUser } from "@/lib/auth";
import { getCourses } from "@/lib/reports";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const user = await getCurrentUser();
    if(!user || !user.studentId){
        return NextResponse.json({
            success: false,
            error: {
                code: 401,
                message: "Unauthorized"
            }
        });
    }
    
    const courses = await Courses.getByStudentId(user.studentId); 
    return NextResponse.json({
        success: true,
        data: courses
    });
}
