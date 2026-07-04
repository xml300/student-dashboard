import { Students } from "@/data/models/students";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const students = await Students.get();
    return NextResponse.json(students);
}
