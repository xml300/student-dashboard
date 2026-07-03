import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { createCanvas } from 'canvas';
import { db } from '@/data/db';
import { authorizedDevices } from '@/data/db/schema';
import { getCurrentUser } from '@/lib/auth';

import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
    const user = await getCurrentUser();
    const studentId = user?.studentId;

    if (!studentId) {
        return NextResponse.json({
            success: false,
            error: {
                code: 401,
                message: 'Unauthorized'
            }
        }, { status: 401 });
    }

    const [existingDevice] = await db.select().from(authorizedDevices).where(eq(authorizedDevices.userId, user?.id)).limit(1);

    if (existingDevice) {
        let etag = '';
        if (existingDevice.authorizedAt) {
            etag = existingDevice.authorizedAt.toISOString();
            if (request.headers.get("If-None-Match") === etag) {
                return NextResponse.json({ uuid: existingDevice.deviceUUID }, { status: 304 });
            }
        }
        return NextResponse.json({ uuid: existingDevice.deviceUUID }, {
            status: 200,
            headers: { 'ETag': etag },
        });
    }

    const uuid = uuidv4();
    const hex = uuid.replace(/-/g, '');
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.slice(i, i + 2), 16));
    }
    const width = 16, height = 1;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(width, height);
    for (let i = 0; i < 16; i++) {
        imgData.data[i * 4 + 0] = bytes[i]; // R
        imgData.data[i * 4 + 1] = 0;       // G
        imgData.data[i * 4 + 2] = 0;       // B
        imgData.data[i * 4 + 3] = 255;     // A
    }
    ctx.putImageData(imgData, 0, 0);
    const image = canvas.toDataURL();

    const newDeviceResult = await db.insert(authorizedDevices).values({
        userId: user.id,
        deviceUUID: uuid,
        deviceType: 'Laptop',
        status: 'active',
    }).returning();

    const newDevice = newDeviceResult[0];

    if (!newDevice || !newDevice.authorizedAt) {
        return NextResponse.json({
            success: false,
            error: {
                code: 500,
                message: 'Failed to create device'
            }
        }, { status: 500 });
    }

    const etag = newDevice.authorizedAt.toISOString();

    return NextResponse.json({ uuid, image }, {
        status: 200,
        headers: { 'ETag': etag },
    });
}
