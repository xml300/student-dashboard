import { NextResponse } from "next/server";
import { db } from "@/data/db";
import { authorizedDevices, users } from "@/data/db/schema";
import { eq } from "drizzle-orm"; 
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if(!user) return NextResponse.json({message: 'Unauthorized'}, {status: 401});

  const staffDevices = await db
    .select({
      id: authorizedDevices.id,
      name: users.username,
      type: authorizedDevices.deviceType,
      model: authorizedDevices.deviceUUID, 
      status: authorizedDevices.status,
      owner: users.username,
    })
    .from(authorizedDevices)
    .leftJoin(users, eq(authorizedDevices.userId, users.id))
    .where(eq(authorizedDevices.userId, user.id));

  return NextResponse.json(staffDevices);
}


export async function POST(req: Request) {
  const user = await getCurrentUser();
  if(!user) return NextResponse.json({message: 'Unauthorized'}, {status: 401});

  const { deviceUUID, deviceType, status } = await req.json();

  
  const newDevice = await db.insert(authorizedDevices).values({
    userId: user.id,
    deviceUUID,
    deviceType,
    status
  }).returning({ deviceId: authorizedDevices.id });

  
  const { addActivity } = await import("@/app/api/v1/admin/dashboard/addActivity");
  await addActivity({
    category: "Device Management",
    action: "Registered new device",
    affectedItem: deviceUUID,
    details: `Device ${deviceUUID} registered for lecturer ${user.name}`
  });

  return NextResponse.json(newDevice);
}
