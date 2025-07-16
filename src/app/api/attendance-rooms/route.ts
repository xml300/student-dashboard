import { db } from "@/db";
import { eq } from "drizzle-orm";
import { attendanceRooms } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const {sessionId} = await request.json();
    const rooms = await db.select().from(attendanceRooms).where(eq(attendanceRooms.sessionId, sessionId));
    return NextResponse.json({rooms: rooms.map(room => room.deviceUUID)});
}