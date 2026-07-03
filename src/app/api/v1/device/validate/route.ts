import { NextResponse } from 'next/server';
import { createCanvas, loadImage } from 'canvas';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('image') as File;
  if (!file) return NextResponse.json({ valid: false }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const img = await loadImage(buffer);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const imgData = ctx.getImageData(0, 0, img.width, img.height);

  let hex = '';
  for (let i = 0; i < 16; i++) {
    hex += imgData.data[i * 4].toString(16).padStart(2, '0');
  }
  const uuid = `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20,32)}`;
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  const valid = uuidRegex.test(uuid);

  return NextResponse.json({ valid, uuid: valid ? uuid : null });
}
