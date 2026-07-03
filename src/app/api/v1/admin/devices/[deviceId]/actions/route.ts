import { NextResponse } from "next/server";

export async function POST(req: Request, context: { params: Promise<{ deviceId: string }> }) {
  const { deviceId } = await context.params;
  const body = await req.json();
  if (!deviceId) return NextResponse.json({ error: "Device ID required" }, { status: 400 });
  if (!body || !body.action) return NextResponse.json({ error: "Action required" }, { status: 400 });

  
  switch (body.action) {
    case "ping":
      
      return NextResponse.json({ message: "Ping sent successfully!" });
    case "restart":
      
      return NextResponse.json({ message: "Device restarted successfully!" });
    case "edit":
      
      
      return NextResponse.json({ message: "Device details updated." });
    case "delete":
      
      
      return NextResponse.json({ message: "Device deleted." });
    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}
