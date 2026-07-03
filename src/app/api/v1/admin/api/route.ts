import { NextResponse } from "next/server";

export async function GET() {
    const result = null;
    return NextResponse.json(JSON.stringify(result));
}