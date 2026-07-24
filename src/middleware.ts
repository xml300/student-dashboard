import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { UserRole } from './types/auth';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

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

    const roleId = token.roleId;
    if (roleId === UserRole.STUDENT) {
        if (pathname.startsWith('/admin') || pathname === '/') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }else if(pathname.startsWith('/api/v1/admin')){
            return NextResponse.json({
                success: false,
                error: {
                    code: 403,
                    message: "Forbidden"
                }
            }, {status: 403});1f4e
        }
    } else if (roleId === UserRole.LECTURER || roleId === UserRole.ADMIN) {
        const studentRoutes = [
            '/dashboard',
            '/courses',
            '/device',
            '/attendance',
            '/profile',
            '/schedule',
            '/settings'
        ]; 
        const isStudentRoute = studentRoutes.some(route => pathname.startsWith(route));
        if (isStudentRoute || pathname === '/') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|login|signup).*)',
    ],
};
