import { getCourses } from "@/lib/data/reports";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    console.log(request);
    const courses = await getCourses();
    return NextResponse.json(courses || []);
}