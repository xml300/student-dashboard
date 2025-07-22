import { NextResponse, NextRequest } from 'next/server';
import { getCourses } from '@/lib/data/reports';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest){
    const user = await getCurrentUser();
    const searchParams = request.nextUrl.searchParams;
    const isAll = searchParams.get('isAll');
    const studentId = (user as any)?.studentId;
    let courses = null;
    if(isAll){
        courses = await getCourses();
    }else{
        courses = await getCourses({studentId: studentId});
    }
    return NextResponse.json(courses || []);
}
