
const deviceResponses: { [deviceUuid: string]: { response: string[]; timestamp: number }[] } = {};

export async function POST(req: Request, context: { params: Promise<{ deviceUuid: string }> }) {
    const { deviceUuid } = await context.params;
    const { response } = await req.json();
    if (!deviceUuid || !response) {
        return new Response(JSON.stringify({ error: "Device ID and response required" }), { status: 400 });
    }
    if (!deviceResponses[deviceUuid]) deviceResponses[deviceUuid] = [];
    for (const res of response) {
        deviceResponses[deviceUuid].push({ response: res, timestamp: Date.now() });
    }
    return new Response(JSON.stringify({ success: true }));
}

export async function GET(req: Request, context: { params: Promise<{ deviceUuid: string }> }) {
    const { deviceUuid } = await context.params;
    if (!deviceUuid) {
        return new Response(JSON.stringify({ error: "Device ID required" }), { status: 400 });
    }
    const now = Date.now();
    const allResponses = deviceResponses[deviceUuid] || [];
    const validResponses = allResponses.filter(r => now - r.timestamp <= 30000);
    const responses = validResponses.map(r => r.response);
    deviceResponses[deviceUuid] = validResponses;
    return new Response(JSON.stringify({ responses }));
}
