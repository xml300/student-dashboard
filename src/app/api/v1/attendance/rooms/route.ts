import { NextRequest, NextResponse } from "next/server";
import { AttendanceRooms } from "@/data/models/attendance-rooms";

export async function POST(request: NextRequest) {
    const { sessionId } = await request.json();
    const rooms = await AttendanceRooms.getBySessionId(sessionId);
    return NextResponse.json({
        success: true,
        data: rooms.map(room => room.deviceUUID)
    });
}