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