import { getCourseComparison } from "@/lib/data/reports";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    console.log(request);
    const comparison = await getCourseComparison();
    return NextResponse.json(comparison);
}