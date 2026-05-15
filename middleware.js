import { NextResponse } from 'next/server';

export function middleware(request) {
    // If the user tries to access the /admin dashboard...
    if (request.nextUrl.pathname === '/admin') {
        const session = request.cookies.get('admin_session');
        
        // If they don't have the cookie, redirect them to the login page
        if (!session) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }
    return NextResponse.next();
}

// Only run this bodyguard on the admin route
export const config = {
    matcher: '/admin',
};