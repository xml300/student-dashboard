import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { createCanvas } from 'canvas';
import { db } from '@/db';
import { authorizedDevices } from '@/db/schema';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
    const user = await getCurrentUser();
    const etag = new Date().toISOString();
    if (request.headers.get("If-None-Match") == etag) {
        return new NextResponse(null, { status: 304 });
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

    // Insert into authorizedDevices (dummy studentId=1, deviceType='Laptop', status='active')
    try {
        await db.insert(authorizedDevices).values({
            studentId: (user as any)?.studentId,
            deviceUUID: uuid,
            deviceType: 'Laptop',
            status: 'active',
        });
    } catch (e) {
        // Ignore DB errors for duplicate UUIDs, etc.
    }

    return NextResponse.json({ uuid, image }, {
        status: 200,
        headers: { 'ETag': etag },
    });
}
