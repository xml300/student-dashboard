import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const req = request.url;
    console.log(req);
    const result = null;
    return NextResponse.json(JSON.stringify(result));
}