import { db } from "@/data/db";
import { attendanceRecords } from "@/data/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const body = await request.json();
    const {recordId, attendanceRecord, remarks} = body;    

    const record = await db.select().from(attendanceRecords).where(eq(attendanceRecords.id, recordId));
    if(!record) return NextResponse.json({error: "Record not Found"},{status: 404});

    await db.update(attendanceRecords).set({
        attendanceRecord: attendanceRecord,
        // remarks: remarks
    }).where(eq(attendanceRecords.id, recordId));

    return NextResponse.json({message: "Edit Successful"}, {status: 200});
}