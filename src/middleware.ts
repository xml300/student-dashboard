import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip next-auth api endpoints
    if (pathname.startsWith('/api/auth')) {
        return NextResponse.next();
    }

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });
 
    if (pathname.startsWith("/api/v1") && !token) {
        return NextResponse.json({
            success: false,
            error: {
                code: 401,
                message: "Unauthorized"
            }
        }, { status: 401 });
    }

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|login|signup).*)',
    ],
};
