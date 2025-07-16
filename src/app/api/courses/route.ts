import { NextResponse, NextRequest } from 'next/server';
import { getCourses } from '@/lib/data/reports';

export async function GET(request: NextRequest){
    const searchParams = request.nextUrl.searchParams;
    const isAll = searchParams.get('isAll');
    const studentId = 22;
    let courses = null;
    if(isAll){
        courses = await getCourses();
    }else{
        courses = await getCourses({studentId: studentId});
    }
    return NextResponse.json(courses || []);
}