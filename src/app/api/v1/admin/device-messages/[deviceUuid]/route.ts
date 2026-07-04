import { NextRequest, NextResponse } from "next/server";


const deviceMessages: { [deviceUuid: string]: { message: string; timestamp: number }[] } = {};

export async function POST(req: NextRequest, { params }: { params: Promise<{ deviceUuid: string }> }) {
  const { deviceUuid } = await params;
  const body = await req.json();
  if (!deviceUuid || !body?.message) {
    return NextResponse.json({
      success: false,
      error: {
        code: 400,
        message: "Device ID and message required"
      }
    }, { status: 400 });
  }
  if (!deviceMessages[deviceUuid]) deviceMessages[deviceUuid] = [];
  deviceMessages[deviceUuid].push({ message: body.message, timestamp: Date.now() });
  return NextResponse.json({ success: true });
}



export async function GET(req: NextRequest, { params }: { params: Promise<{ deviceUuid: string }> }) {
  const { deviceUuid } = await params;
  if (!deviceUuid) {
    return NextResponse.json({
      success: false,
      error: {
        code: 400,
        message: "Device ID required"
      }
    }, { status: 400 });
  }
  const now = Date.now();
  const allMessages = deviceMessages[deviceUuid] || [];
  const validMessages = allMessages.filter(m => now - m.timestamp <= 30000);
  const messages = validMessages.map(m => m.message);

  deviceMessages[deviceUuid] = validMessages;
  return NextResponse.json({ messages });
}
