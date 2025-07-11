import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { createCanvas } from 'canvas';

export async function GET(request: NextRequest) {
    if (request.headers.get("If-None-Match") == new Date().toISOString()) {
        return new NextResponse(null, { status: 304 });
    }
    // Generate UUID
    const uuid = uuidv4();

    // Encode UUID as bytes into pixel data
    // Remove dashes and convert to bytes
    const hex = uuid.replace(/-/g, '');
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.slice(i, i + 2), 16));
    }
    // 16 bytes, so 16x1 image
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

    // ETag from date
    const etag = new Date().toISOString();

    return NextResponse.json({ uuid, image }, {
        status: 200,
        headers: { 'ETag': etag },
    });
}
