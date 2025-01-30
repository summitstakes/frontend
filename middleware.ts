import { NextRequest, NextResponse } from 'next/server';

const AUTH_USER = 'admin';  // Change this to your username
const AUTH_PASS = 'password123';  // Change this to your password

export function middleware(req: NextRequest) {
    const authHeader = req.headers.get('authorization');

    if (authHeader) {
        const base64 = authHeader.split(' ')[1]; // Extract credentials
        const [user, pass] = Buffer.from(base64, 'base64').toString().split(':');

        if (user === AUTH_USER && pass === AUTH_PASS) {
            return NextResponse.next(); // Allow access
        }
    }

    return new NextResponse('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }
    });
}

export const config = {
    matcher: ['/protected'], // Change to the route you want to protect
};
