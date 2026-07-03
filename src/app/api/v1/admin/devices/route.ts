import { NextResponse } from "next/server";
import { db } from "@/db";
import { lecturerDevices, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { NSession } from "@/data/types/types";

export async function GET() {
  const session: NSession | null = await getServerSession(authOptions);
  if(!session) return NextResponse.json({message: 'Unauthorized'}, {status: 401});

  const staffDevices = await db
    .select({
      id: lecturerDevices.deviceId,
      name: users.username,
      type: lecturerDevices.deviceType,
      model: lecturerDevices.deviceUUID, 
      status: lecturerDevices.status,
      owner: users.username,
    })
    .from(lecturerDevices)
    .leftJoin(users, eq(lecturerDevices.lecturerId, users.id))
    .where(eq(lecturerDevices.lecturerId, session!.lecturerId));

  return NextResponse.json(staffDevices);
}


export async function POST(req: Request) {
  const session: NSession | null = await getServerSession(authOptions);
  if(!session) return NextResponse.json({message: 'Unauthorized'}, {status: 401});

  const { deviceUUID, deviceType, status } = await req.json();
  const lecturerId = session.lecturerId;

  
  const newDevice = await db.insert(lecturerDevices).values({
    lecturerId,
    deviceUUID,
    deviceType,
    status
  }).returning({ deviceId: lecturerDevices.deviceId });

  
  const { addActivity } = await import("@/app/api/dashboard/addActivity");
  await addActivity({
    category: "Device Management",
    action: "Registered new device",
    affectedItem: deviceUUID,
    details: `Device ${deviceUUID} registered for lecturer ${lecturerId}`
  });

  return NextResponse.json(newDevice);
}
