import { NextResponse, NextRequest } from 'next/server';
import { getCourses } from '@/lib/data/reports';

export async function GET(request: NextRequest){
    console.log(request);
    const courses = await getCourses();
    return NextResponse.json(courses || []);
}