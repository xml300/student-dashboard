

const deviceMessages: { [deviceUuid: string]: { message: string; timestamp: number }[] } = {};

export async function POST(req: Request, context: { params: Promise<{ deviceUuid: string }> }) {
  const { deviceUuid } = await context.params;
  const body = await req.json();
  if (!deviceUuid || !body?.message) {
    return new Response(JSON.stringify({ error: "Device ID and message required" }), { status: 400 });
  }
  if (!deviceMessages[deviceUuid]) deviceMessages[deviceUuid] = [];
  deviceMessages[deviceUuid].push({ message: body.message, timestamp: Date.now() });
  return new Response(JSON.stringify({ success: true }));
}



export async function GET(req: Request, context: { params: Promise<{ deviceUuid: string }> }) {
  const { deviceUuid } = await context.params;
  if (!deviceUuid) {
    return new Response(JSON.stringify({ error: "Device ID required" }), { status: 400 });
  }
  const now = Date.now();
  const allMessages = deviceMessages[deviceUuid] || [];
  
  const validMessages = allMessages.filter(m => now - m.timestamp <= 30000);
  
  const messages = validMessages.map(m => m.message);
  
  deviceMessages[deviceUuid] = validMessages;
  return new Response(JSON.stringify({ messages }));
}
