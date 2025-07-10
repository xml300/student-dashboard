import { getStudents } from "@/lib/data/reports";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    console.log(request)
    const students = await getStudents();
    console.log(students);
    return NextResponse.json(students || []);
}
