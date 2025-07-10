import { getAttendanceSummary } from "@/lib/data/reports";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
    console.log(request)
    const summary = await getAttendanceSummary();
    return Response.json(summary);
}
