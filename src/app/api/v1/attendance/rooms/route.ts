import { NextRequest, NextResponse } from "next/server";
import { LectureSessions } from "@/data/models/lecture-sessions";

export async function POST(request: NextRequest) {
    const { sessionId } = await request.json();
    const rooms = await LectureSessions.getAttendanceRooms(sessionId);
    return NextResponse.json({
        success: true,
        data: rooms.map(room => room.deviceUUID)
    });
}