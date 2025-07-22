import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authOptions } from './api/auth/[...nextauth]/authOptions';


export async function middleware(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
    ],
};