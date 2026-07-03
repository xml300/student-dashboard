import { NextRequest, NextResponse } from "next/server";

export function withErrorHandling(callback: (request: NextRequest) => Promise<NextResponse>) {
    return async (request: NextRequest) => {
        try {
            return await callback(request);
        } catch (err) {
            console.error(err);
            return NextResponse.json({
                success: false,
                error: {
                    code: 500,
                    message: "Internal Server Error"
                }
            }, { status: 500 });
        }
    }
}