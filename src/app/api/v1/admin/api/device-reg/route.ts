

import { randomUUID } from 'crypto';
import { db } from '@/db';
import { users, lecturers, lecturerDevices } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.formData();
  const username = body.get('username')?.toString();
  const deviceType = 'Laptop';
  if (!username) {
    return new Response(JSON.stringify({ error: 'Lecturer username required' }), { status: 400 });
  }
  const userRows = await db.select().from(users).where(eq(users.username, username));
  if (userRows.length === 0) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }
  const userId = userRows[0].id;
  const lecturerRows = await db.select().from(lecturers).where(eq(lecturers.userId, userId));
  if (lecturerRows.length === 0) {
    return new Response(JSON.stringify({ error: 'Lecturer not found' }), { status: 404 });
  }
  const lecturerId = lecturerRows[0].lecturerId;


  const deviceUuid = randomUUID();
  const secretKey = randomUUID();
  await db.insert(lecturerDevices).values({
    lecturerId,
    deviceUUID: deviceUuid,
    secretKey: secretKey,
    deviceType,
    status: 'active',
  });

  console.log(deviceUuid, secretKey);

  return NextResponse.json({ deviceUuid, secretKey }, { status: 201});
}
